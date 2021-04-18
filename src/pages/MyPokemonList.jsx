import React from "react";

export default function MyPokemonList({ myPokemon, setMyPokemon }) {
  function deleteMyPokemon(index) {
    let myPokemonStorage = JSON.parse(localStorage.getItem("myPokemonStorage"));
    myPokemonStorage.splice(index, 1);
    localStorage.setItem("myPokemonStorage", JSON.stringify(myPokemonStorage));
    setMyPokemon(myPokemonStorage);
  }

  return (
    <div>
      <h1>MyPokemonList</h1>
      {myPokemon.map((p, index) => (
        <div key={index}>
          <p>
            {p.name}
            {" - "}
            <span>{p.pokemon_name}</span>{" "}
            <button onClick={() => deleteMyPokemon(index)}>Delete</button>
          </p>
        </div>
      ))}
    </div>
  );
}
