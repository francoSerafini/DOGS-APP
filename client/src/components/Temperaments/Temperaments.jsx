// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getDogs, getTemperaments } from '../../actions';
// import { DogsCard } from '../DogsCard/DogsCard';

// const Temperaments = (props) => {

//     const [state, setState] = React.useState({filteredDogs: []})
//     const dispatch = useDispatch();
//     const temperaments = useSelector(state => state.temperaments);
//     const dogs = useSelector(state => state.dogs)
    
//     React.useEffect(() => {
//         dispatch(getTemperaments())
//         .catch(err => err.message)
//         dispatch(getDogs())
//         .catch(err => err.message)}, [dispatch]);
    
//     function handleChange(event) {
//         let dogsTemp = dogs.filter(d => d.temperaments && d.temperaments.includes(event.target.value));
//         setState({
//             ...state,
//             filteredDogs: dogsTemp
//         })
//     };
    
//     return(
//         <div>
//             <p>btn temp</p>
//             <select 
//                 name='temperaments' 
//                 id = 'temp'
//                 onChange={handleChange}>
//                 { temperaments && temperaments.map (temp =>
//                     <option value = {temp}>{temp}</option>) }
//             </select>
//             {/* <div>
//                 {state.filteredDogs && state.filteredDogs.map(dog =>
//                     <DogsCard
//                         key={dog.id}
//                         name={dog.name}
//                         image={dog.image}
//                         temperaments={dog.temperaments}
//                         weight={dog.weight}
//                     />)
//                 }
//             </div> */}
//         </div>
//     )
// };

// export default Temperaments;   