import { Ang4Page } from './app.po';

describe('ang4 App', () => {
  let page: Ang4Page;

  beforeEach(() => {
    page = new Ang4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
