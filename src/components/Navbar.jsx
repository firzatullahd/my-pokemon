import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import pokemonLogo from "../img/pokemon-logo.png";
import pokeball from "../img/pokeball.png";

export default function Navbar() {
  const location = useLocation();
  const url = location.pathname;
  return (
    <StyledNav>
      {url === "/pokedex" ? (
        ""
      ) : (
        <Link to="/pokedex">
          <button>
            <img src={pokemonLogo} alt="pokedex" className="pokedex" />
            Pokédex
          </button>
        </Link>
      )}

      {url === "/my-pokemon" ? (
        ""
      ) : (
        <Link to="/my-pokemon">
          <button>
            <img src={pokeball} alt="pokeball" />
            Pokemon
          </button>
        </Link>
      )}
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  background: #ffffff;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0px -15px 30px -5px rgba(0, 0, 0, 0.2);
  button {
    border: none;
    padding: 0.3rem;
    background: transparent;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.5rem;
  }
  img {
    width: 30px;
    height: 30px;
  }
  .pokedex {
    width: 90px;
  }
`;
