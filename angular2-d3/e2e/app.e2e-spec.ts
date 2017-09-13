import { D3SamplePage } from './app.po';

describe('d3-sample App', () => {
  let page: D3SamplePage;

  beforeEach(() => {
    page = new D3SamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
