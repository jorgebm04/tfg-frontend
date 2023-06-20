import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingComponent from '../pure/LoadingComponent';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import moment from 'moment';
import { Toaster, toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import '../../styles/Forms/Details.css'


const SubscriptionDetailModal = ({ showModal, subscriptionId }) => {
    const navigate = useNavigate();
    /*
    Subscription:
        "subscriptionId": 1,
        "name": "Netflix",
        "price": 20.0,
        "contractDate": "12/31/2021",
        "subscriptionFrequency": 2,
        "subscriptionUsername": "",
        "subscriptionPassword": "",
        "subscriptionEmail": "",
        "lastDigitsBank": "",
        "subscriptionComments": ""
    */

    const [subscription, setSubscription] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:8080/subscriptions/" + subscriptionId).then((result) => {
            const updatedSubscription = ()=>{
                const { contractDate, subscriptionFrequency } = result.data;
        
                const today = moment(); // Get the current date
                const contractMoment = moment(contractDate, 'MM/DD/YYYY');
        
                // Calculate the number of months between the current date and the contract date
                const monthsSinceContract = today.diff(contractMoment, 'months');
        
                // Calculate the number of payment periods that have passed
                const passedPaymentPeriods = Math.floor(monthsSinceContract / subscriptionFrequency);
        
                // Calculate the next payment date based on the current date and payment frequency
                const nextPaymentDate = contractMoment
                  .add(passedPaymentPeriods * subscriptionFrequency, 'months')
                  .add(subscriptionFrequency, 'months')
                  .format('MM/DD/YYYY');
        
                return {
                  ...result.data,
                  nextPaymentDate,
                  monthsSinceContract
                };
            }
            setSubscription(updatedSubscription)
              });
        })

    const copy = ()=> {
        console.log("pulsado")
    }

    const removeSubscription = () =>{
        axios.delete("http://localhost:8080/subscription/" + subscriptionId).then((result)=>{
            navigate(0)
            toast.success("Subscripcion eliminada correctamente")
        })
    }

    return (
        <div className="form-background">
            <Toaster position="top-center" expand={false} richColors  />
            <div className="form">
                {subscription ?
                    <div className="form-content">
                        <div className='subscriptionDetail'>
                            <Button sx={{ backgroundColor: "#8080ff", ":hover": { backgroundColor: "#9a9ac4" }, color: "#fff" }} onClick={() => showModal()}>Volver</Button>
                            <h1>Detalles de {subscription.name}</h1>
                            <h6>Nombre de Usuario</h6>
                            <TextField
                                sx={{ marginTop: '10px', marginBottom: '10px' }}
                                fullWidth
                                id="username"
                                name="username"
                                defaultValue={subscription.subscriptionUsername}
                            />
                            <ContentCopyIcon onClick={copy}/>
                            <h6>Contraseña</h6>
                            <TextField
                                sx={{ marginTop: '10px', marginBottom: '10px' }}
                                fullWidth
                                id="password"
                                name="password"
                                defaultValue={subscription.subscriptionPassword}
                            />
                            <ContentCopyIcon onClick={copy}/>
                            <h6>Correo Electronico</h6>
                            <TextField
                                sx={{ marginTop: '10px', marginBottom: '10px' }}
                                fullWidth
                                id="email"
                                name="email"
                                defaultValue={subscription.subscriptionComments}
                            />
                            <ContentCopyIcon onClick={copy}/>
                            <h6>Comentarios</h6>
                            <TextField
                                sx={{ marginTop: '10px', marginBottom: '10px' }}
                                fullWidth
                                id="comments"
                                name="comments"
                                multiline
                                value={subscription.subscriptionUsername}
                            />
                            <Button sx={{ backgroundColor: "#8080ff", ":hover": { backgroundColor: "#9a9ac4" }, color: "#fff" }} onClick={() => removeSubscription()}>Eliminar Subscripcion</Button>
                        </div>
                        <div className='subscriptionInformation'>
                            <p>La subscripcion se renueva cada {subscription.subscriptionFrequency} meses</p>
                            <p>La subscription se contrato el dia {subscription.contractDate}</p>
                            <p>La subscripcion lleva contratada {subscription.monthsSinceContract} meses</p>
                            <p>La proxima vez que se cobre esta subscripcion sera el dia {subscription.nextPaymentDate}</p>
                            <p>El importe de la subscripcion son {subscription.price} $</p>
                        </div>
                    </div> : <div>
                        <LoadingComponent />
                    </div>}
            </div>
        </div>
    );


}

export default SubscriptionDetailModal;
