import React from 'react';

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
        <form className="race_input" onSubmit={(e) => e.preventDefault()}>
        <div>
            <input
                type="text"
                id="race"
                autoComplete="off"
                onChange={ handleChange }
            />
        </div>
        <button type="submit" onClick={ handleSubmit }>SEARCH</button>
    </form>
    );
};

export default SearchBar;