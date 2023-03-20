import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import SportsList from './SportsList';

test('renders main page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Please enable geolocation/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders a list of sports', async () => {
  
  const { getByText } = render(
    <SportsList
      category="running"
      location={{ coords: { longitude: 1, latitude: 1 } }}
    />
  );
  
  await waitFor(() => getByText('Shooting'));
  await waitFor(() => getByText('Triathlon'));
  
  expect(getByText('Shooting')).toBeInTheDocument();
  expect(getByText('Triathlon')).toBeInTheDocument();
});