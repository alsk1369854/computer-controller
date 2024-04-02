import React, { useState } from "react";
import { ITouchBoardOutputData } from "./interfaces/ITouchBoardOutputData";
import { touchBoardUtils } from "./utils/TouchBoardUtils";
import { ITouchTimestamp } from "./interfaces/ITouchTimestamp";

export interface ITouchBoardProps {
  onTap?(data: ITouchBoardOutputData): void;
  onDoubleTap?(data: ITouchBoardOutputData): void;
  onTwoFingerTap?(
    data1: ITouchBoardOutputData,
    data2: ITouchBoardOutputData
  ): void;
  onSwipe?(data: ITouchBoardOutputData): void;
  onTwoFingerSwipe?(
    data1: ITouchBoardOutputData,
    data2: ITouchBoardOutputData
  ): void;
}

/**
 * 長按閥值，如果超過則為長按
 */
const LONG_PRESS_THORESHOLD = 300;

const NOT_DOUBLE_TAP_DISTANCE_THRESHOLD = 30;

const TouchBoard: React.FC<ITouchBoardProps> = (props) => {
  const [touchTimestampMap, _] = useState<Map<number, ITouchTimestamp>>(
    new Map()
  );

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
        if (isDoubleTap && props.onDoubleTap) {
          props.onDoubleTap(data);
        }
        preivousData = null;
        return;
      }
      // tap
      preivousData = data;
      timeoutId = setTimeout(() => {
        if (props.onTap) props.onTap(data);
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
      const touchTimestamp: ITouchTimestamp = {
        start: Date.now(),
      };
      touchTimestampMap.set(touch1.identifier, touchTimestamp);
      touchTimestampMap.set(touch2.identifier, touchTimestamp);
      return;
    }

    if (targetTouches.length === 1) {
      const touch = targetTouches[0];
      const touchTimestamp = {
        start: Date.now(),
      };
      touchTimestampMap.set(touch.identifier, touchTimestamp);
      return;
    }
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    const { changedTouches } = event;
    if (changedTouches.length > 2) return;

    // is two finger tap
    if (changedTouches.length === 2) {
      if (props.onTwoFingerTap) {
        const touch1 = changedTouches[0];
        const touch2 = changedTouches[1];
        const touchTimestamp1 = touchTimestampMap.get(touch1.identifier)!;
        const touchTimestamp2 = touchTimestampMap.get(touch2.identifier)!;
        touchTimestamp1.end = Date.now();

        const isGroupTouch = touchTimestamp1 === touchTimestamp2;
        const pressTimeRange = touchTimestamp1.end - touchTimestamp1.start;
        const isShortPress = pressTimeRange < LONG_PRESS_THORESHOLD;
        if (isGroupTouch && isShortPress) {
          const data1 = touchBoardUtils.parseOutputData(touch1);
          const data2 = touchBoardUtils.parseOutputData(touch2);
          props.onTwoFingerTap(data1, data2);
        }
      }
      return;
    }

    // is one finger tap
    if (changedTouches.length === 1) {
      if (props.onTap || props.onDoubleTap) {
        const touch = changedTouches[0];
        const touchTimestamp = touchTimestampMap.get(touch.identifier)!;
        touchTimestamp.end = Date.now();
        const pressTimeRange = touchTimestamp.end - touchTimestamp.start;
        const isShortPress = pressTimeRange < LONG_PRESS_THORESHOLD;
        if (isShortPress) {
          onTap(touch);
        }
      }
      return;
    }
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    const { targetTouches } = event;
    if (targetTouches.length > 2) return;

    if (targetTouches.length === 2) {
      if (props.onTwoFingerSwipe) {
        const touch1 = targetTouches[0];
        const touch2 = targetTouches[1];
        const data1 = touchBoardUtils.parseOutputData(touch1);
        const data2 = touchBoardUtils.parseOutputData(touch2);
        props.onTwoFingerSwipe(data1, data2);
      }
      return;
    }

    if (targetTouches.length === 1) {
      if (props.onSwipe) {
        const touch = targetTouches[0];
        const data = touchBoardUtils.parseOutputData(touch);
        props.onSwipe(data);
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
