import React, { useState } from "react";
import TouchBoard, { ITouchBoardOutputData } from ".";

export default function TouchBoardDeBug() {
  const [name, setName] = useState<string>("");
  const [data1, setData1] = useState<ITouchBoardOutputData | null>(null);
  const [data2, setData2] = useState<ITouchBoardOutputData | null>(null);
  return (
    <div>
      {name}
      <div className="mt-1">{JSON.stringify(data1, null, "\t")}</div>
      <div className="mt-1">{JSON.stringify(data2, null, "\t")}</div>
      <TouchBoard
        onTap={(data) => {
          setName("tap");
          setData1(data);
          setData2(null);
        }}
        onDoubleTap={(data) => {
          setName("double tap");
          setData1(data);

          setData2(null);
        }}
        onTwoFingerTap={(data1, data2) => {
          setName("two figner tap");
          setData1(data1);
          setData2(data2);
        }}
        onSwipe={(data) => {
          setName("swipe");
          setData1(data);
          setData2(null);
        }}
        onTwoFingerSwipe={(data1, data2) => {
          setName("two figner swip");
          setData1(data1);
          setData2(data2);
        }}
      ></TouchBoard>
    </div>
  );
}
