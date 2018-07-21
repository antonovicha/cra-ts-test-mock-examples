class HelpServiceNamed {
  constructor() {
    console.log('I am HelpServiceNamed constructor'); // tslint:disable-line
  }

  public helpMe(): string {
    return 'HelpServiceNamed: help me';
  }
}

export { HelpServiceNamed };
