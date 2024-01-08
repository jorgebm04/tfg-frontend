import React, { useState } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CircleIcon from '@mui/icons-material/Circle';
import '../../styles/Main/Tree/Tree.css';

const TreeNode = ({ node }) => {
  const { name, subfolders, subscriptions } = node;

  const [showChildren, setShowChildren] = useState(false);

  const handleClick = () => {
    setShowChildren(!showChildren);
  };

  return (
    <>
      <div className="TreeNodeContainer" onClick={handleClick}>
        {!showChildren ? (
          <div className="IconContainer">
            <KeyboardArrowRightIcon fontSize="medium" />
            <FolderIcon sx={{ fontSize: 'medium' }} />
          </div>
        ) : (
          <div className="IconContainer">
            <KeyboardArrowDownIcon fontSize="medium" />
            <FolderOpenIcon sx={{ fontSize: 'medium' }} />
          </div>
        )}
        <span className="FolderName">{name}</span>
      </div>

      <ul className={`FolderContainer ${showChildren ? 'show' : ''}`}>
        {showChildren && <Tree folders={subfolders} />}
      </ul>

      {subscriptions && subscriptions.length > 0 && (
        <ul className={`SubscriptionContainer ${showChildren ? 'show' : ''}`}>
          {showChildren &&
            subscriptions.map((subscription) => (
              <li className="SubscriptionItem" key={subscription.subscriptionId}>
                <CircleIcon fontSize="small" />
                {subscription.name} ({subscription.price}$)
              </li>
            ))}
        </ul>
      )}
    </>
  );
};

const Tree = ({ folders, searchQuery }) => {

  return (
    <ul className='TreeList'>
      {/* {searchQuery !== '' || folders.length === 0 ?
        <p>No se encontraron resultados.</p> : */}
        {(folders.map((folder) => (
          <TreeNode node={folder} key={folder.folderId} />
        )))}

      {/* } */}

    </ul>
  );
};

export default Tree;