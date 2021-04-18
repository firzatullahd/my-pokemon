import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { getTypeImage } from "../utils";
import MyPokemonContext from "../context/MyPokemonContext";

export default function PokemonDetail() {
  const { myPokemon, setMyPokemon } = useContext(MyPokemonContext);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});
  const history = useHistory();
  const url = history.location.pathname.substring(8);

  useEffect(() => {
    const getPokemonDetail = async () => {
      let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${url}`);
      setPokemon(res.data);
      setIsLoading(false);
      // console.log(res.data);
    };
    getPokemonDetail();
  }, [url]);

  function saveToLocalStorage(pokemon) {
    let myPokemonStorage;
    if (localStorage.getItem("myPokemonStorage") === null) {
      myPokemonStorage = [];
    } else {
      myPokemonStorage = JSON.parse(localStorage.getItem("myPokemonStorage"));
    }
    myPokemonStorage.push(pokemon);
    localStorage.setItem("myPokemonStorage", JSON.stringify(myPokemonStorage));
  }

  const catchPokemon = () => {
    let isSuccess = Math.floor(Math.random() * 100) > 50;
    if (isSuccess) {
      let pokemonName = prompt(
        "Please enter a name for your pokemon",
        "Pikachu"
      );

      var i = myPokemon.findIndex((x) => x.pokemon_name === pokemonName);
      if (i <= -1) {
        let newVal = { pokemon_name: pokemonName };
        let newPokemon = { ...pokemon, ...newVal };
        setMyPokemon([...myPokemon, newPokemon]);
        saveToLocalStorage(newPokemon);
      } else {
        alert("pokemon has run away, the name given must be unique");
      }
    } else {
      alert("Catch failed..");
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <button onClick={catchPokemon}>Catch</button>
      <h1>{pokemon.name.toUpperCase()}</h1>
      <img src={pokemon.sprites.front_default} alt="pokemon" />
      <h2>Pokemon Types</h2>
      {pokemon.types.map((type, index) => (
        <img
          key={index}
          src={getTypeImage(type.type.name)}
          alt={type.type.name}
        />
      ))}
      <h2>Pokemon Moves</h2>
      {pokemon.moves.map((move, index) => (
        <p key={index}>{move.move.name}</p>
      ))}
    </div>
  );
}
