import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as mockito from 'ts-mockito';

import MockitoHelp from './MockitoHelp';
import { HelpServiceNamed } from '../jest-mocks/helpServiceNamed';
jest.mock('../jest-mocks/helpServiceNamed');

describe('TypeMockHelp tests', () => {
  const helpService: jest.MockInstance<HelpServiceNamed> = HelpServiceNamed as any;

  beforeEach(() => {
    helpService.mockClear();
  });

  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MockitoHelp />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('calls public method that calls service', () => {
    // given
    const mockedHelp = mockito.mock(HelpServiceNamed);
    const mock = helpService.mockImplementation(() => mockito.instance(mockedHelp));
    mockito.when(mockedHelp.helpMe()).thenReturn('for mock');
    mockito.when(mockedHelp.helpMeAsync(123)).thenReturn(Promise.resolve('for mock'));

    expect(mock).not.toHaveBeenCalled();
    const sut = new MockitoHelp({});
    
    // when
    const result = sut.handleClick();

    // then
    expect(result).toBe('MockitoHelp wanted for mock');
    expect(mock).toHaveBeenCalledTimes(1);
    mockito.verify(mockedHelp.helpMe()).once();
  })

  test('calls public method that calls async service', async () => {
    // given
    const helpServiceNamed = mockito.mock(HelpServiceNamed);
    helpService.mockImplementation(() => mockito.instance(helpServiceNamed));
    mockito.when(helpServiceNamed.helpMeAsync(123)).thenReturn(Promise.resolve('for mock'));

    const sut = new MockitoHelp({});

    // when
    const result = await sut.callAsyncHelp();

    // then
    expect(result).toBe('MockitoHelp wanted (async) for mock');
    mockito.verify(helpServiceNamed.helpMeAsync(123)).once();
  })
});

