import React from 'react';
import {Link} from 'react-router-dom'
import AppToolbar from '../../components/pure/AppToolbar';

const AboutPage = () => {
    return (
        <div>
            <AppToolbar></AppToolbar>
            <h1>About & FAQs</h1>
            <Link to="/">||HOME|</Link>
            <Link to="/about">|ABOUT|</Link>
            <Link to="/faqs">|FAQS||</Link>
        </div>
    );
}

export default AboutPage;
