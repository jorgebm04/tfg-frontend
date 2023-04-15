import React from "react";
import { TreeView, TreeItem } from "@mui/lab";
import { Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddButton from '../pure/AddButton'

function renderTree(folder) {
  if (!folder) return null;
  return (
    <TreeItem key={folder.folderId} nodeId={String(folder.folderId)} label={folder.name}>
      {folder.subFolders?.map((subFolder) => renderTree(subFolder))}
      {folder.subscriptions?.map((subscription) => (
        <TreeItem
          key={subscription.subscriptionId}
          nodeId={String(subscription.subscriptionId)}
          label={
            <Typography variant="body2" color="text.secondary">
              {subscription.name} (${subscription.price})
            </Typography>
          }
        />
      ))}
    </TreeItem>
  );
}

function FolderTreeView({ folders }) {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#8080ff',
      }
    },
  });

  if (!Array.isArray(folders)) return null;
  return (
    <div className='row-left'>
      <div>
        <h3>Gestor de Suscripciones</h3>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {folders.map((folder) => renderTree(folder))}
        </TreeView>
      </div>
      <div className="button">
        <ThemeProvider theme={theme}>
            <AddButton />
        </ThemeProvider>

      </div>

    </div>
  );
}

export default FolderTreeView;