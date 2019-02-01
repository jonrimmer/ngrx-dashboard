import { Action } from '@ngrx/store';
import { ApiData } from '../data-api.service';

export enum DashboardActionTypes {
  DashboardDataFetched = '[Dashboard API] Dashboard Data Fetched',
  DashboardDataError = '[Dashboard API] Dashboard Data Error',
  DashboardManualRetry = '[Dashboard Page] Manual Data Retry'
}

export class DashboardDataFetchedAction implements Action {
  public readonly type = DashboardActionTypes.DashboardDataFetched;
  constructor(public payload: ApiData) {}
}

export class DashboardDataErrorAction implements Action {
  public readonly type = DashboardActionTypes.DashboardDataError;
}

export class DashboardManualRetryAction implements Action {
  public readonly type = DashboardActionTypes.DashboardManualRetry;
}

export type DashboardActions = DashboardDataFetchedAction |
  DashboardDataErrorAction |
  DashboardManualRetryAction;
