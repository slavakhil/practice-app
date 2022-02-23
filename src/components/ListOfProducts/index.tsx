import React from "react";
import { IDay } from "../../models/types";

interface props {
  dayList: IDay[];
  activeDay: number;
}

export const ListOfProducts: React.FC<props> = ({ dayList, activeDay }) => {
  

  return (
    <div>
      {dayList[activeDay].listOfProducts[0] ? (
        dayList[activeDay].listOfProducts.map((product) => (
          <div>{/*product.name + " " + product.callories*/}</div>
        ))
      ) : (
        <div>There's no products</div>
      )}
    </div>
  );
};
