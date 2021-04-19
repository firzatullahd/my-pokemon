import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        name
        image
      }
    }
  }
`;

export default function PokemonList() {
  const [gqlVariables, setgqlVariables] = useState({ limit: 20, offset: 0 });
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
  });
  console.log(data);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">ERROR!!</div>;
  }

  return (
    <div>
      <h1>PokemonList</h1>
      {!loading &&
        data.pokemons.results.map((pokemon, index) => (
          <Link to={`/detail/${pokemon.name}`} key={index}>
            <div className="pokemon">
              <img src={pokemon.image} alt={pokemon.name} />
              <p>{pokemon.name}</p>
            </div>
          </Link>
        ))}
      {gqlVariables.offset !== 0 ? (
        <button
          onClick={() =>
            setgqlVariables({ limit: 20, offset: gqlVariables.offset - 20 })
          }
        >
          Previous
        </button>
      ) : null}

      <button
        onClick={() =>
          setgqlVariables({ limit: 20, offset: gqlVariables.offset + 20 })
        }
      >
        Next
      </button>
    </div>
  );
}
