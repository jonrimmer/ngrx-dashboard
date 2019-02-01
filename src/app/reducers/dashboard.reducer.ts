import { DashboardActions, DashboardActionTypes } from '../actions/dashboard.actions';
import { Measurement } from '../models/measurement';

export interface State {
  latest: number | null;
  error: boolean;
  measuments: Measurement[]
}

export const initialState = {
  latest: null,
  error: false,
  measuments: Array.from({ length: 20 }, () => null)
}

export function reducer(state = initialState, action: DashboardActions): State {
  switch(action.type) {
    case DashboardActionTypes.DashboardDataFetched:
      return {
        latest: action.payload.timestamp,
        error: false,
        measuments: [
          ...state.measuments,
          {
            timestamp: action.payload.timestamp,
            value: action.payload.value
          }
        ].slice(-20) // Keep the latest 20
      }
    case DashboardActionTypes.DashboardDataError:
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
}
