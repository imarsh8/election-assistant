import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VotingGuide = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await axios.get(
        'https://backend-220185214627.us-central1.run.app/faqs'
      );

      setFaqs(Array.isArray(res.data) ? res.data : []);

    } catch (err) {
      console.error('Failed to fetch faqs', err);
      setError('FAQ service is currently unavailable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="page-title">Voting Guide</h2>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* STEPS CARD */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>
            Step-by-Step Voting Process
          </h3>

          <ol
            style={{
              paddingLeft: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            <li><strong>Check your name:</strong> Verify your name in electoral roll.</li>
            <li><strong>Find your booth:</strong> Locate your polling station.</li>
            <li><strong>Verify identity:</strong> Show EPIC or valid ID proof.</li>
            <li><strong>Mark attendance:</strong> Finger ink + register signing.</li>
            <li><strong>Cast vote:</strong> Press EVM button for your candidate.</li>
          </ol>
        </div>

        {/* FAQ SECTION */}
        <h3 style={{ marginBottom: '1rem', marginTop: '2rem' }}>
          Frequently Asked Questions
        </h3>

        {loading && (
          <p style={{ color: 'var(--secondary-text)' }}>
            Loading FAQs...
          </p>
        )}

        {error && (
          <div
            style={{
              padding: '10px',
              background: '#fee2e2',
              color: '#991b1b',
              borderRadius: '6px',
              marginBottom: '1rem'
            }}
          >
            {error}
          </div>
        )}

        {!loading && faqs.length === 0 && !error && (
          <p style={{ color: 'var(--secondary-text)' }}>
            No FAQs available right now.
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => (
            <div key={faq.id || idx} className="card">
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                {faq.question}
              </h4>
              <p style={{ color: 'var(--secondary-text)' }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default VotingGuide;