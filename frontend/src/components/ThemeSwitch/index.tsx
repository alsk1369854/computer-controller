import React from "react";
import { Switch } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { SwitchChangeEventHandler } from "antd/es/switch";

export default function ThemeSwitch() {
  const themeSwitchOnChange: SwitchChangeEventHandler = (checked, event) => {
    if (checked) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  };
  return (
    <div className="pt-8 px-4 flex justify-end">
      <div className="font-bold text-xl dark:text-white">色調切換：</div>
      <Switch
        onChange={themeSwitchOnChange}
        checkedChildren={<SunOutlined />}
        unCheckedChildren={<MoonOutlined />}
        defaultChecked
      />
    </div>
  );
}
