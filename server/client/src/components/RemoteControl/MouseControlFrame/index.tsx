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
      task();
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
      const xOffset = joysitickMovePosition.x - data.position.x;
      const yOffset = joysitickMovePosition.y - data.position.y;
      // 將 api 推入 執行列中
      joysitickTaskManager.put(() =>
        mouseController.moveRelative(xOffset, yOffset)
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

  // 短時間那重複呼叫，則使用雙點擊
  const leftClickButtonOnClick = (() => {
    let timeout: NodeJS.Timeout | null = null;
    return () => {
      if (timeout) {
        clearTimeout(timeout);
        mouseController.doubleClickLeft();
      }
      timeout = setTimeout(() => {
        timeout = null;
        mouseController.clickLeft();
        // 兩次點擊間隔時間，如果在時間之內，則使用雙點擊
      }, 300);
    };
  })();

  return (
    <div className={props.className}>
      <div className="p-4 border-solid border-2 rounded-lg">
        <div className="font-bold text-xl mb-4 dark:text-white">
          Mouse Control
        </div>
        <div className="flex-col">
          <div className="flex mb-4">
            <div className="text-lg pr-4 dark:text-white">Moving Speed:</div>
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
              className="basis-1/2 mr-4"
              type="primary"
              size={size}
              onClick={mouseController.slideUp}
            >
              Slide up
            </Button>
            <Button
              className="basis-1/2 ml-4"
              type="primary"
              size={size}
              onClick={mouseController.slideDown}
            >
              Slide down
            </Button>
          </div>
          <div className="flex mb-4">
            <Button
              className="basis-1/2 mr-4"
              type="primary"
              size={size}
              onClick={leftClickButtonOnClick}
            >
              Left click
            </Button>
            <Button
              className="basis-1/2 ml-4"
              type="primary"
              size={size}
              onClick={mouseController.clickRight}
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
