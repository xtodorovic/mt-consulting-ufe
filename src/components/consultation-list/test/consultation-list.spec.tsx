import { newSpecPage } from '@stencil/core/testing';
import { ConsultationList } from '../consultation-list';

describe('consultation-list', () => {
  it('renders consultation list items', async () => {
    const page = await newSpecPage({
      components: [ConsultationList],
      html: `<consultation-list></consultation-list>`,
    });

    const items = page.root.shadowRoot.querySelectorAll('li');
    expect(items.length).toBeGreaterThan(0);
  });
});
