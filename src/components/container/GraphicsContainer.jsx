import React,{useEffect,useRef,useState} from 'react';
import MonthlyTotalsSummary from '../pure/Graphics/MonthlyTotalsSummary';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import LoadingComponent from '../pure/LoadingComponent';

const GraphicsContainer = () => {
    const userId = localStorage.getItem('userId');
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
            axios.get("http://localhost:8080/users/" + userId + "/subscriptions").then((result) => {
                setSuscriptions(result.data)
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
