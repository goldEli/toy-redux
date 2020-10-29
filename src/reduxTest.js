import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const test = createThunkMiddleware();

let store = createStore(counter, 2, applyMiddleware(thunk, logger));
store.subscribe(() => console.log(store.getState()));

store.dispatch((dispatch) => {
  setTimeout(() => {
    dispatch({ type: "INCREMENT" });
  }, 3000);
});
// 1
store.dispatch({ type: "INCREMENT" });
// 2
store.dispatch({ type: "DECREMENT" });
// 1

// function compose(...funcs) {
//   if (funcs.length === 0) {
//     return (args) => args;
//   }
//   if (funcs.length === 1) {
//     return funcs[0];
//   }
//   return funcs.reduce(function wraper(a, b) {
//     console.log(a, b);
//     return function nextWraper(...args) {
//       return a(b(...args));
//     };
//   });
// }

// function func1(next) {
//   console.log("func1 begin");
//   return function next_from_func1(...args) {
//     console.log("func1 in");
//     next(...args);
//     console.log("func1 out");
//   };
// }
// function func2(next) {
//   console.log("func2 begin");
//   return function next_from_func2(...args) {
//     console.log("func2 in");
//     next(...args);
//     console.log("func2 out");
//   };
// }
// function func3(next) {
//   console.log("func3 begin");
//   return function next_from_func3(...args) {
//     console.log("func3 in");
//     next(...args);
//     console.log("func3 out");
//   };
// }

// function next(data) {
//   console.log(`next ${data}`);
// }

// const chain = compose(func1, func2, func3);
// console.log(chain);
// const nextChain = chain(next);
// console.log(nextChain);
// nextChain("{data}");

var a = `
// nextWraper#1 => func1(func2(next))
// nextWraper#2 => nextWraper(func3(next))

func3 begin
func2 begin
func1 begin

// next_from_func1(args)

func1 in

// next

// next_from_func2

fun2 in

// next_from_fun3

fun3 in

// next

next {data}

fun3 out

fun2 out

fun1 out

var stack = [
  next
  next_from_func3
  next_from_func2
  next_from_func1
]

`;
