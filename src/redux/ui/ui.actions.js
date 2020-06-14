import UiActionTypes from "./ui.types";

let timer = null;

const tick = () => ({ type: UiActionTypes.TICK_TIMER });

export const startTime = (dispatch) => {
  clearInterval(timer);
  timer = setInterval(() => dispatch(tick()), 1000);
  dispatch({ type: UiActionTypes.START_TIMER });
  dispatch(tick());
};

export const resetTime = () => {
  clearInterval(timer);

  return {
    type: UiActionTypes.RESET_TIMER,
  };
};

export const stopTime = () => {
  clearInterval(timer);

  return {
    type: UiActionTypes.STOP_TIMER,
  };
};

export const showNavbar = () => ({
  type: UiActionTypes.SHOW_NAVBAR,
});
export const hideNavbar = () => ({
  type: UiActionTypes.HIDE_NAVBAR,
});
