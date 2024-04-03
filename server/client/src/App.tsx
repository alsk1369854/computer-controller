import React, { useEffect } from "react";
import "./App.css";
import RemoteControl from "./pages/RemoteControl";
import ThemeProvider from "./theme/ThemeProvider";
import ThemeSwitch from "./components/ThemeSwitch";
import { useThemeType } from "./hooks/useThemeType";

function App() {
  const [themeType, setThemeType] = useThemeType();

  useEffect(() => {
    // 阻止兩指縮放畫面 [Safari only]
    document.addEventListener("gesturestart", function (event) {
      event.preventDefault();
    });
  }, []);

  return (
    <ThemeProvider theme={themeType}>
      <ThemeSwitch theme={themeType} setTheme={setThemeType}></ThemeSwitch>
      <RemoteControl></RemoteControl>
    </ThemeProvider>
  );
}

export default App;
