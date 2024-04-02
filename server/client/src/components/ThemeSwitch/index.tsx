import React from "react";
import { Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { SwitchChangeEventHandler } from "antd/es/switch";
import { ThemeType } from "../../theme/ThemeProvider";

export interface IThemeSwitchProps {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
}

const ThemeSwitch: React.FC<IThemeSwitchProps> = (props) => {
  const { theme, setTheme } = props;

  const switchOnChange: SwitchChangeEventHandler = (checked) => {
    if (checked) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div className="flex justify-end pt-8 pr-8">
      <div className="font-bold text-xl mr-2 dark:text-white">
        Theme switch:
      </div>
      <Switch
        className="mt-1"
        checkedChildren={<SunOutlined />}
        unCheckedChildren={<MoonOutlined />}
        checked={theme === "light"}
        onChange={switchOnChange}
      />
    </div>
  );
};
export default ThemeSwitch;
