import React,{useState} from 'react';
import SuscriptionListComponent from './suscription_list';
import SuscriptionTree from './suscription_tree';
import "../../styles/suscription_main.css"
import { Suscription } from '../../models/suscription.class';
import CreateSubscriptionForm from '../pure/forms/CreateSubscriptionForm';
// import { Folder } from '../../models/folder.class';
// import { User } from '../../models/user.class';

const SuscriptionMain = () => {
    // const usersList = [new User(0,'root',null,null)]
    // const foldersList = [new Folder(0,'Root',null),new Folder(1,'Multimedia',0),new Folder(2,'Audio',0),new Folder(3,'Mas caras',1)]
    const suscriptionList = 
    [
      new Suscription(0,'Netflix', 15, '15/05/2022',0,0),
      new Suscription(1,'HBO', 20, '01/01/2022',0,1),
      new Suscription(2,'Spotify', 5, '30/04/2022',0,2),
      new Suscription(3,'Apple TV',90,'31/12/2020',0,3)
    ]
    
    // EL state habra que sacarlo con la peticion HTTP al servicio de suscripciones
    const [suscriptions, setSuscriptions] = useState(suscriptionList);

    const [showCreateModal,setSHowCreateModal] = useState(false)

    function addSuscription(suscription){
        const tempSuscriptions = [...suscriptions];
        tempSuscriptions.push(suscription)
        setSuscriptions(tempSuscriptions);
    }

    function showModal(){
        setSHowCreateModal(!showCreateModal)
    }

    return (
        <div className='row'>
            <SuscriptionTree addSuscription={addSuscription} showModal={showModal}/>
            <SuscriptionListComponent suscriptions={suscriptionList}/>
            {showCreateModal? (<CreateSubscriptionForm showModal={showModal}/>):null}
        </div>
    );
}

export default SuscriptionMain;
