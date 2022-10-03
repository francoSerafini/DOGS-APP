import React from 'react';
import { getDogs, addDogsFiltered } from '../../actions';
import { useDispatch } from 'react-redux';
import './SearchBar.css'

const SearchBar = () => {

    const [state, setState] = React.useState({ breed: '' });
    const dispatch = useDispatch();
    

    function handleChange(event) {
        setState({
            ...state,
            breed: event.target.value 
        });
    };

    function handleSubmit() {
        dispatch(getDogs(state.breed));
        dispatch(addDogsFiltered([]));
        setState({breed:''});
    };
        
    return(
        <form className="findDog" onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                className='breed'
                placeholder='Search by breed...'
                id="breed"
                value={state.breed}
                onChange={ handleChange }/>
            <div className='search'>
                <button type="submit" onClick={ handleSubmit }>SEARCH</button>
            </div>
    </form>
    );
};

export default SearchBar;