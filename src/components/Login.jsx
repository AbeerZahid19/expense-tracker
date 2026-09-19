import { useState } from 'react';
import axios from 'axios';

function Login({ onLoginSuccess, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://expense-tracker-api-woad.vercel.app/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      onLoginSuccess(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>

      {error && <p style={{ color: '#e74c3c' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="btn">Login</button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '12px' }}>
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
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
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default Login;