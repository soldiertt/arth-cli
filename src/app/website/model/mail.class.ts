export default class Mail {
  template: string;
  parameters?: any;

  constructor(template: string) {
    this.template = template;
  }
}
