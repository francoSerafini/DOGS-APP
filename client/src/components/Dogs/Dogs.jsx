import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDogs, getTemperaments } from '../../actions';
import TemperamentsSelect from '../TemperamentsSelect/TemperamentsSelect';
import BaseSelect from '../BaseSelect/BaseSelect';
import SearchBar from '../SearchBar/SearchBar';
import ToggleButtons from '../ToggleButtons/ToggleButtons';
import Paginated from '../Paginated/Paginated';
import Navbar from '../Navbar/Navbar';
import Loading from '../Loading/Loading'
import './Dogs.css';

const Dogs = () => {

    const [state, setState] = React.useState({ filteredDogs: [] });
    const [order, setOrder] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    let dogs = useSelector(state => state.dogs);

    function changeLoading() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };
    
    React.useEffect(() => { 
        dispatch(getDogs())
        .catch(err => err.message)
        dispatch(getTemperaments())
        .catch(err => err.message)
        changeLoading()}, [ dispatch ]);

    let dogsToShow = state.filteredDogs.length !== 0 ? state.filteredDogs : dogs;

        return(
            <div className='page'>
                <Navbar/>
                {loading ? 
                    <Loading/> :
                        <div>
                            <div className='filters'> 
                                <SearchBar
                                    dispatch={dispatch}
                                    states={state}
                                    setStates={setState}
                                    getDogs={getDogs}/>
                                <div className='buttons'>
                                    <BaseSelect
                                        dogs={dogs}
                                        states={state}
                                        setStates={setState} 
                                        dispatch={dispatch}/>  
                                    <ToggleButtons
                                        dogs={dogs}
                                        states={state}
                                        setStates={setState}
                                        order={order}
                                        setOrder={setOrder}/>
                                    <TemperamentsSelect 
                                        dogs={dogs}
                                        states={state}
                                        setStates={setState}/> 
                                </div>
                            </div>            
                            <Paginated
                                dogsToShow={dogsToShow}
                                order={order}/>
                        </div>}
            </div>
        );
    };


export default Dogs;