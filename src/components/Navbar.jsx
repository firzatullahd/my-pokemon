import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { SiPokemon } from "react-icons/si";
import { CgPokemon } from "react-icons/cg";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">
        <AiFillHome size="2rem" />
      </Link>
      <Link to="/my-pokemon">
        <SiPokemon size="2rem" />
      </Link>
      <Link to="/detail/bulbasaur">
        <CgPokemon size="2rem" />
      </Link>
    </nav>
  );
}
