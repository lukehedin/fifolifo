import React, { Component } from 'react';
import { Link } from "react-router-dom";

const Nav = () => (
    <div className="app-nav">
        Fifolifo
        <div>
            <Link to="/">Home</Link>
            <Link to="/edit">Edit</Link>
            <Link to="/game">Game</Link>
            <Link to="/stats">Stats</Link>
        </div>
    </div>
  );

export default Nav;