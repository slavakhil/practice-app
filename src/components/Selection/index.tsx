import React from "react";
import { useForm } from "react-hook-form";
import { IProduct } from "../../models/types";
import { addProductToListDay } from "../../store/effector";
import addIcon from "../../assets/add.svg";
import "./index.css";

interface props {
  products: IProduct[];
  activeDay: number;
}

export const Selection: React.FC<props> = ({ products, activeDay }) => {
  const { register, handleSubmit } = useForm({
    mode: "onBlur",
  });

  const onSubmit = handleSubmit<IProduct>((data) => {
    const newProductToList = products.find(
      (item) => item.idProduct === parseInt(data.options, 10)
    );
    if (newProductToList) addProductToListDay({ activeDay, newProductToList });
  });

  return (
    <div>
      <form className="selection-block" onSubmit={onSubmit}>
        <div className="selection-block__adding">
          <label>Выберите продукт</label>
          <div>
            <select {...register("options")}>
              {products
                .sort((prev, next) => {
                  if (prev.name < next.name) return -1;
                  if (prev.name < next.name) return 1;
                  return 0;
                })
                .map((product) => (
                  <option key={product.idProduct} value={product.idProduct}>
                    {product.name} {product.weight} г
                  </option>
                ))}
            </select>
            <button className="add-product-to-list__button">
              ➕
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
