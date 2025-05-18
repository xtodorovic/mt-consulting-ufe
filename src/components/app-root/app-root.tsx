import { Component, h, State } from '@stencil/core';
import { registerNavigationApi } from '../../global/navigation';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  @State() route: string = location.pathname;

  componentWillLoad() {
    registerNavigationApi();
    window.addEventListener('popstate', () => {
      this.route = location.pathname;
    });
  }

  render() {
    return (
      <div>
        <nav>
          <a href="/">Home</a>
          <a href="/form">Form</a>
          <a href="/detail">Detail</a>
          <a href="/requests-list">Requests</a>
        </nav>
        <main>
          {this.route === '/form' && <consultation-form></consultation-form>}
          {this.route === '/detail' && <consultation-detail></consultation-detail>}
          {this.route === '/requests-list' && <consultation-list></consultation-list>}
        </main>
      </div>
    );
  }
}
