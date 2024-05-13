function ProductCard() {
  return (
    <div className="card">
      <div className="card__img">
        <div className="label-in-stock">В наличии</div>
        <div className="label-sale">SALE</div>
        <div className="lebel-gift">Подарок</div>
      </div>
      <div className="card__info">
        <div className="card__info-title">
          Дверной Замок Golden Soft для отеля
        </div>
        <span className="price-new">33 000₽</span>
        <span className="price-old">37 000₽</span>
      </div>
    </div>
  );
}

export default ProductCard;
