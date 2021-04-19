import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { getTypeImage } from "../utils";
import MyPokemonContext from "../context/MyPokemonContext";
import { useQuery, gql } from "@apollo/client";

const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`;

export default function PokemonDetail() {
  const { myPokemon, setMyPokemon } = useContext(MyPokemonContext);
  const history = useHistory();
  const url = history.location.pathname.substring(8);
  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: { name: url },
  });

  function saveMyPokemon(pokemon) {
    let myPokemonStorage;
    if (localStorage.getItem("myPokemonStorage") === null) {
      myPokemonStorage = [];
    } else {
      myPokemonStorage = JSON.parse(localStorage.getItem("myPokemonStorage"));
    }
    myPokemonStorage.push(pokemon);
    localStorage.setItem("myPokemonStorage", JSON.stringify(myPokemonStorage));
    setMyPokemon(myPokemonStorage);
  }

  const catchPokemon = () => {
    const isSuccess = Math.floor(Math.random() * 100) > 50;
    if (isSuccess) {
      let pokemonName = prompt(
        "Please enter a name for your pokemon",
        "Pikachu"
      );

      var i = myPokemon.findIndex((x) => x.pokemon_name === pokemonName);
      if (i <= -1) {
        let newPokemon = { ...data.pokemon, pokemon_name: pokemonName };
        saveMyPokemon(newPokemon);
      } else {
        alert("pokemon has run away, the name given must be unique");
      }
    } else {
      alert("Catch failed..");
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">ERROR!!</div>;
  }

  return (
    <div>
      <button onClick={catchPokemon}>Catch</button>
      <h1>{data.pokemon.name.toUpperCase()}</h1>
      <img src={data.pokemon.sprites.front_default} alt="pokemon" />
      <h2>Pokemon Types</h2>
      {data.pokemon.types.map((type, index) => (
        <img
          key={index}
          src={getTypeImage(type.type.name)}
          alt={type.type.name}
        />
      ))}
      <h2>Pokemon Moves</h2>
      {data.pokemon.moves.map((move, index) => (
        <p key={index}>{move.move.name}</p>
      ))}
    </div>
  );
}
