import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDogs } from '../../actions';
import Logo from '../../Logo-nav.png';
import './Navbar.css';


const Navbar = () => {

    const dispatch = useDispatch();

    function handleClick(){
        dispatch(getDogs())
    }

    return (
        <header className="navbar">
            <div>
                <img id="logoDog" src={Logo} className="dog" alt="" />
            </div>
            <h1 className='titleNav'>PI DOGS</h1>
            <nav>
                <ul className="list">                   
                    <li className="list-item">
                        <Link to={'/home'}>
                            <button onClick={ handleClick }>Home</button>
                        </Link>
                        <Link to={'/createDog'}>
                            <button>Create Dog</button>
                        </Link>
                    </li>
                </ul>                       
            </nav>
        </header>
    );
};

export default Navbar;