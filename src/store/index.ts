// /src/store/index.ts

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["register"] // 저장 안 할 것들 지정 가능 예시: ["todo"] 저장 안 할
};
const persistedReducer = persistReducer(persistConfig, todoReducer);

const store = configureStore({
    reducer: {
        todo: persistedReducer
    },
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({
            serializableCheck: false
        })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
