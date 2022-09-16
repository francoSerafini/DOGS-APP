import React, { useState } from 'react';
import { DogsCard } from '../DogsCard/DogsCard';

const Paginated = (props) => {

    
    let dogsToShow = props.dogsToShow;
    let [items, setItems] = useState([...dogsToShow].splice(0, 8));
         
    let [currentPage, setCurrentPage] = useState(0);
    
    const totalPages = Math.floor(dogsToShow.length/8) !== 0 ?
        Math.floor(dogsToShow.length/8) + 1 : 1;
    
    const current = (currentPage + 1) > totalPages ?
        1 : currentPage + 1;
            
    function nextHandler() {
        const total = dogsToShow.length;
        const nextPage = currentPage + 1;
        const firstIndex = nextPage * 8;
        if(firstIndex >= total) return;
        setItems([...dogsToShow].splice(firstIndex, 8));
        setCurrentPage(nextPage);
    };
  
    function prevHandler() {
        const prevPage = currentPage - 1;
        if (prevPage < 0) return;
        const firstIndex = prevPage * 8;
        setItems([...dogsToShow].splice(firstIndex, 8));
        setCurrentPage(prevPage);
    };


    React.useEffect(() => { prevHandler() }, [ dogsToShow ]);
   
    function dogsMap() {
        if (items.length !== 0) {
            return (
                items.length && items.map( dog =>
                    <DogsCard
                        key={dog.id}
                        name={dog.name}
                        image={dog.image}
                        temperaments={dog.temperaments}
                        weight={dog.weight}
                    />)
            );
        }
        else {
            return(
                dogsToShow && [...dogsToShow].splice(0, 8).map( dog =>
                    <DogsCard
                        key={dog.id}
                        name={dog.name}
                        image={dog.image}
                        temperaments={dog.temperaments}
                        weight={dog.weight}
                    />)
            );
        };
    };

    return(

        <div>

            <h1>Page {current} of {totalPages}</h1>

            <button onClick={ prevHandler }>Back</button>
            <button onClick={ nextHandler }>Go</button>
            
            <div>
                { dogsMap() }
            </div>
        </div>
    )
};

export default Paginated;