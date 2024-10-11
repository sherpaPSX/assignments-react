import { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button";

const meta = {
    title: "Button",
    component: Button,
    argTypes: {
        variant: {
            control: { type: "select" },
            options: ["primary", "success", "danger"],
        },
    },
} as Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: "Button",
    },
};

export const Primary: Story = {
    args: {
        variant: "primary",
        children: "Primary button",
    },
};

export const Success: Story = {
    args: {
        variant: "success",
        children: "Success button",
    },
};

export const Danger: Story = {
    args: {
        variant: "danger",
        children: "Danger button",
    },
};
