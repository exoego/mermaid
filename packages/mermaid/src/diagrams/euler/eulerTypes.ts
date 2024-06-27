import type { DiagramDBBase } from '../../diagram-api/types.js';
import type { EulerDiagramConfig } from '../../config.type.js';

export interface EulerDB extends DiagramDBBase<EulerDiagramConfig> {
  addSets: (identifierList: Array<string>) => void;
  getSets: () => Array<string>;
  addSubsetData: (identifierList: Array<string>, data: number) => void;
  getSubsetData: () => Map<string, number>;
}
