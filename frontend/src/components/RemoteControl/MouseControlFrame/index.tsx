import { Slider, Button } from "antd";
import { JoystickManagerOptions, Position } from "nipplejs";
import React, { useState } from "react";
import { mouseController } from "../../../apis/MouseController";
import Joystick, { JoystickManagerOnEventHandler } from "../../Joystick";
import { SizeType } from "antd/es/config-provider/SizeContext";

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

interface IMouseControlFrameProps {
  className?: string;
  size: SizeType;
}

const MouseControlFrame: React.FC<IMouseControlFrameProps> = (props) => {
  const { size } = props;

  const [speedValue, setSpeedValue] = useState(5);

  const joysitickOptions: JoystickManagerOptions = {
    mode: "dynamic",
    size: 100,
    color: "gray",
  };
  const joysitickTaskManager = new TaskManager();

  let joysitickMovePosition: Position | null = null;
  let joysitickTaskInterval: NodeJS.Timer | null = null;

  /**
   * 搖桿開始事件
   * @param event 搖桿事件
   * @param data 搖桿數據
   */
  const joysitickOnStart: JoystickManagerOnEventHandler = (event, data) => {
    // 開啟定時器自動，間斷式的發送 api
    joysitickTaskInterval = setInterval(() => {
      if (!joysitickMovePosition) return;
      const xOffset = data.position.x - joysitickMovePosition.x;
      const yOffset = data.position.y - joysitickMovePosition.y;
      // 將 api 推入 執行列中
      joysitickTaskManager.put(() =>
        mouseController.addOffset(xOffset, yOffset)
      );
    }, 500 / speedValue);
  };

  /**
   * 搖桿移動事件
   * @param event 搖桿事件
   * @param data 搖桿資料
   */
  const joysitickOnMove: JoystickManagerOnEventHandler = (event, data) => {
    // 更新搖桿偏移量
    joysitickMovePosition = data.position;
    // 清空舊滑鼠添加偏移任務
    joysitickTaskManager.clean();
  };

  /**
   * 搖桿
   * @param event 搖桿事件
   * @param data 搖桿資料
   */
  const joysitickOnEnd: JoystickManagerOnEventHandler = (event, data) => {
    // 清空搖桿位移計算
    joysitickTaskManager.clean();
    joysitickMovePosition = null;
    window.clearInterval(joysitickTaskInterval!);
    joysitickTaskInterval = null;
  };

  return (
    <div className={props.className}>
      <div className="p-4 border-solid border-2 rounded-lg">
        <div className="font-bold text-xl mb-4 dark:text-white">
          Mouse Control
        </div>
        <div className="flex-col">
          <div className="flex mb-4">
            <div className="text-lg pr-4 dark:text-white">Speed:</div>
            <Slider
              className="flex-auto"
              min={1}
              max={10}
              onChange={setSpeedValue}
              value={speedValue}
            />
          </div>
          <div className="flex mb-4">
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
          <div className="h-48 w-full relative border-2 rounded-lg border-dotted">
            <Joystick
              options={joysitickOptions}
              onMove={joysitickOnMove}
              onStart={joysitickOnStart}
              onEnd={joysitickOnEnd}
            ></Joystick>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MouseControlFrame;
