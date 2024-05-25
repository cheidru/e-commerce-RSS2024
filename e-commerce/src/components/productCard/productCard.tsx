function ProductCard() {
  return (
    <div className="card">
      <div className="card__img">
        <div className="label-in-stock">In stock</div>
        <div className="label-sale">SALE</div>
        <div className="lebel-gift">Present</div>
      </div>
      <div className="card__info">
        <div className="card__info-title">Door Lock Golden Soft for Hotel</div>
        <span className="price-new">$33.00</span>
        <span className="price-old">$37.00</span>
      </div>
    </div>
  );
}

export default ProductCard;
