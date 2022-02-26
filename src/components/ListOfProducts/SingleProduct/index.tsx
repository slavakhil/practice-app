import React, { useEffect, useState } from "react";
import { Selection } from "../../Selection";
import { IDay, IProduct } from "../../../models/types";
import { deleteProductListDay } from "../../../store/effector";

interface props {
  day: IDay;
  activeDay: number;
  products: IProduct[];
}

export const SingleProduct: React.FC<props> = ({ day, activeDay, products }) => {
  const [isOpen, setIsOpen] = useState(activeDay === day.dateId ? true : false);
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    activeDay === day.dateId && setIsToday(true);
  }, [activeDay, day.dateId]);

  const toggle = () => setIsOpen(!isOpen);

  const getTextDate = () => ({
    day: Math.floor(day.dateId / 1000000),
    month: Math.floor((day.dateId % 1000000) / 10000),
    year: day.dateId % 10000,
  })

  return (
    <div>
      <div className="single-product">
        <div onClick={toggle}>{getTextDate().day + "." + getTextDate().month + "." + getTextDate().year} ккал: {day.sums.callories}, белки: {day.sums.proteins}, жиры: {day.sums.fats}, углеводы: {day.sums.carbohydrates}</div>
        {isOpen && (
          <div>
            {isToday && (
              <div className="selection-block">
                <Selection products={products} activeDay={activeDay} />
              </div>
            )}
            {day.listOfProducts.length === 0 ? (
              <div className="single-product__element">There's no products</div>
            ) : (
              day.listOfProducts.map((product) => (
                <div key={product.id} className="single-product__element">
                  {product.productInDayList.name + " " + product.productInDayList.dataProduct.callories}
                  {isToday && <button onClick={() => deleteProductListDay({id: product.id})}>x</button>}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
