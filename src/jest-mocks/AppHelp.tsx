import axios from 'axios';
import * as React from 'react';

import HelpServiceDefault from './helpServiceDefault';
import { HelpServiceNamed } from './helpServiceNamed';

class AppHelp extends React.Component {
  private helpService = new HelpServiceNamed();
  private helpServiceDefault = new HelpServiceDefault();

  constructor(props: any) {
    super(props);
    this.handleNamedClick = this.handleNamedClick.bind(this);
  }

  public handleNamedClick(): string {
    return 'HELP wanted ' + this.helpService.helpMe();
  }

  public handleDefaultClick(): string {
    return 'HELP wanted ' + this.helpServiceDefault.helpMe();
  }

  public async handleHttpCall(): Promise<string> {
    const resp = await axios.get<string>('http://google.com');
    return resp.data;
  }

  public render(): React.ReactNode {
    return <div onClick={this.handleNamedClick}>Some App HELP F1</div>;
  }
}

export default AppHelp
