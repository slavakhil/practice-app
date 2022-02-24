import React, { useEffect, useState } from "react";
import "./App.css";
import { Modal } from "./common/Modal/Modal";
import { ModalInfo } from "./components/ModalInfo";
import { ModalProduct } from "./components/ModalProduct";
import { useStore } from "effector-react";
import {
  $info,
  $products,
  $store,
  addDay,
  getDayListOfProducts,
  getInfo,
  getProducts,
} from "./store/effector";
import { List } from "./components/ListOfProducts";

export const App: React.FC = () => {
  const date = new Date();

  const [modalActiveInfo, setModalActiveInfo] = useState(false);
  const [modalActiveProduct, setModalActiveProduct] = useState(false);
  const [activeDay, setActiveDay] = useState(date.getDate());

  const info = useStore($info);
  const products = useStore($products);
  const dayList = useStore($store);

  const isExist = () => {
    var hello = true;
    //dayList.map(day => day.dateId === activeDay ? (hello = false) : (console.log(day.dateId + " " + activeDay),hello = true));
    dayList.map((day) => (day.dateId === activeDay ? (hello = false) : ""));
    console.log(hello);
    return hello;
  };

  const addNewDay = () => {
    const getId = (date.getDate() + "" + (date.getMonth() + 1));
    console.log(getId)
    setActiveDay(date.getDate());
    if (isExist()) addDay({ dateId: activeDay, sums: {callories: 0, proteins: 0, fats: 0, carbohydrates: 0 }, listOfProducts: [] });
  };

  useEffect(() => {
    getInfo();
    getProducts();
    getDayListOfProducts();
  }, []);

  return (
    <div>
      <Modal active={modalActiveInfo} setActive={setModalActiveInfo}>
        <ModalInfo />
      </Modal>

      <Modal active={modalActiveProduct} setActive={setModalActiveProduct}>
        <ModalProduct />
      </Modal>
      <button onClick={addNewDay}>ADD</button>

      <div className="list-days"></div>
      <div className="info-block">
        <div className="info-block__data">
          {info && (
            <div>
              Пол: {info?.sex}, Возраст: {info?.age}, вес: {info?.height}, рост: {info?.weight}
            </div>
          )}
        </div>
        <button
          className="set-info__button"
          onClick={() => setModalActiveInfo(true)}
        >
          Options
        </button>
      </div>
      <button
        className="add-product__button"
        onClick={() => setModalActiveProduct(true)}
      >
        Add product
      </button>
      <List products={products} activeDay={activeDay} dayList={dayList} />
    </div>
  );
};
