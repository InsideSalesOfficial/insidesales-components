var path = require('path');
var fse = require('fs-extra');

function createPackageFile() {
  return new Promise((resolve) => {
    fse.readFile(path.resolve(__dirname, '../package.json'), 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      resolve(data);
    });
  })
  .then((data) => JSON.parse(data))
  .then((packageData) => {
    const {
      author,
      version,
      description,
      keywords,
      repository,
      license,
      bugs,
      homepage,
      peerDependencies,
      dependencies,
      scripts
    } = packageData;

    const minimalPackage = {
      name: 'isdc-components-test',
      author,
      version,
      description,
      main: './index.js',
      keywords,
      repository,
      license,
      bugs,
      homepage,
      peerDependencies,
      dependencies,
      scripts: {
        'semantic-release': scripts['semantic-release']
      }
    };

    return new Promise((resolve) => {
      const libPath = path.resolve(__dirname, '../lib/package.json');
      const data = JSON.stringify(minimalPackage, null, 2);
      fse.writeFile(libPath, data, (err) => {
        if (err) throw (err);
        console.log(`Created package.json in ${libPath}`);
        resolve();
      });
    });
  });
}

createPackageFile();