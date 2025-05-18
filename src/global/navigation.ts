// src/navigation/registerNavigationApi.ts

export function registerNavigationApi() {
  document.addEventListener('click', (event: MouseEvent) => {
    // Find the nearest <a> tag (in case a nested element was clicked)
    const target = event.target as HTMLElement;
    const anchor = target.closest('a');

    // Ignore clicks that:
    // - are not anchor tags
    // - have a target (e.g. _blank)
    // - are external links
    // - have a download attribute
    // - use modifier keys (ctrl/cmd/shift)
    if (
      !anchor ||
      anchor.target === '_blank' ||
      anchor.hasAttribute('download') ||
      event.ctrlKey || event.metaKey || event.shiftKey || event.altKey ||
      anchor.origin !== location.origin
    ) {
      return;
    }

    const href = anchor.getAttribute('href');

    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return; // Ignore fragment or protocol links
    }

    event.preventDefault();

    // Push the new state and trigger popstate
    history.pushState({}, '', anchor.pathname + anchor.search + anchor.hash);
    window.dispatchEvent(new PopStateEvent('popstate'));
  });

  // Optional: update scroll position on back/forward
  window.addEventListener('popstate', () => {
    window.scrollTo(0, 0); // Optional: scroll to top on route change
  });
}
