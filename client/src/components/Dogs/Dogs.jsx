import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDogs, getTemperaments } from '../../actions';
import { DogsCard }  from '../DogsCard/DogsCard';
import TemperamentsSelect from '../TemperamentsSelect/TemperamentsSelect';
import BaseSelect from '../BaseSelect/BaseSelect';
import SearchBar from '../SearchBar/SearchBar';
import ToggleName from '../ToggleName/ToggleName';

const Dogs = () => {

    const [state, setState] = React.useState({ filteredDogs: [] });
    const dispatch = useDispatch();
    let dogs = useSelector(state => state.dogs);
    
    React.useEffect(() => { 
        dispatch(getDogs())
        .catch(err => err.message)
        dispatch(getTemperaments())
        .catch(err => err.message)}, [ dispatch ]);

    let dogsToShow = state.filteredDogs.length !== 0 ? state.filteredDogs : dogs;

        return(
            <div>
                <div>
                    <SearchBar
                        dispatch={dispatch}
                        states={state}
                        setStates={setState}
                        getDogs={getDogs}
                    />
                </div>
                <div>
                    <ToggleName
                        dogs={dogs}
                        states={state}
                        setStates={setState}
                    />
                </div>
                <div>
                    <TemperamentsSelect 
                        dogs={dogs}
                        states={state}
                        setStates={setState}
                        getDogs={getDogs}
                        dispatch={dispatch}
                    />              
                </div> 
                <div>
                    <BaseSelect
                        dogs={dogs}
                        states={state}
                        setStates={setState} 
                        getDogs={getDogs}
                        dispatch={dispatch}
                    />
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