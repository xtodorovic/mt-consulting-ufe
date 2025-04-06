import { newSpecPage } from '@stencil/core/testing';
import { ConsultationDetail } from '../consultation-detail';

describe('consultation-detail', () => {
  it('renders form fields and submits changes', async () => {
    const page = await newSpecPage({
      components: [ConsultationDetail],
      html: `<consultation-detail></consultation-detail>`,
    });

    const dateInput = page.root.shadowRoot.querySelector('input[type="datetime-local"]');
    const textarea = page.root.shadowRoot.querySelector('textarea');
    const form = page.root.shadowRoot.querySelector('form');

    // Simulate filling form
    (dateInput as HTMLInputElement).value = '2025-04-12T10:00';
    dateInput.dispatchEvent(new Event('input'));

    (textarea as HTMLTextAreaElement).value = 'Some notes';
    textarea.dispatchEvent(new Event('input'));

    await page.waitForChanges();

    // Simulate submit
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect((page.rootInstance as ConsultationDetail).date).toContain('2025-04');
    expect((page.rootInstance as ConsultationDetail).notes).toBe('Some notes');
  });
});
