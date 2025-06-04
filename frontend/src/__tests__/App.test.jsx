import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders login header', () => {
  render(<App />)
  expect(screen.getAllByText(/Login/).length).toBeGreaterThan(0)
})
