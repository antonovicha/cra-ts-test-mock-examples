class HelpServiceDefault {
  constructor() {
    console.log('I am HelpServiceDefault constructor'); // tslint:disable-line
  }

  public helpMe(): string {
    return 'HelpServiceDefault: help me';
  }
}

export default HelpServiceDefault;
