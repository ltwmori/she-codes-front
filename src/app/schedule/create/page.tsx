"use client";

import { SetStateAction, useState } from "react";
import FromInput from "@/components/from-input";
import ToInput from "@/components/to-input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Coords } from "@/types/types";
import { ArrowLeft, CalendarIcon } from "lucide-react";
import Link from "next/link";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { TimePickerDemo } from "@/components/time-picker/time-picker";

const CreateSchedulePage = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [value, setValue] = useState("10:00");

  const onChange = (timeValue: SetStateAction<string>) => {
    setValue(timeValue);
  };

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col justify-between">
        <Link href="/schedule" className="">
          <ArrowLeft />
        </Link>
        <h1 className="text-center font-bold mb-5">
          Schedule Your Rides in Advance
        </h1>
        <FromInput />
        <ToInput />
        <h3 className="mt-6 text-center font-bold">Date range</h3>
        <p className="text-gray-400 text-[15px] text-center font-light">
          Select the start and end dates for your schedule
        </p>
        <div className={cn("flex justify-center mt-6")}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        <h3 className="mt-6 text-center font-bold">Time range</h3>
        <p className="text-gray-400 text-[15px] text-center font-light">
          Choose the time for your daily pick-up
        </p>
        <div className="flex justify-center pt-6">
          <TimePickerDemo
            date={undefined}
            setDate={function (date: Date | undefined): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Button className="w-3/4">Schedule</Button>
      </div>
    </div>
  );
};

export default CreateSchedulePage;
