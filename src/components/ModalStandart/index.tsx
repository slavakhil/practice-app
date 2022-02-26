import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { IDataProduct, IPersonInfo, IProduct } from '../../models/types';
import './ModalStandart.css'


export const ModalStandart: React.FC<{
  setActive: React.Dispatch<React.SetStateAction<boolean>>
  info: IPersonInfo
}> = ({ setActive, info }) => {
  const {
    register,
    formState: { isValid },
    handleSubmit
  } = useForm({
    mode: "onBlur"
  });

  const [standart, setStandart] = useState<IDataProduct>()

  const onSubmit = handleSubmit(({ activity, goal }) => {
    const commonCount = 10 * info.weight + 6.25 * info.height - 5 * info.age;
    const calloriesStandart = (info.sex === 'male')
      ? Math.round((commonCount + 5) * activity)
      : Math.round((commonCount - 161) * activity);
    setStandart({
      callories: calloriesStandart,
      proteins: Math.round(calloriesStandart * 0.3 / 4),
      fats: (goal === 3) ? Math.round(calloriesStandart * 0.2 / 9) : Math.round((calloriesStandart * 0.3 / 9)),
      carbohydrates: (goal === 3) ? Math.round(calloriesStandart * 0.5 / 4) : Math.round(calloriesStandart * 0.4 / 4)
    })
  })

  return (
    <div>
      <h1>Standart</h1>
      <form onSubmit={onSubmit}>
        <label>
          Activity
          <select {...register("activity")}>
            <option value="1.2">No activity</option>
            <option value="1.375">Low activity</option>
            <option value="1.55">Middle Activity</option>
            <option value="1.7">High activity</option>
            <option value="1.9">Extremely Activity</option>
          </select>
        </label>
        <div></div>
        <label>
          Goal
          <select {...register("goal")}>
            <option value="1">Weight gain</option>
            <option value="2">Weight maintenance</option>
            <option value="3">Weight loss</option>
          </select>
        </label>
        <div></div>
        <input value="Показать" type="submit" disabled={!isValid} />
      </form>
      {
        standart &&
        <div>Your standart is: 
          <div>{standart.callories} callories;</div>
          <div>{standart.proteins} proteins;</div>
          <div>{standart.fats} fats;</div>
          <div>{standart.carbohydrates} carbohydrates;</div>
        </div>
      }
    </div>
  )
}