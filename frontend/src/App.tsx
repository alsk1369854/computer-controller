import React, { useState } from "react";
import "./App.css";
import RemoteControl from "./components/RemoteControl";
import ThemeSwitch from "./components/ThemeSwitch";
import { ConfigProvider, ThemeConfig, theme } from "antd";

function App() {
  const [antdTheme, setAntdTheme] = useState<ThemeConfig>({
    algorithm: theme.defaultAlgorithm,
  });
  const onThemeSwitch = (isLightTheme: boolean) => {
    if (isLightTheme) {
      setAntdTheme({
        algorithm: theme.defaultAlgorithm,
      });
    } else {
      setAntdTheme({
        algorithm: theme.darkAlgorithm,
      });
    }
  };
  return (
    <ConfigProvider theme={antdTheme}>
      <div className="h-screen w-full bg-white dark:bg-slate-900">
        <ThemeSwitch onChange={onThemeSwitch}></ThemeSwitch>
        <RemoteControl></RemoteControl>
      </div>
    </ConfigProvider>
  );
}

export default App;
