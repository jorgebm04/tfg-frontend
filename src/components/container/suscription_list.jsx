import React from 'react';
import SuscriptionComponenet from '../pure/suscription';

const SuscriptionListComponent = ({suscriptions}) => {

    return (
        <div className='row-right'>
            <div className='col-12'>
                <h3>Tus Suscripciones</h3>
                <div className='card-body' data-mdb-perfect-scrollbar='true' style={{ position: 'relative', height: '400px' }}>
                    <table>
                        <thead>
                            <tr>
                                <th scope='col'></th>
                                <th scope='col'>Title</th>
                                <th scope='col'>Price</th>
                                <th scope='col'>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suscriptions.map((suscription, index) => {
                                return <SuscriptionComponenet key={index} suscription={suscription}></SuscriptionComponenet>
                            })} 
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SuscriptionListComponent;
