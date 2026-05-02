import React, { useState } from 'react';
import axios from 'axios';
import {
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';

const API_BASE = 'https://backend-220185214627.us-central1.run.app';

const FakeNews = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(
        `${API_BASE}/fake-news-check`,
        { text }
      );

      setResult(res.data);

    } catch (err) {
      console.error('Fake news check error:', err);

      setResult({
        classification: 'Error',
        explanation: 'Server unavailable. Please try again later.'
      });

    } finally {
      setLoading(false);
    }
  };

  const getIcon = (classification) => {
    if (classification === 'Likely True') {
      return <CheckCircle size={32} color="var(--success)" />;
    }

    if (classification === 'Likely False') {
      return <AlertTriangle size={32} color="var(--error)" />;
    }

    return <HelpCircle size={32} color="var(--primary)" />;
  };

  return (
    <div>
      <h2 className="page-title">AI Fake News Detector</h2>

      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <ShieldAlert size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />

        <p style={{ color: 'var(--secondary-text)', marginBottom: '2rem' }}>
          Paste any suspicious message to verify its authenticity using AI.
        </p>

        <form onSubmit={handleCheck} style={{ marginBottom: '2rem' }}>
          <textarea
            className="form-control"
            rows="6"
            placeholder="Paste news, claim, or message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ marginBottom: '1rem', resize: 'vertical' }}
            required
          />

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify Content'}
          </button>
        </form>

        {result && (
          <div
            className="card"
            style={{
              textAlign: 'left',
              borderLeft: `4px solid ${
                result.classification === 'Likely True'
                  ? 'var(--success)'
                  : result.classification === 'Likely False'
                  ? 'var(--error)'
                  : 'var(--primary)'
              }`
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}
            >
              {getIcon(result.classification)}
              <h3 style={{ margin: 0 }}>{result.classification}</h3>
            </div>

            <p style={{ color: 'var(--secondary-text)' }}>
              {result.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FakeNews;