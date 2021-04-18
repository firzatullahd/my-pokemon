import "./styles/App.scss";
import PokemonList from "./pages/PokemonList";
import MyPokemonList from "./pages/MyPokemonList";
import PokemonDetail from "./pages/PokemonDetail";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MyPokemonContext from "./context/MyPokemonContext";

function App() {
  const [myPokemon, setMyPokemon] = useState([]);
  useEffect(() => {
    function loadLocalStorage() {
      let myPokemonStorage;
      if (localStorage.getItem("myPokemonStorage") === null) {
        myPokemonStorage = [];
      } else {
        myPokemonStorage = JSON.parse(localStorage.getItem("myPokemonStorage"));
      }
      setMyPokemon(myPokemonStorage);
    }
    loadLocalStorage();
  }, []);
  return (
    /*
     * utilization of react context is unnecessary.
     * However, it is being utilized to to meet up the competency of tokopedia tech stacks
     */
    <MyPokemonContext.Provider
      value={{ myPokemon: myPokemon, setMyPokemon: setMyPokemon }}
    >
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/detail/:id">
            <PokemonDetail />
          </Route>
          <Route path="/my-pokemon">
            <MyPokemonList />
          </Route>
          <Route path="/">
            <PokemonList />
          </Route>
        </Switch>
      </div>
    </MyPokemonContext.Provider>
  );
}

export default App;
