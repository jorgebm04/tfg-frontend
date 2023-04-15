import React from 'react';
import { useParams } from 'react-router-dom';
import SubscriptionDetail from '../../components/container/subscriptionDetail';


const SuscriptionDetailPage = () => {
    const id = useParams();

    return (
        <div>
            <SubscriptionDetail subscriptionId={id.idSuscription} />
        </div>
    );
}

export default SuscriptionDetailPage;
