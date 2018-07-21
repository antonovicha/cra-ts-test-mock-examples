# Examples of how to mock import-ed classes in TS CRA

Goal is to find out and provide examples of how to mock imported classes, functions and objects in CRA TypeScript tests with good type support of said mocks.

## Intro
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). It is plain TS CRA ATM. Not ejected.

VSCode is used for coding. It contains `Debug Jest test` launch configuration that can be executed against current test file in order to debug it. Breakpoints supported as well.

## Jest examples

Can be found in [jest-mocks](./src/jest-mocks/AppHelp.test.tsx)

## typemoq examples

WIP

## ts-mockito examples

WIP

## Known issues

* Line numbers of TypeScript tests in Jest are off. [Bug](https://github.com/kulshekhar/ts-jest/issues/334).
* Debugging from vscode launched with --coverage because of CRA limitations.
