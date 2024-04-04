import { ITouchBoardOutputData } from "../interfaces/ITouchBoardOutputData";

export type TouchBoardPreviousDataHandler = (
  current: ITouchBoardOutputData
) => void;

export type TouchBoardPreviousDataHandlerCallback = (
  previous: ITouchBoardOutputData | undefined,
  current: ITouchBoardOutputData
) => void;
