import "./Calculator.css";
import Arrow_prev from "/landing/Arrow_prev.svg";
import Arrow_next from "/landing/Arrow_next.svg";
import { Select } from "./ui/Select/Select";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export interface CalculatorParent {
  id: number;
  name: string;
  image: string;
}

export interface IMaterial {
  id: number;
  title: string;
  preview: string;
  imageModel: string;
  product: {
    id: number;
    title: string;
    price: number;
  };
}

export const Calculator = () => {
  const [activeColor, setActiveColor] = useState(0);
  const [categories, setCategories] = useState<CalculatorParent[]>([]);
  const [materials, setMaterials] = useState<IMaterial[]>([]);
  const [widthValue, setWidthValue] = useState(0);
  const [heightValue, setHeightValue] = useState(0);

  const [page, setPage] = useState(0);
  const [activeFon, setActiveFon] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(9); // значение по умолчанию

  const totalPages = Math.ceil(materials.length / itemsPerPage);

  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleMaterials = materials.slice(startIndex, endIndex);


  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 656) {
        setItemsPerPage(5);
        console.log('Mobile:', window.innerWidth);
      } else {
        setItemsPerPage(9); // или другое значение для десктопа
      }
    };

    // Вызываем сразу
    updateItemsPerPage();

    // Добавляем слушатель
    window.addEventListener('resize', updateItemsPerPage);

    // Убираем слушатель при размонтировании
    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  useEffect(() => {
    if (visibleMaterials.length > 0) {
      setActiveFon(startIndex);
    }
  }, [page]);

  const priceTovar = materials[activeFon]?.product.price || 1900;

  const SumPrice = useMemo(() => {
    return (((widthValue * heightValue) / 10000) * priceTovar).toFixed(0);
  }, [widthValue, heightValue, priceTovar]);

  useEffect(() => {
    setActiveFon(0);
  }, [materials, setMaterials]);

  const arrPhotoColorFon = [
    ["/photo/002.png", "#E8E8E8"],
    ["/photo/001.png", "#FFE5B4"],
    ["/photo/003.png", "#FFFDDF"],
    ["/photo/004.png", "#CEEDD0"],
    ["/photo/005.png", "#C6DEF6"],
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api-vert.tusamgroup.ru/api/category/parent",
          {
            headers: {
              accept: "application/json",
            },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="calculator">
      <div className="price_calculator">
        <div className="price_calculator_container price_calculator-design">
          <h2 className="price_calculator-design_title">
            КАЛЬКУЛЯТОР ЖАЛЮЗИ И РУЛОННЫХ ШТОР
          </h2>
          <div className="price_calculator-design_example">
            <img
              className="wwwww"
              src={`https://api-vert.tusamgroup.ru/${materials[activeFon]?.imageModel}`}
              alt=""
              width={100}
              height={100}
            />
            <img
              className="price_calculator-design_example-image"
              src={arrPhotoColorFon[activeColor][0]}
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
                <div className="values_inputBox">
                  <input
                    onChange={(e) => setWidthValue(Number(e.target.value))}
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
                  <img
                    src="/photo/arrow-height.svg"
                    alt=""
                    width={25}
                    height={25}
                  />
                </div>
                <div className="values_inputBox">
                  <input
                    onChange={(e) => setHeightValue(Number(e.target.value))}
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
                  <img
                    src="/photo/arrow-width.svg"
                    alt=""
                    width={25}
                    height={25}
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="values_h3">ВЫБОР ТИПА ИЗДЕЛИЯ</h3>
              <p className="values_text">
                Выберите предпочтительный тип жалюзи или штор. Если сомневатесь
                в выборе — обратитесь к нашему специалисту. Вам помогут с
                выбором!
              </p>
              <Select setMaterial={setMaterials} item={categories} />
            </div>
            <div>
              <h3 className="values_h3 values_h3-margin">
                МАТЕРИАЛ И ЦВЕТ ПОЛОТНА
              </h3>
              <div className="values_slider">
                <img
                  onClick={() => setPage(page > 0 ? page - 1 : 0)}
                  className="values_slider_arrow"
                  src={Arrow_prev}
                  alt=""
                />

                <div className="valuse_colors">
                  {visibleMaterials.map((material, index) => (
                    <div
                      onClick={() => setActiveFon(startIndex + index)}
                      style={{
                        backgroundImage: `url("https://api-vert.tusamgroup.ru/${material.preview}")`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat", // фон вокруг изображения
                      }}
                      key={startIndex + index}
                      className={`valuse_colors_item ${
                        activeFon === startIndex + index
                          ? "valuse_colors_item_ActiveColor"
                          : ""
                      }`}
                    ></div>
                  ))}
                </div>

                <img
                  onClick={() =>
                    setPage(page < totalPages - 1 ? page + 1 : page)
                  }
                  className="values_slider_arrow"
                  src={Arrow_next}
                  alt=""
                />
                {/* <img
                  onClick={() =>
                    setActiveFon(activeFon != 0 ? activeFon - 1 : 0)
                  }
                  className="values_slider_arrow"
                  src={Arrow_prev}
                  alt=""
                />
                <div className="valuse_colors">
                  {materials &&
                    materials.map((material, index) => (
                      <div
                        onClick={() => setActiveFon(index)}
                        key={index}
                        className={`valuse_colors_item ${
                          activeFon == index && "valuse_colors_item_ActiveColor"
                        }`}
                        style={{
                          background: `url(https://api-vert.tusamgroup.ru/${material.preview})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                    ))}
                </div>
                <img
                  onClick={() =>
                    setActiveFon(
                      activeFon != materials.length - 1
                        ? activeFon + 1
                        : activeFon
                    )
                  }
                  className="values_slider_arrow"
                  src={Arrow_next}
                  alt=""
                /> */}
              </div>
            </div>

            {/* /////////////////////////////////////////////////////// */}
            <div>
              <h3 className="values_h3 values_h3-margin">ЦВЕТ СТЕН</h3>
              <div className="values_slider">
                <img
                  onClick={() =>
                    setActiveColor(activeColor != 0 ? activeColor - 1 : 0)
                  }
                  className="values_slider_arrow"
                  src={Arrow_prev}
                  alt=""
                />
                <div className="valuse_colors">
                  {arrPhotoColorFon.map((num, index) => (
                    <div
                      onClick={() => setActiveColor(index)}
                      key={index}
                      className={`valuse_colors_item ${
                        activeColor == index && "valuse_colors_item_ActiveColor"
                      }`}
                      style={{ background: num[1] }}
                    ></div>
                  ))}
                </div>
                <img
                  onClick={() =>
                    setActiveColor(
                      activeColor != arrPhotoColorFon.length - 1
                        ? activeColor + 1
                        : activeColor
                    )
                  }
                  className="values_slider_arrow"
                  src={Arrow_next}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="price_calculator-parameters_price">
            <h3 className="price_title">
              <p>ИТОГОВАЯ СТОИМОСТЬ</p>{" "}
              <p>{materials[activeFon]?.product?.price || 0} руб./м</p>
            </h3>
            <p className="price_text">
              Если вы не нашли подходящий вариант — обратитесь к нам по
              контактам, указанным ниже мы сделаем эскиз индивидуального заказ
            </p>
            <div className="price_container">
              <div className="price_sum">{SumPrice} ₽</div>
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
};
