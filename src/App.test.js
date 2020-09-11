import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Has "B.Protocol" in the page text', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/B.Protocol/i);
  expect(linkElement).toBeInTheDocument();
});
