import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the heading and reports API status', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: true } as Response)),
    );

    render(<App />);

    expect(screen.getByRole('heading', { name: 'Hitesh' })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('API status: ok')).toBeInTheDocument());
  });
});
