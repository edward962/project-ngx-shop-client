import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

// tslint:disable-next-line:typedef
describe('workspace-project App', () => {
  let page: AppPage;

  // tslint:disable-next-line:typedef
  beforeEach(() => {
    page = new AppPage();
  });

  // tslint:disable-next-line:typedef
  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('ngx-shop-client app is running!');
  });

  // tslint:disable-next-line:typedef
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
