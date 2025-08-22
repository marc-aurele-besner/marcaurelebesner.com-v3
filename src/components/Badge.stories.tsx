import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Badge from './Badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    text: 'New',
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongText: Story = {
  args: {
    text: 'This is a longer badge label to test wrapping',
  },
}