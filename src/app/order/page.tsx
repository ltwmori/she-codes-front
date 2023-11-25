"use client";

import Options from "@/components/options";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { shareRide } from "@/api/ride";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type NumberType = {
  id: number;
  name: string;
  phone: string;
};

const Numbers: NumberType[] = [
  {
    id: 1,
    name: "Aruzhan",
    phone: "87075210402",
  },
  {
    id: 2,
    name: "Assel",
    phone: "87055781044",
  },
];

type CheckedNumbersType = {
  [key: number]: boolean;
};

const Order = () => {
  const pathname = useSearchParams();
  const { toast } = useToast();
  const router = useRouter();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const ride_id_from_path = pathname.get("ride_id");
  const [allowRideSharing, setAllowRideSharing] = useState(false);

  const [checkedNumbers, setCheckedNumbers] = useState<CheckedNumbersType>({});

  const handleCheckboxChange = (id: number) => {
    setCheckedNumbers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getCheckedNumbers = (): NumberType[] => {
    return Numbers.filter((number) => checkedNumbers[number.id]);
  };

  const handleAllowRideSharingClick = () => {
    const checkedNumbers = getCheckedNumbers();
    setDialogOpen(false);
  };

  return (
    <div className="px-4 py-6">
      <div className="h-[600px] overflow-y-scroll">
        <div className="flex flex-row justify-between items-center">
          <Link href="/" className="">
            <ArrowLeft />
          </Link>
          <h1 className="font-semibold text-base">Order details</h1>
          <div></div>
        </div>
        <p className="text-center mt-4 text-xs">
          Check the order details and confirm your order
        </p>
        <Options />
        <Card className="mt-6">
          <CardContent className="pt-3">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <h3 className="font-semibold text-base mb-3">
                  Activate ride sharing
                </h3>
                <p className="text-xs text-gray-400">
                  Allow contacts to get information about your movements
                </p>
              </div>
              <div>
                <Switch
                  checked={allowRideSharing}
                  onCheckedChange={setAllowRideSharing}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {allowRideSharing && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <div className="border-t-[1px] border-b-[1px] flex flex-row p-3 justify-between items-center mt-4 cursor-pointer">
                <div className="flex flex-row">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mr-3"
                  >
                    <g clipPath="url(#clip0_129_180)">
                      <path
                        d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
                        stroke="#9B40BF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_129_180">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-base mb-3">
                      Select contacts
                    </h3>
                    <p className="text-xs text-gray-400">
                      These people will get info about your ride
                    </p>
                  </div>
                </div>
                <ArrowRight />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Select contacts</DialogTitle>
                <DialogDescription>
                  These people will get info about your ride
                </DialogDescription>
              </DialogHeader>

              {Numbers.map((number) => (
                <div key={number.id} className="mt-6">
                  <div className="flex flex-row justify-between items-center hover:bg-gray-100 cursor-pointer p-2 rounded-md">
                    <div className="flex flex-row">
                      <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                      <div className="flex flex-col">
                        <h3 className="font-semibold text-base mb-3">
                          {number.name}
                        </h3>
                        <p className="text-xs text-gray-400">{number.phone}</p>
                      </div>
                    </div>
                    <div>
                      <Checkbox
                        checked={!!checkedNumbers[number.id]}
                        onCheckedChange={() => handleCheckboxChange(number.id)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                className="mt-6 w-full"
                onClick={handleAllowRideSharingClick}
              >
                {confirmLoading ? "Loading..." : "Confirm"}
              </Button>
            </DialogContent>
          </Dialog>
        )}

        <Card className="mt-6">
          <CardContent className="pt-3">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <h3 className="font-semibold text-base mb-3">
                  Disabilities-friendly
                </h3>
                <p className="text-xs text-gray-400">
                  Select this, if you have special needs.
                </p>
              </div>
              <div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>
        <div>
          <Button
            className="mt-6 w-full"
            onClick={() =>
              router.push(
                `order/next-steps?ride_id=${ride_id_from_path}&checked_number=${
                  getCheckedNumbers()[0].phone
                }`
              )
            }
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Order;
