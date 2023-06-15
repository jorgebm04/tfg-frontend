import React from 'react';
import MainToolbar from '../../components/pure/Toolbars/MainToolbar';
import GraphicsContainer from '../../components/container/GraphicsContainer';

const GraphicsPage = () => {
    return (
        <div className='GraphicsPage'>
            <MainToolbar />
            <div className='GrpahicsContent'>
                <GraphicsContainer/>
            </div>
        </div>
    );
}

export default GraphicsPage;
