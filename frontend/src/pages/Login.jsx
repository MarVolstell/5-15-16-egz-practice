import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/user/user.scss';
import { login } from '../services/authServices';

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Prisijungimas';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    if (!name.trim() || !password.trim()) {
      setError('Prašome užpildyti visus laukus.');
      return;
    }

    try {
      await login(name, password);
      navigate('/');
    } catch (err) {
        setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Prisijungimas</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="username">Vartotojo vardas</label>
        <input
          type="text"
          id="username"
          name="username"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="password">Slaptažodis</label>
        <input
          type="password"
          id="password"
          name="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className='btn-submit'>
          Prisijungti
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      <div className="form-footer">
        Neturite paskyros? <Link to="/register">Užsiregistruokite</Link> <br />
      </div>
    </div>
  );
}

export default Login;