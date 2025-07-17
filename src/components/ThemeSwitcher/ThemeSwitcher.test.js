import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ThemeSwitcher from './index';

test('renders theme switcher and toggles theme', () => {
  const { getByText } = render(<ThemeSwitcher />);
  const button = getByText(/Switch to Dark Theme/i);
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(getByText(/Switch to Light Theme/i)).toBeInTheDocument();

  fireEvent.click(button);
  expect(getByText(/Switch to Dark Theme/i)).toBeInTheDocument();
});
