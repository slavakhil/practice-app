import React from "react";
import { useForm } from "react-hook-form";
import { IPersonInfo } from "../../models/types";
import { changeInfo } from "../../store/effector";
import "./ModalInfo.css";

export const ModalInfo: React.FC<{
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setActive }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IPersonInfo>({
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(({ sex, weight, height, age }) => {
    changeInfo({ sex, weight, height, age });
    setActive(false);
  });

  return (
    <div>
      <h1>Настройка профиля</h1>
      <form className="modal-info" onSubmit={onSubmit}>
        <div className="modal-info__input">
          <label>Пол</label>
          <div>
            <select {...register("sex")}>
              <option value="male">Мужчина</option>
              <option value="female">Женщина</option>
            </select>
          </div>
        </div>

        <div className="modal-info__input">
          <label>Вес, кг</label>
          <div>
            <input
              placeholder="Введите вес"
              type="number"
              {...register("weight", {
                required: "Поле обязательно к заполнению",
                min: 1,
              })}
            />
          </div>
          <div className="modal-info__error">
            {errors?.weight && (errors?.weight?.message || "Error")}
          </div>
        </div>

        <div className="modal-info__input">
          <label>Рост, см</label>
          <div>
            <input
              placeholder="Введите рост"
              type="number"
              {...register("height", {
                required: "Поле обязательно к заполнению",
                min: 1,
              })}
            />
          </div>
          <div className="modal-info__error">
            {errors?.height && (errors?.height?.message || "Error")}
          </div>
        </div>

        <div className="modal-info__input">
          <label>Возраст</label>
          <div>
            <input
              placeholder="Введите возраст"
              type="number"
              {...register("age", {
                required: "Поле обязательно к заполнению",
                min: 1,
              })}
            />
          </div>
          <div className="modal-info__error">
            {errors?.age && (errors?.age?.message || "Error")}
          </div>
        </div>

        <button className="modal-info__button" disabled={!isValid}>Принять</button>
      </form>
    </div>
  );
};
