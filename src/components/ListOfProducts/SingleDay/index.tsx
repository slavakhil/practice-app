import React, { useEffect, useState } from "react";
import { IDay, IProduct } from "../../../models/types";
import {SingleDayTitle} from "./SingleDayTitle"
import { SingleDayList } from "./SingleDayList";
import "./index.css"

interface props {
  day: IDay;
  activeDay: number;
  products: IProduct[];
}

export const SingleDay: React.FC<props> = ({
  day,
  activeDay,
  products,
}) => {
  const [isOpen, setIsOpen] = useState(activeDay === day.dateId ? true : false);
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    activeDay === day.dateId && setIsToday(true);
  }, [activeDay, day.dateId]);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="single-product">
      <SingleDayTitle day={day} toggle={toggle} />
      {isOpen && <SingleDayList activeDay={activeDay} listOfProducts={day.listOfProducts} products={products} isToday={isToday}/>}
    </div>
  );
};
