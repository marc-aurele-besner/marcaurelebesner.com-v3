import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React from 'react'
import GlassCard from './GlassCard'

const meta = {
  title: 'Components/GlassCard',
  component: GlassCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    className: 'p-8 max-w-md',
  },
} satisfies Meta<typeof GlassCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <GlassCard {...args}>Simple content</GlassCard>,
}

export const WithCustomContent: Story = {
  render: (args) => (
    <GlassCard {...args}>
      <h3 className="text-lg font-semibold mb-2">Glass Card</h3>
      <p className="text-sm opacity-90">
        This card uses a glassmorphism effect with Tailwind and subtle glow on
        hover.
      </p>
    </GlassCard>
  ),
}