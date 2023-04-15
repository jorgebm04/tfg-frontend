import React from 'react';
import { useNavigate } from 'react-router-dom'

const SuscriptionComponenet = ({ suscription }) => {

    const navigate = useNavigate();

    const calcDate = (contractDate) => {
        var dateParts = contractDate.split("/");

        // month is 0-based, that's why we need dataParts[1] - 1
        var date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

        while (date <= new Date()){
            date = new Date(date.setMonth(date.getMonth()+8));
        }
        return date;
    }

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
                <button onClick={()=>navigate('/suscription/'+suscription.subscriptionId)}>Ver detalles</button>
            </td>
        </tr>
    );
};

export default SuscriptionComponenet;
