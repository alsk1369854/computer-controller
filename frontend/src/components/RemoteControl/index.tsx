import React from "react";
import Nipplejs, { JoystickManagerOnEventHandler } from "../Nipplejs";
import { JoystickManagerOptions } from "nipplejs";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Input, Button, Space } from "antd";

export default function RemoteControl() {
  const size: SizeType = "large";

  const nipplejsOptions: JoystickManagerOptions = {
    mode: "static",
    position: {
      left: "50%",
      top: "70%",
    },
    size: 200,
    color: "#B6AFAE",
  };
  const nipplejsOnMove: JoystickManagerOnEventHandler = (event, data) => {
    console.log("move", event, data);
  };
  const nipplejsOnStart: JoystickManagerOnEventHandler = (event, data) => {
    console.log("start", event, data);
  };

  const backspaceButtonOnClick = () => {};

  return (
    <div className="flex-col p-8">
      {/* // 鍵盤控制 */}
      <div className="p-4 mb-12 border-solid border-2 rounded-md ">
        <div className="font-bold text-xl mb-4 dark:text-white">鍵盤控制</div>
        <Button
          className="w-full mb-4"
          danger
          type="primary"
          size={size}
          onClick={backspaceButtonOnClick}
        >
          Backspace
        </Button>
        <Space.Compact className="w-full " size={size}>
          <Input placeholder="鍵盤輸入" size={size} />
          <Button type="primary" size={size}>
            Enter
          </Button>
        </Space.Compact>
      </div>

      {/* 滑鼠控制 */}
      <div className="p-4 border-solid border-2 rounded-md">
        <div className="font-bold text-xl mb-4 dark:text-white">滑鼠控制</div>
        <div className="flex">
          <Button className="flex-auto mx-4" type="primary" size={size}>
            Left click
          </Button>
          <Button className="flex-auto mx-4" type="primary" size={size}>
            Right click
          </Button>
        </div>
        <Nipplejs
          options={nipplejsOptions}
          onMove={nipplejsOnMove}
          onStart={nipplejsOnStart}
        ></Nipplejs>
      </div>
    </div>
  );
}
