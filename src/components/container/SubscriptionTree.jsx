import React, { useState } from 'react';
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

  const filterFolders = (folders, searchQuery) => {
    const filtered = [];
  
    for (const folder of folders) {
      const { name, subfolders, subscriptions } = folder;
      const matchesSearchQuery = name.toLowerCase().includes(searchQuery.toLowerCase());
      const filteredSubFolders = filterFolders(subfolders, searchQuery);
      const filteredSubscriptions = subscriptions.filter((subscription) =>
        subscription.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      if (matchesSearchQuery || filteredSubFolders.length > 0 || filteredSubscriptions.length > 0) {
        filtered.push({
          ...folder,
          subFolders: filteredSubFolders,
          subscriptions: filteredSubscriptions
        });
      }
    }
  
    return filtered;
  };
  
  
  

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const filteredFolders = filterFolders(folders, searchQuery);


  return (
    <div className='TreeContainer'>
      <div className="Tree">
        <h3>Gestor de Suscripciones</h3>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Busque una carpeta..."
        />
        <Tree folders={filteredFolders} searchQuery={searchQuery}/>
      </div>
      <ThemeProvider theme={theme}>
        <AddButton showSubModal={showSubModal} showFolderModal={showFolderModal} />
      </ThemeProvider>
    </div>
  );
};

export default SubscriptionTree;