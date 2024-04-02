import { TouchEventType } from "../types/TouchBoardEventType";

export interface ITouchState {
  eventName?: TouchEventType;
  readonly startTimestamp: number;
  endTimestamp?: number;
}
