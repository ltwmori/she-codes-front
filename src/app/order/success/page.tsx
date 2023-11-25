"use client";
import React, { useEffect, useState } from "react";
import { IAssignDriver, Ride, assignDriver } from "@/api/ride";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SuccessOrder = () => {
  const params = useSearchParams();
  const pick_up_location = params.get("pick_up_location");
  const destination = params.get("destination");
  const ride_id = params.get("ride_id");
  const router = useRouter();

  const [driver, setDriver] = useState<IAssignDriver>();

  useEffect(() => {
    if (!ride_id) {
      router.push("/");
    }
    assignDriver(Number(ride_id))
      .then((res) => {
        setDriver(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="px-4 py-6">
      <div className="">
        <div className="flex items-center flex-col">
          <h1 className="text-base font-semibold text-center mb-3">
            Order created successfully!
          </h1>
          <p className="text-gray-400 text-xs max-w-[50ch] text-center">
            Review your scheduled rides. Make sure everything is set just the
            way you need it for your daily commutes or regular trips.
          </p>
        </div>

        <div className="mt-6">
          <Card>
            <CardContent className="p-4">
              <ul className="flex flex-col">
                <li>
                  <span className="text-green-500 font-semibold">From:</span>{" "}
                  {pick_up_location}
                </li>
                <li>
                  <span className="text-green-500 font-semibold">To:</span>{" "}
                  {destination}
                </li>
                <li>
                  <span className="text-green-500 font-semibold">Date:</span>{" "}
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </li>
                <li>
                  <span className="text-green-500 font-semibold">Price:</span> 1
                  000 KZT
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {driver ? (
          <div className="mt-6">
            <Card>
              <CardContent className="p-4">
                <ul className="flex flex-col">
                  <li>
                    <span className="text-green-500 font-semibold">
                      Driver name:
                    </span>{" "}
                    {driver.driver_first_name}
                  </li>
                  <li>
                    <span className="text-green-500 font-semibold">
                      Driver surname:
                    </span>{" "}
                    {driver.driver_last_name}
                  </li>
                  <li>
                    <span className="text-green-500 font-semibold">
                      Driver car model:
                    </span>
                    {driver.driver_car.model}
                  </li>
                  <li>
                    <span className="text-green-500 font-semibold">
                      Driver car number:
                    </span>{" "}
                    {driver.driver_car.plate_number}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="mt-6">
            <Card>
              <CardContent className="p-4">
                <p className="text-red-500 text-center">
                  No driver assigned yet! We will assign one soon!
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Button onClick={() => router.push("/")} className="w-[300px]">
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessOrder;
