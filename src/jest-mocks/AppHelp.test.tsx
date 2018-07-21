import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AppHelp from './AppHelp';
import { HelpServiceNamed } from './helpServiceNamed';
import HelpServiceDefault from './helpServiceDefault';
import axios from 'axios';
jest.mock('./helpServiceNamed');
jest.mock('./helpServiceDefault');
jest.mock('axios');

describe('AppHelp tests', () => {
  const helpServiceNamed: jest.MockInstance<HelpServiceNamed> = HelpServiceNamed as any;
  const helpServiceDefault: jest.MockInstance<HelpServiceDefault> = HelpServiceDefault as any;

  beforeEach(() => {
    jest.resetAllMocks();
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

  test('should mock of 3rd party export public method', async () => {
    // given
    (axios.get as jest.Mock)
      .mockReturnValue(Promise.resolve({ data: 'mocked http result' }))
      .mockName('axios.get');
    expect(axios.get).not.toHaveBeenCalled();
    const sut = new AppHelp({});
    
    // when
    const result = await sut.handleHttpCall();

    // then
    expect(result).toBe('mocked http result');
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('http://google.com');
  })
});
