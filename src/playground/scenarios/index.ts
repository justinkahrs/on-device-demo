import { arrivalPlannerScenario } from "./arrivalPlannerScenario";
import { incidentResponseScenario } from "./incidentResponseScenario";
import { stayExtensionBillingScenario } from "./stayExtensionBillingScenario";

export type { PlaygroundScenario } from "./types";
export {
  arrivalPlannerScenario,
  incidentResponseScenario,
  stayExtensionBillingScenario,
};

export const scenarios = [
  arrivalPlannerScenario,
  stayExtensionBillingScenario,
  incidentResponseScenario,
];
