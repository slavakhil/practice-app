import React from 'react';
import './Modal.css';

interface props {
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>; 
}

export const Modal: React.FC<props> = ({ active, setActive, children }) => {
  return (
    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
        <div className={active ? "modal__content active" : "modal__content"} onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
      
    </div>
  );
}