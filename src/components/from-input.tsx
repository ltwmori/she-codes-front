"use client";
import { Coords } from "@/types/types";
import InputPlace from "./ui/input-place";
import useActions from "@/hook/use-actions";
import { useTypedSelector } from "@/hook/use-typed-selector";
import { use, useEffect } from "react";

const FromInput = () => {
  const { setFrom, setTo } = useActions();
  const { from } = useTypedSelector((state) => state.taxi);

  const handleSbSuccess = async (address: string, location: Coords) => {
    setFrom({ location, description: address });
    setTo("");
  };

  return <InputPlace cbSuccess={handleSbSuccess} type="from" value={from} />;
};

export default FromInput;
