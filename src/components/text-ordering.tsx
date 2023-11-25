import { Drawer } from "vaul";
import FromInput from "./from-input";
import ToInput from "./to-input";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Options from "./options";
import { useTypedSelector } from "@/hook/use-typed-selector";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";
import { bookRide } from "@/api/ride";

const TextOrdering = ({ className }: { className?: string }) => {
  const { from, to, selectedOption } = useTypedSelector((state) => state.taxi);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to track drawer status
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleOrderButtonClick = () => {
    setIsLoading(true);
    bookRide(from.description, to.description)
      .then((res) => {
        setIsLoading(false);
        router.push(
          `/order?cliend_id=${res.client_id}&ride_id=${res.ride_id}&driver_id=${res.driver_id}`
        );
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
    // () => router.push(`/order?${from.description}+${to.description}`);
  };

  return (
    <Drawer.Root shouldScaleBackground>
      <div className="absolute z-1 bottom-[calc(30%+20px)] left-1/2 transform -translate-x-1/2 flex gap-8 justify-center items-center">
        <Badge
          variant="outline"
          className="w-25 h-7 bg-white text-[#3CC585] border border-[#3CC585] rounded-full flex justify-center items-center"
        >
          <Icons.toSource className="mr-2" /> Home
        </Badge>
        <Badge
          variant="outline"
          className="w-25 h-7 bg-white text-[#3CC585] border border-[#3CC585] rounded-full flex justify-center items-center"
        >
          <Icons.toSource className="mr-2" /> Office
        </Badge>
        <Badge
          variant="outline"
          className="w-35 h-7 bg-white text-[#3CC585] border border-[#3CC585] rounded-full flex justify-center items-center"
        >
          <Icons.toSource className="mr-2" /> Apartment
        </Badge>
      </div>
      <Drawer.Trigger asChild onClick={toggleDrawer}>
        <button
          className={cn(
            "absolute w-full bg-white bottom-14 left-0 h-44 rounded-3xl"
          )}
        >
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-2" />
          <div>
            <FromInput />
            <ToInput />
          </div>
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0"
          onClick={toggleDrawer}
        >
          <div className="p-4 bg-white rounded-t-[10px] flex-1 relative">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
            <div>
              <FromInput />
              <ToInput />
            </div>
            {from.location && to.location && <Options />}
            <div className="flex justify-center items-center absolute bottom-10 w-full pr-4">
              <Button
                className="w-[300px]"
                onClick={handleOrderButtonClick}
                disabled={!from.location || !to.location || !selectedOption}
              >
                {isLoading ? "Loading..." : "Order"}
              </Button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default TextOrdering;
