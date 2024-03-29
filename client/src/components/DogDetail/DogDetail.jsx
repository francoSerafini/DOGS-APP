import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDogDetail, addDogFavorite, removeDogFavorite } from "../../actions";
import Navbar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import "./DogDetail.css";

const DogDetail = (props) => {
  const dispatch = useDispatch();
  let dog = useSelector((state) => state.dogDetail);
  let favoritesDogs = useSelector((state) => state.favoritesDogs);
  let id = props.match.params.id;
  const [loading, setLoading] = React.useState(false);
  const [heart, setHeart] = React.useState("");

  function changeLoading() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  function addFavorite() {
    if (favoritesDogs.find((fav) => fav.id === id)) {
      const repeatedDog = favoritesDogs.find((fav) => fav.id === id);
      dispatch(removeDogFavorite(repeatedDog));
      return alert("Dog removed from Favorites");
    }
    dispatch(
      addDogFavorite({
        name: dog.name,
        id: id,
      })
    );
    setHeart("fav");
    return alert("Dog added to Favorites");
  }

  React.useEffect(() => {
    dispatch(getDogDetail(id));
    favoritesDogs.some((dog) => dog.id === id)
      ? setHeart("fav")
      : setHeart("notFav");
    changeLoading();
  }, [dispatch]); // eslint-disable-line

  React.useEffect(() => {
    favoritesDogs.some((dog) => dog.id === id)
      ? setHeart("fav")
      : setHeart("notFav");
  }, [favoritesDogs]); // eslint-disable-line

  return (
    <div key={dog.id} className="dogDetail">
      <Navbar />
      {loading || !dog.name ? (
        <Loading />
      ) : (
        <div className="detail">
          <div className="info">
            <h1 className="dogName">{dog.name}</h1>
            <h3>Height: {dog.height} Cm</h3>
            <h3>weight: {dog.weight} Kg</h3>
            <h3>Temperaments: {dog.temperaments}</h3>
            <h3>Life Span: {dog.life_span}</h3>
          </div>
          <img src={dog.image} alt="Not Found" className="imageDetail"></img>
          <button className={heart} onClick={addFavorite}>
            ❤
          </button>
        </div>
      )}
    </div>
  );
};

export default DogDetail;
