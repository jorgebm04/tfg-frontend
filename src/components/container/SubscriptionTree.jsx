import React from 'react';
import Tree from '../pure/Tree';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AddButton from '../pure/AddButton'

const SubscriptionTree = ({ folders, showSubModal, showFolderModal }) => {
    const theme = createTheme({
    palette: {
      primary: {
        main: '#8080ff',
      }
    },
  });

  return (
    <div className='TreeContainer'>
       <div className="Tree">
         <h3>Gestor de Suscripciones</h3>
         <Tree folders={folders}/>
       </div>
       <ThemeProvider theme={theme}>
         <AddButton showSubModal={showSubModal} showFolderModal={showFolderModal} />
       </ThemeProvider>
     </div>
  );
};

export default SubscriptionTree;