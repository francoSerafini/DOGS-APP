import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return(
        <div className='landingPage'>
            <div className='title'>
                <h1 className='welcome'>WELCOME TO </h1>
                <img className='pi' src='https://us.123rf.com/450wm/nicemonkey/nicemonkey1605/nicemonkey160500010/56300805-s%C3%ADmbolo-pi-negro-ilustrada.jpg?ver=6' alt='pi'></img>
                <h1 className='dogs'>DOGS</h1>
            </div>
            <Link to={'/home'}>
                <button className='home'>Home</button>
            </Link>
            <h6 className='powered'>Powered by Franco</h6>
        </div>
    );
};

export default LandingPage;
 