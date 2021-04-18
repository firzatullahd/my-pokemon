import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [next, setNext] = useState(1);

  const getPokemonList = async (input = 0) => {
    let res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${input * 20}&limit=20`
    );
    //console.log(res);
    setPokemonList([...pokemonList, ...res.data.results]);
    setIsLoading(false);
  };

  useEffect(() => {
    getPokemonList();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <h1>PokemonList</h1>
      {!isLoading &&
        pokemonList.map((pokemon, index) => (
          <Link to={`/detail/${pokemon.name}`} key={index}>
            <p>{pokemon.name}</p>
          </Link>
        ))}
      <button
        onClick={() => {
          getPokemonList(next);
          setNext(next + 1);
        }}
      >
        Next
      </button>
    </div>
  );
}
