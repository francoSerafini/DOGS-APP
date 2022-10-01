import React from 'react';
import './DogsCard.css';

const DogsCard = (props) => {

    return (
        <div id={props.id} className='card'>
            <h2 id={props.id}>{props.name}</h2>
            <img className='image' src={props.image} alt='Not Found' id={props.id}></img>
            {props.temperaments &&
            <div id={props.id}>
                <h3 id={props.id} >Temperaments: {props.temperaments}</h3>
                <h3 id={props.id}>Weight: {props.weight}Kg</h3>
            </div>
            }
        </div>
    );
};

export default DogsCard;  

  
        
 
