"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Ripple } from "@/components/ui/Ripple";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { analyzeImage, storeAnalysisResults } from "@/services/imageAnalysisService";

const loadingStates = [
  {
    text: "Detecting facial features",
  },
  {
    text: "Analyzing demographic data",
  },
  {
    text: "Processing results",
  },
];

export default function AnalyzingImagePage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    const storedImageData = localStorage.getItem("skinstricImageData");

    if (!storedImageData) {
      router.push("/upload-photo");
      return;
    }

    const processImage = async () => {
      try {
        setCurrentStep(0);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setCurrentStep(1);

        const response = await analyzeImage();

        storeAnalysisResults(response.data);

        setCurrentStep(2);
        await new Promise((resolve) => setTimeout(resolve, 1500));

        router.push("/analysis");
      } catch (error) {
        console.error("Error analyzing image:", error);
        alert("There was an error analyzing your image. Please try again.");
        router.push("/upload-photo");
      }
    };

    processImage();

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="w-full min-h-screen bg-neutral-50 relative">
      <div className="absolute inset-0 z-0">
        <Ripple
          size={600}
          opacity={0.8}
          count={6}
          spacing={50}
          breathingDelay={0.25}
          className={`transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-140px)] px-6">
        <div className="flex flex-col items-center justify-center w-full">
          <MultiStepLoader loadingStates={loadingStates} value={currentStep} />
        </div>
      </div>

      <div className="absolute bottom-8 left-6 z-10">
        <Link href="/upload-photo">
          <div className="flex items-center gap-1 hover:opacity-80 transition-opacity">
            <Image
              src="/assets/images/back-button.svg"
              alt="Back"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="text-[9px] sm:text-[10px] text-black font-medium uppercase">
              Back
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
