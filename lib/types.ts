export type Option = {
  value: string;
  label: string;
  description?: string;
};

export type PromptFormState = {
  useCase: string;
  customUseCase: string;
  visualStyle: string;
  customVisualStyle: string;
  structure: string;
  customStructure: string;
  depth: string;
  tone: string;
  customTone: string;
  designRequirements: string[];
  creativeEnhancers: string[];
  customCreative: string;
  topic: string;
  coreConcept: string;
  targetAudience: string;
  scenario: string;
  requiredElements: string;
  forbiddenElements: string;
  customStyleDescription: string;
  customImageDescription: string;
  notes: string;
  creativityLevel: number;
  professionalismLevel: number;
  teachingMode: boolean;
  adminMode: boolean;
};

export type ExamplePreset = {
  id: string;
  title: string;
  description: string;
  form: PromptFormState;
};

export type GeneratedPrompts = {
  concise: string;
  detailed: string;
  expert: string;
};

export type ApplicationStatus = "pending" | "approved" | "rejected";

export type ApplicationRecord = {
  id: string;
  fullName: string;
  email: string;
  organization: string;
  reason: string;
  notes: string;
  status: ApplicationStatus;
  reviewedAt: string | null;
  reviewNotes: string;
  createdAt: string;
};

export type UserRecord = {
  id: string;
  fullName: string;
  email: string;
  organization: string;
  username: string;
  passwordHash: string;
  approvedAt: string;
  applicationId: string;
  createdAt: string;
};

export type SessionRole = "admin" | "user";

export type SessionPayload = {
  sub: string;
  role: SessionRole;
  exp: number;
};
