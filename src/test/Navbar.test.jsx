import React from "react";
import Navbar from "../components/Navbar";

import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import "@testing-library/jest-dom/extend-expect";

let history;
beforeEach(() => {
  history = createMemoryHistory();
});

test("Navbar on /pokedex", () => {
  history.push("/pokedex");
  render(
    <Router history={history}>
      <Navbar />
    </Router>
  );

  expect(screen.getByText(/Pokemon/i)).toBeInTheDocument();
});

test("Navigate to /pokedex", () => {
  history.push("/my-pokemon");
  render(
    <Router history={history}>
      <Navbar />
    </Router>
  );
  expect(screen.getByText(/Pokédex/i)).toBeInTheDocument();
  const element = screen.getByTestId("pokedex");
  fireEvent.click(element);
  expect(screen.getByText(/Pokemon/i)).toBeInTheDocument();
});

test("Navigate to /my-pokemon", () => {
  history.push("/pokedex");
  render(
    <Router history={history}>
      <Navbar />
    </Router>
  );
  expect(screen.getByText(/Pokemon/i)).toBeInTheDocument();
  const element = screen.getByTestId("pokemon");
  fireEvent.click(element);
  expect(screen.getByText(/Pokédex/i)).toBeInTheDocument();
});

test("Navbar on /my-pokemon", () => {
  history.push("/my-pokemon");
  render(
    <Router history={history}>
      <Navbar />
    </Router>
  );

  expect(screen.getByText(/Pokédex/i)).toBeInTheDocument();
});

test("Navbar on /detail/:id", () => {
  history.push("/detail/bulbasaur");
  render(
    <Router history={history}>
      <Navbar />
    </Router>
  );

  expect(screen.getByText(/Pokédex/i)).toBeInTheDocument();
  expect(screen.getByText(/Pokemon/i)).toBeInTheDocument();
});
