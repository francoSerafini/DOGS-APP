import './App.css';
import { Route } from 'react-router-dom';
import Dogs from './components/Dogs/Dogs';
import Paginated from './components/Paginated/Paginated';

function App() {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
      <Route exact path='/' component={Dogs} />
      <Route exact path='/p' component={Paginated} />
    </div>
  );
};

export default App;
