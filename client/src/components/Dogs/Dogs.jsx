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

    const [order, setOrder] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    let dogs = useSelector(state => state.dogs);
    let filteredDogs = useSelector(state => state.filteredDogs);

    function changeLoading() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 4000);
    };
    
    React.useEffect(() => { 
        dispatch(getDogs())
        dispatch(getTemperaments())
        changeLoading()}, [ dispatch ]);

    let dogsToShow = filteredDogs.length !== 0 ? filteredDogs : dogs;

        return(
            <div className='page'>
                <Navbar/>
                {loading ? 
                    <Loading/> :
                        <div>
                            <div className='filters'> 
                                <SearchBar/>
                                <div className='buttons'> 
                                    <BaseSelect/>  
                                    <ToggleButtons order={order} setOrder={setOrder}/>
                                    <TemperamentsSelect/> 
                                </div>
                            </div>            
                            <Paginated dogsToShow={dogsToShow} order={order}/>
                        </div>}
            </div>
        );
    };


export default Dogs;