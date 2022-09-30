import './App.css';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Dogs from './components/Dogs/Dogs';
import DogDetail from './components/DogDetail/DogDetail';
import CreateDog from './components/CreateDog/CreateDog';
import NotFound from './components/NotFound/NotFound';
import Loading from './components/Loading/Loading';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={Dogs} />
        <Route exact path='/dogDetail/:id' component={DogDetail} />
        <Route exact path='/createDog' component={CreateDog} />
        <Route exact path='/l' component={Loading} />
        <Route exact path='*' component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
   