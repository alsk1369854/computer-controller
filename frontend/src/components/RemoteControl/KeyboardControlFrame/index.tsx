import { Button, Space, Input } from "antd";
import React, { useState } from "react";
import { keyboardController } from "../../../apis/KeyboardController";
import { SizeType } from "antd/es/config-provider/SizeContext";

interface IKeyboardControlFrameProps {
  className?: string;
  size: SizeType;
}

const KeyboardControlFrame: React.FC<IKeyboardControlFrameProps> = (props) => {
  const { size } = props;
  const [keyboardInputValue, setKeyboardInputValue] = useState<string>("");

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
          onClick={keyboardController.clickBackspace}
        >
          Backspace
        </Button>
        <Button
          className="w-full mb-4"
          type="primary"
          size={size}
          onClick={keyboardController.clickEnter}
        >
          Enter
        </Button>

        <Space.Compact className="w-full" size={size}>
          <Input
            placeholder="keyboard input"
            value={keyboardInputValue}
            onChange={(value) => setKeyboardInputValue(value.target.value)}
            size={size}
          />
          <Button
            type="primary"
            onClick={() => {
              if (keyboardInputValue === "") return;
              keyboardController.input(keyboardInputValue);
              setKeyboardInputValue("");
            }}
            size={size}
          >
            Send
          </Button>
        </Space.Compact>
      </div>
    </div>
  );
};
export default KeyboardControlFrame;
