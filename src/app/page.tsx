"use client";
import MyMap from "@/components/map";
import TextOrdering from "@/components/text-ordering";
import VoiceOrdering from "@/components/voice-ordering";
import "regenerator-runtime/runtime";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <MyMap />
      <TextOrdering />
      <VoiceOrdering />
    </div>
  );
}
