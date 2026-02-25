import React, { useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      login(res.data.user, res.data.token);
      window.location.href = `/${res.data.user.role}`;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="form-control mb-2" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="form-control mb-2" />
        <button type="submit" className="btn btn-primary">Login</button>
        {error && <div className="text-danger mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
