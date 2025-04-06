import { newE2EPage } from '@stencil/core/testing';

describe('consultation-detail', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<consultation-detail></consultation-detail>');

    const element = await page.find('consultation-detail');
    expect(element).toHaveClass('hydrated');
  });
});
