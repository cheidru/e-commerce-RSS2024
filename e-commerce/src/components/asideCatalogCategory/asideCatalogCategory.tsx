import React from 'react';

export type OnClickType = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
export interface CategoryProps {
  name: string;
  id: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isCurrent: boolean;
}

export function Category({ name, id, onClick, isCurrent }: CategoryProps) {
  return (
    <button
      className={`category-btn ${isCurrent ? 'category-btn-active' : ''}`}
      data-id={id}
      data-name={name}
      onClick={onClick}
      tabIndex={0}
      type="submit"
    >
      {name}
    </button>
  );
}
