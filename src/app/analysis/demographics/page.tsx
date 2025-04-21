"use client";

import { useState } from "react";
import Sidebar from "@/components/demographics/Sidebar";
import DemographicItems from "@/components/demographics/DemographicItems";
import PercentageChart from "@/components/demographics/PercentageChart";
import mockData from "@/data/mockDemographicData.json";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const getInitialRaceSelection = () => {
  const raceEntries = Object.entries(mockData.data.race);
  return raceEntries.reduce(
    (prev, current) => {
      if (current[1] > prev.percentage / 100) {
        return {
          name: current[0],
          percentage: Math.round(Number(current[1]) * 100),
        };
      }
      return prev;
    },
    { name: "", percentage: 0 }
  );
};

export default function DemographicsPage() {
  const [activeSection, setActiveSection] = useState<"race" | "age" | "sex">(
    "race"
  );
  const [selectedItem, setSelectedItem] = useState(getInitialRaceSelection());
  const router = useRouter();

  const handleSectionChange = (section: "race" | "age" | "sex") => {
    setActiveSection(section);

    if (section === "race") {
      const initialSelection = getInitialRaceSelection();
      setSelectedItem(initialSelection);
    } else if (section === "age") {
      const entries = Object.entries(mockData.data.age);
      const highest = entries.reduce((prev, current) =>
        current[1] > prev[1] ? current : prev
      );
      setSelectedItem({
        name: highest[0],
        percentage: Math.round(Number(highest[1]) * 100),
      });
    } else if (section === "sex") {
      const entries = Object.entries(mockData.data.gender);
      const highest = entries.reduce((prev, current) =>
        current[1] > prev[1] ? current : prev
      );
      setSelectedItem({
        name: highest[0].charAt(0).toUpperCase() + highest[0].slice(1),
        percentage: Math.round(Number(highest[1]) * 100),
      });
    }
  };

  const handleItemSelect = (name: string, percentage: number) => {
    setSelectedItem({ name, percentage });
  };

  return (
    <div className="w-full min-h-screen relative bg-neutral-50 overflow-hidden">
      <div className="left-[32px] top-[86px] absolute">
        <div className="justify-start text-zinc-900 text-sm font-semibold uppercase leading-normal">
          A.I ANALYSIS
        </div>
        <div className="w-80 justify-start text-zinc-900 text-7xl font-medium uppercase leading-normal">
          DEMOGRAPHICS
        </div>
      </div>

      <div className="absolute inset-0 pt-52 flex justify-center items-start">
        <div className="hidden md:flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full max-w-[95%]">
          <Sidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
          <div className="flex-1 hidden md:block">
            <PercentageChart percentage={selectedItem.percentage} />
          </div>
          <div>
            <DemographicItems
              section={activeSection}
              onItemSelect={handleItemSelect}
            />
          </div>
        </div>

        <div className="md:hidden flex flex-col w-full max-w-[95%]">
          <div className="w-full mb-4">
            <Sidebar
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />
          </div>
          <div className="w-full">
            <DemographicItems
              section={activeSection}
              onItemSelect={handleItemSelect}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 right-6 sm:left-8 sm:right-8 flex justify-between items-center">
        <Link href="/analysis" className="z-10">
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

        <div className="hidden sm:block absolute left-0 right-0 mx-auto text-center">
          <p className="text-zinc-500 text-[10px] max-w-[200px] mx-auto">
            If A.I. estimate is wrong, select the correct one.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="dark-animated"
            size="custom"
            customWidth="80px"
            customHeight="30px"
            className="text-[8px] sm:text-[9px] uppercase px-3 sm:px-6 flex items-center justify-center"
            onClick={() => {
              console.log("Reset clicked");
              const initialSelection = getInitialRaceSelection();
              setSelectedItem({ ...initialSelection });
              setActiveSection("race");
            }}
          >
            <span className="mx-1">Reset</span>
          </Button>
          <Button
            variant="animated"
            size="custom"
            customWidth="80px"
            customHeight="30px"
            className="text-[8px] sm:text-[9px] uppercase px-3 sm:px-6 flex items-center justify-center"
            onClick={() => {
              console.log("Confirm clicked");
              router.push("/demographics-result");
            }}
          >
            <span className="mx-1">Confirm</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
