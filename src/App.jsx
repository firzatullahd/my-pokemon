import "./styles/App.scss";
import PokemonList from "./pages/PokemonList";
import MyPokemonList from "./pages/MyPokemonList";
import PokemonDetail from "./pages/PokemonDetail";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

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
    <div className="App">
      <Navbar />
      <Switch>
        <Route
          path="/detail/:id"
          render={(props) => (
            <PokemonDetail
              myPokemon={myPokemon}
              setMyPokemon={setMyPokemon}
              {...props}
            />
          )}
        />
        <Route
          path="/my-pokemon"
          render={(props) => (
            <MyPokemonList
              myPokemon={myPokemon}
              setMyPokemon={setMyPokemon}
              {...props}
            />
          )}
        />

        <Route path="/">
          <PokemonList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
