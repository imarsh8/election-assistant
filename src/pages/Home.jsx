import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Users, ShieldAlert, CheckSquare } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <div style={{ textAlign: 'center', margin: '4rem 0' }}>
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: '800',
            color: 'var(--primary)',
            marginBottom: '1rem',
            lineHeight: '1.2'
          }}
        >
          Smart. Unbiased. Secure.
        </h1>

        <p
          style={{
            fontSize: '1.2rem',
            color: 'var(--secondary-text)',
            maxWidth: '650px',
            margin: '0 auto 2rem',
            lineHeight: '1.6'
          }}
        >
          Election Assistant Pro is your AI-powered companion for making informed voting decisions.
          Compare candidates, verify information, and chat with AI — all in one place.
        </p>

        {/* CTA BUTTONS */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <Link
            to="/chat"
            className="btn btn-primary"
            style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}
          >
            Chat with AI
          </Link>

          <Link
            to="/guide"
            className="btn btn-secondary"
            style={{ fontSize: '1.05rem', padding: '0.75rem 1.5rem' }}
          >
            Voting Guide
          </Link>
        </div>
      </div>

      {/* FEATURES GRID */}
      <div
        className="card-grid"
        style={{
          marginTop: '4rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem'
        }}
      >

        {/* CHATBOT */}
        <div className="card">
          <Bot size={40} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3 className="card-title">Neutral AI Chatbot</h3>
          <p>
            Ask anything about elections. Get factual, unbiased and simple explanations instantly.
          </p>
        </div>

        {/* COMPARE */}
        <div className="card">
          <Users size={40} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3 className="card-title">Candidate Comparison</h3>
          <p>
            Compare candidates based on experience, education, and manifesto promises.
          </p>
        </div>

        {/* FAKE NEWS */}
        <div className="card">
          <ShieldAlert size={40} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3 className="card-title">Fake News Detection</h3>
          <p>
            Paste viral messages or claims and let AI verify their authenticity instantly.
          </p>
        </div>

        {/* ELIGIBILITY */}
        <div className="card">
          <CheckSquare size={40} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3 className="card-title">Eligibility Checker</h3>
          <p>
            Quickly check whether you are eligible to vote based on age and citizenship.
          </p>
        </div>

      </div>

      {/* FOOTER NOTE */}
      <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--secondary-text)' }}>
        Built for smarter, unbiased voting decisions 🗳️
      </div>

    </div>
  );
};

export default Home;