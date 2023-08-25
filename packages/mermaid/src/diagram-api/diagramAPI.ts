import { addDetector } from './detectType.js';
import { log as _log, setLogLevel as _setLogLevel } from '../logger.js';
import { getConfig as _getConfig } from '../config.js';
import { sanitizeText as _sanitizeText } from '../diagrams/common/common.js';
import { setupGraphViewbox as _setupGraphViewbox } from '../setupGraphViewbox.js';
import { addStylesForDiagram } from '../styles.js';
import type { DiagramDefinition, DiagramDetector } from './types.js';
import * as _commonDb from '../commonDb.js';

/*
  Packaging and exposing resources for external diagrams so that they can import
  diagramAPI and have access to select parts of mermaid common code required to
  create diagrams working like the internal diagrams.
*/
export const log = _log;
export const setLogLevel = _setLogLevel;
export const getConfig = _getConfig;
export const sanitizeText = (text: string) => _sanitizeText(text, getConfig());
export const setupGraphViewbox = _setupGraphViewbox;
export const getCommonDb = () => {
  return _commonDb;
};

const diagrams: Record<string, DiagramDefinition> = {};
export interface Detectors {
  [key: string]: DiagramDetector;
}

/**
 * Registers the given diagram with Mermaid.
 *
 * Can be used for third-party custom diagrams.
 *
 * @param id - A unique ID for the given diagram.
 * @param diagram - The diagram definition.
 * @param detector - Function that returns `true` if a given mermaid text is this diagram definition.
 */
export const registerDiagram = (
  id: string,
  diagram: DiagramDefinition,
  detector?: DiagramDetector
) => {
  if (diagrams[id]) {
    throw new Error(`Diagram ${id} already registered.`);
  }
  diagrams[id] = diagram;
  if (detector) {
    addDetector(id, detector);
  }
  addStylesForDiagram(id, diagram.styles);

  diagram.injectUtils?.(
    log,
    setLogLevel,
    getConfig,
    sanitizeText,
    setupGraphViewbox,
    getCommonDb(),
    () => {
      // parseDirective is removed. This is a no-op for legacy support.
    }
  );
};

export const getDiagram = (name: string): DiagramDefinition => {
  if (name in diagrams) {
    return diagrams[name];
  }
  throw new DiagramNotFoundError(name);
};

export class DiagramNotFoundError extends Error {
  constructor(name: string) {
    super(`Diagram ${name} not found.`);
  }
}
