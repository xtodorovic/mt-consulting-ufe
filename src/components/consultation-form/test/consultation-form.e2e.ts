import { newE2EPage } from '@stencil/core/testing';

describe('consultation-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<consultation-form></consultation-form>');

    const element = await page.find('consultation-form');
    expect(element).toHaveClass('hydrated');
  });
});
