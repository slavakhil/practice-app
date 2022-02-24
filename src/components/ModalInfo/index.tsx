import React from "react";
import { useForm } from "react-hook-form";
import { IPersonInfo } from "../../models/types";
import "./ModalInfo.css";
import { changeInfo } from "../../store/effector";

export const ModalInfo: React.FC = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IPersonInfo>({
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(({ sex, weight, height, age }) => {
    changeInfo({ sex: sex, weight, height, age });
  });

  return (
    <div>
      <h1>Personal info</h1>
      <form onSubmit={onSubmit}>
        <label>
          Sex
          <select {...register("sex")}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <div></div>
        <label>
          Weight
          <input
            type="number"
            {...register("weight", {
              required: "Поле обязательно к заполнению",
              min: 1,
            })}
          />
        </label>
        <div>{errors?.weight && (errors?.weight?.message || "Error")}</div>
        <label>
          Height
          <input
            type="number"
            {...register("height", {
              required: "Поле обязательно к заполнению",
              min: 1,
            })}
          />
        </label>
        <div>{errors?.height && (errors?.height?.message || "Error")}</div>
        <label>
          Age
          <input
            type="number"
            {...register("age", {
              required: "Поле обязательно к заполнению",
              min: 1,
            })}
          />
        </label>
        <div>{errors?.age && (errors?.age?.message || "Error")}</div>
        <input value="Принять" type="submit" disabled={!isValid} />
      </form>
    </div>
  );
};
