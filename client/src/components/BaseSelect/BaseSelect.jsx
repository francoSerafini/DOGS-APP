import React from 'react';
import './BaseSelect.css'

const BaseSelect = (props) => {

    function handleChange(event) {

        let filtered = props.states.filteredDogs.length !== 0 ?
            props.states.filteredDogs : props.dogs;

        let dogsData = [];

        if(event.target.value === 'DataBase' ) {
            dogsData = filtered.filter(d => isNaN(d.id));
            if (dogsData.length === 0) { // si no coincidencias devuelvve todos
                dogsData = props.dogs;
                console.log('dogsData')
                alert('no matchs for that filters');
            };
        } else if(event.target.value === 'Api') {     
            dogsData = filtered.filter(d => !isNaN(d.id)) 
            if (dogsData.length === 0) { // si no coincidencias devuelvve todos
                dogsData = props.dogs;
                alert('no matchs for that filters');
            };
        } else {
            dogsData = props.dogs;
        };
        props.setStates({
            ...props.states,
            filteredDogs: dogsData
        });
    };

    return(
        <div>
            <h3 className='chooser'>DB Chooser</h3>
            <select className='base' onChange={ handleChange }>
                <option value = 'AllDB'>All</option>    
                <option value = 'DataBase'>Data Base</option>                   
                <option value = 'Api'>External API</option>
            </select>
        </div>
    );
};

export default BaseSelect;