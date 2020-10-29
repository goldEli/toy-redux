function compose(...funcs: any[]) {
  if (funcs.length === 0) {
    return (...a: any) => any;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce(function wraper(a: any, b: any) {
    return function nextWraper(...args: any) {
      return a(b(...args));
    };
  });
}
export const createStore = (
  reducer: (state?: any, action?: any) => any,
  initState: any,
  middlewears?: any
) => {
  let state = initState;
  const subscribes: any[] = [];

  const subscribe = (func: any) => {
    subscribes.push(func);
  };
  const initAction = {
    type: "#init"
  };

  const getState = () => {
    return state;
  };

  const dispatch = (action: any = initAction) => {
    state = reducer(state, action);
    subscribes.forEach((func) => {
      func();
    });
  };

  const store = {
    getState,
    subscribe,
    dispatch
  };

  return middlewears(store);
};

export const applyMiddlewear = (...funcs: any[]) => {
  return (store: any) => {
    const chains = funcs.map((func) => func(store));
    const dispatch = compose(...chains)(store.dispatch);

    console.log(dispatch);
    return { ...store, dispatch };
  };
};
