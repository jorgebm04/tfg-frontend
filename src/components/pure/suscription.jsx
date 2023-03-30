import React from 'react';

const SuscriptionComponenet = ({ suscription }) => {

    

    return (
        <tr>
            <th scope='row'>
                <i className='bi-toggle-on'></i>
            </th>
            <td>
                <span>{suscription.name}</span>
            </td>
            <td>
                <span>{suscription.price}</span>
            </td>
            <td>
                <span>{suscription.contractDate}</span>
            </td>
            <td>
                <button>Ver detalles</button>
            </td>
        </tr>
    );
};

export default SuscriptionComponenet;
