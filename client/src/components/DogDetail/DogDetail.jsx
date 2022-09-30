import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import  { getDogDetail, addDogFavorite } from '../../actions'
import Navbar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import './DogDetail.css';

const DogDetail = (props) => {

    const dispatch = useDispatch();
    let dog = useSelector(state => state.dogDetail);
    let favoritesDogs = useSelector(state => state.favoritesDogs);
    let id = props.match.params.id;
    const [loading, setLoading] = React.useState(false);
    
    function changeLoading() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    function addFavorite() {
        if(favoritesDogs.find(fav => fav.id === id)) return alert('The dog is already in your favorites');
        dispatch(addDogFavorite({
            name: dog.name,
            id: id
        }));
        return alert('Dog added to Favorites');
    };
    
    React.useEffect(() => { 
    dispatch(getDogDetail(id))
    .catch(err => err.message)
    changeLoading()}, [ dispatch ]); // eslint-disable-line

    return(
        <div key={dog.id} className='dogDetail'>
            <Navbar/>
            {loading ? 
                    <Loading/> :
                        <div className="detail">
                            <div className="info">
                                <h1 className="dogName">{dog.name}</h1>
                                <h3>Height: {dog.height} Cm</h3>
                                <h3>weight: {dog.weight} Kg</h3>
                                <h3>Temperaments: {dog.temperament ? dog.temperament : dog.temperaments}</h3>
                                <h3>Life Span: {dog.life_span} Years</h3>
                            </div>
                            <img src={dog.image} alt='Not Found' className="imageDetail"></img>
                            <button className="heart" type='checkbox' onClick={ addFavorite }>♡</button>
                        </div>}
        </div>   
    );
};

export default DogDetail;