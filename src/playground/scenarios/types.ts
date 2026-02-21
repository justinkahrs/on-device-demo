import type { MockMessageScript } from "../../lib";

export interface PlaygroundScenario {
  id: string;
  name: string;
  description: string;
  branches: string[];
  script: MockMessageScript[];
}
