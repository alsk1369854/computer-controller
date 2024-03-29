import React from "react";
import "./App.css";
import RemoteControl from "./components/RemoteControl";
import ThemeSwitch from "./components/ThemeSwitch";

function App() {
  return (
    <div className="h-screen w-full bg-white dark:bg-slate-900">
      <ThemeSwitch></ThemeSwitch>
      <RemoteControl></RemoteControl>
    </div>
  );
}

export default App;
