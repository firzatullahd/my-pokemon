import React from "react";
import PokemonList, { GET_POKEMONS } from "../pages/PokemonList";

import { render, screen, cleanup } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

afterEach(cleanup);

const mocks = [
  {
    request: {
      query: GET_POKEMONS,
      variables: {
        limit: 2,
        offset: 0,
      },
    },
    result: {
      data: {
        pokemons: { id: 1, name: "bulbasaur" },
      },
    },
  },
];

it("renders loading state", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PokemonList />
    </MockedProvider>
  );

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  expect(screen.getByText(/POKEDEX/i)).toBeInTheDocument();
});
