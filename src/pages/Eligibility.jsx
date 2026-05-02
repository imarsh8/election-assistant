import React, { useState } from 'react';
import axios from 'axios';
import { CheckSquare } from 'lucide-react';

const API_BASE = 'https://backend-220185214627.us-central1.run.app';

const Eligibility = () => {
  const [age, setAge] = useState('');
  const [citizenship, setCitizenship] = useState('Indian');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_BASE}/eligibility`,
        {
          age: parseInt(age),
          citizenship
        }
      );

      setResult(res.data);

    } catch (err) {
      console.error('Eligibility check failed', err);
      setResult({
        eligible: false,
        reason: 'Server error. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="page-title">Voter Eligibility Checker</h2>

      <div className="form-container" style={{ marginTop: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <CheckSquare size={48} color="var(--primary)" />
        </div>

        <form onSubmit={handleCheck}>
          <div className="form-group">
            <label>Age (in years)</label>
            <input
              type="number"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Citizenship</label>
            <select
              className="form-control"
              value={citizenship}
              onChange={(e) => setCitizenship(e.target.value)}
            >
              <option value="Indian">Indian</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Checking...' : 'Check Eligibility'}
          </button>
        </form>

        {result && (
          <div
            style={{
              marginTop: '2rem',
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor: result.eligible ? '#dcf8c6' : '#fee2e2',
              color: result.eligible ? '#166534' : '#991b1b',
              border: `1px solid ${result.eligible ? '#bbf7d0' : '#fecaca'}`
            }}
          >
            <h4 style={{ marginBottom: '0.5rem' }}>
              {result.eligible ? 'Eligible' : 'Not Eligible'}
            </h4>
            <p>{result.reason}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Eligibility;