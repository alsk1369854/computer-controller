import React, { useEffect, useRef } from "react";
import "./App.css";

import nipplejs from "nipplejs";

function App() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(ref);
    const joystickManager = nipplejs.create({
      zone: ref.current!,
      // mode: "dynamic",
      mode: "static",
      position: {
        left: "50%",
        top: "50%",
      },
      color: "white",
    });
    joystickManager.on("start", (event, data) => {
      console.log("start", event, data);
    });
    joystickManager.on("move", (event, data) => {
      console.log("move", event, data);
    });
  }, []);

  return (
    <div className="h-screen w-full bg-slate-800">
      <div ref={ref}></div>
    </div>
  );
}

export default App;
