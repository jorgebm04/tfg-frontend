import React,{useState,useEffect} from 'react';
import SuscriptionListComponent from './suscription_list';
import SuscriptionTree from './suscription_tree';
import "../../styles/suscription_main.css"
import CreateSubscriptionForm from '../pure/forms/CreateSubscriptionForm';
import axios from 'axios';
import LoadingComponent from '../pure/LoadingComponent';
import {Suscription} from '../../models/suscription.class'

const SuscriptionMain = () => {
    const userId = localStorage.getItem('userId');
    const [subscriptions, setSuscriptions] = useState(null);
    const [showCreateSubModal,setShowCreateSubModal] = useState(false)
    const [folders, setfolders] = useState(null);
    // const [showCreateFolderModal,setShowCreateFolderModal] = useState(false);
    

    useEffect(()=>{
        axios.get("http://localhost:8080/users/"+userId+"/folders").then((result)=>{
            setfolders(result.data)
        })
        axios.get("http://localhost:8080/users/"+userId+"/subscriptions").then((result)=>{
            setSuscriptions(result.data)
        })
    },[userId])

    function showSubModal(){
        setShowCreateSubModal(!showCreateSubModal)
    }

    function updateList(name,price,contractDate){
        const tempSuscriptions = [...subscriptions];
        tempSuscriptions.push(new Suscription(name,price,contractDate))
        setSuscriptions(tempSuscriptions);
    }

    return (
        <div>
            {subscriptions ? <div className='row'>
                <SuscriptionTree folders={folders} showModal={showSubModal}/>
            <SuscriptionListComponent subscriptions={subscriptions}/>
            {showCreateSubModal? (<CreateSubscriptionForm showModal={showSubModal} userId={userId} updateList={updateList}/>):null}
            </div> : <LoadingComponent />}
        </div>
    );
}

export default SuscriptionMain;
