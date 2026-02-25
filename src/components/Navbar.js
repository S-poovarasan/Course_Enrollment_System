import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Course System</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {user && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href={`/${user.role}`}>Dashboard</a>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger ms-2" onClick={logout}>Logout</button>
                </li>
              </>
            )}
            {!user && (
              <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
