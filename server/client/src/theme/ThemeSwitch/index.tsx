import React from "react";
import { Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

export interface IThemeSwitchProps {
  className?: string;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
}

const ThemeSwitch: React.FC<IThemeSwitchProps> = (props) => {
  return (
    <Switch
      {...props}
      checkedChildren={<SunOutlined />}
      unCheckedChildren={<MoonOutlined />}
    />
  );
};
export default ThemeSwitch;
