"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { IRideHistory, getRidesHistory } from "@/api/clients";

const SchedulePage = () => {
  const [ridesHistory, setRidesHistory] = useState<IRideHistory[]>([]);

  useEffect(() => {
    getRidesHistory().then((res) => {
      setRidesHistory(res);
    });
  }, []);

  return (
    <div className="px-4 py-6">
      <div className="flex flex-row items-center justify-between mb-8">
        <h1 className="text-center font-semibold text-base">Ride Schedules</h1>
        <Link href="/schedule/create" className=" right-4">
          <Badge>
            <span className="mb-1">Schedule Daily Taxi +</span>
          </Badge>
        </Link>
      </div>
      <p className="pb-6">
        Book recurring rides for consistent, hassle-free travel. Set your
        schedule once for punctual pickups every day.
      </p>
      <div className="w-full flex-1">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="finished">Finished</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <div className="overflow-y-auto h-[600px]">
              {ridesHistory.map((ride) => (
                <Card key={ride.id} className="mb-4">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Ride #{ride.id}</CardTitle>
                    <Icons.edit />
                  </CardHeader>
                  <Separator />
                  <CardContent>
                    <div className="space-y-8">
                      <div className="flex items-center pt-6 pb-6">
                        <Avatar className="h-9 w-9">
                          <div className="h-full w-full bg-[#D9D9D999] flex justify-center items-center">
                            <Icons.locationMarker />
                          </div>
                        </Avatar>
                        <div className="w-5/6 flex flex-col pl-5 relative">
                          <div className="flex flex-row items-center space-x-4 mb-6">
                            <Icons.fromSource />
                            <div className="flex flex-col">
                              <p className="font-semibold text-[15px] text-[#444]">
                                {ride.pick_up_location}
                              </p>
                            </div>
                          </div>

                          <div className="absolute top-9 left-[26px]">
                            <Icons.dottedLine />
                          </div>

                          <div className="flex flex-row items-center space-x-4">
                            <Icons.toSource />
                            <div className="flex flex-col">
                              <p className="font-semibold text-[15px] text-[#444]">
                                {ride.destination}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator />

                    <div className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <div className="h-full w-full bg-[#D9D9D999] flex justify-center items-center">
                          <Icons.clock />
                        </div>
                      </Avatar>
                      <div className="w-5/6 flex flex-col pl-5 relative">
                        <div className="flex flex-row items-center space-x-4 py-6">
                          {new Date(ride.created_time).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            }
                          )}
                        </div>
                      </div>
                    </div>
                    <Separator />

                    <div className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <div className="h-full w-full bg-[#D9D9D999] flex justify-center items-center">
                          <Icons.calendar />
                        </div>
                      </Avatar>
                      <div className="w-5/6 flex flex-col pl-5 relative">
                        <div className="flex flex-row items-center space-x-4 py-6">
                          {ride.start_time && ride.end_time ? (
                            <p>
                              {" "}
                              From {ride.start_time} till {ride.end_time}
                            </p>
                          ) : (
                            <p>One time ride</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <div className="h-full w-full bg-[#3CC585] flex justify-center items-center">
                          <Icons.gps />
                        </div>
                      </Avatar>
                      <div className="w-5/6 flex flex-col pl-5 relative">
                        <div className="flex flex-row items-center space-x-4 py-6">
                          {ride.status === "searching"
                            ? "Searching for a driver"
                            : "Driver found"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="finished">world</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SchedulePage;
