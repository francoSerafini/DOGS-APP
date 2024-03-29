import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DogsCard from '../DogsCard/DogsCard.jsx';
import './Paginated.css'

const Paginated = (props) => {

    let [items, setItems] = useState([]);
             
    let [currentPage, setCurrentPage] = useState(0);

    function awaitDogs() {
        setItems([...props.dogsToShow].splice(0, 6));
        setCurrentPage(0);
    };
   
    const totalPages = Math.floor(props.dogsToShow.length / 6) !== 0 ?
        Math.floor(props.dogsToShow.length / 6) + 1 : 1;
    
    const current = (currentPage + 1) > totalPages ?
        1 : currentPage + 1;
            
    function nextHandler() {
        const total = props.dogsToShow.length;
        const nextPage = currentPage + 1;
        const firstIndex = nextPage * 6;
        if(firstIndex >= total) return;
        setItems([...props.dogsToShow].splice(firstIndex, 6));
        setCurrentPage(nextPage);
    }; 
  
    function prevHandler() {
        const prevPage = currentPage - 1;
        if (prevPage < 0) return;
        const firstIndex = prevPage * 6;
        setItems([...props.dogsToShow].splice(firstIndex, 6));
        setCurrentPage(prevPage);
    };

    React.useEffect(() => { awaitDogs() }, [ props.dogsToShow, props.order ]); // eslint-disable-line
   
    function dogsMap() {
            return ( 
                items.length && items.map( dog =>
                    dog.id !== 'notFound' ? 
                        <Link to={`/dogDetail/${dog.id}`} className='link' key={dog.id}>
                            <DogsCard key={dog.id} name={dog.name} image={dog.image} temperaments={dog.temperaments} weight={dog.weight}/>
                        </Link> :
                        <DogsCard key={dog.id} name={dog.name} image={dog.image}/>)
            );
        };
         

    return(
        <div className='paginated'>
            <div className='navigation'>
                <h1>Page {current} of {totalPages}</h1>
                <button onClick={ prevHandler }>Back</button>
                <button onClick={ nextHandler }>Go</button>
            </div>
            <div className='cards'>
                { dogsMap() }
            </div>
        </div>
    )
};

export default Paginated;