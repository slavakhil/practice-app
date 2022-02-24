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
    if (activeDay === day.dateId) setIsToday(true);
  }, [activeDay, day.dateId]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div style={{border: "1px solid #000", width: "600px"}}>
        <div onClick={toggle}>{day.dateId} callories: {day.sums.callories}, proteins: {day.sums.proteins}, fats: {day.sums.fats}, carbohydrates: {day.sums.carbohydrates}</div>
        {isOpen && (
          <div>
            {isToday && (
              <div className="selection-block">
                <Selection products={products} activeDay={activeDay} />
              </div>
            )}
            {day.listOfProducts.length === 0 ? (
              <div>There's no products</div>
            ) : (
              day.listOfProducts.map((product) => (
                <div key={product.id}>
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
