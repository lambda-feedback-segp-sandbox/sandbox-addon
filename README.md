# Lambda Feedback Response Area Sandbox Addon

## Installation

First, install the package.

```sh
npm install --save-dev @lambda-feedback/sandbox-addon
```

Then, register it as an addon in `.storybook/main.js`.

```js
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  // ...rest of config
  addons: [
    '@storybook/addon-essentials',
    '@lambda-feedback/sandbox-addon', // 👈 register the addon here
  ],
};

export default config;
```
