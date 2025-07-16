import React from 'react';

/**
 * This is a standard React component written in JSX.
 * Notice there are no TypeScript types.
 */
export default function Welcome() {
  return (
    <div style={{ padding: '1rem', margin: '1rem', border: '2px dashed green', backgroundColor: '#f0fff0' }}>
      <h2>Hello from a JSX Component!</h2>
      <p>This component lives in a <code>.jsx</code> file but is used inside a <code>.tsx</code> file.</p>
      <p>You can now create new components like this one without using TypeScript.</p>
    </div>
  );
}
