import { IDay, IProduct, IPersonInfo } from "../models/types";
import { createEffect, createEvent, createStore } from "effector";
import localforage from "localforage";

// events
export const addProduct = createEvent<IProduct>();
export const addProductToListDay =
  createEvent<{ activeDay: number; newProductToList: IProduct }>();
export const changeInfo = createEvent<IPersonInfo>();

// effects
export const getInfo = createEffect(
  async () => await localforage.getItem<IPersonInfo>("info")
);
export const getProducts = createEffect(
  async () => await localforage.getItem<IProduct[]>("products")
);
export const getDayListOfProducts = createEffect(
  async () => await localforage.getItem<IDay[]>("daylist-of-products")
);

// stores
export const $info = createStore<IPersonInfo>({
  weight: 0,
  height: 0,
  age: 0,
})
  .on(getInfo.doneData, (state, newState) =>
    newState !== null ? newState : state
  )
  .on(changeInfo, (state, { weight, height, age }) => {
    localforage.setItem("info", { weight, height, age });
    return {
      ...state,
      weight: weight,
      height: height,
      age: age,
    };
  });

export const $products = createStore<IProduct[]>([
  {
    idProduct: 1,
    name: "Молоко",
    callories: 23,
  },
])
  .on(getProducts.doneData, (state, newState) =>
    newState !== null ? newState : state
  )
  .on(addProduct, (state, { name, callories }) => {
    const newState = [
      ...state,
      {
        idProduct:
          Math.max(0, Math.max(...state.map(({ idProduct }) => idProduct))) + 1,
        name,
        callories,
      },
    ];
    localforage.setItem("products", newState);
    return newState;
  });

export const $store = createStore<IDay[]>([
  {
    dateId: 0,
    listOfProducts: [],
  },
  {
    dateId: 1,
    listOfProducts: [],
  },
])
.on(getDayListOfProducts.doneData, (state, newState) =>
    newState !== null ? newState : state
  )
.on(addProductToListDay, (state, { activeDay, newProductToList }) => {
  const newState = state.map((list, i) => ({
    ...list,
    listOfProducts:
      i === activeDay
        ? [...list.listOfProducts, newProductToList]
        : list.listOfProducts,
  }));
  localforage.setItem("daylist-of-products", newState);
  return newState;
});
