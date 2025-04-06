import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'video-session',
  styleUrl: 'video-session.css',
  shadow: true,
})
export class VideoSession {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
