import { IPosition } from "../interfaces/IPostion";
import { ITouchBoardOutputData } from "../interfaces/ITouchBoardOutputData";

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
}
export const touchBoardUtils = new TouchBoardUtils();
