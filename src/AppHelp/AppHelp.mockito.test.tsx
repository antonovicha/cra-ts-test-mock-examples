import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as mockito from 'ts-mockito';

import AppHelp from './AppHelp';
import { HelpServiceNamed } from './helpServiceNamed';
jest.mock('./helpServiceNamed');

describe('AppHelp mockito tests', () => {
  const helpService: jest.MockInstance<HelpServiceNamed> = HelpServiceNamed as any;

  beforeEach(() => {
    helpService.mockClear();
  });

  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppHelp />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('calls public method that calls service', () => {
    // given
    const mockedHelp = mockito.mock(HelpServiceNamed);
    const mock = helpService.mockImplementation(() => mockito.instance(mockedHelp));
    mockito.when(mockedHelp.helpMe()).thenReturn('for mock');
    mockito.when(mockedHelp.helpMeAsync(123)).thenReturn(Promise.resolve('for mock'));

    expect(mock).not.toHaveBeenCalled();
    const sut = new AppHelp({});
    
    // when
    const result = sut.handleNamedClick();

    // then
    expect(result).toBe('HELP wanted for mock');
    expect(mock).toHaveBeenCalledTimes(1);
    mockito.verify(mockedHelp.helpMe()).once();
  })

  test('calls public method that calls async service', async () => {
    // given
    const helpServiceNamed = mockito.mock(HelpServiceNamed);
    helpService.mockImplementation(() => mockito.instance(helpServiceNamed));
    mockito.when(helpServiceNamed.helpMeAsync(123)).thenReturn(Promise.resolve('for mock'));

    const sut = new AppHelp({});

    // when
    const result = await sut.callAsyncHelp();

    // then
    expect(result).toBe('Help wanted (async) for mock');
    mockito.verify(helpServiceNamed.helpMeAsync(123)).once();
  })
});

