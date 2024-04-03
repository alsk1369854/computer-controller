import React from "react";
import { SizeType } from "antd/es/config-provider/SizeContext";
import MouseControlFrame from "./MouseControlFrame";
import KeyboardControlFrame from "./KeyboardControlFrame";

export default function RemoteControl() {
  const size: SizeType = "large";

  return (
    <div className="flex-col p-8">
      <KeyboardControlFrame className="mb-8" size={size}></KeyboardControlFrame>
      <MouseControlFrame></MouseControlFrame>
    </div>
  );
}
