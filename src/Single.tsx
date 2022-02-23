import React, { useEffect, useState } from "react";
import { Selection } from "./components/Selection";
import { IDay, IProduct } from "./models/types";
import { deleteProductListDay } from "./store/effector";

interface props {
  day: IDay;
  activeDay: number;
  products: IProduct[];
}

export const Single: React.FC<props> = ({ day, activeDay, products }) => {
  const [isOpen, setIsOpen] = useState(activeDay === day.dateId ? true : false);
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    if (activeDay === day.dateId) setIsToday(true);
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div>
        <div onClick={toggle}>{day.dateId}</div>
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
                <div>
                  {product.name + " " + product.callories}
                  {isToday && <button onClick={() => deleteProductListDay({id: product.idProduct})}>x</button>}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
