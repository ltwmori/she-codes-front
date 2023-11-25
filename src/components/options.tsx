"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useTypedSelector } from "@/hook/use-typed-selector";
import useActions from "@/hook/use-actions";
import { cn } from "@/lib/utils";

interface IList {
  _id: string;
  title: string;
  img: string;
  multiplier: number;
}

export const optionsList: IList[] = [
  {
    _id: "economy",
    title: "Economy",
    img: "/icons/UberX.png",
    multiplier: 46,
  },
  {
    _id: "comfort",
    title: "Comfort",
    img: "/icons/comport.png",
    multiplier: 64,
  },
  {
    _id: "business",
    title: "Business",
    img: "/icons/business.png",
    multiplier: 92,
  },
  {
    _id: "elite",
    title: "Elite",
    img: "/icons/elite.png",
    multiplier: 138,
  },
];

const Options = () => {
  const { selectedOption, travelTime } = useTypedSelector(
    (state) => state.taxi
  );
  const { setSelectedOption } = useActions();

  return (
    <div className="mt-6">
      <ul className="">
        {optionsList.map((option) => (
          <li
            key={option._id}
            className="px-4 py-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
            onClick={() => setSelectedOption(option._id)}
          >
            <div
              className={cn(
                "opacity-30 transition-opacity duration-300 ease-in-out flex items-center justify-between ",
                {
                  "opacity-100": selectedOption === option._id,
                }
              )}
            >
              <div className="flex items-center">
                <Image
                  src={option.img}
                  alt={option.title}
                  className="w-20 h-10 rounded-full"
                  width={100}
                  height={100}
                />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {option.title}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-sm font-medium text-gray-900">
                  {travelTime
                    ? new Intl.NumberFormat("kz-KZ", {
                        style: "currency",
                        currency: "KZT",
                        // how to remove 1,000.00 KZT , symbol
                      })
                        .format(option.multiplier * travelTime)
                        .replace(/,/g, " ")
                    : " - KZT"}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Options;
