import React,{useState,useEffect} from 'react';
import SuscriptionListComponent from './suscription_list';
import SuscriptionTree from './suscription_tree';
import "../../styles/suscription_main.css"
import CreateSubscriptionForm from '../pure/forms/CreateSubscriptionForm';
import axios from 'axios';
import LoadingComponent from '../pure/LoadingComponent';

const SuscriptionMain = () => {
    const userId = localStorage.getItem('userId');
    const [subscriptions, setSuscriptions] = useState(null);
    

    useEffect(()=>{
            axios.get("http://localhost:8080/users/"+userId+"/subscriptions").then((result)=>{
            setSuscriptions(result.data)
        })
    },[])
    
    const [showCreateModal,setSHowCreateModal] = useState(false)

    function showModal(){
        setSHowCreateModal(!showCreateModal)
    }

    async function updateList(subscription){
        const tempSuscriptions = [...subscriptions];
        tempSuscriptions.push(subscription)
        setSuscriptions(tempSuscriptions);
    }

    return (
        <div>
            {subscriptions ? <div className='row'>
                <SuscriptionTree showModal={showModal}/>
            <SuscriptionListComponent subscriptions={subscriptions}/>
            {showCreateModal? (<CreateSubscriptionForm showModal={showModal} userId={userId} updateList={updateList}/>):null}
            </div> : <LoadingComponent />}
        </div>
    );
}

export default SuscriptionMain;
