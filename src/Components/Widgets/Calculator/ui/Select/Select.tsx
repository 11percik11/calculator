import { useEffect, useState } from "react";
import axios from "axios";
import "./Select.css";
import { CalculatorParent, IMaterial } from "../../Calculator";

interface SelectProps {
  item: CalculatorParent[];
  setMaterial: (item: IMaterial[]) => void;
  setNameCatego: (data: [string, string]) => void;
}

export const Select = ({ item, setMaterial, setNameCatego }: SelectProps) => {
  const [onVisibleOption, setOnVisibleOption] = useState(false);
  const [valueOption, setValueOption] = useState("Вертикальные");
  const [categoryId, setCategoryId] = useState<number | null>(null);

  // При первой загрузке устанавливаем первую категорию и передаем ее наверх
  useEffect(() => {
    if (item.length > 0) {
      const firstCategory = item[0];
      setValueOption(firstCategory.name);
      setCategoryId(firstCategory.id);
      setNameCatego([firstCategory.name, firstCategory.image]); // ✅ передаем данные наверх
    }
  }, [item, setNameCatego]);

  // Загружаем материалы, когда выбранная категория изменилась
  useEffect(() => {
    if (categoryId !== null) {
      axios
        .get<IMaterial[]>(
          `https://api-vert.tusamgroup.ru/api/material?categoryId=${categoryId}`
        )
        .then((res) => setMaterial(res.data))
        .catch((err) => {
          console.error("Ошибка при загрузке материалов:", err);
        });
    }
  }, [categoryId, setMaterial]);

  const onChangeOption = (option: CalculatorParent) => {
    setValueOption(option.name);
    setCategoryId(option.id);
    setNameCatego([option.name, option.image]);
    setOnVisibleOption(false);
  };

  return (
    <div
      className="selectComponent"
      tabIndex={0}
      onBlur={() => setOnVisibleOption(false)}
    >
      <div
        className="selectComponent_value"
        onClick={() => setOnVisibleOption(!onVisibleOption)}
      >
        <p>{valueOption}</p>
        <img
          className={`selectComponent_arrow ${onVisibleOption ? "open" : ""}`}
          src="/photo/arrow-select.svg"
          alt=""
          width={35}
          height={35}
        />
      </div>

      {onVisibleOption && (
        <div className="selectComponent_options">
          {item.map((option, i) => (
            <div
              key={i}
              className="selectComponent_option"
              onClick={() => onChangeOption(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
