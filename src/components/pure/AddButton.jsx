import React from 'react';
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
  
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        icon={<SpeedDialIcon openIcon={<RemoveIcon />} />}
        sx={{ alignItems:'end',justifyContent:'end',paddingBottom:'10px',paddingRight:'10px','& .MuiFab-primary': { width: 70, height: 70 }}}
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
    
    );
}

export default AddButton;
