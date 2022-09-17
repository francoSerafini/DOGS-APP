import './App.css';
import { Route } from 'react-router-dom';
import Dogs from './components/Dogs/Dogs';
import DogDetail from './components/DogDetail/DogDetail';

function App() {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
      <Route exact path='/' component={Dogs} />
      <Route exact path='/dogDetail/:id' component={DogDetail} />
    </div>
  );
};

export default App;
