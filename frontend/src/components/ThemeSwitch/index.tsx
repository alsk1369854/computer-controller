import React from "react";
import { Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { SwitchChangeEventHandler } from "antd/es/switch";

export interface IThemeSwitchProps {
  onChange?(isLightTheme: boolean): void;
}

const ThemeSwitch: React.FC<IThemeSwitchProps> = (props) => {
  const themeSwitchOnChange: SwitchChangeEventHandler = (checked, event) => {
    if (checked) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
    // 呼叫外部回調
    if (props.onChange) {
      props.onChange(checked);
    }
  };
  return (
    <div className="pt-8 px-4 flex justify-end">
      <div className="font-bold text-xl mr-2 dark:text-white">
        Theme switch:
      </div>
      <Switch
        className="mt-1"
        onChange={themeSwitchOnChange}
        checkedChildren={<SunOutlined />}
        unCheckedChildren={<MoonOutlined />}
        defaultChecked
      />
    </div>
  );
};
export default ThemeSwitch;
