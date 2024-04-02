import { ITouchBoardOutputData } from "../interfaces/ITouchBoardOutputData";

export type TouchBoardEventHandler = (
  dataList: ITouchBoardOutputData[]
) => void;
