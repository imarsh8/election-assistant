import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Vote, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <Vote size={28} />
        <span>Election Assistant Pro</span>
      </Link>
      
      <div className="navbar-links">
        <Link to="/" className={`nav-link \${isActive('/')}`}>Home</Link>
        <Link to="/guide" className={`nav-link \${isActive('/guide')}`}>Voting Guide</Link>
        <Link to="/eligibility" className={`nav-link \${isActive('/eligibility')}`}>Eligibility</Link>
        <Link to="/compare" className={`nav-link \${isActive('/compare')}`}>Candidates</Link>
        <Link to="/fake-news" className={`nav-link \${isActive('/fake-news')}`}>Fact Check</Link>
        
        {token ? (
          <>
            <Link to="/chat" className={`nav-link \${isActive('/chat')}`}>AI Chat</Link>
            <span style={{ color: 'var(--secondary-text)', marginLeft: '1rem' }}>
              Hi, {user?.name}
            </span>
            <button onClick={handleLogout} className="btn btn-secondary">
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
