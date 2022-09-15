import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDogs } from '../../actions';
import { DogsCard } from '../DogsCard/DogsCard';

const dogsPerPage = 8;

const Paginated = () => {

    const dogs = useSelector(state => state.dogs);;

    const dispatch = useDispatch();

    const [items, setItems] = useState([]);

    React.useEffect(() => { 
        dispatch(getDogs())
        .catch(err => err.message)
        }, [ dispatch ]);

    let perro = AllDogs()
    console.log(perro)
    
       
    function nextHandler() {
        console.log('next');
        console.log(items)
    };

    function prevHandler() {
        console.log('prev')
    };

    return(

        <div>

            <h1>Pagina: {0}</h1>

            <button onClick={ nextHandler }>Next</button>
            <button onClick={ prevHandler }>Prev</button>

            <div>
                {/* {state.dogToShow && state.dogToShow.map( dog =>
                    <DogsCard
                        key={dog.id}
                        name={dog.name}
                        image={dog.image}
                        temperaments={dog.temperaments}
                        weight={dog.weight}
                    />)} */}
            </div>
        </div>
    )
};

export default Paginated;