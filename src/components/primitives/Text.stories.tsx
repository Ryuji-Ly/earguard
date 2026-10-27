import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = { title: 'Primitives/Text', component: Text };
export default meta;
type Story = StoryObj<typeof Text>;

export const Body: Story = { args: { children: 'Normal body text', variant: 'body' } };
export const Display: Story = { args: { children: '97', variant: 'display' } };
export const Title: Story = { args: { children: 'Screen title', variant: 'title' } };
export const Heading: Story = { args: { children: 'Card heading', variant: 'heading' } };
export const Button: Story = { args: { children: 'Button label', variant: 'button' } };
export const Subtitle: Story = { args: { children: 'Secondary, supporting text', variant: 'subtitle' } };
export const Label: Story = { args: { children: 'Badge or field label', variant: 'label' } };
export const Centered: Story = { args: { children: 'Centered text', align: 'center' } };
