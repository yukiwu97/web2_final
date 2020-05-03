import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

class Navbar extends Component {

    render() {
        return(
        <nav className="sidenav">
        <div>
            <h3><b>MONEY <br/>MANGER</b></h3>
            <ul>
            <br/><br/><br/>
            <div className="navItem"><li><Link to="/"><AccountBalanceRoundedIcon style={{ fontSize: 65}}/></Link></li></div>
            <br/><br/><br/>
            <div className="navItem"><li><Link to="/create"><AddCircleRoundedIcon style={{ fontSize: 65}}/></Link></li></div>
            </ul>
        </div>
        </nav>
        )
    }
}

export default Navbar;