// /src/store/index.ts

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage
};
const persistedReducer = persistReducer(persistConfig, todoReducer);

const store = configureStore({
    reducer: {
        todos: persistedReducer
    },
    middleware: (getDefaultMiddlware) =>
        getDefaultMiddlware({ serializableCheck: false })
});

persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
