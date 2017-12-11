# This project uses Webpack. Hot Module Replacement behaviour is used in development process only.
[![Build Status](https://secure.travis-ci.org/dmitriy-ryazantsev/webpack-react-redux-karma-mocha-chai-sinon-enzyme.svg?branch=master)](https://travis-ci.org/dmitriy-ryazantsev/webpack-react-redux-karma-mocha-chai-sinon-enzyme)
[![Coverage Status](https://coveralls.io/repos/github/dmitriy-ryazantsev/webpack-react-redux-karma-mocha-chai-sinon-enzyme/badge.svg?branch=master)](https://coveralls.io/github/dmitriy-ryazantsev/webpack-react-redux-karma-mocha-chai-sinon-enzyme?branch=master)
![Node Version](https://img.shields.io/node/v/webpack-react-redux-karma-mocha-chai-sinon-enzyme.svg "Node Version")

## Core frameworks used in this project
- Babel
- React
- Redux
- Karma
- Mocha
- Chai
- Sinon
- Enzyme

## Usage
The following commands are available in your project:
```bash
# Download all project dependencies
npm i

# Start the webpack-dev-server with the development version of the project
# Run command and open page at http://localhost:8081
npm run debug

# Just build the development version
npm run build

# Just build the production version
npm build:release

# This command is used in Travis CI to build and test production version
# See logs here https://travis-ci.org/dmitriy-ryazantsev/webpack-react-redux-karma-mocha-chai-sinon-enzyme
# or you can use it from MSBuild production build script
npm run Release

# Start the webpack-dev-server and auto-run unit tests on file changes
# Run command and open page at http://localhost:8080/webpack-dev-server
# or http://localhost:8080/tests/application
npm run test

# Start the Karma server and auto-run unit tests on file changes
# Live HTML reports available at http://localhost:5060
npm run test:karma

# Start the Karma server and do just single run of unit tests
npm run test:release
```
## After execution of any kind of tests
You can find code coverage results here: `.\statistics\coverage\index.html`  
You can find tests results here: `.\statistics\tests.html`
## Licence
[ISC License](https://en.wikipedia.org/wiki/ISC_license)
