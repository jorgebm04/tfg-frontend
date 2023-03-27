import React from 'react';
import { useParams } from 'react-router-dom'

const SuscriptionDetailPage = () => {
    const params = useParams();

    return (
        <div>
            <h1>Suscription: {params.id} </h1>
            <h2>{params.name}</h2>
            <h3>{params.price}</h3>
        </div>
    );
}

export default SuscriptionDetailPage;
