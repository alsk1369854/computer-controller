import { Button, Popconfirm, Slider } from "antd";
import React, { useState } from "react";
import { mouseController } from "../../../apis/MouseController";
import TouchBoard from "../../../components/TouchBoard";
import { InfoOutlined } from "@ant-design/icons";
import { touchBoardUtils } from "../../../components/TouchBoard/utils/TouchBoardUtils";
import { TouchBoardEventHandler } from "../../../components/TouchBoard/types/TouchBoardEventHandler";

interface IMouseControlFrameProps {
  className?: string;
}

const MouseControlFrame: React.FC<IMouseControlFrameProps> = (props) => {
  const [speedValue, setSpeedValue] = useState(5);

  const onTouchBoardSwipeMove: TouchBoardEventHandler =
    touchBoardUtils.getPreviousDataHandler((prevDataList, [curr]) => {
      if (!prevDataList) return;
      const [prev] = prevDataList;
      const offsetX = (curr.position.x - prev.position.x) * speedValue;
      const offsetY = (curr.position.y - prev.position.y) * speedValue;
      mouseController.moveRelative(offsetX, offsetY);
    });

  const onTouchBoardTwoFingerSwipeMove: TouchBoardEventHandler =
    touchBoardUtils.getPreviousDataHandler((prevDataList, [curr]) => {
      if (!prevDataList) return;
      const [prev] = prevDataList;
      const offsetX = (curr.position.x - prev.position.x) * speedValue;
      const offsetY = (curr.position.y - prev.position.y) * speedValue;
      mouseController.scrollRelative(offsetX, offsetY);
    });

  return (
    <div className={props.className}>
      <div className="p-4 border-solid border-2 rounded-lg">
        <div className="flex justify-between font-bold text-xl mb-4 dark:text-white">
          Mouse Control
          <Popconfirm
            placement="leftBottom"
            title={
              <div className="text-base font-bold">Touch board user manual</div>
            }
            description={
              <div className="">
                <div className="font-bold px-1">Touch board : Computer</div>
                <div className="px-1">One finger tap : Click left</div>
                <div className="px-1">Two finger tap : Click right</div>
                <div className="px-1">One finger swipe : Mouse move</div>
                <div className="px-1">Two finger swipe : Scroll move</div>
              </div>
            }
            okText="Yes"
            showCancel={false}
          >
            <Button shape="circle" icon={<InfoOutlined />} />
          </Popconfirm>
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
          <div className="h-64 w-full relative border-2 rounded-lg border-dotted bg-neutral-300 dark:bg-neutral-700">
            <TouchBoard
              onTap={() => mouseController.clickLeft()}
              onDoubleTap={() => mouseController.doubleClickLeft()}
              onTwoFingerTap={() => mouseController.clickRight()}
              onSwipeMove={onTouchBoardSwipeMove}
              onTwoFingerSwipeMove={onTouchBoardTwoFingerSwipeMove}
            ></TouchBoard>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MouseControlFrame;
