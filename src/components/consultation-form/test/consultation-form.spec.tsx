import { newSpecPage } from '@stencil/core/testing';
import { ConsultationForm } from '../consultation-form';

describe('consultation-form', () => {
  it('renders correctly', async () => {
    const page = await newSpecPage({
      components: [ConsultationForm],
      html: `<consultation-form></consultation-form>`,
    });

    expect(page.root).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('form')).toBeTruthy();
  });

  it('updates state when inputs change', async () => {
    const page = await newSpecPage({
      components: [ConsultationForm],
      html: `<consultation-form></consultation-form>`,
    });

    const nameInput = page.root.shadowRoot.querySelector('input');
    const event = new Event('input');
    (nameInput as HTMLInputElement).value = 'Jane';
    nameInput.dispatchEvent(event);

    await page.waitForChanges();

    expect((page.rootInstance as ConsultationForm).name).toBe('Jane');
  });
});
