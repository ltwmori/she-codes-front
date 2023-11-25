"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const useNavigation = () => {
  const pathname = usePathname();
  const [isHomeActive, setIsHomeActive] = useState<boolean>(true);
  const [isScheduleActive, setIsScheduleActive] = useState<boolean>(false);
  const [isProfileActive, setIsProfileActive] = useState<boolean>(false);

  useEffect(() => {
    setIsHomeActive(false);
    setIsScheduleActive(false);
    setIsProfileActive(false);
    switch (pathname) {
      case "/":
        setIsHomeActive(true);
        break;
      case "/schedule":
        setIsScheduleActive(true);
        break;
      case "/profile":
        setIsProfileActive(true);
        break;
      default:
        break;
    }
  }, [pathname]);

  return {
    isHomeActive,
    isScheduleActive,
    isProfileActive,
  };
};

export default useNavigation;
