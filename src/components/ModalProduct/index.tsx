import React from 'react';
import { useForm } from 'react-hook-form'
import { IProduct } from '../../models/types';
import './ModalProduct.css'
import { addProduct } from "../../store/effector";


export const ModalProduct: React.FC = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<IProduct>({
    mode: "onBlur"
  });
  
  const onSubmit = handleSubmit(({ name, callories }) => {
    addProduct({
      idProduct: Date.now(),
      name,
      callories
    })
  })

  return(
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
          Callories
          <input type='number'
            {...register('callories', {
              required: 'Поле обязательно к заполнению',
              min: 1
            })}
          />
        </label>
        <div>{errors?.callories && errors?.callories?.message}</div>
        <input value="Добавить" type="submit" disabled={!isValid} />
      </form>
    </div>
  )
}