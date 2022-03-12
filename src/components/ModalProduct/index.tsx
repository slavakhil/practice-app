import React from "react";
import { useForm } from "react-hook-form";
import { IProduct } from "../../models/types";
import "./index.css";
import { addProduct } from "../../store/effector";

export const ModalProduct: React.FC<{
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setActive }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IProduct>({
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(({ name, weight, dataProduct }) => {
    addProduct({
      name,
      weight,
      dataProduct,
    });
    setActive(false);
  });

  return (
    <div>
      <h1>Добавление продукта</h1>
      <form className="modal-product" onSubmit={onSubmit}>
        <div>
          <div className="modal-product__input">
            <label>Название продукта</label>
            <div>
              <input
                placeholder="Введите название продукта"
                type="text"
                {...register("name", {
                  required: "Поле обязательно к заполнению",
                  maxLength: {
                    value: 35,
                    message: "Максимум 35 символов",
                  },
                  minLength: {
                    value: 3,
                    message: "Минимум 3 символа",
                  },
                })}
              />
              <div className="modal-product__error">
                {errors?.name && errors?.name?.message}
              </div>
            </div>
          </div>

          <div className="modal-product__input">
            <label>Вес, граммы</label>
            <div>
              <input
                placeholder="Введите вес"
                type="number"
                {...register("weight", {
                  required: "Поле обязательно к заполнению",
                  min: 0,
                })}
              />
            </div>
            <div className="modal-product__error">
              {errors?.weight && errors?.weight.message}
            </div>
          </div>

          <div className="modal-product__input">
            <label>Каллории</label>
            <div>
              <input
                placeholder="Введите количество каллорий"
                type="number"
                {...register("dataProduct.callories", {
                  required: "Поле обязательно к заполнению",
                  min: 0,
                })}
              />
            </div>
            <div className="modal-product__error">
              {errors?.dataProduct?.callories &&
                errors?.dataProduct.callories.message}
            </div>
          </div>

          <div className="modal-product__input">
            <label>Белки</label>
            <div>
              <input
                placeholder="Введите количество белков"
                type="number"
                step="0.1"
                {...register("dataProduct.proteins", {
                  required: "Поле обязательно к заполнению",
                  min: 0,
                })}
              />
            </div>
            <div className="modal-product__error">
              {errors?.dataProduct?.proteins &&
                errors?.dataProduct.proteins.message}
            </div>
          </div>

          <div className="modal-product__input">
            <label>Жиры</label>
            <div>
              <input
                placeholder="Введите количество жиров"
                type="number"
                step="0.1"
                {...register("dataProduct.fats", {
                  required: "Поле обязательно к заполнению",
                  min: 0,
                })}
              />
            </div>

            {errors?.dataProduct?.fats && (
              <div className="modal-product__error">
                {errors?.dataProduct.fats.message}
              </div>
            )}
          </div>

          <div className="modal-product__input">
            <label>Углеводы</label>
            <div>
              <input
                placeholder="Введите количество углеводов"
                type="number"
                step="0.1"
                {...register("dataProduct.carbohydrates", {
                  required: "Поле обязательно к заполнению",
                  min: 0,
                })}
              />
            </div>
            <div className="modal-product__error">
              {errors?.dataProduct?.carbohydrates &&
                errors?.dataProduct.carbohydrates.message}
            </div>
          </div>
        </div>
        <button className="modal-product__button" disabled={!isValid}>Добавить</button>
      </form>
    </div>
  );
};
