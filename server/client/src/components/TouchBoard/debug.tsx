import React, { useState } from "react";
import TouchBoard from ".";
import { ITouchBoardOutputData } from "./interfaces/ITouchBoardOutputData";

export default function TouchBoardDebug() {
  const [name, setName] = useState<string>("");
  const [data1, setData1] = useState<ITouchBoardOutputData | null>(null);
  const [data2, setData2] = useState<ITouchBoardOutputData | null>(null);
  return (
    <div>
      {name}
      <div className="mt-1">{JSON.stringify(data1, null, "\t")}</div>
      <div className="mt-1">{JSON.stringify(data2, null, "\t")}</div>
      <TouchBoard
        onTap={([data]) => {
          setName("tap");
          setData1(data);
          setData2(null);
        }}
        onDoubleTap={([data]) => {
          setName("double tap");
          setData1(data);

          setData2(null);
        }}
        onTwoFingerTap={([data1, data2]) => {
          setName("two figner tap");
          setData1(data1);
          setData2(data2);
        }}
        onSwipeMove={([data]) => {
          setName("swipe");
          setData1(data);
          setData2(null);
        }}
        onSwipeEnd={([data]) => {
          setName("swipe end");
          setData1(data);
          setData2(null);
        }}
        onTwoFingerSwipeMove={([data1, data2]) => {
          setName("two figner swip");
          setData1(data1);
          setData2(data2);
        }}
        onTwoFingerSwipeEnd={([data1, data2]) => {
          setName("two figner swip end");
          setData1(data1);
          setData2(data2);
        }}
      ></TouchBoard>
    </div>
  );
}
