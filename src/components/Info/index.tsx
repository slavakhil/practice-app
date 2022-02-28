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
          <div>
            <div>Пол: {info?.sex === "male" ? "Мужчина" : "Девушка"},</div>
            <div>Возраст: {info?.age},</div>
            <div>Вес: {info?.weight} кг,</div>
            <div>Рост: {info?.height} см</div>
          </div>
        )}
      </div>
      <button
        className="info-block__button"
        onClick={() => setModalActiveInfo(true)}
      >
        <img src={settings} alt="" />
      </button>
      <button
        className="info-block__recommendations"
        onClick={() => setModalActiveStandart(true)}
      >
        Rec
      </button>
    </div>
  );
};
