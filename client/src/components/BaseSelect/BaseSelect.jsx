import React from 'react';


const BaseSelect = (props) => {

    function handleChange(event) {
        let filtered = props.dogs;
        props.dispatch(props.getDogs());
        let dogsData = [];
        if(event.target.value === 'DataBase' ) dogsData = filtered.lenght !== 0 ? filtered.filter(d => isNaN(d.id)) : props.dogs.filter(d => isNaN(d.id));
        else if(event.target.value === 'Api') dogsData = filtered.lenght !== 0 ? filtered.filter(d => !isNaN(d.id)) : props.dogs.filter(d => !isNaN(d.id));
        else {
            dogsData = props.dogs;
            alert('no matchs for thath filters'); //revisar y tratar de filtrar todo completo
        }
        props.setStates({
            ...props.states,
            filteredDogs: dogsData
        });
    };

    return(
        <select
            name='base'
            id='db'
            onChange={ handleChange }>
            <option value = 'AllDB'>All DB</option>    
            <option value = 'DataBase'>Data Base</option>                   
            <option value = 'Api'>External API</option>
        </select>
    );
};

export default BaseSelect;