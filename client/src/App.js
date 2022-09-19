import './App.css';
import { Route } from 'react-router-dom';
import Dogs from './components/Dogs/Dogs';
import DogDetail from './components/DogDetail/DogDetail';
import CreateDog from './components/CreateDog/CreateDog';

function App() {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
      <Route exact path='/' component={Dogs} />
      <Route exact path='/dogDetail/:id' component={DogDetail} />
      <Route exact path='/f' component={CreateDog} />
    </div>
  );
};

export default App;
