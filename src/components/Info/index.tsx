import React from "react";
import { IPersonInfo } from "../../models/types";
import settings from "../../assets/settings.svg";
import "./index.css";

interface props {
  info: IPersonInfo;
  setModalActiveInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setModalActiveStandart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Info: React.FC<props> = ({
  info,
  setModalActiveInfo,
  setModalActiveStandart,
}) => {
  return (
    <div className="info-block">
      <div className="info-block__data">
        {info && (
          <div className="data">
            <div className="data__item">
              Пол: {info?.sex === "male" ? "мужчина" : "девушка"}, возраст:{" "}
              {info?.age},
            </div>
            <div className="data__item"></div>
            <div className="data__item">
              вес: {info?.weight} кг, рост: {info?.height} см
            </div>
            <div className="data__item"></div>
          </div>
        )}
        <div className="info-buttons">
          <button
            className="info-block__settings"
            onClick={() => setModalActiveInfo(true)}
          >
            Настройки
          </button>
          <button
            className="info-block__recommendations"
            onClick={() => setModalActiveStandart(true)}
          >
            Рекомендации
          </button>
        </div>
      </div>
    </div>
  );
};
