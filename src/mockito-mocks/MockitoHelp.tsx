import * as React from "react";

import { HelpServiceNamed } from '../jest-mocks/helpServiceNamed';

class MockitoHelp extends React.Component {
  private helpService = new HelpServiceNamed();

  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  public handleClick(): string {
    return 'MockitoHelp wanted ' + this.helpService.helpMe();
  }

  public async callAsyncHelp(): Promise<string> {
    const res = await this.helpService.helpMeAsync(123);
    return 'MockitoHelp wanted (async) ' + res;
  }

  public render(): React.ReactNode {
    return <div onClick={this.handleClick}>Some App HELP F1</div>;
  }
}

export default MockitoHelp
