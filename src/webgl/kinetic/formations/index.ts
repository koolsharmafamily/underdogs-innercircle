import { FormationId } from '@content/scenes';
import { Formation, FormationData, LayoutContext } from '../types';
import { buildLine } from './line';
import { buildMonolith } from './monolith';
import { buildVortex } from './vortex';
import { buildWall } from './wall';
import { buildClusters } from './clusters';
import { buildTunnel } from './tunnel';
import { buildFlock } from './flock';
import { buildMark } from './mark';
import { buildCollapse } from './collapse';
import { buildCanopy } from './canopy';

export const formations: Record<FormationId, (n: number, ctx: LayoutContext) => FormationData> = {
  line: buildLine,
  monolith: buildMonolith,
  vortex: buildVortex,
  wall: buildWall,
  clusters: buildClusters,
  tunnel: buildTunnel,
  flock: buildFlock,
  mark: buildMark,
  collapse: buildCollapse,
  canopy: buildCanopy,
  caseWall: buildWall,
};

export function getFormation(id: FormationId): (n: number, ctx: LayoutContext) => FormationData {
  return formations[id] || formations.monolith;
}
