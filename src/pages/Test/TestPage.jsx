import React, { useState } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CircleIcon from '@mui/icons-material/Circle';
import '../../styles/Test/TestPage.css';

const TreeNode = ({ node }) => {
  const { name, subFolders, subscriptions } = node;

  const [showChildren, setShowChildren] = useState(false);

  const handleClick = () => {
    setShowChildren(!showChildren);
  };

  return (
    <>
      <div
        className="TreeNodeContainer"
        onClick={handleClick}
      >
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
        {showChildren && <Tree treeData={subFolders} />}
      </ul>

      <ul className={`SubscriptionContainer ${showChildren ? 'show' : ''}`}>
        {showChildren &&
          subscriptions.map((subscription) => (
            <li className="SubscriptionItem" key={subscription.subscriptionId}>
              <CircleIcon fontSize="small" />
              {subscription.name}({subscription.price}$)
            </li>
          ))}
      </ul>
    </>
  );
};

  const Tree = ({treeData}) => {
  return (
      <ul>
        {treeData.map((node) => (
          <TreeNode node={node} key={node.folderId} />
        ))}
      </ul>
      );
};

const TestPage = () => {
  const treeData = [
      {
        folderId: 1,
      name: 'Entretenimiento',
      subFolders: [
      {
        folerId:3,
      name:"Caro",
      subFolders:[],
      subscriptions:[
      {
        subscriptionId: 4,
      name: 'AppleTV',
      price: 60.0,
      contractDate: '01/01/2022',
      subscriptionFrequency: 2,
      subscriptionUsername: '',
      subscriptionPassword: '',
      subscriptionEmail: '',
      lastDigitsBank: '',
      subscriptionComments: '',
            }
      ]
        }
      ],
      subscriptions: [
      {
        subscriptionId: 2,
      name: 'HBO',
      price: 40.0,
      contractDate: '03/09/2022',
      subscriptionFrequency: 3,
      subscriptionUsername: '',
      subscriptionPassword: '',
      subscriptionEmail: '',
      lastDigitsBank: '',
      subscriptionComments: '',
        },
      {
        subscriptionId: 1,
      name: 'Netflix',
      price: 20.0,
      contractDate: '12/31/2021',
      subscriptionFrequency: 2,
      subscriptionUsername: '',
      subscriptionPassword: '',
      subscriptionEmail: '',
      lastDigitsBank: '',
      subscriptionComments: '',
        },
      ],
    },
      {
        folderId: 2,
      name: 'Gastos',
      subFolders: [],
      subscriptions: [
      {
        subscriptionId: 3,
      name: 'Amazon',
      price: 15.0,
      contractDate: '01/01/2022',
      subscriptionFrequency: 5,
      subscriptionUsername: '',
      subscriptionPassword: '',
      subscriptionEmail: '',
      lastDigitsBank: '',
      subscriptionComments: '',
      }]
    }
      ];

      return (
      <div>
        <h1>React Tree View</h1>
        <Tree treeData={treeData} />
      </div>
      );
};

      export default TestPage;
