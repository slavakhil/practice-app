import React, { useEffect, useState } from "react";
import "./App.css";
import { Modal } from "./common/Modal/Modal";
import { ModalInfo } from "./components/ModalInfo";
import { ModalProduct } from "./components/ModalProduct";
import { Selection } from "./components/Selection";
import { useStore } from "effector-react";
import { $info, $products, $store, getDayListOfProducts, getInfo, getProducts } from "./store/effector";
import { ListOfProducts } from "./components/ListOfProducts";

export const App: React.FC = () => {
  const [modalActiveInfo, setModalActiveInfo] = useState(false);
  const [modalActiveProduct, setModalActiveProduct] = useState(false);
  const [activeDay, setActiveDay] = useState(0);

  const info = useStore($info);
  const products = useStore($products);
  const dayList = useStore($store);

  useEffect(() => {
    getInfo();
    getProducts();
    getDayListOfProducts();
  }, [])

  return (
    <div>
      <Modal active={modalActiveInfo} setActive={setModalActiveInfo}>
        <ModalInfo />
      </Modal>
      
      <Modal active={modalActiveProduct} setActive={setModalActiveProduct}>
        <ModalProduct />
      </Modal>

      <div className="list-days">
        <span onClick={() => setActiveDay(0)}>1 </span>
        <span onClick={() => setActiveDay(1)}>2 </span>
      </div>
      <div className="info-block">
        <div className="info-block__data">
          {info && <div>Возраст: {info?.age}, вес: {info?.height}, рост: {info?.weight}</div>}
        </div>
        <button
          className="set-info__button"
          onClick={() => setModalActiveInfo(true)}
        >
          Options
        </button>
      </div>
      <div className="selection-block">
        <Selection
          products={products}
          activeDay={activeDay}
          dayList={dayList}
        />
      </div>
      <button
        className="add-product__button"
        onClick={() => setModalActiveProduct(true)}
      >
        Add product
      </button>
      <ListOfProducts dayList={dayList} activeDay={activeDay}/>
    </div>
  );
};
