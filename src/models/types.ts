export interface IProduct {
    idProduct: number,
    name: string,
    callories: number
}

export interface IDay {
    dateId: number, 
    listOfProducts: IProduct[],

}

export interface IPersonInfo {
    weight: number,
    height: number,
    age: number
}
