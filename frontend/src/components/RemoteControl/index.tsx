import React from "react";
import {
  JoystickManagerOnEventHandler,
  JoystickManagerOptions,
  Position,
} from "../Joystick";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Input, Button, Space } from "antd";
import { keyboardController } from "../../apis/KeyboardController";
import { mouseController } from "../../apis/MouseController";
import Joystick from "../Joystick";

export class TaskManager {
  private tasks: Function[] = [];
  private isRuning: boolean = false;

  private async run() {
    if (this.isRuning) return;
    this.isRuning = true;
    let task = this.tasks.shift();
    while (task) {
      await task();
      task = this.tasks.shift();
    }
    this.isRuning = false;
  }

  public put(task: Function) {
    this.tasks.push(task);
    this.run();
  }

  public clean() {
    this.tasks = [];
  }
}

export default function RemoteControl() {
  const size: SizeType = "large";

  const joysitickOptions: JoystickManagerOptions = {
    mode: "static",
    position: {
      left: "50%",
      top: "75%",
    },
    size: 200,
    color: "#B6AFAE",
  };
  const joysitickTaskManager = new TaskManager();

  let joysitickMovePosition: Position | null = null;
  let joysitickTaskInterval: NodeJS.Timer | null = null;

  const joysitickOnStart: JoystickManagerOnEventHandler = (event, data) => {
    joysitickTaskInterval = setInterval(() => {
      if (!joysitickMovePosition) return;
      const xOffset = data.position.x - joysitickMovePosition.x;
      const yOffset = data.position.y - joysitickMovePosition.y;
      joysitickTaskManager.put(() =>
        mouseController.addOffset(xOffset, yOffset)
      );
    }, 15);
  };

  const joysitickOnMove: JoystickManagerOnEventHandler = (event, data) => {
    joysitickMovePosition = data.position;
    joysitickTaskManager.clean();
  };

  const joysitickOnEnd: JoystickManagerOnEventHandler = (event, data) => {
    joysitickTaskManager.clean();
    joysitickMovePosition = null;
    window.clearInterval(joysitickTaskInterval!);
    joysitickTaskInterval = null;
  };

  return (
    <div className="flex-col p-8">
      {/* // 鍵盤控制 */}
      <div className="p-4 mb-4 border-solid border-2 rounded-lg ">
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

      {/* 滑鼠控制 */}
      <div className="p-4 border-solid border-2 rounded-lg">
        <div className="font-bold text-xl mb-4 dark:text-white">
          Mouse Control
        </div>
        <div className="flex">
          <Button
            className="flex-auto mr-4"
            type="primary"
            size={size}
            onClick={mouseController.leftClick}
          >
            Left click
          </Button>
          <Button
            className="flex-auto ml-4"
            type="primary"
            size={size}
            onClick={mouseController.rightClick}
          >
            Right click
          </Button>
        </div>

        {/* 滑鼠搖桿 */}
        <Joystick
          options={joysitickOptions}
          onMove={joysitickOnMove}
          onStart={joysitickOnStart}
          onEnd={joysitickOnEnd}
        ></Joystick>
      </div>
    </div>
  );
}
