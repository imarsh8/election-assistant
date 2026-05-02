import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post(
        'https://backend-220185214627.us-central1.run.app/signup',
        { name, email, password, location }
      );

      // success → go to login
      navigate('/login');

    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.error || 'Signup failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '420px', margin: '0 auto' }}>

      <h2 className="page-title">Create Account</h2>

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

      <form onSubmit={handleSignup}>

        {/* NAME */}
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

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
            placeholder="Create a strong password"
            required
          />
        </div>

        {/* LOCATION */}
        <div className="form-group">
          <label>Location (Optional)</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Haryana"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '1rem' }}
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

      </form>

      {/* LOGIN LINK */}
      <p
        style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          color: 'var(--secondary-text)'
        }}
      >
        Already have an account?{' '}
        <Link
          to="/login"
          style={{ color: 'var(--primary)', fontWeight: '500' }}
        >
          Login
        </Link>
      </p>

    </div>
  );
};

export default Signup;