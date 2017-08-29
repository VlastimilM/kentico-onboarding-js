import * as React from 'react';

export const Spinner: React.StatelessComponent = () => (
  <div>
    <img className="spinner" src="spinner.gif" />
  </div>
);

Spinner.displayName = 'Spinner';
