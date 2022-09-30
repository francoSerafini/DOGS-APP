import React from 'react';
import './Loading.css';

const Loading = () => {
    
    return(
        <div className='loading'>
            <h1 className='loadingTitle'>Loading...</h1>
            <img src='https://i.gifer.com/Xqg8.gif' alt='Loading'/>
        </div>
    );
};

export default Loading;