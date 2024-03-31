import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

// 獲取系統樣式主題
const prefers = matchMedia("(prefers-color-scheme: dark)");
const isLightTheme = !prefers.matches;

export interface IThemeSwitchProps {
  checked?: boolean;
  onChange?(checked: boolean): void;
}

const ThemeSwitch: React.FC<IThemeSwitchProps> = (props) => {
  const [checked, setChecked] = useState<boolean>(true);

  // useEffect(() => {
  //   if (props.checked) {
  //     setChecked(props.checked);
  //   } else {
  //     setChecked(isLightTheme);
  //   }
  // }, [props]);

  // useEffect(() => {
  //   if (props.onChange) {
  //     props.onChange(checked);
  //   }
  // }, [props, checked]);

  return (
    <div className="pt-8 px-4 flex justify-end">
      <div className="font-bold text-xl mr-2 dark:text-white">
        Theme switch:
      </div>
      <Switch
        className="mt-1"
        onChange={props.onChange}
        checkedChildren={<SunOutlined />}
        unCheckedChildren={<MoonOutlined />}
        checked={props.checked}
      />
    </div>
  );
};
export default ThemeSwitch;
