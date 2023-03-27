import React from 'react';
import PropTypes from 'prop-types';
import { Suscription } from '../../models/suscription.class';

const SuscriptionComponenet = ({ suscription }) => {

    

    return (
        <tr className='fw-normal'>
            <th>
                <i className='bi-toggle-on'></i>
            </th>
            <td className='align-middle'>
                <span>{suscription.name}</span>
            </td>
            <td className='align-middle'>
                <span>{suscription.price}</span>
            </td>
            <td className='align-middle'>
                <span>{suscription.payDate}</span>
            </td>
            <td className='align-middle'>
                <button>Ver detalles</button>
            </td>
        </tr>
    );
};


SuscriptionComponenet.propTypes = {
    suscription: PropTypes.instanceOf(Suscription)
};


export default SuscriptionComponenet;
