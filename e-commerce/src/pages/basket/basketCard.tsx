import {
  addLineToCart,
  substLineFromCart,
  removeLineFromCart,
} from '../../services/api/cart';
import { useAppDispatch } from '../../redux/hooks';

export type BasketCardProps = {
  lineId: string;
  id: string;
  imageUrl: string[];
  inStock?: boolean;
  onSale: boolean;
  hasGift?: boolean;
  title: string;
  newPrice: string;
  oldPrice: string;
  currency: string;
  quantity: number;
  fullPrice: string;
  size?: string;
  color?: string;
  model?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export function BasketCard({
  lineId,
  id,
  imageUrl,
  inStock = false,
  onSale,
  hasGift = false,
  title,
  newPrice,
  oldPrice,
  currency,
  quantity,
  fullPrice,
  size,
  color,
  model,
  onClick,
}: BasketCardProps) {
  const dispatch = useAppDispatch();
  return (
    <div className="basket-card">
      <div className="basket-card__header">
        <button
          type="button"
          className="basket-card-btn basket-card-btn-remove"
          onClick={(e) => {
            e.stopPropagation();
            removeLineFromCart(dispatch, lineId);
          }}
        >
          x
        </button>
        {inStock && <div className="label-in-stock">In stock</div>}
        {onSale && <div className="label-sale">SALE</div>}
        {hasGift && <div className="label-gift">Present</div>}
      </div>
      <div
        className="basket-card__img"
        style={{ backgroundImage: `url(${imageUrl[0]})` }}
        data-id={id}
        onClick={onClick}
        aria-hidden="true"
      />
      <div className="card__info">
        <div className="card__info-title">{title}</div>
        <div className="basket-card__info-description">
          {model} / {color}
        </div>
        {size && <div className="basket-card__info-description">{size}</div>}
        <span className="basket-price-new">
          {currency} {newPrice}
        </span>
        {onSale && (
          <span className="basket-price-old">
            {currency} {oldPrice}
          </span>
        )}
        <div className="basket-card__info-quantity">
          Quantity: {quantity}
          <div className="basket-card_buttons">
            <button
              type="button"
              className="basket-card-btn"
              onClick={(e) => {
                e.stopPropagation();
                substLineFromCart(dispatch, lineId);
              }}
            >
              -
            </button>
            <button
              type="button"
              className="basket-card-btn"
              onClick={(e) => {
                e.stopPropagation();
                addLineToCart(dispatch, id);
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="basket-price-new">Full price: {fullPrice}</div>
      </div>
    </div>
  );
}
