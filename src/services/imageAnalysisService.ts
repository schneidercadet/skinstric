import mockData from '../data/mockDemographicData.json';

export interface DemographicData {
  race: Record<string, number>;
  age: Record<string, number>;
  gender: Record<string, number>;
}

export interface AnalysisResponse {
  message: string;
  data: DemographicData;
}

export async function analyzeImage(): Promise<AnalysisResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData as AnalysisResponse);
    }, 500);
  });
}

export function getStoredAnalysisResults(): DemographicData | null {
  try {
    const savedResults = localStorage.getItem("skinstricAnalysisResults");
    if (!savedResults) return null;
    return JSON.parse(savedResults) as DemographicData;
  } catch (error) {
    console.error("Error retrieving stored analysis results:", error);
    return null;
  }
}

export function storeAnalysisResults(data: DemographicData): void {
  try {
    localStorage.setItem("skinstricAnalysisResults", JSON.stringify(data));
  } catch (error) {
    console.error("Error storing analysis results:", error);
  }
}
