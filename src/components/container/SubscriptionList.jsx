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
            field: 'contractDate',
            headerName: 'Fecha',
            type: 'date',
            width: 130,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'left',
        },
        { field: 'button', headerName: 'Detalles', width: 620, renderCell: renderDetailsButton, headerClassName: 'super-app-theme--header', headerAlign: 'right',
    cellClassName:'toRight'}
    ];

    function getRows() {
        let list = [];
        subscriptions.map((suscription, index) => {
            let id = suscription.subscriptionId;
            let name = suscription.name;
            let price = suscription.price;
            let contractDate = new Date(suscription.contractDate)
            list.push({ id, name, price, contractDate })
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
                    height: '80%',
                    width: '100%',
                    '& .super-app-theme--header': {
                        backgroundColor: '#8080ff',
                        color:'#fff'
                    },
                    '& .toRight': {
                        justifyContent:'end',
                    },
                }}
            >
                <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]}/>
            </Box>
        </div>
    );
}

export default SubscriptionList;
