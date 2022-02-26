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
  getId,
  getInfo,
  getProducts,
} from "./store/effector";
import { List } from "./components/ListOfProducts";
import { ModalStandart } from "./components/ModalStandart";

export const App: React.FC = () => {
  const date = new Date();
  const [modalActiveInfo, setModalActiveInfo] = useState(false);
  const [modalActiveProduct, setModalActiveProduct] = useState(false);
  const [modalActiveStandart, setModalActiveStandart] = useState(false);
  const [activeDay, setActiveDay] = useState(getId());

  const info = useStore($info);
  const products = useStore($products);
  const dayList = useStore($store);

  const isExist = () => {
    var existId = true;
    dayList.map((day) => (day.dateId === activeDay && (existId = false)));
    return existId;
  };

  const addNewDay = () => {
    if (isExist()) {
      addDay({
          dateId: activeDay,
          listOfProducts: [],
          sums:
          {
            callories: 0,
            proteins: 0,
            fats: 0,
            carbohydrates: 0
          },
        });
    }
  };

  useEffect(() => {
    getInfo();
    getProducts();
    getDayListOfProducts();
  }, []);

  return (
    <div className="container">
      <Modal active={modalActiveInfo} setActive={setModalActiveInfo}>
        <ModalInfo setActive={setModalActiveInfo} />
      </Modal>
      <Modal active={modalActiveProduct} setActive={setModalActiveProduct}>
        <ModalProduct setActive={setModalActiveProduct} />
      </Modal>
      <Modal active={modalActiveStandart} setActive={setModalActiveStandart}>
        <ModalStandart setActive={setModalActiveStandart} info={info} />
      </Modal>
      <button onClick={addNewDay}>ADD</button>

      <div className="main-block">
        <div className="info-block">
          <div className="info-block__data">
            {info && (
              <div>
                Пол: {info?.sex}, Возраст: {info?.age}, вес: {info?.weight}, рост: {info?.height}
              </div>
            )}
          </div>
          <button
            className="set-info__button"
            onClick={() => setModalActiveInfo(true)}
          >
            Options
          </button>
          <button onClick={() => setModalActiveStandart(true)}>Rec</button>
        </div>
        <button
          className="add-product__button"
          onClick={() => setModalActiveProduct(true)}
        >
          Add product
        </button>
        <List products={products} activeDay={activeDay} dayList={dayList} />
      </div>
    </div>
  );
};
