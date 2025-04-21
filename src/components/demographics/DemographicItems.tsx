import React, { useState, useEffect, useRef } from "react";
import mockData from "@/data/mockDemographicData.json";
import Image from "next/image";

interface DemographicItem {
  name: string;
  percentage: number;
  selected: boolean;
}

interface DemographicItemsProps {
  section: "race" | "age" | "sex";
  onItemSelect?: (name: string, percentage: number) => void;
}

const DemographicItems: React.FC<DemographicItemsProps> = ({
  section = "race",
  onItemSelect,
}) => {
  const [items, setItems] = useState<DemographicItem[]>([]);
  const initialSelectionMade = useRef(false);

  useEffect(() => {
    initialSelectionMade.current = false;

    let processedItems: DemographicItem[] = [];

    if (section === "race") {
      processedItems = Object.entries(mockData.data.race).map(
        ([name, value]) => ({
          name: name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          percentage: Math.round(Number(value) * 100),
          selected: false,
        })
      );
    } else if (section === "age") {
      processedItems = Object.entries(mockData.data.age).map(
        ([name, value]) => ({
          name: name,
          percentage: Math.round(Number(value) * 100),
          selected: false,
        })
      );

      processedItems.sort((a, b) => {
        const getAgeOrder = (ageRange: string): number => {
          if (ageRange === "70+") return 7;
          const startAge = parseInt(ageRange.split("-")[0]);
          return Math.floor(startAge / 10);
        };

        return getAgeOrder(a.name) - getAgeOrder(b.name);
      });
    } else if (section === "sex") {
      processedItems = Object.entries(mockData.data.gender).map(
        ([name, value]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          percentage: Math.round(Number(value) * 100),
          selected: false,
        })
      );
    }

    if (section !== "age") {
      processedItems.sort((a, b) => b.percentage - a.percentage);
    }

    if (processedItems.length > 0) {
      processedItems[0].selected = true;
    }

    setItems(processedItems);
  }, [section]);

  useEffect(() => {
    if (items.length > 0 && !initialSelectionMade.current && onItemSelect) {
      const selectedItem = items.find((item) => item.selected);
      if (selectedItem) {
        onItemSelect(selectedItem.name, selectedItem.percentage);
        initialSelectionMade.current = true;
      }
    }
  }, [items, onItemSelect]);

  const handleItemClick = (index: number) => {
    const newItems = items.map((item, i) => ({
      ...item,
      selected: i === index,
    }));

    setItems(newItems);

    if (onItemSelect && newItems[index]) {
      onItemSelect(newItems[index].name, newItems[index].percentage);
    }
  };

  const Diamond = ({ filled = false }: { filled?: boolean }) => (
    <div className="w-4 h-4 relative flex-shrink-0">
      <Image
        src={
          filled
            ? "/assets/images/radiobutton-on.svg"
            : "/assets/images/radiobutton-off.svg"
        }
        alt={filled ? "Selected" : "Not selected"}
        width={16}
        height={16}
      />
    </div>
  );

  return (
    <div className="bg-[#EBEBEB] border-t border-black w-full sm:w-80 h-auto sm:h-[484px] flex flex-col">
      <div className="flex justify-between items-center p-4 sm:p-6 font-semibold text-xs sm:text-sm uppercase text-black">
        <span>{section}</span>
        <span>A. I. Confidence</span>
      </div>

      <div className="flex-grow overflow-y-auto">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 sm:p-4 cursor-pointer transition-colors ${
              item.selected
                ? "bg-zinc-900 text-white"
                : "bg-[#EBEBEB] text-black hover:bg-[#E5E5E5]"
            }`}
            onClick={() => handleItemClick(index)}
          >
            <div className="flex items-center">
              <Diamond filled={item.selected} />
              <span className="ml-2 sm:ml-3 text-xs sm:text-sm">
                {item.name}
              </span>
            </div>
            <div className="flex items-center">
              <div
                className={`w-12 sm:w-16 h-1 mr-2 rounded-full overflow-hidden ${item.selected ? "bg-zinc-700" : "bg-zinc-300"}`}
              >
                <div
                  className="h-full bg-current"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <span className="text-xs sm:text-sm whitespace-nowrap">
                {item.percentage} %
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemographicItems;
