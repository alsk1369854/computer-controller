import React, { useState } from "react";
import { ITouchBoardOutputData } from "./interfaces/ITouchBoardOutputData";
import { touchBoardUtils } from "./utils/TouchBoardUtils";
import { ITouchState } from "./interfaces/ITouchState";
import { TouchBoardEventHandler } from "./types/TouchBoardEventHandler";

/**
 * 長按閥值，如果超過則為長按
 */
const LONG_PRESS_THORESHOLD = 300;

/**
 * 兩次點擊距離，判定為非雙點擊的距離閥值
 */
const NOT_DOUBLE_TAP_DISTANCE_THRESHOLD = 30;

interface ITouchBoardProps {
  onTap?: TouchBoardEventHandler;
  onDoubleTap?: TouchBoardEventHandler;
  onTwoFingerTap?: TouchBoardEventHandler;
  onSwipeMove?: TouchBoardEventHandler;
  onSwipeEnd?: TouchBoardEventHandler;
  onTwoFingerSwipeMove?: TouchBoardEventHandler;
  onTwoFingerSwipeEnd?: TouchBoardEventHandler;
}

const TouchBoard: React.FC<ITouchBoardProps> = (props) => {
  const [touchStateMap] = useState<Map<number, ITouchState>>(new Map());

  const onTap = (() => {
    let preivousData: ITouchBoardOutputData | null = null;
    let timeoutId: NodeJS.Timeout | null = null;
    return (touch: React.Touch) => {
      const data = touchBoardUtils.parseOutputData(touch);
      // double tap
      if (timeoutId && preivousData) {
        clearTimeout(timeoutId);
        timeoutId = null;
        const twoTouchDistance = touchBoardUtils.getDistance(
          preivousData.position,
          data.position
        );
        const isDoubleTap =
          twoTouchDistance < NOT_DOUBLE_TAP_DISTANCE_THRESHOLD;
        if (isDoubleTap) {
          const touchState = touchStateMap.get(touch.identifier)!;
          touchState.eventName = "double tap";
          if (props.onDoubleTap) props.onDoubleTap([data]);
        }
        preivousData = null;
        return;
      }
      // tap
      preivousData = data;
      timeoutId = setTimeout(() => {
        const touchState = touchStateMap.get(touch.identifier)!;
        touchState.eventName = "tap";
        if (props.onTap) props.onTap([data]);
        preivousData = null;
        timeoutId = null;
      }, LONG_PRESS_THORESHOLD);
    };
  })();

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    const { targetTouches } = event;
    if (targetTouches.length > 2) return;

    if (targetTouches.length === 2) {
      const touch1 = targetTouches[0];
      const touch2 = targetTouches[1];
      const touchState: ITouchState = {
        startTimestamp: Date.now(),
      };
      touchStateMap.set(touch1.identifier, touchState);
      touchStateMap.set(touch2.identifier, touchState);
      return;
    }

    if (targetTouches.length === 1) {
      const touch = targetTouches[0];
      const touchState: ITouchState = {
        startTimestamp: Date.now(),
      };
      touchStateMap.set(touch.identifier, touchState);
      return;
    }
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    const { changedTouches } = event;
    if (changedTouches.length > 2) return;

    // is two finger tap
    if (changedTouches.length === 2) {
      const touch1 = changedTouches[0];
      const touch2 = changedTouches[1];
      const touchState1 = touchStateMap.get(touch1.identifier)!;
      const touchState2 = touchStateMap.get(touch2.identifier)!;
      touchState1.endTimestamp = touchState2.endTimestamp = Date.now();
      const isGroupTouch = touchState1 === touchState2;
      if (isGroupTouch) {
        const pressTimeRange =
          touchState1.endTimestamp - touchState1.startTimestamp;
        const isShortPress = pressTimeRange < LONG_PRESS_THORESHOLD;
        const data1 = touchBoardUtils.parseOutputData(touch1);
        const data2 = touchBoardUtils.parseOutputData(touch2);
        if (isShortPress) {
          touchState1.eventName = touchState2.eventName = "two finger tap";
          if (props.onTwoFingerTap) {
            props.onTwoFingerTap([data1, data2]);
          }
        } else if (
          touchState1.eventName === "two finger swipe move" &&
          props.onTwoFingerSwipeEnd
        ) {
          props.onTwoFingerSwipeEnd([data1, data2]);
        }
      }
      return;
    }

    // is one finger tap
    if (changedTouches.length === 1) {
      const touch = changedTouches[0];
      const data = touchBoardUtils.parseOutputData(touch);
      const touchState = touchStateMap.get(touch.identifier)!;
      touchState.endTimestamp = Date.now();
      const pressTimeRange =
        touchState.endTimestamp - touchState.startTimestamp;
      const isShortPress = pressTimeRange < LONG_PRESS_THORESHOLD;
      if (isShortPress) {
        if (props.onTap || props.onDoubleTap) {
          onTap(touch);
        }
      } else if (touchState.eventName === "swipe move" && props.onSwipeEnd) {
        props.onSwipeEnd([data]);
      }
      return;
    }
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    const { targetTouches } = event;
    if (targetTouches.length > 2) return;

    if (targetTouches.length === 2) {
      if (props.onTwoFingerSwipeMove) {
        const touch1 = targetTouches[0];
        const touch2 = targetTouches[1];
        const touchState1 = touchStateMap.get(touch1.identifier)!;
        const touchState2 = touchStateMap.get(touch2.identifier)!;
        touchState1.eventName = touchState2.eventName = "two finger swipe move";
        const data1 = touchBoardUtils.parseOutputData(touch1);
        const data2 = touchBoardUtils.parseOutputData(touch2);
        props.onTwoFingerSwipeMove([data1, data2]);
      }
      return;
    }

    if (targetTouches.length === 1) {
      if (props.onSwipeMove) {
        const touch = targetTouches[0];
        const touchState = touchStateMap.get(touch.identifier)!;
        touchState.eventName = "swipe move";
        const data = touchBoardUtils.parseOutputData(touch);
        props.onSwipeMove([data]);
      }
      return;
    }
  };

  return (
    <div
      className="absolute inset-x-0 w-full h-full overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
    ></div>
  );
};
export default TouchBoard;
