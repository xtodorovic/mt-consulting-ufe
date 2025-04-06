import { newE2EPage } from '@stencil/core/testing';

describe('consultation-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<consultation-list></consultation-list>');

    const element = await page.find('consultation-list');
    expect(element).toHaveClass('hydrated');
  });
});
