import './App.css';
import { Route } from 'react-router-dom';
import Dogs from './components/Dogs/Dogs';

function App() {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
      <Route exact path='/' component={Dogs} />
    </div>
  );
};

export default App;
