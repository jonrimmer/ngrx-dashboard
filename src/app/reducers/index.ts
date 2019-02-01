import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import * as fromDashboard from './dashboard.reducer';
import { RouterStateUrl } from '../custom-route-serializer';

export interface State {
  router: RouterReducerState<RouterStateUrl>;
  dashboard: fromDashboard.State;
}

export const reducers: ActionReducerMap<State> = {
  dashboard: fromDashboard.reducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

const getDashboard = createFeatureSelector<State, fromDashboard.State>('dashboard');

export const getDashboardLatest = createSelector(getDashboard, state => state.latest);
export const getDashboardMeasurements = createSelector(getDashboard, state => state.measuments);
export const getDashboardError = createSelector(getDashboard, state => state.error);