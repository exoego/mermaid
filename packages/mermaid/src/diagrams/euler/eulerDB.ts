import type { EulerDB } from './eulerTypes.js';
import type { EulerDiagramConfig } from '../../config.type.js';
import { cleanAndMerge } from '../../utils.js';
import { getConfig as commonGetConfig } from '../../config.js';
import {
  clear,
  getAccDescription,
  getAccTitle,
  getDiagramTitle,
  setAccDescription,
  setAccTitle,
  setDiagramTitle,
} from '../common/commonDb.js';
import DEFAULT_CONFIG from '../../defaultConfig.js';

const sets: Array<string> = [];
const addSets = function (identifierList: Array<string>) {
  sets.push(...identifierList);
};
const getSets = function (): Array<string> {
  return sets;
};

const subsets: Map<string, number> = new Map();
export const addSubsetData = function (identifierList: Array<string>, data: number) {
  subsets.set(identifierList.sort().join(','), data);
};
export const getSubsetData = function () {
  return subsets;
};

const DEFAULT_PACKET_CONFIG: Required<EulerDiagramConfig> = DEFAULT_CONFIG.euler;
const getConfig = (): Required<EulerDiagramConfig> => {
  // TODO: Enrich config with additional properties
  return cleanAndMerge({
    ...DEFAULT_PACKET_CONFIG,
    ...commonGetConfig().packet,
  });
};

export const db: EulerDB = {
  getConfig,
  clear,
  setAccTitle,
  getAccTitle,
  setDiagramTitle,
  getDiagramTitle,
  getAccDescription,
  setAccDescription,
  addSets,
  getSets,
  addSubsetData,
  getSubsetData,
};
