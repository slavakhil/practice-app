import React from 'react';
import { useForm } from 'react-hook-form'
import { IProduct } from '../../models/types';
import './ModalProduct.css'
import { addProduct } from "../../store/effector";


export const ModalProduct: React.FC<{ 
  setActive: React.Dispatch<React.SetStateAction<boolean>>
 }> = ({ setActive }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<IProduct>({
    mode: "onBlur"
  });

  const onSubmit = handleSubmit(({ name, weight, dataProduct }) => {
    addProduct({
      name,
      weight,
      dataProduct
    })
    setActive(false);
  })

  return (
    <div>
      <h1>Adding product</h1>
      <form onSubmit={onSubmit}>
        <label>
          Product's name
          <input type='text'
            {...register('name', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 3,
                message: 'Минимум 3 символа'
              }
            })}
          />
        </label>
        <div>{errors?.name && errors?.name?.message}</div>
        <label>
          Weight
          <input type='number'
            {...register('weight', {
              required: 'Поле обязательно к заполнению',
              min: 0
            })}
          />
        </label>
        <div>{errors?.weight && errors?.weight.message}</div>
        <label>
          Callories
          <input type='number'
            {...register('dataProduct.callories', {
              required: 'Поле обязательно к заполнению',
              min: 0
            })}
          />
        </label>
        <div>{errors?.dataProduct?.callories && errors?.dataProduct.callories.message}</div>
        <label>
          Proteins
          <input type='number' step='0.1'
            {...register('dataProduct.proteins', {
              required: 'Поле обязательно к заполнению',
              min: 0
            })}
          />
        </label>
        <div>{errors?.dataProduct?.proteins && errors?.dataProduct.proteins.message}</div>
        <label>
          Fats
          <input type='number' step='0.1'
            {...register('dataProduct.fats', {
              required: 'Поле обязательно к заполнению',
              min: 0
            })}
          />
        </label>
        <div>{errors?.dataProduct?.fats && errors?.dataProduct.fats.message}</div>
        <label>
          Carbohydrates
          <input type='number' step='0.1'
            {...register('dataProduct.carbohydrates', {
              required: 'Поле обязательно к заполнению',
              min: 0
            })}
          />
        </label>
        <div>{errors?.dataProduct?.carbohydrates && errors?.dataProduct.carbohydrates.message}</div>
        <input value="Добавить" type="submit" disabled={!isValid} />
      </form>
    </div>
  )
}