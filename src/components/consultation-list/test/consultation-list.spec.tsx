import { newSpecPage } from '@stencil/core/testing';
import { ConsultationList } from '../consultation-list';
jest.mock('@material/web/icon/icon', () => {});

describe('consultation-list', () => {
  it('renders consultation list items', async () => {
    const page = await newSpecPage({
      components: [ConsultationList],
      html: `<consultation-list></consultation-list>`,
    });

    // Manually set state
    (page.rootInstance as any).waitingPatients = [
      { id: '1', name: 'Alice', email: 'alice@example.com', symptoms: 'Cough' },
      { id: '2', name: 'Bob', email: 'bob@example.com', symptoms: 'Fever' }
    ];

    await page.waitForChanges();

    const items = page.root.shadowRoot.querySelectorAll('li');
    expect(items.length).toBeGreaterThan(0);
  });
});
