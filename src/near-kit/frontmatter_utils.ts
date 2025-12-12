// src/near-kit/frontmatter_utils.ts
import { CachedMetadata } from "obsidian";
//
// =================================================================
export type ArgsType = Record<string, unknown>;
export type OptionsType = Record<string, unknown>;

export interface FrontmatterData {
  contractId?: string;
  methodName?: string;
  args?: ArgsType;
  options?: OptionsType;
  [key: string]: unknown;
}
// =================================================================
// contractId
// methodName
// args
// options
// =================================================================
// Extracts NEAR contract call data from frontmatter
export function extractNearContractData(frontmatter: CachedMetadata["frontmatter"]): FrontmatterData {
  const contractId = frontmatter?.contractId;
  const methodName = frontmatter?.methodName;
  let args = frontmatter?.args;
  let options = frontmatter?.options;

  // Handle the case where args might be parsed as a string from frontmatter
  if (args !== undefined && typeof args === 'string') {
    try {
      args = JSON.parse(args);
    } catch (parseError) {
      console.error('Error parsing args from frontmatter:', parseError);
      throw new Error('Invalid JSON format for args in frontmatter');
    }
  }

  // Handle the case where options might be parsed as a string from frontmatter
  if (options !== undefined && typeof options === 'string') {
    try {
      options = JSON.parse(options);
    } catch (parseError) {
      console.error('Error parsing options from frontmatter:', parseError);
      throw new Error('Invalid JSON format for options in frontmatter');
    }
  }

  return {
    contractId,
    methodName,
    args: args as ArgsType,
    options: options as OptionsType,
  };
}
// =================================================================
// Validates required NEAR contract call data
export function validateNearContractData(data: FrontmatterData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.contractId) {
    errors.push("No contractId found");
  }

  if (!data.methodName) {
    errors.push("No methodName found");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}