import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(
        'https://backend-220185214627.us-central1.run.app/login',
        { email, password }
      );

      // Save token
      localStorage.setItem('token', res.data.token);

      // FIX: backend does NOT send user, so avoid crash
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }

      navigate('/chat');
      window.location.reload();

    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '420px', margin: '0 auto' }}>

      <h2 className="page-title">Welcome Back</h2>

      {/* ERROR MESSAGE */}
      {error && (
        <div
          className="error-message"
          style={{
            marginBottom: '1rem',
            padding: '10px',
            background: '#fee2e2',
            color: '#991b1b',
            borderRadius: '6px',
            fontSize: '0.9rem'
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>

        {/* EMAIL */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '1rem' }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* SIGNUP LINK */}
      <p
        style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          color: 'var(--secondary-text)'
        }}
      >
        Don't have an account?{' '}
        <Link
          to="/signup"
          style={{ color: 'var(--primary)', fontWeight: '500' }}
        >
          Sign up
        </Link>
      </p>

    </div>
  );
};

export default Login;