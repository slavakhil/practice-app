import React from "react";
import { Selection } from "../../../Selection";
import { IList, IProduct } from "../../../../models/types";
import { deleteProductListDay } from "../../../../store/effector";
import "./index.css"

interface props {
  listOfProducts: IList[]
  activeDay: number;
  products: IProduct[];
  isToday: boolean;
}

export const SingleDayList: React.FC<props> = ({
  listOfProducts,
  activeDay,
  products,
  isToday,
}) => {
  return (
    <div>
      {isToday && (
        <div className="selection-block">
          <Selection products={products} activeDay={activeDay} />
        </div>
      )}
      {listOfProducts.length === 0 ? (
        <div className="single-product__element">There's no products</div>
      ) : (
        listOfProducts.map((product) => (
          <div key={product.id} className="single-product__element">
            <div>
            {isToday && (
              <button className="single-product__button" onClick={() => deleteProductListDay({ id: product.id })}>
                ✖
              </button>
            )}
            {product.productInDayList.name + " "}
            </div>
            <span className="single-product__info">
              ккал: {product.productInDayList.dataProduct.callories}, белки:{" "}
              {product.productInDayList.dataProduct.proteins}, жиры:{" "}
              {product.productInDayList.dataProduct.fats}, углеводы:{" "}
              {product.productInDayList.dataProduct.carbohydrates}
            </span>
          </div>
        ))
      )}
    </div>
  );
};
