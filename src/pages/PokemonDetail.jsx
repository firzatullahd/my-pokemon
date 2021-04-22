import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getTypeImage } from "../utils";
import MyPokemonContext from "../context/MyPokemonContext";
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";

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
  const [pokemonName, setPokemonName] = useState("");
  const location = useLocation();
  const url = location.pathname.substring(8);
  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: { name: url },
  });
  // console.log(data);

  useEffect(() => {
    if (!loading && data) {
      setPokemonName(
        data.pokemon.name.charAt(0).toUpperCase() + data.pokemon.name.slice(1)
      );
    }
  }, [loading, data, pokemonName]);

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
      let name = prompt("Please enter a name for your pokemon", "Pikachu");
      if (name == null) {
        alert("Catch failed..");
        return;
      }
      if (name.length <= 1) {
        alert("pokemon name must contain at least 2 letters");
      }
      const i = myPokemon.findIndex((x) => x.pokemon_name === name);
      if (i <= -1) {
        let newPokemon = {
          ...data.pokemon,
          pokemon_name: name,
          name: pokemonName,
        };
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
    <StyledPokemonDetailPage>
      <StyledTitle>{pokemonName}</StyledTitle>
      <StyledImage
        src={data.pokemon.sprites.front_default}
        alt="pokemon"
        className="pokemon-image"
      />

      <StyledPokemonTypes>
        {data.pokemon.types.map((type, index) => (
          <img
            key={index}
            src={getTypeImage(type.type.name)}
            alt={type.type.name}
            className="pokemon-type"
          />
        ))}
      </StyledPokemonTypes>
      <StyledHeading>{pokemonName} Moves</StyledHeading>
      <StyledPokemonMoves>
        {data.pokemon.moves.slice(0, 5).map((move, index) => (
          <p key={index} className="pokemon-move">
            {move.move.name}
          </p>
        ))}
      </StyledPokemonMoves>
      <StyledButton onClick={catchPokemon}>Catch {pokemonName}</StyledButton>
    </StyledPokemonDetailPage>
  );
}

const StyledPokemonDetailPage = styled.section`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  align-items: center;
  margin-bottom: 3rem;
  padding: 0 0.5rem;
`;

const StyledPokemonTypes = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  justify-content: space-evenly;
  .pokemon-type {
    width: 75px;
    height: auto;
  }
`;
const StyledPokemonMoves = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  .pokemon-move {
    cursor: pointer;
    margin: 0.2rem;
    padding: 0.25rem;
    background: #ebebe9;
    border-radius: 0.5rem;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
    transition: 0.3s;
    &:hover {
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
    }
  }
`;

const StyledTitle = styled.h1`
  font-family: "Roboto", sans-serif;
  margin: 1rem 2rem;
  padding: 0.25rem;
  text-align: center;
  background: #ebebe9;
  border-radius: 0.5rem;
`;

const StyledHeading = styled.h2`
  margin-bottom: 0.5rem;
`;

const StyledButton = styled.button`
  background: transparent;
  width: 75%;
  height: 50px;
  margin-bottom: 1rem;
  border-radius: 1rem;
  border: none;
  transition: 0.3s;
  cursor: pointer;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.5);
  }
  @media (min-width: 720px) {
    width: 25%;
  }
`;

const StyledImage = styled.img`
  width: 50%;
  height: auto;
  @media (min-width: 720px) {
    width: 25%;
  }
`;
