import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDogs } from '../../actions';
import { DogsCard }  from '../DogsCard/DogsCard';


const Dogs = (props) => {

    const [state, setState] = React.useState({race: ''});
    const dispatch = useDispatch();
    const dogs = useSelector(state => state.dogs);

   React.useEffect(() => { 
    dispatch(getDogs())
   .catch(err => err.message)}, [ dispatch ]);

   function handleChange(event) {
        setState({
            ...state,
            race: event.target.value });
    };

    function handleSubmit() {
        dispatch(getDogs(state.race));
    };
    
        return(
            <div>
                <div>
                    <form className="race_input" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <input
                                type="text"
                                id="race"
                                autoComplete="off"
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" onClick={ handleSubmit }>SEARCH</button>
                    </form>
                </div>
                { dogs && dogs.map( dog =>
                    <DogsCard
                        key={dog.id}
                        name={dog.name}
                        image={dog.image}
                        temperaments={dog.temperaments}
                        weight={dog.weight}
                    />) 
                }
            </div>
        );
    };


export default Dogs;