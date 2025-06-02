import { newSpecPage } from '@stencil/core/testing';
import { ConsultationList } from '../consultation-list';
jest.mock('@material/web/icon/icon', () => {});

describe('consultation-list', () => {
  it('renders consultation list items', async () => {
    const page = await newSpecPage({
      components: [ConsultationList],
      html: `<consultation-list></consultation-list>`,
    });
  });
});
