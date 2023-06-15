import React, { useState, useEffect, useRef } from 'react';
import SubscriptionList from './SubscriptionList';
import SubscriptionTree from './SubscriptionTree';
import CreateSubscriptionForm from '../pure/Forms/CreateSubscriptionForm';
import CreateFolderForm from '../pure/Forms/CreateFolderForm';
import axios from 'axios';
import LoadingComponent from '../pure/LoadingComponent';
// import SubscriptionDetailModal from '../pure/SubscriptionDetailModal';
import { useNavigate } from 'react-router-dom'

const SuscriptionMain = () => {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const shouldLog = useRef(true)
    const [subscriptions, setSuscriptions] = useState(null);
    const [showCreateSubModal, setShowCreateSubModal] = useState(false)
    const [folders, setfolders] = useState(null);
    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
    const [subDetail, setsubDetail] = useState(null);
    const [showSubDetailModal, setshowSubDetailModal] = useState(false);


    useEffect(() => {
        if (shouldLog.current) {
            shouldLog.current = false;
            if (userId == null) {
                alert('You need to log in first!')
                navigate('/login')
            }
            axios.get("http://localhost:8080/users/" + userId + "/foldersFiltered").then((result) => {
                setfolders(result.data)
            })
            axios.get("http://localhost:8080/users/" + userId + "/subscriptions").then((result) => {
                setSuscriptions(result.data)
            })
        }

    }, [navigate, userId])

    function showSubModal() {
        setShowCreateSubModal(!showCreateSubModal)
    }

    function showFolderModal() {
        setShowCreateFolderModal(!showCreateFolderModal)
    }

    function showSubscriptionDetailModal(subscriptionId) {
        setshowSubDetailModal(!showSubDetailModal)
        setsubDetail(subscriptionId)
    }

    // function showDetailModal() {
    //     setshowSubDetailModal(!showSubDetailModal)
    // }

    if (subscriptions && folders) {
        return (
            
        <div className='TreeListContainer'>
            <SubscriptionTree folders={folders} subscriptions={subscriptions} showSubModal={showSubModal} showFolderModal={showFolderModal} />
            <SubscriptionList subscriptions={subscriptions} showSubDetailModal={showSubscriptionDetailModal} />
            {showCreateSubModal ? (<CreateSubscriptionForm showModal={showSubModal} userId={userId} />) : null}
            {showCreateFolderModal ? (<CreateFolderForm showModal={showFolderModal} userId={userId} />) : null}
            {/* {showSubDetailModal ? (<SubscriptionDetailModal showModal={showDetailModal} subscriptionId={subDetail} />) : null} */}
        </div>)
    } else {
        return (
            <div>
                <LoadingComponent />
            </div>

        )
    }


};

export default SuscriptionMain;
