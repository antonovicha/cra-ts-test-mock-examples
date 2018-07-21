import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AppHelp from './AppHelp';
import { HelpServiceNamed } from './helpServiceNamed';
import HelpServiceDefault from './helpServiceDefault';
jest.mock('./helpServiceNamed');
jest.mock('./helpServiceDefault');

describe('AppHelp tests', () => {
  const helpServiceNamed: jest.MockInstance<HelpServiceNamed> = HelpServiceNamed as any;
  const helpServiceDefault: jest.MockInstance<HelpServiceDefault> = HelpServiceDefault as any;

  beforeEach(() => {
    helpServiceNamed.mockClear();
    helpServiceDefault.mockClear();
  });

  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppHelp />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('should mock named export service public method', () => {
    // given
    const mockedHelpMe = jest.fn().mockReturnValue('for named mock');
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
    expect(result).toBe('HELP wanted for named mock');
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mockedHelpMe).toHaveBeenCalledTimes(1);
  })

  test('should mock default export service public method', () => {
    // given
    const mockedHelpMe = jest.fn().mockReturnValue('for default mock');
    const mock = helpServiceDefault.mockImplementation(() => {
      return {
        helpMe: mockedHelpMe
      }
    });
    expect(mock).not.toHaveBeenCalled();
    expect(mockedHelpMe).not.toHaveBeenCalled();
    const sut = new AppHelp({});
    
    // when
    const result = sut.handleDefaultClick();

    // then
    expect(result).toBe('HELP wanted for default mock');
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mockedHelpMe).toHaveBeenCalledTimes(1);
  })
});
