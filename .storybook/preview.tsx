import type { Preview } from '@storybook/nextjs-vite'
import '../src/app/globals.css'
import ThemeProvider from '../src/components/ThemeProvider'
import React from 'react'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="bg-white text-slate-800 dark:bg-darkBlue dark:text-grayTone min-h-screen p-8">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export default preview