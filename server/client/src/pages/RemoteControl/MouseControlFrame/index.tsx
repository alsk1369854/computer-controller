import { Slider } from "antd";
import React, { useState } from "react";
import { mouseController } from "../../../apis/MouseController";
import TouchBoard from "../../../components/TouchBoard";
import { TouchBoardEventHandler } from "../../../components/TouchBoard/types/TouchBoardEventHandler";
import { ITouchBoardOutputData } from "../../../components/TouchBoard/interfaces/ITouchBoardOutputData";

interface IMouseControlFrameProps {
  className?: string;
}

const MouseControlFrame: React.FC<IMouseControlFrameProps> = (props) => {
  const [speedValue, setSpeedValue] = useState(5);
  const setTouchBoardSwipeData = useState<ITouchBoardOutputData | null>(
    null
  )[1];
  const setTouchBoardTwoFingerSwipeData =
    useState<ITouchBoardOutputData | null>(null)[1];

  const onTouchBoardSwipeMove: TouchBoardEventHandler = ([data]) => {
    setTouchBoardSwipeData((prev) => {
      if (!prev) return data;
      const offsetX = (data.position.x - prev.position.x) * speedValue;
      const offsetY = (data.position.y - prev.position.y) * speedValue;
      mouseController.moveRelative(offsetX, offsetY);
      return data;
    });
  };

  const onTouchBoardTwoFingerSwipeMove: TouchBoardEventHandler = ([
    data1,
    data2,
  ]) => {
    setTouchBoardTwoFingerSwipeData((prev) => {
      if (!prev) return data1;
      const offsetX = (data1.position.x - prev.position.x) * speedValue;
      const offsetY = (data1.position.y - prev.position.y) * speedValue;
      mouseController.scrollRelative(offsetX, offsetY);
      return data1;
    });
  };

  return (
    <div className={props.className}>
      <div className="p-4 border-solid border-2 rounded-lg">
        <div className="font-bold text-xl mb-4 dark:text-white">
          Mouse Control
        </div>
        <div className="flex-col">
          <div className="flex mb-4">
            <div className="text-lg pr-4 dark:text-white">Sensitivity:</div>
            <Slider
              className="flex-auto"
              min={1}
              max={10}
              onChange={setSpeedValue}
              value={speedValue}
            />
          </div>

          {/* 滑鼠搖桿 */}
          <div className="h-64 w-full relative border-2 rounded-lg border-dotted">
            <TouchBoard
              onTap={() => {
                mouseController.clickLeft();
              }}
              onDoubleTap={() => {
                mouseController.doubleClickLeft();
              }}
              onTwoFingerTap={() => {
                mouseController.clickRight();
              }}
              onSwipeMove={(dataList) => {
                onTouchBoardSwipeMove(dataList);
              }}
              onSwipeEnd={() => {
                setTouchBoardSwipeData(() => null);
              }}
              onTwoFingerSwipeMove={(dataList) => {
                onTouchBoardTwoFingerSwipeMove(dataList);
              }}
              onTwoFingerSwipeEnd={() => {
                setTouchBoardTwoFingerSwipeData(() => null);
              }}
            ></TouchBoard>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MouseControlFrame;
