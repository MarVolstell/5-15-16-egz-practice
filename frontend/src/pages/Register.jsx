import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import '../styles/user/user.scss';
import { createUser } from '../services/authServices';

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Registracija';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Minimali klientinė validacija
    if (!name.trim() || !password.trim() || !passwordConfirm.trim()) {
      setError('Prašome užpildyti visus laukus.');
      return;
    }

    if (password.length < 6) {
      setError('Slaptažodis turi būti bent 6 simboliai.');
      return;
    }
    if(password !== passwordConfirm){
        setError('Slaptažodžiai turi būti vienodi.');
        return;
    }

    const userData = { name, password, passwordConfirm };
      console.log(userData)
    try {
      await createUser(userData);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Registracija</h2>
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
          <label htmlFor="password">Pakartok Slaptažodį</label>
          <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              className="input"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
          />
        <button type="submit" className='btn-submit'>
          Registruotis
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      <div className="form-footer">
        Jau turite paskyrą? <Link to="/login">Prisijunkite</Link>
      </div>
    </div>
  );
}

export default Register;