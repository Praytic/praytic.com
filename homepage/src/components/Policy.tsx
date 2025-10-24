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

  // Convert heading text to URL-friendly ID
  const slugify = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

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
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({children}) => <h1 id={slugify(String(children))}>{children}</h1>,
            h2: ({children}) => <h2 id={slugify(String(children))}>{children}</h2>,
            h3: ({children}) => <h3 id={slugify(String(children))}>{children}</h3>,
            h4: ({children}) => <h4 id={slugify(String(children))}>{children}</h4>,
            h5: ({children}) => <h5 id={slugify(String(children))}>{children}</h5>,
            h6: ({children}) => <h6 id={slugify(String(children))}>{children}</h6>,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Policy;