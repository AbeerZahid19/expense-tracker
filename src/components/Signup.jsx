 import { useState } from 'react';
import axios from 'axios';

function Signup({ onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post( 'https://expense-tracker-api-woad.vercel.app/api/auth/register', {
        name,
        email,
        password,
      });

      alert('Signup successful! Please login.');
      onSwitchToLogin();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleLoginTextClick = () => {
    console.log('Login text clicked!');
    onSwitchToLogin();
  };

  return (
    <div className="card">
      <h2>Sign Up</h2>

      {error && <p style={{ color: '#e74c3c' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn">Sign Up</button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '12px' }}>
        Already have an account?{' '}
        <button
          type="button"
          onClick={handleLoginTextClick}
          style={{
            background: 'none',
            border: 'none',
            color: '#48c6ef',
            cursor: 'pointer',
            textDecoration: 'underline',
            fontSize: '1rem',
            padding: 0,
          }}
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default Signup;