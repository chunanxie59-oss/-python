export type ClassTemplateId = 'pet' | 'account' | 'hero';

export type CodePartKey = 'class_def' | 'init' | 'self' | 'attribute' | 'method';

export interface BlueprintLine {
  lineNumber: number;
  code: string;
  part: CodePartKey;
  annotation: string;
}

export interface ClassMethodDef {
  id: string;
  name: string;
  signature: string;
  description: string;
  effectLabel: string;
}

export interface ClassTemplate {
  id: ClassTemplateId;
  className: string;
  title: string;
  subtitle: string;
  classAttributeName: string;
  classAttributeValue: string;
  blueprintLines: BlueprintLine[];
  defaultPrimaryLabel: string;
  defaultPrimaryPlaceholder: string;
  defaultSecondaryLabel: string;
  defaultSecondaryOptions: string[];
  sliderLabel: string;
  sliderUnit: string;
  sliderMin: number;
  sliderMax: number;
  sliderDefault: number;
  methods: ClassMethodDef[];
}

export interface ObjectInstance {
  id: string;
  varName: string;
  memoryAddress: string;
  templateId: ClassTemplateId;
  primaryValue: string;
  secondaryValue: string;
  numericValue: number;
  maxNumericValue: number;
  actionCount: number;
  statusText: string;
  createdAtIndex: number;
}

export interface ConsoleEntry {
  id: string;
  code: string;
  output: string;
  kind: 'instantiate' | 'method' | 'info' | 'error';
}

export interface QuizQuestion {
  id: string;
  topic: string;
  prompt: string;
  codeSnippet: string;
  options: {
    id: string;
    label: string;
    code?: string;
  }[];
  correctOptionId: string;
  hint: string;
  explanation: string;
}
