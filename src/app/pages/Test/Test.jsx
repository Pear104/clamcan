import { Button } from "antd";
import React, { useEffect } from "react";

export default function Test() {
  useEffect(() => {
    let but = document.getElementById("but");
    let video = document.getElementById("vid");
    let mediaDevices = navigator.mediaDevices;
    but.onclick = () => {
      mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          // Changing the source of video to current stream.
          video.srcObject = stream;
          video.addEventListener("loadedmetadata", () => {
            video.play();
          });
        })
        .catch(alert);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col justify-center items-center h-screen">
        <video
          id="vid"
          className="border border-black w-[400px] aspect-video object-cover"
        />
        <Button id="but" autoplay className="mt-4">
          Open WebCam
        </Button>
      </div>
    </div>
  );
}
