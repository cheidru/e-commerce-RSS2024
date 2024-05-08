import CategoryImg from '../../assets/img/category/фото.png';

function Category() {
  return (
    <div className="category__card">
      <img className="gategory__card-bg" src={CategoryImg} alt="category" />
      <div className="category__card__wrapper">
        <h5 className="category__card-title">Для отелей</h5>
        <button className="category__card-btn" type="submit">
          Перейти
        </button>
      </div>
    </div>
  );
}

export default Category;
