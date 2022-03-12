import React from "react";
import { IDay, IProduct } from "../../models/types";
import { SingleDay } from "./SingleDay";
import update from "../../assets/update.svg";
import "./index.css";

interface props {
  dayList: IDay[];
  activeDay: number;
  products: IProduct[];
  setModalActiveProduct: React.Dispatch<React.SetStateAction<boolean>>;
  addNewDay: () => void;
}

export const List: React.FC<props> = ({
  dayList,
  activeDay,
  products,
  setModalActiveProduct,
  addNewDay,
}) => {
  return (
    <div className="list-of-products-block">
      <div className="setting-buttons">
        <button
          className="setting-buttons__add"
          onClick={() => setModalActiveProduct(true)}
        >
          Добавить продукт
        </button>
        <button className="setting-buttons__update" onClick={addNewDay}>
          <img src={update} alt="" />
        </button>
      </div>
      <div className="list-of-products-block__list">
        {dayList.map((day) => (
          <SingleDay
            key={day.dateId}
            activeDay={activeDay}
            day={day}
            products={products}
          />
        ))}
      </div>
    </div>
  );
};
