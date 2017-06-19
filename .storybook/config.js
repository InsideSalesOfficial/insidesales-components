import React from 'react';
import { configure, setAddon } from '@storybook/react';
import chaptersAddon from 'react-storybook-addon-chapters';

const context = require.context('../src/components', true, /.stories.js$/);

setAddon(chaptersAddon);

function loadStories() {
  context.keys().forEach(context)
}

configure(loadStories, module)