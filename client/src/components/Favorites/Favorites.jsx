import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeDogFavorite } from '../../actions';
import Navbar from '../Navbar/Navbar';
import './Favorites.css';

const Favorites = () => {

    const dispatch = useDispatch();
    let favoritesDogs = useSelector(state => state.favoritesDogs);

    return(
        <div className='favorites'> 
            <Navbar/>
            <h2 className='titleFavorites'>Your favorites dogs</h2>
            <ul className='name'>
            {favoritesDogs.length !== 0 ? favoritesDogs.map((dog, index) => 
                <li key={index}>
                    <Link className='link' to={`/dogDetail/${dog.id}`}>
                        <span>{dog.name}</span>
                    </Link>
                    <button className='remove' onClick={() =>
                        dispatch(removeDogFavorite(dog))}>
                        X
                    </button>
                </li>) : 
                <span>Go to the detail of your favorite dog to add it</span>}
            </ul>
        </div>
    );
};

export default Favorites;