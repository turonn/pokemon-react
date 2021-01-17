import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import About from './About.js'
import Home from './Home.js'
import {useEffect, useState, useMemo} from 'react'

function App() {
  const [pokemon, setPokemon] = useState();
  const [text, setText] = useState();
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
      <div className="p-14">
        <div className="flex flex-col items-center">
          <Link to="/">
            <header className="text-4xl text-yellow-700">Pokemon Picker</header>
          </Link>
        </div>
      </div>

      <div className='w-full flex justify-center'>
        <input 
          type='text' 
          placeholder='search pokemon here' 
          className="mt-10 p-2 border-blue-500 border-2 text-center"
          onChange={($event) => setText($event.target.value)}/>
      </div>

      <Switch>
        <Route path="/about/:slug">
          <About />
        </Route>
        <Route path="/">
          {pokemon &&
          <Home pokemon={pokemon.results}/>}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
