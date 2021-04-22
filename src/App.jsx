import PokemonList from "./pages/PokemonList";
import MyPokemonList from "./pages/MyPokemonList";
import PokemonDetail from "./pages/PokemonDetail";
import Navbar from "./components/Navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MyPokemonContext from "./context/MyPokemonContext";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Global, css } from "@emotion/react";

const client = new ApolloClient({
  uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  cache: new InMemoryCache(),
});

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
    <ApolloProvider client={client}>
      <MyPokemonContext.Provider
        value={{ myPokemon: myPokemon, setMyPokemon: setMyPokemon }}
      >
        <Global
          styles={css`
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
              font-family: "Lato", sans-serif;
            }
            .loading,
            .error {
              display: flex;
              justify-content: center;
              padding: 10rem 0;
              font-size: 2rem;
              font-weight: bold;
            }
          `}
        />
        <Navbar />
        <div className="App">
          <Switch>
            <Route path="/detail/:id">
              <PokemonDetail />
            </Route>
            <Route path="/my-pokemon">
              <MyPokemonList />
            </Route>
            <Route path="/pokedex">
              <PokemonList />
            </Route>
            <Redirect from="/" to="/pokedex" />
          </Switch>
        </div>
      </MyPokemonContext.Provider>
    </ApolloProvider>
  );
}

export default App;
