import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return(
        <nav className="nav">
            <ul>
            <li><Link to="/">My Playlist</Link></li>
            <li><Link to="/create">Add Expense</Link></li>
            </ul>
        </nav>
        )
    }
}

export default Navbar;