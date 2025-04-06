import { newSpecPage } from '@stencil/core/testing';
import { VideoSession } from '../video-session';

describe('video-session', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [VideoSession],
      html: `<video-session></video-session>`,
    });
    expect(page.root).toEqualHtml(`
      <video-session>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </video-session>
    `);
  });
});
