export type ProductCardProps = {
  imageUrl: string;
  inStock?: boolean;
  onSale: boolean;
  hasGift?: boolean;
  title: string;
  newPrice: number;
  oldPrice?: number;
  id: string;
};

export function ProductCard({
  imageUrl,
  inStock = false,
  onSale,
  hasGift = false,
  title,
  newPrice,
  oldPrice,
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
        {hasGift && <div className="lebel-gift">Present</div>}
      </div>
      <div className="card__info">
        <div className="card__info-title">{title}</div>
        <span className="price-new">${newPrice}</span>
        <span className="price-old">${oldPrice}</span>
      </div>
    </div>
  );
}
