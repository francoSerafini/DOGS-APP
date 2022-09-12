import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDogs, getTemperaments } from '../../actions';
import { DogsCard }  from '../DogsCard/DogsCard';


const Dogs = () => {

    const [state, setState] = React.useState({race: '', filteredDogs: []});
    const dispatch = useDispatch();
    let dogs = useSelector(state => state.dogs);
    const temperaments = useSelector(state => state.temperaments);

   React.useEffect(() => { 
    dispatch(getDogs())
   .catch(err => err.message)
   dispatch(getTemperaments())
   .catch(err => err.message)}, [ dispatch ]);

   function handleChange(event) {
        setState({
            ...state,
            race: event.target.value 
        });
    };

    function handleChangeTemp(event) {
        dispatch(getDogs());
        let dogsTemp = dogs.filter(d => d.temperaments && d.temperaments.includes(event.target.value));
        setState({
            ...state,
            filteredDogs: dogsTemp
        });
    };

    function handleChangeDb(event) {
        dispatch(getDogs());
        let dogsData = [];
        if(event.target.value === 'DataBase' ) dogsData = dogs.filter(d => isNaN(d.id));
        else dogsData = dogs.filter(d => !isNaN(d.id));
        setState({
            ...state,
            filteredDogs: dogsData
        });
    };

    function handleSubmit() {
        dispatch(getDogs(state.race));
        setState({
            ...state,
            filteredDogs: []
        });
    };

    let dogsToShow = state.filteredDogs.length !== 0 ? state.filteredDogs : dogs;

        return(
            <div>
                <div>
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
                </div>
                <div>
                    <select 
                        name='temperaments' 
                        id = 'temp'
                        onChange={ handleChangeTemp }>
                        { temperaments && temperaments.map((temp, index) =>
                            <option 
                                key = {index} 
                                value = {temp}>
                                {temp}
                            </option>) }
                    </select>
                </div>
                <div>
                    <select
                        name='base'
                        id='db'
                        onChange={ handleChangeDb }>
                            <option value = 'DataBase'>Data Base</option>
                            <option value = 'Api'>External API</option>
                    </select>
                </div>
                <div>
                { dogsToShow && dogsToShow.map( dog =>
                    <DogsCard
                        key={dog.id}
                        name={dog.name}
                        image={dog.image}
                        temperaments={dog.temperaments}
                        weight={dog.weight}
                    />) 
                }
                </div>
            </div>
        );
    };


export default Dogs;