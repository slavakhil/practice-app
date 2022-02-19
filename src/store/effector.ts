import { IDay, IProduct, IPersonInfo } from '../models/types';
import { createEvent, createStore } from 'effector'

// events
export const addProduct = createEvent<IProduct>();
export const addProductToListDay = createEvent<{ activeDay: number; newProductToList: IProduct }>();
export const changeInfo = createEvent<IPersonInfo>();

// effects

// stores
export const $info = createStore<IPersonInfo>({
    weight: 60,
    height: 178,
    age: 20
}).on(changeInfo, (state, {weight, height, age}) => ({
    ...state,
    weight: weight,
    height: height,
    age: age
}))

export const $products = createStore<IProduct[]>([{
    idProduct: 1,
    name: 'Молоко',
    callories: 23
}])
.on(addProduct, (state, { name, callories }) => ([
    ...state,
    {
        idProduct: Date.now(),
        name,
        callories
    }
]))

export const $store = createStore<IDay[]>([
    {
        dateId: 0,
        listOfProducts: []
    },
    {
        dateId: 1,
        listOfProducts: [{idProduct: 2, name: 'wewe', callories: 15}]
    }
])
    .on(addProductToListDay, (state, { activeDay, newProductToList }) => state.map((list, i) => ({
        ...list,
        listOfProducts: (i === activeDay ? [...list.listOfProducts, newProductToList]  : list.listOfProducts)
    })))

$store.watch((index) => console.log(index))