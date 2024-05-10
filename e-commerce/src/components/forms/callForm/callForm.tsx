function CallForm() {
  return (
    <section className="call">
      <div className="wrapper call-box">
        <h2 className="call-title">Мы Вам перезвоним</h2>
        <div className="call-text">
          Если у вас возникли какие-то вопросы или проблемы, заполните <br />{' '}
          форму и мы Вам перезвоним.
        </div>
        <form className="form__call">
          <input
            className="form__call-name input-text"
            placeholder="Ваше имя"
            type="text"
            name="name"
            id="#"
          />
          <input
            className="form__call-email input-email"
            placeholder="Ваш Email"
            type="email"
            name="email"
            id="#"
          />
          <button className="form__call-btn btn-submit" type="submit">
            Отправить
          </button>
        </form>
      </div>
    </section>
  );
}

export default CallForm;
