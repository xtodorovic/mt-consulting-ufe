import { newSpecPage } from '@stencil/core/testing';
import { AppRoot } from '../app-root';

describe('app-root', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppRoot],
      html: `<app-root></app-root>`,
    });
    expect(page.root).toEqualHtml(`
      <app-root>
        <mock:shadow-root>
          <div>
            <nav>
              <a href="/">Home</a>
              <a href="/form">Form</a>
              <a href="/requests-list">Requests</a>
            </nav>
            <main></main>
          </div>
        </mock:shadow-root>
      </app-root>
    `);

  });
});
