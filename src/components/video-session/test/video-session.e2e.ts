import { newE2EPage } from '@stencil/core/testing';

describe('video-session', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<video-session></video-session>');

    const element = await page.find('video-session');
    expect(element).toHaveClass('hydrated');
  });
});
