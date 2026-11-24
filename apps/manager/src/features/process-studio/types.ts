// OpenMad Process Studio - Types aligned with /vanilla

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

export interface StepReference {
  href?: string;
  label?: string;
  panelId?: string;
}

export interface StepGuideKey {
  code: string;
  text: string;
  items?: string[];
  reference?: StepReference;
  copyBox?: StepCopyBox;
}

export interface StepGuideSection {
  title: string;
  items: string[];
}

export interface StepAttachmentFile {
  label: string;
  downloadUrl?: string;
}

export interface InfoPanelCareerRow {
  career: string;
  shortLabel: string;
  value: string;
  note?: string;
}

export interface StepInfoPanel {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  rows: InfoPanelCareerRow[];
}

export interface StepGuide {
  heading: string;
  introAlert?: string;
  intro?: string;
  hint?: string;
  keys: StepGuideKey[];
  sections?: StepGuideSection[];
  files?: StepAttachmentFile[];
  infoPanels?: StepInfoPanel[];
  close?: string;
  whatsapp?: string;
  whatsappLabel?: string;
  email?: string;
  emailLabel?: string;
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
  facultyId: string;
  facultyLabel: string;
  schoolId: string;
  schoolLabel: string;
  minCredits: CreditRequirement[];
  modules: ModuleDefinition[];
}

export type ProcessRoute = RouteDefinition;

export interface MacroProcessData {
  id: string;
  title: string;
  category: string;
  stepsCount: number;
  totalCost: string;
  driveDocs: number;
  faculty: string;
  status: 'published' | 'draft';
  onOpenBuilder: (id: string) => void;
}

export type PalettePieceType =
  | 'step'
  | 'cost'
  | 'drive'
  | 'validity'
  | 'alert'
  | 'copyBox'
  | 'checklist'
  | 'infoPanel'
  | 'attachment';
