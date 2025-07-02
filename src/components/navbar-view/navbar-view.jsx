import React from 'react';
import './navbar-view.scss';

export const NavbarView = ({ user, onLoggedOut }) => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>myFlix</h1>
            </div>
            <div className="navbar-menu">
                {user && (
                    <>
                        <span className="navbar-welcome">Welcome, {user.username}</span>
                        <button className="navbar-button" onClick={onLoggedOut}>Sign Out</button>
                    </>
                )}
            </div>
        </nav>
    );
};