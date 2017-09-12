# Contribution guide

## Contributing
1. Fork, then clone: `git clone https://github.com/YOUR_USERNAME/insidesales-components.git`
2. Create a branch with a meaningful name describing the feature/issue
3. Make your changes and commit: `git add` and `git commit`
4. Make sure that the test are passing: `npm test`
5. Push your branch: `git push -u origin you-branch-name`
6. Submit a pull request to the upstream insidesales-components repository
7. Use a descriptive title and describe your changes briefly
8. Wait for a maintainer to review your PR, make any changes recommended, and get it merged
10. Celebrate your successful contribution! 🙌🏼

## Creating releases

insidesales-components uses [semantic-release](https://github.com/semantic-release/semantic-release)
to release new versions automatically.

*  Commits of type `fix` will trigger bugfix releases, think `0.0.1`
*  Commits of type `feat` will trigger feature releases, think `0.1.0`
*  Commits with `BREAKING CHANGE` in body or footer will trigger breaking releases, think `1.0.0`

All other commit types will trigger no new release.