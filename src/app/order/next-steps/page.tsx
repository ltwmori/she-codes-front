"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useTypedSelector } from "@/hook/use-typed-selector";
import { Button } from "@/components/ui/button";
import { assignDriver, shareRide } from "@/api/ride";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const NextStepsPage = () => {
  const router = useRouter();
  const pathname = useSearchParams();
  const ride_id = pathname.get("ride_id");
  const phone_number = pathname.get("checked_number");
  const { toast } = useToast();
  const { from, to, selectedOption, travelTime } = useTypedSelector(
    (state) => state.taxi
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirmButtonClick = () => {
    if (!ride_id) {
      router.push("/");
    }

    if (phone_number) {
      shareRide(Number(ride_id), phone_number).then((res) => {
        toast({
          title: "Success",
          description: "Ride shared successfully",
        });
      });
    }

    setLoading(true);
    assignDriver(Number(ride_id))
      .then((res) => {
        setLoading(false);
        if (res.status === "accepted" || res.status === "ordered") {
          toast({
            title: "Success",
            description: "Driver accepted your ride, please wait for him",
          });
          router.push("/");
        } else {
          toast({
            title: "Waiting",
            description: "Please wait for driver to accept your ride",
          });
          router.push("/");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: "No drivers",
          description:
            "No drivers available at the moment, we will assign you one as soon as possible",
        });
        router.push("/");
      });
  };

  return (
    <div className="px-4 py-6">
      <div className="text-center flex items-center justify-between">
        <Link href={`/order?ride_id=${ride_id}`}>
          <ArrowLeft />
        </Link>
        <h1 className="text-base font-semibold">Confirm your order</h1>
        <div></div>
      </div>

      <div className="mt-6">
        <Card>
          <CardContent className="p-4">
            <ul className="flex flex-col">
              <li>
                <span className="text-green-500 font-semibold">
                  Location from:
                </span>{" "}
                {from.description}
              </li>
              <li>
                <span className="text-green-500 font-semibold">
                  Location To:
                </span>{" "}
                {to.description}
              </li>
              <li>
                <span className="text-green-500 font-semibold">
                  Selected Car:
                </span>{" "}
                {selectedOption}
              </li>
              <li>
                <span className="text-green-500 font-semibold">
                  Travel Time:
                </span>{" "}
                {travelTime} min.
              </li>
              <li>
                <span className="text-green-500 font-semibold">
                  Is ride sharing allowed?
                </span>{" "}
                {phone_number ? "Yes" : "No"}
              </li>
            </ul>
          </CardContent>
        </Card>
        <Button className="w-full mt-20" onClick={handleConfirmButtonClick}>
          {loading ? "Loading..." : "Confirm"}
        </Button>
      </div>
    </div>
  );
};

export default NextStepsPage;
