import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'

class Navbar extends Component {
    // showSettings (event) {
    //     event.preventDefault();
    // }

    render() {
        return(
        <nav className="sidenav">
            <ul>
            <li><Link to="/">My Money Manager</Link></li>
            <br/><br/><br/>
            <li><Link to="/create">Add Expense</Link></li>
            </ul>
    {/* <Link to="/">My Money Manager</Link> <br/>
    <Link to="/create">Add Expense</Link> */}
        </nav>
        )
    }
}

export default Navbar;