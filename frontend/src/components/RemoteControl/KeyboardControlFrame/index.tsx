import { Button, Space, Input } from "antd";
import React from "react";
import { keyboardController } from "../../../apis/KeyboardController";
import { SizeType } from "antd/es/config-provider/SizeContext";

interface IKeyboardControlFrameProps {
  className?: string;
  size: SizeType;
}

const KeyboardControlFrame: React.FC<IKeyboardControlFrameProps> = (props) => {
  const { size } = props;

  return (
    <div className={props.className}>
      <div className="p-4 border-solid border-2 rounded-lg ">
        <div className="font-bold text-xl mb-4 dark:text-white">
          Keyboard Control
        </div>
        <Button
          className="w-full mb-4"
          danger
          type="primary"
          size={size}
          onClick={keyboardController.backspaceClick}
        >
          Backspace
        </Button>
        <Button
          className="w-full mb-4"
          type="primary"
          size={size}
          onClick={keyboardController.enterClick}
        >
          Enter
        </Button>

        <Space.Compact className="w-full" size={size}>
          <Input placeholder="keyboard input" size={size} />
          <Button type="primary" size={size}>
            Send
          </Button>
        </Space.Compact>
      </div>
    </div>
  );
};
export default KeyboardControlFrame;
