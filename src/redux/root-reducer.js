import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import workoutReducer from "./workout/workout.reducer";
import uiReducer from "./ui/ui.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["workout"],
};

const rootReducer = combineReducers({
  workout: workoutReducer,
  ui: uiReducer,
});

export default persistReducer(persistConfig, rootReducer);
