import type { Diagram } from '../../Diagram.js';
import * as configApi from '../../config.js';
import type { EulerDB } from './eulerTypes.js';
import type { DiagramRenderer, DrawDefinition, Group, SVG } from '../../diagram-api/types.js';
import { selectSvgElement } from '../../rendering-util/selectSvgElement.js';
import { configureSvgSize } from '../../setupGraphViewbox.js';

export const draw: DrawDefinition = async function (
  _text: string,
  id: string,
  _version: string,
  diagObj: Diagram
): Promise<void> {
  const db = diagObj.db as EulerDB;
  const sets = db.getSets();
  const title = db.getDiagramTitle?.();
  const config = configApi.getConfig();
  const svg = selectSvgElement(id);
  const svgWidth = 1600;
  const svgHeight = 900;

  svg.attr('viewbox', `0 0 ${svgWidth} ${svgHeight}`);
  configureSvgSize(svg, svgHeight, svgWidth, true);

  // legend
  for (const [i, set] of sets.entries()) {
    svg
      .append('circle')
      .attr('cx', 50 + i * 50)
      .attr('cy', 50 + i * 50)
      .attr('r', 30 + i * 5);
    svg
      .append('text')
      .attr('fill', 'white')
      .attr('x', 50 + i * 50)
      .attr('y', 50 + i * 50)
      .attr('class', `legend font-size-${i}`)
      .attr('dominant-baseline', 'middle')
      .attr('text-anchor', 'middle')
      .text(set);
  }

  svg
    .append('text')
    .text(title)
    .attr('x', svgWidth / 2)
    .attr('y', svgHeight / 2)
    .attr('dominant-baseline', 'middle')
    .attr('text-anchor', 'middle')
    .attr('class', 'packetTitle');
};

export const renderer: DiagramRenderer = { draw };
