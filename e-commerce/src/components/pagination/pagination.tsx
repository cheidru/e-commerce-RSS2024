import { MouseEventHandler } from 'react';

export interface PaginationProps {
  id: number;
  onClick?: MouseEventHandler;
  isCurrent: boolean;
}

// Pagination Buttons
function Pagination({ id, onClick, isCurrent }: PaginationProps) {
  return (
    <button
      type="submit"
      value={id}
      onClick={onClick}
      className={`pagination-btn ${isCurrent ? 'pagination-btn-active' : ''}`}
    >
      {id + 1}
    </button>
  );
}

export default Pagination;
