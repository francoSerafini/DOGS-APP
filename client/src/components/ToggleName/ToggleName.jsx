import React from 'react';

let toggle = true;
const ToggleName = (props) => {

    function togglenames() {
        console.log(props.states.filteredDogs)
        let array = props.states.filteredDogs;
        if(toggle) {
            array = array.sort(
                function (a, b) {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                });
            toggle = false;
        }
        else {
            array = props.dogs.sort(
                function (a, b) {
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                });
            toggle = true;
        };
        return array;
    }
    
    function handleChange() {
        let dogsData = togglenames()
        props.setStates({
            ...props.states,
            filteredDogs: dogsData
        });
    };

    return(
        <label className="switch">
            <span>Ordenar</span>
            <input 
                type="checkbox"
                id="alfa"
                onChange={ handleChange }
            />
            <span className="slider round"></span>
        </label>
    );
};

export default ToggleName;
