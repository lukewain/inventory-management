"use client";

import { useEffect, useState } from "react";

export const TimeStatus = () => {
  const [time, setTime] = useState<String>();

  function updateTime() {
    let date = new Date();
    let current = date.toLocaleTimeString("en-GB");
    setTime(`${current}`);
  }

  useEffect(() => {
    setInterval(updateTime, 1000);
  });

  return <p>{time}</p>;
};
