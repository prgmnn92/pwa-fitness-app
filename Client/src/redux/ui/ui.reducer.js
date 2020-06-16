import UiActionTypes from "./ui.types";

const INITIAL_STATE = {
  showNavbar: true,
  time: 0,
  start: 0,
  isOn: false,
};

const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UiActionTypes.START_TIMER:
      return {
        ...state,
        isOn: true,
        time: state.time,
        start: Date.now() - state.time,
      };
    case UiActionTypes.STOP_TIMER:
      return {
        ...state,
        isOn: false,
      };
    case UiActionTypes.RESET_TIMER:
      return {
        ...state,
        time: 0,
        isOn: false,
      };
    case UiActionTypes.SHOW_NAVBAR:
      return {
        ...state,
        showNavbar: true,
      };
    case UiActionTypes.HIDE_NAVBAR:
      return {
        ...state,
        showNavbar: false,
      };
    case UiActionTypes.TICK_TIMER:
      return {
        ...state,
        time: Date.now() - state.start,
      };
    default:
      return state;
  }
};

export default uiReducer;
