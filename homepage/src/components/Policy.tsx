import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../styles/Policy.css';

interface PolicyProps {
  policyFile: string;
  title: string;
}

const Policy: React.FC<PolicyProps> = ({ policyFile, title }) => {
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/policies/${policyFile}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load policy document');
        }
        return response.text();
      })
      .then((text) => {
        // Remove frontmatter (YAML between --- markers)
        const content = text.replace(/^---[\s\S]*?---\n/, '');
        setMarkdown(content);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [policyFile]);

  if (loading) {
    return (
      <div className="policy-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="policy-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="policy-container">
      <div className="policy-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Policy;