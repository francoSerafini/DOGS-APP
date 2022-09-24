import React from 'react';
import './SearchBar.css'

const SearchBar = (props) => {

    const [state, setState] = React.useState({ race: '' });
    

    function handleChange(event) {
        setState({
            ...state,
            race: event.target.value 
        });
    };

    function handleSubmit() {
        props.dispatch(props.getDogs(state.race));
        props.setStates({
            ...props.states,
            filteredDogs: []
        });
    };
        
    return(
        <form className="findDog" onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                className='breed'
                placeholder='Search by breed...'
                id="breed"
                autoComplete="off"
                onChange={ handleChange }/>
            <div className='search'>
                <button type="submit" onClick={ handleSubmit }>SEARCH</button>
            </div>
    </form>
    );
};

export default SearchBar;