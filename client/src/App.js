import './App.css';
import { Route } from 'react-router-dom';
import Dogs from './components/Dogs/Dogs';
import Temperaments from './components/Temperaments/temperaments';

function App() {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
      <Route exact path='/' component={Dogs} />
      <Route exact path='/t' component={Temperaments} />
    </div>
  );
};

export default App;
