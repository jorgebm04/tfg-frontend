import React from 'react';
import SuscriptionComponenet from '../pure/suscription';
import "../../styles/SubscriptionList.css"

const SuscriptionListComponent = ({ subscriptions }) => {

    return (
        <div className='row-right'>
            <div className='col-12'>
                <h3>Tus Suscripciones</h3>
                <div className="scrollable">
                    <table className="table table-bordered ">
                        <thead>
                            <tr>
                                <th scope='col'></th>
                                <th scope='col'>Title</th>
                                <th scope='col'>Price</th>
                                <th scope='col'>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                                {subscriptions.map((suscription, index) => {
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
