import { ITouchBoardOutputData } from "../interfaces/ITouchBoardOutputData";

export type TouchBoardPreviousDataHandlerCallback = (
  previous: ITouchBoardOutputData[] | undefined,
  current: ITouchBoardOutputData[]
) => void;
