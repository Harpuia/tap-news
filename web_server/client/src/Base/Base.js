// wrap App component in Base


import React, { PropTypes } from 'react';
import Auth from '../Auth/Auth';
const Base = ({ children }) => (

    <div>
        <nav className="nav-bar indigo lighten-1">
            <div className="nav-wrapper">
                <a href="/" className="brand-logo">&nbsp;&nbsp;Tap News</a>
                <ul id="nav-mobile" className="right">
                    {/*if authed (this is JSX syntax, not html5)*/}
                    {Auth.isUserAuthenticated() ?
                        (<div>
                            <li>{Auth.getEmail()}</li>
                            <li><a href="/logout">Log out</a></li>
                        </div>)
                        /*if not authed*/
                        :
                        (<div>
                            <li><a href="/login">Log in</a></li>
                            <li><a href="/signup">Sign up</a></li>
                        </div>)
                    }
                </ul>
            </div>
        </nav>
        <br/>
        {children}
    </div>
);

//must pass children to use this component
Base.propTypes = {
    children: PropTypes.object.isRequired
};

export default Base;
