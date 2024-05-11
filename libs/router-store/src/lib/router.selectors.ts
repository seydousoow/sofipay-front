import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterCustomState } from './router.reducer';

const selectRouter = createFeatureSelector<RouterReducerState<RouterCustomState>>('router');
const selectRouterState = createSelector(selectRouter, x => x?.state);
const selectRouterParams = createSelector(selectRouterState, x => x?.params);
const selectRouterUrl = createSelector(selectRouterState, x => x?.url);
const selectRouterQueryParams = createSelector(selectRouterState, x => x?.queryParams);


export const ROUTER_SELECTORS = {
  selectRouterParams,
  selectRouterQueryParams,
  selectRouterUrl,
};
