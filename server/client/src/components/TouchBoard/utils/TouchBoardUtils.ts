import { IPosition } from "../interfaces/IPostion";
import { ITouchBoardOutputData } from "../interfaces/ITouchBoardOutputData";
import {
  ITouchBoardPreviousDataHandlerOptions,
  ITouchBoardPreviousDataHandlerOptionsDefault,
} from "../interfaces/ITouchBoardPreviousDataHandlerOptions";
import { TouchBoardEventHandler } from "../types/TouchBoardEventHandler";
import { TouchBoardPreviousDataHandlerCallback } from "../types/TouchBoardPreviousDataHandlerCallback";

class TouchBoardUtils {
  /**
   * 將原生 Touch 類型解析為 out 類型
   * @param touch
   * @returns
   */
  public parseOutputData(touch: React.Touch): ITouchBoardOutputData {
    const position: IPosition = {
      x: touch.clientX,
      y: touch.clientY,
    };
    return { position };
  }

  /**
   * 計算兩個位置的距離
   * @param p1
   * @param p2
   * @returns 距離
   */
  public getDistance(p1: IPosition, p2: IPosition): number {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
  }

  /**
   * 輔助 MoveEvent 的函數，用於捕獲前一個 Move 的結果
   * @param callback 處理回調
   * @param millisecondsToClearPrevious 清除前一次結果的時間
   * @returns
   */
  public getPreviousDataHandler(
    callback: TouchBoardPreviousDataHandlerCallback,
    options?: ITouchBoardPreviousDataHandlerOptions
  ): TouchBoardEventHandler {
    let _options: ITouchBoardPreviousDataHandlerOptionsDefault = {
      millisecondsToClearPrevious: 50,
    };
    if (options) _options = { ..._options, ...options };

    let previous: ITouchBoardOutputData[] | undefined;
    let timeoutId: NodeJS.Timeout | undefined;
    return (current) => {
      clearTimeout(timeoutId);
      callback(previous, current);
      previous = current;
      timeoutId = setTimeout(
        () => (previous = undefined),
        _options.millisecondsToClearPrevious
      );
    };
  }
}
export const touchBoardUtils = new TouchBoardUtils();
