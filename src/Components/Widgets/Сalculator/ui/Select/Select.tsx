import { useEffect, useState } from "react";
import "./Select.css";
import { CalculatorParent } from "../../Calculator";

interface SelectProps {
  item: CalculatorParent[];
}

export const Select = ({ item }: SelectProps) => {
  const [onVisibleOption, setOnVisibleOption] = useState(false);
  const [valueOption, setValueOption] = useState("Вертикальные");
  
    useEffect(() => {
    if (item.length > 0) {
      setValueOption(item[0].name);
    }
  }, [item]);

  const onChangeOption = (option: string) => {
    setValueOption(option)
    setOnVisibleOption(false)
  }

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
        {valueOption}
      </div>

      {onVisibleOption && (
        <div className="selectComponent_options">
          {/* <div
            key="34FSW"
            className="selectComponent_option"
            onClick={() => onChangeOption("Вертикальные")}
          >
            Вертикальные
          </div> */}
          {item.map((option, i) => (
            <div
              key={i}
              className="selectComponent_option"
              onClick={() => onChangeOption(option.name)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
