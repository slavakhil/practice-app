import React from 'react';
import { IDay, IProduct } from '../../models/types';
import { SingleProduct } from './SingleProduct';

interface props {
    dayList: IDay[];
    activeDay: number;
    products: IProduct[]
  }

export const List: React.FC<props> = ({dayList, activeDay, products}) => {
    return (
        <div>
            {
                dayList.map(day => <SingleProduct key={day.dateId} activeDay={activeDay} day={day} products={products}/>)
            }
        </div>
    )
}
