type ProductCardProps = {
  imageUrl: string;
  inStock: boolean;
  onSale: boolean;
  hasGift: boolean;
  title: string;
  newPrice: string;
  oldPrice: string;
};

function ProductCard({
  imageUrl,
  inStock,
  onSale,
  hasGift,
  title,
  newPrice,
  oldPrice,
}: ProductCardProps) {
  return (
    <div className="card">
      <div
        className="card__img"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        if ({inStock}) <div className="label-in-stock">In stock</div>
        if ({onSale}) <div className="label-sale">SALE</div>
        if ({hasGift}) <div className="lebel-gift">Present</div>
      </div>
      <div className="card__info">
        <div className="card__info-title">{title}</div>
        <span className="price-new">${newPrice}</span>
        <span className="price-old">${oldPrice}</span>
      </div>
    </div>
  );
}

export default ProductCard;
