import { useEffect, useState } from "react";
import axios from "axios";
import "./Select.css";
import { CalculatorParent, IMaterial } from "../../Calculator";

interface SelectProps {
  item: CalculatorParent[];
  setMaterial: (item: IMaterial[]) => void;
  setNameCatego: (item: string) => void;
}

export const Select = ({ item, setMaterial, setNameCatego }: SelectProps) => {
  const [onVisibleOption, setOnVisibleOption] = useState(false);
  const [valueOption, setValueOption] = useState("Вертикальные");
  const [categoryId, setCategoryId] = useState<number | null>(null);

  useEffect(() => {
    if (item.length > 0) {
      setValueOption(item[0].name);
      setCategoryId(item[0].id); // предполагаю, что CalculatorParent имеет id
    }
  }, [item]);

  useEffect(() => {
    if (categoryId !== null) {
      axios
        .get<IMaterial[]>(
          `https://api-vert.tusamgroup.ru/api/material?categoryId=${categoryId}`
        )
        .then((res) => {
          setMaterial(res.data);
        })
        .catch((err) => {
          console.error("Ошибка при загрузке материалов:", err);
        });
    }
  }, [categoryId, setMaterial]);

  const onChangeOption = (option: CalculatorParent) => {
    setValueOption(option.name);
    setNameCatego(option.name)
    setCategoryId(option.id);
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
