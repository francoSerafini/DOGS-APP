import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Dogs from './components/Dogs/Dogs';
import DogDetail from './components/DogDetail/DogDetail';
import CreateDog from './components/CreateDog/CreateDog';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Dogs} />
      <Route exact path='/dogDetail/:id' component={DogDetail} />
      <Route exact path='/createDog' component={CreateDog} />
    </div>
  );
};

export default App;
