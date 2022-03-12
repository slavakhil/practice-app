import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IDataProduct, IPersonInfo, IProduct } from "../../models/types";
import "./index.css";

export const ModalStandart: React.FC<{
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  info: IPersonInfo;
}> = ({ setActive, info }) => {
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });

  const [standart, setStandart] = useState<IDataProduct>();

  const onSubmit = handleSubmit(({ activity, goal }) => {
    const commonCount = 10 * info.weight + 6.25 * info.height - 5 * info.age;
    const calloriesStandart =
      info.sex === "male"
        ? Math.round((commonCount + 5) * activity)
        : Math.round((commonCount - 161) * activity);
    setStandart({
      callories: calloriesStandart,
      proteins: Math.round((calloriesStandart * 0.3) / 4),
      fats:
        goal === "3"
          ? Math.round((calloriesStandart * 0.2) / 9)
          : Math.round((calloriesStandart * 0.3) / 9),
      carbohydrates:
        goal === "3"
          ? Math.round((calloriesStandart * 0.5) / 4)
          : Math.round((calloriesStandart * 0.4) / 4),
    });
  });

  return (
    <div className="recommendations-block">
      <h1>Рекоммендации</h1>
      <form onSubmit={onSubmit}>
        <div>
          <div className="modal-standart__select">
            <label>Образ жизни</label>
            <div>
              <select {...register("activity")}>
                <option value="1.2">Неактивный</option>
                <option value="1.375">Слабая активность</option>
                <option value="1.55">Средняя активность</option>
                <option value="1.7">Высокая активность</option>
                <option value="1.9">Экстремальная активность</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <div className="modal-standart__select">
            <label>Цель</label>
            <div>
              <select {...register("goal")}>
                <option value="1">Набор массы</option>
                <option value="2">Поддержание веса</option>
                <option value="3">Снижение веса</option>
              </select>
            </div>
          </div>
        </div>

        <button className="modal-standart__button" disabled={!isValid}>Показать</button>
      </form>

      {standart ? (
        <div className="recommendations">
          Рекоммендации по питанию:
          <div className="recommendations__item">
            Ккал: {standart.callories}
          </div>
          <div className="recommendations__item">
            Белки: {standart.proteins}
          </div>
          <div className="recommendations__item">Жиры: {standart.fats}</div>
          <div className="recommendations__item">
            Углеводы: {standart.carbohydrates}
          </div>
        </div>
      ) : (
        <div className="recommendations">
          Выберите образ жизни и цель и нажмите "Принять"
        </div>
      )}
    </div>
  );
};
