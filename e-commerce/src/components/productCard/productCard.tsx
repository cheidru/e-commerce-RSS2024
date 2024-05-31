export type ProductCardProps = {
  imageUrl: string;
  inStock?: boolean;
  onSale: boolean;
  hasGift?: boolean;
  title: string;
  description: string;
  newPrice: number;
  oldPrice: number;
  currency: string;
  id: string;
};

export function ProductCard({
  imageUrl,
  inStock = false,
  onSale,
  hasGift = false,
  title,
  description,
  newPrice,
  oldPrice,
  currency,
  id,
}: ProductCardProps) {
  return (
    <div className="card" data-id={id}>
      <div
        className="card__img"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {inStock && <div className="label-in-stock">In stock</div>}
        {onSale && <div className="label-sale">SALE</div>}
        {hasGift && <div className="label-gift">Present</div>}
      </div>
      <div className="card__info">
        <div className="card__info-title">{title}</div>
        <div className="card__info-description">{description}</div>
        <span className="price-new">
          {currency}
          {newPrice}
        </span>
        {onSale && (
          <span className="price-old">
            {currency}
            {oldPrice}
          </span>
        )}
      </div>
    </div>
  );
}
