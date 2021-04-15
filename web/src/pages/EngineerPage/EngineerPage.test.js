import { render } from '@redwoodjs/testing'

import EngineerPage from './EngineerPage'

describe('EngineerPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EngineerPage />)
    }).not.toThrow()
  })
})
