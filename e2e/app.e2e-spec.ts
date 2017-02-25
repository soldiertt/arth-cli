import { ArthCliPage } from './app.po';

describe('arth-cli App', () => {
  let page: ArthCliPage;

  beforeEach(() => {
    page = new ArthCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
