import React, { useContext, useState } from "react";
import MyPokemonContext from "../context/MyPokemonContext";
import styled from "@emotion/styled";

export default function MyPokemonList() {
  const { myPokemon, setMyPokemon } = useContext(MyPokemonContext);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  // console.log(myPokemon);

  function deleteMyPokemon(pokemon) {
    let myPokemonStorage = JSON.parse(localStorage.getItem("myPokemonStorage"));
    const toBeDeleted = myPokemonStorage.filter(
      (p) => p.pokemon_name === pokemon.pokemon_name
    )[0];
    const index = myPokemonStorage.indexOf(toBeDeleted);
    myPokemonStorage.splice(index, 1);

    localStorage.setItem("myPokemonStorage", JSON.stringify(myPokemonStorage));
    setMyPokemon(myPokemonStorage);

    setSelectedPokemon(null);
  }
  function handleSelectPokemon(e) {
    const selected = myPokemon.filter(
      (p) => p.sprites.front_default === e.target.src
    )[0];
    setSelectedPokemon({ ...selected });
  }

  return (
    <StyledMyPokemonListPage>
      <StyledTitle>Caught Pokemon</StyledTitle>
      {selectedPokemon && (
        <StyledSelectedPokemon>
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.pokemon_name}
          />
          <div className="selected-pokemon-data">
            <p className="selected-pokemon-data-name">{selectedPokemon.name}</p>
            <p className="selected-pokemon-data-pokemon-name">
              {selectedPokemon.pokemon_name}
            </p>
            <StyledButton
              className="selected-pokemon-data-delete"
              onClick={() => deleteMyPokemon(selectedPokemon)}
            >
              Release {selectedPokemon.pokemon_name}
            </StyledButton>
          </div>
        </StyledSelectedPokemon>
      )}

      <StyledMyPokemonList>
        {myPokemon.map((p, index) => (
          <img
            src={p.sprites.front_default}
            key={index}
            alt={index}
            onClick={(e) => {
              handleSelectPokemon(e);
            }}
          />
        ))}
      </StyledMyPokemonList>
    </StyledMyPokemonListPage>
  );
}

const StyledMyPokemonListPage = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  padding: 0 0.5rem;
`;

const StyledTitle = styled.h1`
  margin: 1rem 2rem;
  padding: 0.25rem;
  text-align: center;
  border-radius: 0.5rem;
  background: #4e4949;
  color: white;
`;

const StyledMyPokemonList = styled.div`
  text-align: center;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0;
  img {
    cursor: pointer;
  }
`;

const StyledSelectedPokemon = styled.div`
  display: flex;
  img {
    width: 150px;
    height: auto;
  }
  .selected-pokemon-data {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    .selected-pokemon-data-name {
      background: #1a1a1a;
      color: white;
      padding: 0.5rem 1rem 0.2rem 1rem;
      border-radius: 0.5rem 0.5rem 0 0;
    }
    .selected-pokemon-data-pokemon-name {
      background: #f4f0ff;
      padding: 0.2rem 1rem 0.5rem 1rem;
      border-radius: 0 0 0.5rem 0.5rem;
    }
  }
`;

const StyledButton = styled.button`
  margin-top: 1rem;
  background: transparent;
  width: 120px;
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
`;
