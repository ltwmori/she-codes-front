"use client";

// Import necessary modules and components
import { useEffect, useState, useRef } from "react";
import styles from "./MicrophoneComponent.module.css";
import { Button } from "./ui/button";
import { voiceBookRide } from "@/api/ride";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
// Declare a global interface to add the webkitSpeechRecognition property to the Window object
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

// Export the MicrophoneComponent function component
export default function MicrophoneComponent() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [transcript, setTranscript] = useState("");

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  // Reference to store the SpeechRecognition instance
  const recognitionRef = useRef<any>(null);

  // Function to start recording
  const startRecording = () => {
    setIsRecording(true);
    // Create a new SpeechRecognition instance and configure it
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    // Event handler for speech recognition results
    recognitionRef.current.onresult = (event: any) => {
      const { transcript } = event.results[event.results.length - 1][0];

      // Log the recognition results and update the transcript state
      console.log(event.results);
      setTranscript(transcript);
    };

    // Start the speech recognition
    recognitionRef.current.start();
  };

  // Cleanup effect when the component unmounts
  useEffect(() => {
    return () => {
      // Stop the speech recognition if it's active
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Function to stop recording
  const stopRecording = () => {
    if (recognitionRef.current) {
      // Stop the speech recognition and mark recording as complete
      recognitionRef.current.stop();
      setRecordingComplete(true);
    }
  };

  // Toggle recording state and manage recording actions
  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const handleVoiceOrderClick = () => {
    console.log(transcript);
    if (transcript.length > 0) {
      setLoading(true);
      voiceBookRide(transcript)
        .then((res) => {
          setLoading(false);
          console.log(res);
          if (res.ride_id) {
            setTranscript("");
            toast({
              description: `Your order from ${res.pick_up_location} to ${res.destination} has been successfully created! You can check it in incoming orders section!`,
            });
            router.push(
              `/order/success?cliend_id=${res.client_id}&ride_id=${res.ride_id}&driver_id=${res.driver_id}&pick_up_location=${res.pick_up_location}&destination=${res.destination}&status=${res.status}`
            );
          }
        })
        .catch((err) => {
          setLoading(false);
          toast({
            description: `Something went wrong! Please try again!`,
          });
        });
    } else {
      toast({
        description: `Please record your order first!`,
      });
    }
  };

  // Render the microphone component with appropriate UI based on recording state
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full">
        <div className="flex items-center justify-center w-full p-28">
          <button
            onClick={handleToggleRecording}
            className={`m-auto flex items-center justify-center bg-[#9e9e9e] hover:bg-[#595959] rounded-full w-40 h-40 focus:outline-none ${
              isRecording ? styles.rippleAnimation : ""
            }`}
          >
            <svg
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-white"
            >
              <path
                fill="currentColor" // Change fill color to the desired color
                d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z"
              />
            </svg>
          </button>
        </div>
        {(isRecording || transcript) && (
          <div className=" m-auto rounded-md border p-4 bg-white">
            <div className="flex-1 flex w-full justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {recordingComplete ? "Recorded" : "Recording"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {recordingComplete
                    ? "Thanks for recording the order! We will proceed with it!"
                    : "Start speaking..."}
                </p>
              </div>
              {isRecording && (
                <div className="rounded-full w-4 h-4 bg-red-400 animate-pulse" />
              )}
            </div>

            {transcript && (
              <div className="border rounded-md p-2 h-fullm mt-4">
                <p className="mb-0">{transcript}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <Button className="w-[300px] mt-6" onClick={handleVoiceOrderClick}>
        {loading ? "Loading..." : "Order"}
      </Button>
    </div>
  );
}
