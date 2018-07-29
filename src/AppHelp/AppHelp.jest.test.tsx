import * as React from 'react';
import * as ReactDOM from 'react-dom';


import axios from 'axios';
import AppHelp from './AppHelp';
import HelpServiceDefault from './helpServiceDefault';
import { HelpServiceNamed } from './helpServiceNamed';
jest.mock('./helpServiceNamed');
jest.mock('./helpServiceDefault');
jest.mock('axios');


describe('AppHelp tests', () => {
  const helpServiceNamed: jest.MockInstance<HelpServiceNamed> = HelpServiceNamed as any;
  const helpServiceDefault: jest.MockInstance<HelpServiceDefault> = HelpServiceDefault as any;
  const savedAxios = Object.assign({}, axios);

  beforeEach(() => {
    Object.assign(axios, savedAxios);
    jest.resetAllMocks();
    jest.resetModules();
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

  test('should replace 3rd party export public method with garbage', async () => {
    // when
    axios.get = '123' as any;
    // then
    expect(axios.get).toBe('123');
  })

  test('should restore 3rd party export public method from garbage', async () => {
    // then
    expect(axios.get).not.toBe('123');
  })
});
