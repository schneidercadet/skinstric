"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Ripple } from "@/components/ui/Ripple";
import Camera from "@/components/Camera";
import ImageUploader from "@/components/ImageUploader";
import { Progress } from "@/components/ui/progress";

export default function UploadPhotoPage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [userName, setUserName] = useState("");
  const [activeComponent, setActiveComponent] = useState<"options" | "camera" | "uploader">("options");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    const savedData = localStorage.getItem("skinstricUserData");
    if (savedData) {
      const userData = JSON.parse(savedData);
      setUserName(userData.name || "");
    }

    return () => clearTimeout(timer);
  }, []);

  const handleCameraCapture = () => {
    setActiveComponent("camera");
  };

  const handleImageUploaderSelect = () => {
    setActiveComponent("uploader");
  };

  const handleImageCaptured = async (imageData: string) => {
    try {
      localStorage.setItem("skinstricImageData", imageData);
      
      router.push("/analyzing-image");
    } catch (error) {
      console.error("Error processing image:", error);
      alert("There was an error processing your image. Please try again.");
      setActiveComponent("options");
    }
  };

  const handleBackToOptions = () => {
    setActiveComponent("options");
  };

  return (
    <div className="w-full h-screen relative bg-neutral-50 overflow-hidden">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <Ripple
            size={600}
            opacity={0.8}
            count={6}
            spacing={50}
            breathingDelay={0.25}
            className={`transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          />
        </div>

        <div
          className={`flex flex-col items-center justify-center z-10 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"} w-full max-w-4xl px-4`}
        >
          {activeComponent === "options" && (
            <>
              <h2 className="text-black text-3xl font-semibold mb-8">
                {userName ? `Hi ${userName}!` : "Almost there!"}
              </h2>

              <div className="flex flex-col md:flex-row gap-12 md:gap-24">
                <div
                  className="flex flex-col items-center cursor-pointer transition-all w-40"
                  onClick={handleCameraCapture}
                >
                  <div className="w-40 h-40 rounded-full bg-white/20 backdrop-blur-sm border border-purple-100 flex items-center justify-center mb-5 shadow-lg transition-all duration-300 hover:bg-white/30 hover:shadow-xl hover:scale-105 hover-border-effect">
                    <Image
                      src="/assets/images/camera.svg"
                      alt="Camera"
                      width={80}
                      height={80}
                      className="transition-transform duration-300"
                    />
                  </div>
                  <span className="text-zinc-900 font-semibold text-lg text-center">
                    Take a Photo
                  </span>
                </div>

                <div className="flex flex-col items-center w-40">
                  <div 
                    className="cursor-pointer transition-all"
                    onClick={handleImageUploaderSelect}
                  >
                    <div className="w-40 h-40 rounded-full bg-white/20 backdrop-blur-sm border border-purple-100 flex items-center justify-center mb-5 shadow-lg transition-all duration-300 hover:bg-white/30 hover:shadow-xl hover:scale-105 hover-border-effect">
                      <Image
                        src="/assets/images/gallery.svg"
                        alt="Gallery"
                        width={80}
                        height={80}
                        className="transition-transform duration-300"
                      />
                    </div>
                    <span className="text-zinc-900 font-semibold text-lg text-center block">
                      Upload photo
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-zinc-500 text-center max-w-md">
                Please make sure your photo has good lighting and clearly shows your
                face.
              </p>
            </>
          )}

          {activeComponent === "camera" && (
            <div className="w-full max-w-2xl">
              <h2 className="text-black text-2xl font-semibold mb-6 text-center">Take a Photo</h2>
              <Camera 
                onCapture={handleImageCaptured} 
                onClose={handleBackToOptions}
              />
            </div>
          )}

          {activeComponent === "uploader" && (
            <div className="w-full max-w-2xl">
              <h2 className="text-black text-2xl font-semibold mb-6 text-center">Upload a Photo</h2>
              <ImageUploader 
                onUpload={handleImageCaptured}
                onClose={handleBackToOptions}
              />
            </div>
          )}
        </div>

        <div
          className={`absolute bottom-[80px] left-[32px] inline-flex items-center gap-4 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          {activeComponent !== "options" ? (
            <button
              onClick={handleBackToOptions}
              className="flex items-center gap-3 transition-transform hover:scale-105"
            >
              <Image
                src="/assets/images/back-button.svg"
                alt="Back"
                width={24}
                height={24}
                className="transition-opacity hover:opacity-80"
              />
              <span className="text-zinc-900 text-sm font-semibold uppercase leading-none">
                back
              </span>
            </button>
          ) : (
            <Link href="/take-test">
              <div className="flex items-center gap-3 transition-transform hover:scale-105">
                <Image
                  src="/assets/images/back-button.svg"
                  alt="Back"
                  width={24}
                  height={24}
                  className="transition-opacity hover:opacity-80"
                />
                <span className="text-zinc-900 text-sm font-semibold uppercase leading-none">
                  back
                </span>
              </div>
            </Link>
          )}
        </div>
        
        <div
          className={`absolute top-[86px] left-[32px] transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"} w-56`}
        >
          <div className="flex flex-col gap-2">
            <div className="text-zinc-900 text-sm font-semibold uppercase leading-normal">
              Step 3 of 3: Your Photo
            </div>
            <Progress
              value={100}
              className="h-1.5 rounded-sm"
            />
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .hover-border-effect {
          position: relative;
        }
        
        .hover-border-effect::before {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          background: linear-gradient(45deg, #c4b5fd, #ddd6fe);
          border-radius: 100%;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .hover-border-effect:hover::before {
          opacity: 1;
          animation: rotate 2s linear infinite;
        }
        
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
