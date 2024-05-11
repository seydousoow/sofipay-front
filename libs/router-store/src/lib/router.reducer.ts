import { Data, Params, RouterStateSnapshot } from '@angular/router';
import { routerReducer, RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

export interface RouterCustomState {
  url: string;
  params: Params;
  queryParams: Params;
  data: {
    googleTag?: Data;
  };
}

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterCustomState> {
  serialize(routerState: RouterStateSnapshot): RouterCustomState {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params } = route;
    const { data } = route;
    return { url, params, queryParams, data };
  }
}

export interface State {
  router: RouterReducerState<RouterCustomState>;
}

export const routerReducers: ActionReducerMap<State> = {
  router: routerReducer,
};
