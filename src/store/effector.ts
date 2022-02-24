import { IDataProduct, IList } from "./../models/types";
import { IDay, IProduct, IPersonInfo } from "../models/types";
import { createEffect, createEvent, createStore } from "effector";
import localforage from "localforage";

let now = new Date();

// events
export const addProduct = createEvent<{
  name: string;
  weight: number;
  dataProduct: IDataProduct;
}>();
export const addProductToListDay =
  createEvent<{ activeDay: number; newProductToList: IProduct }>();
export const deleteProductListDay = createEvent<{ id: number }>();
export const changeInfo = createEvent<IPersonInfo>();
export const addDay = createEvent<IDay>();

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
  sex: 'male',
  weight: 0,
  height: 0,
  age: 0,
})
  .on(getInfo.doneData, (state, newState) =>
    newState !== null ? newState : state
  )
  .on(changeInfo, (state, { sex, weight, height, age }) => {
    localforage.setItem("info", { sex, weight, height, age });
    return {
      ...state,
      sex: sex,
      weight: weight,
      height: height,
      age: age,
    };
  });

export const $products = createStore<IProduct[]>([
  {
    idProduct: 1,
    name: "Молоко",
    weight: 100,
    dataProduct: {
      callories: 64,
      proteins: 20,
      fats: 20,
      carbohydrates: 30,
    },
  },
])
  .on(getProducts.doneData, (state, newState) =>
    newState !== null ? newState : state
  )
  .on(addProduct, (state, { name, weight, dataProduct }) => {
    console.log(typeof (dataProduct.callories - 0))
    const newState = [
      ...state,
      {
        idProduct:
          Math.max(0, Math.max(...state.map(({ idProduct }) => idProduct))) + 1,
        name,
        weight: weight - 0,
        dataProduct: {
          callories: dataProduct.callories - 0,
          proteins: dataProduct.proteins - 0,
          fats: dataProduct.fats - 0,
          carbohydrates: dataProduct.carbohydrates - 0,
        },
      },
    ];
    localforage.setItem("products", newState);
    return newState;
  });

export const $store = createStore<IDay[]>([
  {
    dateId: 19,
    sums: {
      callories: 64,
      proteins: 20,
      fats: 20,
      carbohydrates: 30,
    },
    listOfProducts: [
      {
        id: 1,
        productInDayList: {
          idProduct: 1,
          name: "Молоко",
          weight: 100,
          dataProduct: {
            callories: 64,
            proteins: 20,
            fats: 20,
            carbohydrates: 30,
          },
        },
      },
    ],
  },
])
  .on(getDayListOfProducts.doneData, (state, newState) =>
    newState !== null ? newState : state
  )
  .on(addDay, (state, { dateId, listOfProducts }) => {
    const newState = [
      ...state,
      {
        dateId: dateId,
        sums: { callories: 0, proteins: 0, fats: 0, carbohydrates: 0 },
        listOfProducts: listOfProducts,
      },
    ];
    console.log(state);
    console.log(newState);
    localforage.setItem("daylist-of-products", newState);
    return newState;
  })
  .on(addProductToListDay, (state, { activeDay, newProductToList }) => {
    const newState = state.map((list) => ({
      ...list,
      sums: list.dateId === activeDay ? {
        callories: (list.sums.callories - 0) + (newProductToList.dataProduct.callories - 0),
        proteins: (list.sums.proteins - 0) + (newProductToList.dataProduct.proteins - 0),
        fats: (list.sums.fats - 0) + (newProductToList.dataProduct.fats - 0),
        carbohydrates:
          (list.sums.carbohydrates - 0) + (newProductToList.dataProduct.carbohydrates - 0),
      } : list.sums,
      listOfProducts:
        list.dateId === activeDay
          ? [
              ...list.listOfProducts,
              {
                id:
                  Math.max(
                    0,
                    Math.max(...list.listOfProducts.map(({ id }) => id))
                  ) + 1,
                productInDayList: newProductToList,
              },
            ]
          : list.listOfProducts,
    }));
    localforage.setItem("daylist-of-products", newState);
    return newState;
  })
  .on(deleteProductListDay, (state, { id }) => {
    const newState = state.map((list) => {
      let dataDeletedProduct: IDataProduct = {
        callories: 0,
        proteins: 0,
        fats: 0,
        carbohydrates: 0
      };
      list.listOfProducts.map((product) => (product.id === id) ? (dataDeletedProduct = product.productInDayList.dataProduct) : product);
      console.log(dataDeletedProduct);
      return {
      ...list,
      sums: list.dateId === now.getDate() ? {
        callories: (list.sums.callories - 0) - dataDeletedProduct.callories,
        proteins: (list.sums.proteins - 0) -  dataDeletedProduct.proteins,
        fats: (list.sums.fats - 0) - dataDeletedProduct.fats,
        carbohydrates: (list.sums.carbohydrates - 0) - dataDeletedProduct.carbohydrates
      } : list.sums,
      listOfProducts:
        list.dateId === now.getDate()
          ? list.listOfProducts.filter((product) => product.id !== id)
          : list.listOfProducts,
    }});
    localforage.setItem("daylist-of-products", newState);
    return newState;
  });
