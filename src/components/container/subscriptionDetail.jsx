import React,{useState,useEffect} from 'react';
import axios from 'axios';
import LoadingComponent from '../pure/LoadingComponent';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'

const SubscriptionDetail = ({subscriptionId}) => {

    const [subscription,setSubscription] = useState(null)
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:8080/subscriptions/"+subscriptionId).then((result)=>{
        setSubscription(result.data)
    })
})
    
    return (
        <div>
            {subscription ? <div>
                <h1>Detalles de {subscription.name}</h1>
                <Button sx={{ backgroundColor: "#8080ff", ":hover": { backgroundColor: "#9a9ac4" },color:"#fff" }} onClick={() => navigate(-1)}>Volver</Button>
                <h2>The price is {subscription.price}</h2>
                <h2>La fecha de contrato es {subscription.contractDate}</h2>
            </div> : <LoadingComponent />}
        </div>
    );
}

export default SubscriptionDetail;
