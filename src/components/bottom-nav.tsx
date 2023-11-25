"use client";
import Link from "next/link";
import { Home, User, CalendarCheck } from "lucide-react";
import useNavigation from "@/hook/use-navigation";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const { isHomeActive, isScheduleActive, isProfileActive } = useNavigation();
  return (
    <div className="fixed bottom-0 w-full py-4 border-t mx-auto bg-white max-w-screen-sm shadow-lg">
      <div className="flex flex-row justify-around bg-white w-full items-center">
        <Link href="/" className="relative items-center flex flex-col">
          {isHomeActive ? (
            <Icons.homeActive className="w-6 h-6" />
          ) : (
            <Icons.home className="w-6 h-6" />
          )}
          <p className={cn("text-xs mt-1", isHomeActive && "text-[#3CC585]")}>
            Home
          </p>
        </Link>
        <Link href="/schedule" className="relative items-center flex flex-col">
          {isScheduleActive ? (
            <Icons.scheduleActive className="w-6 h-6" />
          ) : (
            <Icons.schedule className="w-6 h-6" />
          )}
          <p
            className={cn("text-xs mt-1", isScheduleActive && "text-[#3CC585]")}
          >
            Schedule
          </p>
        </Link>
        <Link href="/profile" className="relative items-center flex flex-col">
          {isProfileActive ? (
            <Icons.profileActive className="w-6 h-6" />
          ) : (
            <Icons.profile className="w-6 h-6" />
          )}
          <p
            className={cn("text-xs mt-1", isProfileActive && "text-[#3CC585]")}
          >
            Profile
          </p>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
