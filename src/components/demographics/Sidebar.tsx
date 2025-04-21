import React from "react";

export interface DemographicOption {
  name: string;
  percentage: number;
  selected: boolean;
}

interface SidebarProps {
  activeSection: "race" | "age" | "sex";
  onSectionChange: (section: "race" | "age" | "sex") => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const selectedRace = "East Asian";
  const selectedAge = "20-29";
  const selectedSex = "Female";

  return (
    <div className="w-full sm:w-80 bg-[#F5F5F5] shadow-sm font-sans">
      <div className="flex flex-row md:flex-col space-x-1 md:space-x-0 md:space-y-[4px]">
        <div
          className={`relative cursor-pointer border-t border-black flex-1 md:flex-auto ${
            activeSection === "race"
              ? "bg-zinc-900 text-white"
              : "bg-[#EBEBEB] text-black hover:bg-[#E5E5E5]"
          } transition-all duration-300`}
          onClick={() => onSectionChange("race")}
        >
          <div className="p-3 md:p-4 sm:p-6 flex flex-col h-16 sm:h-20 md:h-24">
            <div className="flex justify-between items-center">
              <p className="uppercase font-semibold text-xs sm:text-sm">
                {selectedRace}
              </p>
              <p className="uppercase font-semibold tracking-tight text-xs sm:text-sm">
                RACE
              </p>
            </div>
          </div>
        </div>

        <div
          className={`relative cursor-pointer border-t border-black flex-1 md:flex-auto ${
            activeSection === "age"
              ? "bg-zinc-900 text-white"
              : "bg-[#EBEBEB] text-black hover:bg-[#E5E5E5]"
          } transition-all duration-300`}
          onClick={() => onSectionChange("age")}
        >
          <div className="p-3 md:p-4 sm:p-6 flex flex-col h-16 sm:h-20 md:h-24">
            <div className="flex justify-between items-center">
              <p className="uppercase font-semibold text-xs sm:text-sm">
                {selectedAge}
              </p>
              <p className="uppercase font-semibold tracking-tight text-xs sm:text-sm">
                AGE
              </p>
            </div>
          </div>
        </div>

        <div
          className={`relative cursor-pointer border-t border-black flex-1 md:flex-auto ${
            activeSection === "sex"
              ? "bg-zinc-900 text-white"
              : "bg-[#EBEBEB] text-black hover:bg-[#E5E5E5]"
          } transition-all duration-300`}
          onClick={() => onSectionChange("sex")}
        >
          <div className="p-3 md:p-4 sm:p-6 flex flex-col h-16 sm:h-20 md:h-24">
            <div className="flex justify-between items-center">
              <p className="uppercase font-semibold text-xs sm:text-sm">
                {selectedSex}
              </p>
              <p className="uppercase font-semibold tracking-tight text-xs sm:text-sm">
                SEX
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
