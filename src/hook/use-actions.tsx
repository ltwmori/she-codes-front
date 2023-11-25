"use client";
import { taxiSlice } from "@/store/slice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  return bindActionCreators(taxiSlice.actions, dispatch);
};

export default useActions;
