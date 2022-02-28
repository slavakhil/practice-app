import React from "react";
import { IDay } from "../../../../models/types";
import "./index.css"

interface props {
  day: IDay;
  toggle: () => void
}

export const SingleProductTitle: React.FC<props> = ({
  day,
  toggle
}) => {
  const getTextDate = () => ({
    day: Math.floor(day.dateId / 1000000),
    month: Math.floor((day.dateId % 1000000) / 10000),
    year: day.dateId % 10000,
  });

  return (
      <div>
        <div className="single-product__title" onClick={toggle}>
          {getTextDate().day +
            "." +
            (getTextDate().month < 10
              ? "0" + getTextDate().month
              : getTextDate().month) +
            "." +
            getTextDate().year}{" "}
          <span className="single-product__info">
            ккал: {day.sums.callories}, белки: {day.sums.proteins}, жиры:{" "}
            {day.sums.fats}, углеводы: {day.sums.carbohydrates}
          </span>          
        </div>
      </div>
  );
};
