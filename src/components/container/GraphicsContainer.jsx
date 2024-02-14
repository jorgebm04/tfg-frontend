import React,{useEffect,useRef,useState} from 'react';
import MonthlyTotalsSummary from '../pure/Graphics/MonthlyTotalsSummary';
import { request } from '../../service/axiosHelper';
import moment from 'moment';
import { useNavigate } from 'react-router-dom'
import LoadingComponent from '../pure/LoadingComponent';
import { getUserId } from '../../service/axiosHelper';

const GraphicsContainer = () => {
    const userId = getUserId();
    const shouldLog = useRef(true)
    const navigate = useNavigate();
    const [subscriptions, setSuscriptions] = useState(null);

    useEffect(() => {
        if (shouldLog.current) {
            shouldLog.current = false;
            if (userId == null) {
                alert('You need to log in first!')
                navigate('/login')
            }
            request("GET", "/users/" + userId + "/subscriptions", {}
            ).then((response) => {
                const updatedSubscriptions = response.data.map(subscription => {
                    const { contractDate, subscriptionFrequency } = subscription;
            
                    const today = moment(); // Get the current date
                    const contractMoment = moment(contractDate, 'DD/MM/YYYY');
            
                    // Calculate the number of months between the current date and the contract date
                    const monthsSinceContract = today.diff(contractMoment, 'months');
            
                    // Calculate the number of payment periods that have passed
                    const passedPaymentPeriods = Math.floor(monthsSinceContract / subscriptionFrequency);
            
                    // Calculate the next payment date based on the current date and payment frequency
                    const nextPaymentDate = contractMoment
                      .add(passedPaymentPeriods * subscriptionFrequency, 'months')
                      .add(subscriptionFrequency, 'months')
                      .format('DD/MM/YYYY');
            
                    return {
                      ...subscription,
                      nextPaymentDate,
                      monthsSinceContract
                    };
                  });
            setSuscriptions(updatedSubscriptions)
            }).catch((error) => {
                console.log(error)
            })
        }

    }, [navigate, userId])

   
        if (subscriptions) {
            return (
                
                <div className='GraphicsContainer'>
                <MonthlyTotalsSummary subscriptions={subscriptions}/>
            </div>)
        } else {
            return (
                <div>
                    <LoadingComponent />
                </div>
    
            )
        }
        

}

export default GraphicsContainer;
