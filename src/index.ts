import { createStore, applyMiddlewear } from "./miaoRedux";
// import "./reduxTest";

function counter(state = 0, action: any) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

function thunk() {
  console.log("thunk start");
  return function thunkWraper(store: any) {
    return function thunkNextWraper(next: any) {
      return function thunkCore(action: any) {
        if (typeof action === "function") {
          return action(next);
        }
        return next(action);
      };
    };
  };
}
let index = 0;
function log() {
  console.log("log start");
  return function logWraper(store: any) {
    return function logNextWraper(next: any) {
      return function logCore(action: any) {
        ++index;
        console.log("prestate:", index.toString(), store.getState());
        next(action);
        console.log("nextstate:", index.toString(), store.getState());
      };
    };
  };
}

const store = createStore(counter, 0, applyMiddlewear(thunk(), log()));
store.subscribe(() => console.log(store.getState()));
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch((dispatch: any) => {
  setTimeout(() => {
    dispatch({ type: "INCREMENT" });
  }, 2000);
});

var a = `
function a(dispatch) {
  return thunkNextWraper(logNextWraper(dispatch))
}
chain = a(dispatch)

thunkCore(action)
thunk in
action => logCore(action)
log in
action => dispitch(action)

log out
thunkout



c(action)

var stack = [
  
  thunkcore
]

`;
