import type { Parameters, Preview, Decorator } from "@storybook/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "../src/components/providers/ThemeProvider";
import React from "react";
import { store } from "../src/store";

export const decorators: Decorator[] = [
    (Story) => (
        <ThemeProvider>
            <Provider store={store}>
                <Story />
            </Provider>
        </ThemeProvider>
    ),
];

export const parameters: Parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
