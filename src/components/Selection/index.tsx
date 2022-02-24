import React from "react";
import { useForm } from "react-hook-form";
import { IProduct } from "../../models/types";
import { addProductToListDay } from "../../store/effector";

interface props {
  products: IProduct[];
  activeDay: number;
}

export const Selection: React.FC<props> = ({ products, activeDay }) => {
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm({
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
      <form onSubmit={onSubmit}>
        <label>Select product</label>
        <select {...register("options")}>
          {products
            .sort((prev, next) => {
              if (prev.name < next.name) return -1;
              if (prev.name < next.name) return 1;
              return 0;
            })
            .map((product) => (
              <option key={product.idProduct} value={product.idProduct}>{product.name} {product.weight}гр.</option>
            ))}
        </select>

        <input value="Add to list" type="submit" disabled={!isValid} />
      </form>
    </div>
  );
};
