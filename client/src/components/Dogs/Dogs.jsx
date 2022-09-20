import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDogs, getTemperaments } from '../../actions';
import TemperamentsSelect from '../TemperamentsSelect/TemperamentsSelect';
import BaseSelect from '../BaseSelect/BaseSelect';
import SearchBar from '../SearchBar/SearchBar';
import ToggleButtons from '../ToggleButtons/ToggleButtons';
import Paginated from '../Paginated/Paginated';

const Dogs = () => {

    const [state, setState] = React.useState({ filteredDogs: [] });
    const [order, setOrder] = React.useState(false);
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
                    <ToggleButtons
                        dogs={dogs}
                        states={state}
                        setStates={setState}
                        order={order}
                        setOrder={setOrder}
                    />
                </div>
                <div>
                    <TemperamentsSelect 
                        dogs={dogs}
                        states={state}
                        setStates={setState}
                    />              
                </div> 
                <div>
                    <BaseSelect
                        dogs={dogs}
                        states={state}
                        setStates={setState} 
                        dispatch={dispatch}
                    />
                </div>
                <div>
                    <Paginated
                        dogsToShow={dogsToShow}
                        order={order}/>
                </div>
            </div>
        );
    };


export default Dogs;