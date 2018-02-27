import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./Nav.css"

const Nav = () => (
    <div className="app-nav">
        <div className="nav-title">
            <span className="fifo-red">FIFO</span><span className="lifo-blue">LIFO</span>
        </div>
        <div>
            <Link to="/">Home</Link>
            <Link to="/edit">Edit</Link>
            <Link to="/game">Game</Link>
            <Link to="/stats">Stats</Link>
        </div>
    </div>
  );

export default Nav;