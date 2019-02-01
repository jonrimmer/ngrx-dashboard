import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

export function ofRoute<T, V>(path: string | string[]) {
  return (src: Observable<Action>) => src.pipe(
    ofType<RouterNavigationAction>(ROUTER_NAVIGATION),
    map(action => {
      
      let route = action.payload.event.state.root;
      let matches = false;

      while (route !== null && matches === false) {
        if (route.routeConfig && route.routeConfig.path) {
          if (Array.isArray(path)) {
            matches = path.includes(route.routeConfig.path);
          }
          else {
            matches = path === route.routeConfig.path;
          }
        }

        route = route.firstChild;
      }

      return [matches, action];
    }),
    distinctUntilChanged(([matches, _]: [boolean, RouterNavigationAction]) => matches)
  );
}
