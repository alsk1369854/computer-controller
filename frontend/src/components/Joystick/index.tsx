import React, { useEffect, useRef } from "react";

import nipplejs, {
  JoystickManagerOptions,
  EventData,
  JoystickOutputData,
} from "nipplejs";

export * from "nipplejs";

/**
 * 遙感事件回調類型
 */
export type JoystickManagerOnEventHandler = (
  evt: EventData,
  data: JoystickOutputData
) => void;

export interface IJoystickProps {
  options: Omit<JoystickManagerOptions, "zone">;
  onStart?: JoystickManagerOnEventHandler;
  onMove?: JoystickManagerOnEventHandler;
  onEnd?: JoystickManagerOnEventHandler;
}

/** 預設搖桿配置 */
const DEFAULT_OPTIONS: JoystickManagerOptions = {
  mode: "static",
  position: {
    left: "50%",
    top: "50%",
  },
  color: "white",
};

const Joystick: React.FC<IJoystickProps> = (props) => {
  /**
   * 遙感 HTML 元素
   */
  const ref = useRef<HTMLDivElement>(null);

  /**
   * 傳餐變化監聽器
   */
  useEffect(() => {
    // 遙感管理員
    const joystickManager = nipplejs.create({
      ...DEFAULT_OPTIONS,
      ...props.options,
      zone: ref.current!,
    });

    // 註冊事件
    if (props.onStart) {
      joystickManager.on("start", props.onStart);
    }
    if (props.onMove) {
      joystickManager.on("move", props.onMove);
    }
    if (props.onEnd) {
      joystickManager.on("end", props.onEnd);
    }

    // 銷毀
    return () => {
      joystickManager.destroy();
    };
  }, [props]);

  return <div className="absolute inset-x-0 w-full h-full" ref={ref}></div>;
};
export default Joystick;
