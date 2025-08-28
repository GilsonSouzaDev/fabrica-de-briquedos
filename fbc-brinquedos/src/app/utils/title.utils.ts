import { ActivatedRoute } from '@angular/router';

export function getDeepestChild(route: ActivatedRoute): ActivatedRoute {
  return route.firstChild ? getDeepestChild(route.firstChild) : route;
}

export function extractRouteTitle(route: ActivatedRoute): string {
  let title = '';
  const child = getDeepestChild(route);
  child.data.subscribe((d) => (title = d['title'] || ''));
  return title;
}
