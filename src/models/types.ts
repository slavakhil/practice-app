export interface IDataProduct{
    callories: number,
    proteins: number,
    fats: number,
    carbohydrates: number
}

export interface IProduct {
    idProduct: number,
    name: string,
    weight: number,
    dataProduct: IDataProduct
}

export interface IList {
    id: number,
    productInDayList: IProduct
}

export interface IDay {
    dateId: number, 
    sums: IDataProduct,
    listOfProducts: IList[]
}

export interface IPersonInfo {
    sex: "male" | "female",
    weight: number,
    height: number,
    age: number
}
