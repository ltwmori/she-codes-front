import { Drawer } from "vaul";
import { Icons } from "./icons";
import MicrophoneComponent from "./mic-recording";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";

const VoiceOrdering = () => {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <div className="absolute top-10 left-10 bg-[#3CC585] px-4 py-2 rounded-2xl cursor-pointer shadow-lg">
          <Icons.voiceOrder className="w-10 h-10" />
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1 overflow-y-scroll">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
            <div className="max-w-xl mx-auto">
              <Drawer.Title className="mb-4 font-semibold">
                Voice-Enabled Taxi Booking for Accessible Travel
              </Drawer.Title>
              <Alert className="mt-6">
                <RocketIcon className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  Book your taxi ride easily using voice commands. Simply tell
                  us your start and end locations, price preference, and any
                  special instructions. Designed for accessibility and ease.
                </AlertDescription>
              </Alert>
              <MicrophoneComponent />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default VoiceOrdering;
