"use client";
import { Coords } from "@/types/types";
import InputPlace from "./ui/input-place";
import useActions from "@/hook/use-actions";
import { useTypedSelector } from "@/hook/use-typed-selector";

const ToInput = () => {
  const { setFrom, setTo } = useActions();
  const { to } = useTypedSelector((state) => state.taxi);

  const handleSbSuccess = async (address: string, location: Coords) => {
    setTo({ location, description: address });
  };

  return <InputPlace cbSuccess={handleSbSuccess} type="to" value={to} />;
};

export default ToInput;
