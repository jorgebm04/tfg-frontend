import {React, useEffect,useState} from 'react';
import AppToolbar from '../../components/pure/AppToolbar';
import SuscriptionMain from '../../components/container/suscription_main'
import { Navigate } from "react-router-dom";

const SuscriptionPage = () => {
    // const [authenticated, setauthenticated] = useState(null);
    // useEffect(() => {
    //     const loggedInUser = localStorage.getItem("credentials");
    //     if (loggedInUser) {
    //         setauthenticated(loggedInUser);
    //     }
    // }, []);

    // if (!authenticated) {
    //     return <Navigate replace to="/login" />;
    // } else {
        return (
            <div>
                <AppToolbar />
                <SuscriptionMain />
            </div>
        );
    }
// }
    export default SuscriptionPage;
