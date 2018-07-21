import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AppHelp from './AppHelp';
import { HelpServiceNamed } from './helpServiceNamed';
jest.mock('./helpServiceNamed');

describe('AppHelp tests', () => {
  const helpServiceNamed: jest.MockInstance<HelpServiceNamed> = HelpServiceNamed as any;

  beforeEach(() => {
    helpServiceNamed.mockClear();
  });

  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppHelp />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('should mock named export service public method', () => {
    // given
    const mockedHelpMe = jest.fn().mockReturnValue('for mock');
    const mock = helpServiceNamed.mockImplementation(() => {
      return {
        helpMe: mockedHelpMe
      }
    });
    expect(mock).not.toHaveBeenCalled();
    expect(mockedHelpMe).not.toHaveBeenCalled();
    const sut = new AppHelp({});
    
    // when
    const result = sut.handleNamedClick();

    // then
    expect(result).toBe('HELP wanted for mock');
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mockedHelpMe).toHaveBeenCalledTimes(1);
  })
});
