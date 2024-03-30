import React from "react";
import { Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

export interface IThemeSwitchProps {
  onChange?(checked: boolean): void;
}

const ThemeSwitch: React.FC<IThemeSwitchProps> = (props) => {
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
        defaultChecked
      />
    </div>
  );
};
export default ThemeSwitch;
