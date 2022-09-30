import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeDogFavorite } from '../../actions';

const Favorites = () => {

    const dispatch = useDispatch();
    let favoritesDogs = useSelector(state => state.favoritesDogs);

    return(
        <div>
            <h2>Your favorites dogs</h2>
            <ul>
            {favoritesDogs.map(dog => 
                <li>
                    <Link to={`/dogDetail/${dog.id}`}>
                        <span>{dog.name}</span>
                    </Link>
                    <button onClick={() =>
                        dispatch(removeDogFavorite(dog))}>
                        X
                    </button>
                </li>)}
            </ul>
        </div>
    );
};

export default Favorites;