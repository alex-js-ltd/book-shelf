import React, { ReactElement } from 'react'
import { render as rtlRender } from '@testing-library/react'
import { AppProviders } from 'context'

const render = (ui: ReactElement, { ...options } = {}) => {
  return rtlRender(ui, { wrapper: AppProviders, ...options })
}

export * from '@testing-library/react'
// override React Testing Library's render with our own
export { render }
