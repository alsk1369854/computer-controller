import { IPosition } from "../interfaces/IPostion";
import { ITouchBoardOutputData } from "../interfaces/ITouchBoardOutputData";
import {
  TouchBoardPreviousDataHandler,
  TouchBoardPreviousDataHandlerCallback,
} from "../types/TouchBoardPreviousDataHandler";

class TouchBoardUtils {
  public parseOutputData(touch: React.Touch): ITouchBoardOutputData {
    const position: IPosition = {
      x: touch.clientX,
      y: touch.clientY,
    };
    return { position };
  }

  public getDistance(p1: IPosition, p2: IPosition): number {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
  }

  public getPreviousDataHandler(
    callback: TouchBoardPreviousDataHandlerCallback,
    millisecondsToClearPrevious: number = 50
  ): TouchBoardPreviousDataHandler {
    let previous: ITouchBoardOutputData | undefined;
    let timeoutId: NodeJS.Timeout | undefined;
    return (current: ITouchBoardOutputData) => {
      clearTimeout(timeoutId);
      callback(previous, current);
      previous = current;
      timeoutId = setTimeout(
        () => (previous = undefined),
        millisecondsToClearPrevious
      );
    };
  }
}
export const touchBoardUtils = new TouchBoardUtils();
