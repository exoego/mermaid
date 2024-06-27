import type {
  DiagramDetector,
  DiagramLoader,
  ExternalDiagramDefinition,
} from '../../diagram-api/types.js';

const id = 'euler';

const detector: DiagramDetector = (txt) => {
  return /^\s*euler-beta/.test(txt);
};

const loader: DiagramLoader = async () => {
  const { diagram } = await import('./eulerDiagram.js');
  return { id, diagram };
};

const plugin: ExternalDiagramDefinition = {
  id,
  detector,
  loader,
};

export default plugin;
