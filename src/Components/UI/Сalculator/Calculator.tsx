import "./Calculator.css";

export const Calculator = () => {
  return (
    <div className="calculator">
      <div className="price_calculator">
        <div className="price_calculator_container price_calculator-design">
          <h2 className="price_calculator-design_title">
            КАЛЬКУЛЯТОР ЖАЛЮЗИ И РУЛОННЫХ ШТОР
          </h2>
          <div className="price_calculator-design_example">
            <img
              className="price_calculator-design_example-image"
              src="https://hoff.ru/upload/medialibrary/319/0ckpybiopzoam13afu21d28cwu7v4568.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="price_calculator_container price_calculator-parameters">
          <div className="price_calculator-parameters_values">
            <div>
              <h3 className="values_h3">ВВОД РАЗМЕРОВ ОКНА</h3>
              <p className="values_text">
                Укажите точные размеры проёма. Если не знаете — вызовите
                замерщика бесплатно.
              </p>
              <div className="values_boxInput">
                <input
                  placeholder="Введите высоту, см"
                  type="text"
                  inputMode="numeric"
                  className="values_input"
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    const input = e.currentTarget;
                    let v = input.value.replace(/\D/g, "");
                    if (v !== "" && Number(v) > 100000) v = "100000";
                    input.value = v;
                  }}
                />
                <input
                  placeholder="Введите ширину, см"
                  type="text"
                  inputMode="numeric"
                  className="values_input"
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    const input = e.currentTarget;
                    let v = input.value.replace(/\D/g, "");
                    if (v !== "" && Number(v) > 100000) v = "100000";
                    input.value = v;
                  }}
                />
              </div>
            </div>
            <div>
              <h3 className="values_h3">ВЫБОР ТИПА ИЗДЕЛИЯ</h3>
              <p className="values_text">
                Выберите предпочтительный тип жалюзи или штор. Если сомневатесь
                в выборе — обратитесь к нашему специалисту. Вам помогут с
                выбором!
              </p>
              <input
                placeholder="Введите высоту, см"
                type="text"
                inputMode="numeric"
                className="values_input"
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  const input = e.currentTarget;
                  let v = input.value.replace(/\D/g, "");
                  if (v !== "" && Number(v) > 100000) v = "100000";
                  input.value = v;
                }}
              />
            </div>
            <div>
              <h3 className="values_h3">МАТЕРИАЛ И ЦВЕТ ПОЛОТНА</h3>
              <div className="TTTT"></div>
            </div>
            <div>
              <h3 className="values_h3">ЦВЕТ СТЕН</h3>
              <div className="TTTT"></div>
            </div>
          </div>

          <div className="price_calculator-parameters_price">
            <h3 className="price_title">ИТОГОВАЯ СТОИМОСТЬ</h3>
            <p className="price_text">
              Если вы не нашли подходящий вариант — обратитесь к нам по
              контактам, указанным ниже мы сделаем эскиз индивидуального заказ
            </p>
            <div className="price_container">
              <div className="price_sum">10 790 ₽</div>
              <button className="price_buttonBasket">
                <img src="./Vector.svg" alt="" />
                ДОБАВИТЬ В КОРЗИНУ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
