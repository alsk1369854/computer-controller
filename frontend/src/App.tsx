import React, { useState } from "react";
import "./App.css";
import RemoteControl from "./components/RemoteControl";
import ThemeProvider, { ThemeType } from "./theme/ThemeProvider";
import ThemeSwitch from "./theme/ThemeSwitch";

const isOSThemeOnDark = (): boolean => {
  // 查看系統樣式主題是否為 dark
  return matchMedia("(prefers-color-scheme: dark)").matches;
};

function App() {
  const [themeType, setThemeType] = useState<ThemeType>(
    isOSThemeOnDark() ? "dark" : "light"
  );

  return (
    <ThemeProvider theme={themeType}>
      {/* Theme switch */}
      <div className="flex justify-end pt-8 pr-8">
        <div className="font-bold text-xl mr-2 dark:text-white">
          Theme switch:
        </div>
        <ThemeSwitch
          className="mt-1"
          defaultChecked={!isOSThemeOnDark()}
          onChange={(checked) =>
            checked ? setThemeType("light") : setThemeType("dark")
          }
        ></ThemeSwitch>
      </div>

      {/* body */}
      <RemoteControl></RemoteControl>
    </ThemeProvider>
  );
}

export default App;
