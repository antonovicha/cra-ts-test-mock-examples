class HelpServiceNamed {
  constructor() {
    console.log('I am HelpServiceNamed constructor'); // tslint:disable-line
  }

  public helpMe(): string {
    return 'HelpServiceNamed: help me';
  }

  public async helpMeAsync(val: number): Promise<string> {
    return Promise.resolve('HelpService: help me');
  }
}

export { HelpServiceNamed };
