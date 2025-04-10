"use client";

import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

interface CameraProps {
  onCapture: (imageData: string) => void;
  onClose?: () => void;
}

export default function Camera({ onCapture, onClose }: CameraProps) {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(true);

  const videoConstraints = {
    width: 480,
    height: 640,
    facingMode: "user",
  };

  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
        setIsCameraActive(false);
      }
    }
  }, [webcamRef]);

  const retakePhoto = () => {
    setCapturedImage(null);
    setIsCameraActive(true);
  };

  const usePhoto = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div
        className="relative w-full max-w-xs overflow-hidden rounded-3xl bg-white/20 backdrop-blur-sm border border-purple-100 shadow-xl"
        style={{ height: "480px" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-zinc-900 hover:bg-white transition-all duration-300"
          aria-label="Close camera"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {isCameraActive ? (
          <div className="h-full">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-6 left-0 right-0 flex justify-center">
              <button
                onClick={capturePhoto}
                className="flex items-center justify-center w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full border-2 border-purple-400" />
              </button>
            </div>
          </div>
        ) : (
          capturedImage && (
            <div className="h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4 bg-white/80 backdrop-blur-sm flex justify-center gap-4">
                <button
                  onClick={retakePhoto}
                  className="px-4 py-3 rounded-full bg-white/80 backdrop-blur-sm text-zinc-900 font-medium shadow-lg hover:bg-white transition-all duration-300"
                >
                  Retake
                </button>
                <button
                  onClick={usePhoto}
                  className="px-4 py-3 rounded-full bg-purple-500/80 backdrop-blur-sm text-white font-medium shadow-lg hover:bg-purple-500 transition-all duration-300"
                >
                  Use Photo
                </button>
              </div>
            </div>
          )
        )}
      </div>

      <div className="w-full max-w-xs mt-4">
        <p className="text-sm text-zinc-500 text-center">
          Please make sure your face is well-lit and centered in the frame.
        </p>
      </div>
    </div>
  );
}
