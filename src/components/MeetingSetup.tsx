"use client";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function MeetingSetup({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void
}) {
  const [isMicCamToggledOn, setIsMicCanToggledOn] = useState(false);

  const call = useCall();

  if (!call) {
    throw new Error("useCall needs to be used within StreamCall component");
  }

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-blue-500">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center jsutify-center gap-3">
        <label
          htmlFor=""
          className="flex items-center justify-center gap-2 font-medium"
        >
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCanToggledOn(e.target.checked)}
            className=""
          />
          Join with mic and camera off
        </label>

        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();
          setIsSetupComplete(true)
        }}
      >
        Join meeting
      </Button>
    </div>
  );
}
