import type { DiagramDefinition } from '../../diagram-api/types.js';
// @ts-ignore: jison doesn't export types
import parser from './parser/euler.jison';
import { db } from './eulerDB.js';
import flowStyles from './styles.js';
import { renderer } from './eulerRenderer.js';

export const diagram: DiagramDefinition = {
  parser,
  db,
  renderer,
  styles: flowStyles,
};
