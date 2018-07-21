import * as React from "react";

import { HelpServiceNamed } from './helpServiceNamed';

class AppHelp extends React.Component {
  private helpService = new HelpServiceNamed();

  constructor(props: any) {
    super(props);
    this.handleNamedClick = this.handleNamedClick.bind(this);
  }

  public handleNamedClick(): string {
    return 'HELP wanted ' + this.helpService.helpMe();
  }

  public render(): React.ReactNode {
    return <div onClick={this.handleNamedClick}>Some App HELP F1</div>;
  }
}

export default AppHelp
