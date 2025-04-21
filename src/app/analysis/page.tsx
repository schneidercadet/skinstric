"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DemographicData } from "@/services/imageAnalysisService";
import DiamondLayout from "@/components/DiamondLayout";
import AnimatedNotification from "@/components/AnimatedNotification";
import Image from "next/image";

export default function AnalysisPage() {
  const router = useRouter();
  const [demographicData, setDemographicData] =
    useState<DemographicData | null>(null);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const savedResults = localStorage.getItem("skinstricAnalysisResults");

    if (savedResults) {
      try {
        setDemographicData(JSON.parse(savedResults));
      } catch (error) {
        console.error("Error parsing demographic data:", error);
        router.push("/upload-photo");
      }
    } else {
      router.push("/upload-photo");
    }
  }, [router]);

  return (
    <div className="w-full min-h-screen relative bg-neutral-50 overflow-hidden">
      <div className="left-[32px] top-[86px] absolute">
        <div className="justify-start text-zinc-900 text-sm font-semibold uppercase leading-normal">
          A. I. Analysis
        </div>
        <div className="w-80 mt-4 justify-start text-zinc-900 text-sm font-normal uppercase leading-normal">
          A. I. has estimated the following. <br />
          Fix estimated information if needed.
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center justify-center">
          <DiamondLayout
            items={{
              top: { title: "Demographics", href: "/analysis/demographics" },
              bottom: { title: "Weather", href: "/analysis/weather" },
              left: { title: "Skin Type Details", href: "/analysis/skin-type" },
              right: {
                title: "Cosmetic Concerns",
                href: "/analysis/cosmetic-concerns",
              },
            }}
            gap={80}
            size={150}
          />
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

      <div className="right-[32px] bottom-[32px] absolute inline-flex justify-end items-center gap-4">
        <Link href="/demographics-result">
          <div className="flex items-center gap-1 hover:opacity-80 transition-opacity">
            <span className="text-[9px] sm:text-[10px] text-black font-medium uppercase">
              Get Summary
            </span>
            <Image
              src="/assets/images/forward-button.svg"
              alt="Next"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      <AnimatedNotification
        show={showNotification && demographicData !== null}
        title="You haven't met following requirements. Test results might be inaccurate."
        items={[
          { text: "Neutral Expression", complete: false },
          { text: "Frontal Pose", complete: false },
          { text: "Adequate Lighting", complete: true },
        ]}
        onClose={() => setShowNotification(false)}
        delay={1000}
      />
    </div>
  );
}
