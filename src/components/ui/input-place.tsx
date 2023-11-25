"use client";
import React, { useEffect, useRef, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { Coords, TypeFrom } from "@/types/types";
import { useTypedSelector } from "@/hook/use-typed-selector";
import { Icons } from "../icons";

interface IInputPlaceProps {
  cbSuccess: (address: string, location: Coords) => void;
  type: "from" | "to";
  value?: TypeFrom;
}

const InputPlace: React.FC<IInputPlaceProps> = ({ cbSuccess, type, value }) => {
  const [address, setAddress] = useState<string>(value?.description || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const { travelTime } = useTypedSelector((state) => state.taxi);

  const handleSelect = (address: string) => {
    geocodeByAddress(address)
      .then((res) => getLatLng(res[0]))
      .then((location) => {
        cbSuccess(address, location);
        setAddress(address);
      })
      .catch((err) => console.error("Error", err));
  };

  const isFrom = type === "from";

  useEffect(() => {
    setAddress(value?.description || "");
  }, [value?.description]);

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
      onError={(err) => console.log(err)}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className={cn("relative", {})}>
          <div
            className="py-2 px-5 bg-white rounded-lg flex items-center"
            style={
              suggestions.length
                ? {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }
                : {}
            }
          >
            {isFrom ? <Icons.fromSource /> : <Icons.toSource />}
            <Input
              {...getInputProps({
                placeholder: isFrom ? "From" : "To",
              })}
              className="ml-3 w-full"
              ref={inputRef}
            />
            {!isFrom && (
              <div className="absolute right-7 text-sm text-gray-400">
                {travelTime ? `${travelTime} min.` : " - min."}
              </div>
            )}
          </div>

          <div
            className={cn(
              "absolute w-full h-0 overflow-y-auto rounded-b-lg z-10",
              {
                "h-48": suggestions.length || loading,
              }
            )}
          >
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion, idx) => (
              <div
                {...getSuggestionItemProps(suggestion, {
                  className: cn("cursor-pointer p-3", {
                    "bg-gray-100": suggestion.active,
                    "bg-white": !suggestion.active,
                  }),
                })}
                key={`loc ${idx}`}
              >
                <span>{suggestion.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default InputPlace;
