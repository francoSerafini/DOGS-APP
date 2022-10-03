import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDogsFiltered } from '../../actions';
import './BaseSelect.css'

const BaseSelect = () => {

    let dogs = useSelector(state => state.dogs);
    let filteredDogs = useSelector(state => state.filteredDogs);
    const dispatch = useDispatch();

    function handleChange(event) {

        let filtered = filteredDogs.length !== 0 ? filteredDogs : dogs;

        let dogsData = [];

        if(event.target.value === 'DataBase' ) {
            dogsData = filtered.filter(d => isNaN(d.id));
            if (dogsData.length === 0) { // si no coincidencias devuelvve todos
                dogsData = dogs;
                alert('no matchs for that filters');
            };
        } else if(event.target.value === 'Api') {     
            dogsData = filtered.filter(d => !isNaN(d.id)) 
            if (dogsData.length === 0) { // si no coincidencias devuelvve todos
                dogsData = dogs;
                alert('no matchs for that filters');
            };
        } else {
            dogsData = dogs;
        };
        dispatch(addDogsFiltered(dogsData));
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