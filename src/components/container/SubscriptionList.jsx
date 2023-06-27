import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

const SubscriptionList = ({ subscriptions,showSubDetailModal }) => {
    const renderDetailsButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{backgroundColor:"#fff", color:"#8080ff",":hover":{backgroundColor:"#c3c3f8",color:"#fff"}}}
                    onClick={
                        () => showSubDetailModal(params.row.id)
                    }
                >
                    Ver Detalles
                </Button>
            </strong>
        )
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90,headerClassName: 'super-app-theme--header', headerAlign: 'left',},
        { field: 'name', headerName: 'Nombre', width: 130,headerClassName: 'super-app-theme--header', headerAlign: 'left',},
        { field: 'price', headerName: 'Precio', type: 'number', width: 130,headerClassName: 'super-app-theme--header',headerAlign: 'left', },
        {
            field: 'nextPaymentDate',
            headerName: 'Fecha Proximo Cobro',
            type: 'date',
            width: 200,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
        },
        { field: 'button', headerName: 'Detalles',flex:1, renderCell: renderDetailsButton, headerClassName: 'super-app-theme--header', headerAlign: 'right',cellAlign :'right'}
    ];

    function getRows() {
        let list = [];
        subscriptions.map((suscription, index) => {
            let id = suscription.subscriptionId;
            let name = suscription.name;
            let price = suscription.price;
            let nextPaymentDate = new Date(suscription.nextPaymentDate)
            list.push({ id, name, price, nextPaymentDate })
            return null;
        })
        return list;
    }

    const rows = getRows()

    return (
        <div className='ListContainer'>
            <h3>Lista de Pagos</h3>
            <Box
                sx={{
                    width: '95%',
                    height: '90%'
                }}
            >
                <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} 
                    sx={{'& .super-app-theme--header': {
                        backgroundColor: '#8080ff',
                        color:'#fff'
                        
                    }}}

                />
            </Box>
        </div>
    );
}

export default SubscriptionList;
