# InsideSales.com UI Component Library

A set of UI components built with React and Styled-Components used on products by InsideSales.com.

```
npm install -S insidesales-components
```

## Docs
View the documentation at [http://austinknight.net/ui-components/](http://austinknight.net/ui-components/) for more info on using `insidesales-components`.

Check out the [components Storybook](http://austinknight.net/ui-components/storybook) to use examples of the components.

## Development

### Contributing

1. Fork, then clone: `git clone https://github.com/YOUR_USERNAME/insidesales-components.git`
2. Create a branch with a meaningful name describing the feature/issue
3. Make your changes and commit: `git add` and `git commit`
4. Make sure that the test are passing: `npm test`
5. Push your branch: `git push -u origin you-branch-name`
6. Submit a pull request to the upstream insidesales-components repository
7. Use a descriptive title and describe your changes briefly
8. Wait for a maintainer to review your PR, make any changes recommended, and get it merged
10. Celebrate your successful contribution! 🙌🏼

### Project setup

Run `npm install` and edit code in the `src/` folder.

To start the project, run `npm start`. This will run the neccesary scripts to build the documentation, storybooks, and start the development server. Running the `start` command will also watch for any changes and update both the documentation and storybooks.

### Deploying to NPM

1. `npm version major|minor|patch` - Use semantic versioning based on changes to the package
2. `npm run build:lib`
3. `cd lib`
4. `npm publish`

### Deploying the docs

from the root directory run `npm deploy:docs`