import React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import QueueIcon from '@mui/icons-material/Queue';
import RemoveIcon from '@mui/icons-material/Remove';

const AddButton = ({ showSubModal,showFolderModal }) => {
    const actions = [
        { icon: <CreateNewFolderIcon />, name: 'Añadir Carpeta' },
        { icon: <QueueIcon />, name: 'Añadir Suscripcion' }
      ];
    return (
        <Box sx={{ transform: 'translateZ(0px)', paddingBottom:2,paddingRight:2}}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        icon={<SpeedDialIcon openIcon={<RemoveIcon />} />}
        sx={{alignItems:'end',  '& .MuiFab-primary': { width: 70, height: 70 }}}
      >
        <SpeedDialAction
          key={actions[0].name}
          icon={actions[0].icon}
          tooltipTitle={actions[0].name}
          onClick={() => showFolderModal()}
        />
        <SpeedDialAction
          key={actions[1].name}
          icon={actions[1].icon}
          tooltipTitle={actions[1].name}
          onClick={() => showSubModal()}
        />
      </SpeedDial>
    </Box>
    );
}

export default AddButton;
