import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map, switchMap, exhaustMap, catchError, retryWhen, tap, mergeMap } from 'rxjs/operators';
import { interval, empty, timer, of, throwError, merge } from 'rxjs';
import { DataApiService } from './data-api.service';
import { DashboardDataFetchedAction, DashboardDataErrorAction, DashboardActionTypes } from './actions/dashboard.actions';

const RETRY_ATTEMPTS = 1;
const RETRY_SCALE = 1000;

@Injectable()
export class AppEffects {
  @Effect()
  $poll = merge(
    this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      map((event: ActivationEnd) => 
        event.snapshot.routeConfig && 
        event.snapshot.routeConfig.path === 'dashboard'
      ),
      tap(matches => console.debug('[Poll] Matched route: ' + matches))
    ),
    this.actions$.pipe(
      ofType(DashboardActionTypes.DashboardManualRetry),
      tap(() => console.debug('[Poll] Manual retry triggered')),
      map(() => true)
    )
  ).pipe(
    switchMap(matches => {
      if (matches) {
        return interval(1000).pipe(
          tap(() => console.debug('[Poll] Fetching data')),
          exhaustMap(() => this.dataApi.fetchData()),
          tap(() => console.debug('[Poll] Data received')),
          map(data => new DashboardDataFetchedAction(data)),
          retryWhen(error$ => {
            console.debug('[Poll] Error fetching data');
            return error$.pipe(
              mergeMap((error, i) => {
                const retryAttempt = i + 1;
                
                if (retryAttempt > RETRY_ATTEMPTS) {
                  return throwError(error);
                }
                console.debug(
                  `[Poll] Retrying: attempt ${retryAttempt} in ${retryAttempt * RETRY_SCALE}ms`
                );

                return timer(retryAttempt * RETRY_SCALE);
              })
            )
          }),
          catchError(_error => {
            console.debug('[Poll] Gave up retrying');
            return of(new DashboardDataErrorAction());
          })
        );
      }
      else {
        return empty();
      }
    })
  )
  
  constructor(
    private actions$: Actions,
    private router: Router,
    private dataApi: DataApiService
  ) {}
}
