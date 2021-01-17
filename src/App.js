import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import About from './About.js'
import Home from './Home.js'
import {useEffect, useState} from 'react'

function App() {
  const [pokemon, setPokemon] = useState();
  useEffect( () => {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0")
    .then((res) => res.json())
    .then((data) => {
      const results = data.results.map((pokemon, idx) => {
        return {...pokemon, idx: idx + 1 };
      });
      setPokemon({...data, results});
    });
  })

  return (
    <Router>
      <div className="App">
          <h3 className="text-2xl">Hello World</h3>
      </div>
      {pokemon &&
      <Home pokemon={pokemon.results}/>}
      <Switch>
        <Route path="/about/:slug">
          <About />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
