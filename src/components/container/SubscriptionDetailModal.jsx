import React from 'react';
import LoadingComponent from '../../components/pure/LoadingComponent';
import { Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Toaster, toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import calendarImage from '../../images/calendar.png'
import contractImage from '../../images/handshake.png'
import durationImage from '../../images/duration.png'
import renewalImage from '../../images/renewal.png'
import currencyImage from '../../images/currency.png'
import '../../styles/Forms/Details.css'
import { request } from '../../service/axiosHelper';


const SubscriptionDetailModal = ({ showModal, userId, subscription }) => {
  const navigate = useNavigate();

  const copy = () => {
    console.log("pulsado")
  }

  const removeSubscription = () => {
    request(
      "DELETE",
      "/users/"+ userId + "/folders/"+subscription.folderId+"/subscriptions/"+subscription.subscriptionId,
      {}
    ).then((response) => {
      navigate(0)
      toast.success("Subscripcion eliminada correctamente")
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="form-background">
      <Toaster position="top-center" expand={false} richColors />
      <div className="form">
        {subscription ?
          <div className="form-content-detail">
            <div className='subscriptionDetail'>
              <Button sx={{ backgroundColor: "#8080ff", ":hover": { backgroundColor: "#9a9ac4" }, color: "#fff" }} onClick={() => showModal()}>Volver</Button>
              <h1>Detalles de {subscription.name}</h1>
              <h6>Nombre de Usuario</h6>
              <TextField
                sx={{ marginTop: '10px', marginBottom: '10px' }}
                id="username"
                name="username"
                type='password'
                defaultValue={subscription.subscriptionUsername}
              />
              <ContentCopyIcon onClick={copy} sx={{fontSize:'2rem', marginLeft:'20px', marginTop:'20px'}}/>
              <h6>Contraseña</h6>
              <TextField
                sx={{ marginTop: '10px', marginBottom: '10px' }}
                id="password"
                name="password"
                type='password'
                defaultValue={subscription.subscriptionPassword}
              />
              <ContentCopyIcon onClick={copy} sx={{fontSize:'2rem', marginLeft:'20px', marginTop:'20px'}}/>
              <h6>Correo Electronico</h6>
              <TextField
                sx={{ marginTop: '10px', marginBottom: '10px' }}            
                id="email"
                name="email"
                type='password'
                defaultValue={subscription.subscriptionComments}
              />
              <ContentCopyIcon onClick={copy} sx={{fontSize:'2rem', marginLeft:'20px', marginTop:'20px'}}/>
              <h6>Comentarios</h6>
              <TextField
                sx={{ marginTop: '10px', marginBottom: '10px' }}
                id="comments"
                name="comments"
                type='text'
                multiline
                fullWidth
                value={subscription.subscriptionUsername}
              />
              <Button sx={{ backgroundColor: "#8080ff", ":hover": { backgroundColor: "#9a9ac4" }, color: "#fff" }} onClick={() => removeSubscription()}>Eliminar Suscripcion</Button>
            </div>
            <div className='subscriptionInformation'>
              <Card sx={{ maxWidth: 300 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="150"
                    image={calendarImage}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Renovacion
                    </Typography>
                    <Typography>
                La suscripcion se renueva cada {subscription.subscriptionFrequency} meses
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card sx={{ maxWidth: 300 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={contractImage}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Contrato
                    </Typography>
                    <Typography>
                        La suscription se contrato el dia {subscription.contractDate}
                        </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card sx={{ maxWidth: 300 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={durationImage}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Duracion
                    </Typography>
                    <Typography>
                        La suscripcion lleva contratada {subscription.monthsSinceContract} meses
                        </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card sx={{ maxWidth: 300 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={renewalImage}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Cobro
                    </Typography>
                    <Typography>
                        La proxima vez que se cobre esta suscripcion sera el dia {subscription.nextPaymentDate}
                        </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card sx={{ maxWidth: 300 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={currencyImage}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Precio
                    </Typography>
                    <Typography>
                        El importe de la suscripcion son {subscription.price} $
                      </Typography> 
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </div> : <div>
            <LoadingComponent />
          </div>}
      </div>
    </div>
  );


}

export default SubscriptionDetailModal;
