export interface StepCost {
  amount: string;
  concept: string;
  place: string;
  codes?: Array<{ code: string; label: string; amount: string }>;
}

export interface StepDrive {
  title: string;
  driveUrl: string;
  downloadUrl?: string;
  isOfficial?: boolean;
}

export interface StepCopyBox {
  id: string;
  content: string;
}

export interface StepGuideKey {
  code: string;
  text: string;
  items?: string[];
  copyBox?: StepCopyBox;
}

export interface StepGuideSection {
  title: string;
  items: string[];
}

export interface StepInfoPanel {
  id: string;
  title: string;
  rows: Array<{ career: string; shortLabel: string; value: string }>;
}

export interface StepGuide {
  heading: string;
  introAlert?: string;
  intro?: string;
  hint?: string;
  keys: StepGuideKey[];
  sections?: StepGuideSection[];
  infoPanels?: StepInfoPanel[];
  close?: string;
}

export interface StepValidity {
  required: boolean;
  authority: string;
  deadline?: string;
}

export interface StepItem {
  id: string;
  label: string;
  summary: string;
  location: string;
  cost?: StepCost;
  drive?: StepDrive;
  guide?: StepGuide;
  validity?: StepValidity;
  template?: boolean;
  xpReward?: number;
}

export interface ModuleDefinition {
  id: string;
  label: string;
  summary: string;
  steps: StepItem[];
}

export interface CreditRequirement {
  career: string;
  credits: number;
  note?: string;
}

export interface RouteDefinition {
  id: string;
  label: string;
  summary: string;
  color: string;
  facultyLabel: string;
  schoolLabel: string;
  minCredits: CreditRequirement[];
  modules: ModuleDefinition[];
}
