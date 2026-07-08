import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { mockModule } from './test-utils';

mockModule('next/navigation', {
  usePathname: () => '/'
});
mockModule('next-themes', {
  useTheme: () => ({ theme: 'light', setTheme: () => {} })
});

test('site header exposes primary and track navigation', async () => {
  const { SiteHeader } = await import('../components/site-header');
  const html = renderToStaticMarkup(<SiteHeader />);
  // Primary nav items render as top-level links.
  for (const label of ['Home', 'About', 'Now', 'Uses', 'Work with me', 'Contact']) {
    assert(html.includes(label), `expected nav to include ${label}`);
  }
  // The four content tracks are grouped under a "Tracks" dropdown trigger.
  assert(html.includes('Tracks'), 'expected a Tracks menu trigger');
});
