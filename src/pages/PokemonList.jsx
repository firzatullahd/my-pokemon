import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

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
  const [gqlVariables, setgqlVariables] = useState({ limit: 18, offset: 0 });
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
  });
  // console.log(data);

  if (error) {
    return <div className="error">ERROR!!</div>;
  }

  return (
    <StyledPokemonListPage>
      <StyledTitle>POKEDEX</StyledTitle>
      <StyledPokemonList>
        {!loading && (
          <>
            {gqlVariables.offset === 0 ? (
              <StyledButton disabled>
                <IoMdArrowDropleft size="1.5rem" />
              </StyledButton>
            ) : (
              <StyledButton
                onClick={() =>
                  setgqlVariables({
                    limit: 18,
                    offset: gqlVariables.offset - 18,
                  })
                }
              >
                <IoMdArrowDropleft size="1.5rem" />
              </StyledButton>
            )}
          </>
        )}

        <div className="pokemon-list">
          {loading && <div className="loading">Loading...</div>}
          {!loading &&
            data.pokemons.results.map((pokemon, index) => (
              <Link to={`/detail/${pokemon.name}`} key={index}>
                <div className="pokemon">
                  <img src={pokemon.image} alt={pokemon.name} />
                </div>
              </Link>
            ))}
        </div>
        {!loading && (
          <StyledButton
            onClick={() =>
              setgqlVariables({ limit: 18, offset: gqlVariables.offset + 18 })
            }
          >
            <IoMdArrowDropright size="1.5rem" />
          </StyledButton>
        )}
      </StyledPokemonList>
      <div></div>
    </StyledPokemonListPage>
  );
}

const StyledTitle = styled.h1`
  font-family: "Roboto", sans-serif;
  position: fixed;
  padding: 0.5rem;
  top: 0;
  border-radius: 0 0 1rem 0;
  background: #4e4949;
  color: white;
`;

const StyledPokemonListPage = styled.section`
  background: #fff;
  display: flex;
  flex-direction: column;
`;

const StyledPokemonList = styled.div`
  padding-top: 2.5rem;
  display: flex;
  .pokemon-list {
    flex: 10;
    margin: 0 0 0.5rem 0;
    display: grid;
    text-align: center;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0;
    margin-bottom: 2.5rem;
  }
`;

const StyledButton = styled.button`
  flex: 1;
  border: none;
  background: transparent;
  cursor: pointer;
`;
