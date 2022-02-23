import React, { useEffect, useState } from 'react';
import { IDay, IProduct } from './models/types';
import { Single } from './Single';

interface props {
    dayList: IDay[];
    activeDay: number;
    products: IProduct[]
  }

export const List: React.FC<props> = ({dayList, activeDay, products}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {
                dayList.map(day => <Single activeDay={activeDay} day={day} products={products}/>)
            }
        </div>
    )
}
