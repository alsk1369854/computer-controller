import React, { useState } from "react";
import "./App.css";
import RemoteControl from "./components/RemoteControl";
import ThemeProvider, { ThemeType } from "./providers/ThemeProvider";
import ThemeSwitch from "./components/ThemeSwitch";

function App() {
  const [themeType, setThemeType] = useState<ThemeType>("light");

  return (
    <ThemeProvider theme={themeType}>
      <ThemeSwitch
        checked={themeType === "light"}
        onChange={(checked) =>
          checked ? setThemeType("light") : setThemeType("dark")
        }
      ></ThemeSwitch>
      <RemoteControl></RemoteControl>
    </ThemeProvider>
  );
}

export default App;
