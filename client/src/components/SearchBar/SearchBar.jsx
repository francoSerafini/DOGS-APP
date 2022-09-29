import React from 'react';
import './SearchBar.css'

const SearchBar = (props) => {

    const [state, setState] = React.useState({ breed: '' });
    

    function handleChange(event) {
        setState({
            ...state,
            breed: event.target.value 
        });
    };

    function handleSubmit() {
        props.dispatch(props.getDogs(state.breed));
        props.setStates({
            ...props.states,
            filteredDogs: []
        });
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