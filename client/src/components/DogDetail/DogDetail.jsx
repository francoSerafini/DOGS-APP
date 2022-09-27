import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import  { getDogDetail } from '../../actions'
import Navbar from "../Navbar/Navbar";
import './DogDetail.css';

const DogDetail = (props) => {

    const dispatch = useDispatch();
    let dog = useSelector(state => state.dogDetail);
    let id = props.match.params.id;
    
    React.useEffect(() => { 
        dispatch(getDogDetail(id))
        .catch(err => err.message)}, [ dispatch ]); // eslint-disable-line

    return(
        <div key={dog.id} className='dogDetail'>
            <Navbar/>
            <div className="detail">
                <div className="info">
                    <h1 className="dogName">{dog.name}</h1>
                    <h3>Height: {dog.height} Cm</h3>
                    <h3>weight: {dog.weight} Kg</h3>
                    <h3>Temperaments: {dog.temperament}</h3>
                    <h3>Life Span: {dog.life_span} Years</h3>
                </div>
                <img src={dog.image} alt='Not Found' className="imageDetail"></img>
            </div>
        </div>   
    );
};

export default DogDetail;