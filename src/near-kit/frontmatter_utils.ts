// src/near-kit/frontmatter_utils.ts
import { CachedMetadata } from "obsidian";
//
// =================================================================
export type ArgsType = Record<string, unknown>;

export interface FrontmatterData {
  contractId?: string;
  methodName?: string;
  args?: ArgsType;
  [key: string]: unknown;
}
// =================================================================
// contractId
// methodName
// args
// =================================================================
// Extracts NEAR contract call data from frontmatter
export function extractNearContractData(frontmatter: CachedMetadata["frontmatter"]): FrontmatterData {
  const contractId = frontmatter?.contractId;
  const methodName = frontmatter?.methodName;
  let args = frontmatter?.args;

  // Handle the case where args might be parsed as a string from frontmatter
  if (args !== undefined && typeof args === 'string') {
    try {
      args = JSON.parse(args);
    } catch (parseError) {
      console.error('Error parsing args from frontmatter:', parseError);
      throw new Error('Invalid JSON format for args in frontmatter');
    }
  }

  return {
    contractId,
    methodName,
    args: args as ArgsType,
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