// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { renderRoute } from './setup.tsx'

describe('Loading the home page', () => {
  it('shows heading', async () => {
    const screen = renderRoute('/')
    const header = await screen.findByRole('heading')

    expect(header).toBeVisible()
  })
})
