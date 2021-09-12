import _ from "lodash";
import {
  addComponent,
  addEntity,
  createWorld,
  defineComponent,
  defineQuery,
  removeComponent,
} from "bitecs";

const world = createWorld();
const InFov = defineComponent();

// create 100 entities
_.times(100, () => addEntity(world));

// add fov component to first 25 entities
for (let i = 0; i < 25; i++) {
  addComponent(world, InFov, i);
}

// if the inFovQuery is defined outside of the fovSystem
// it only returns new entities that match the query
const inFovQuery = defineQuery([InFov]);

export const fovSystem = (world) => {
  // if it is defined inside of the query it returns all entities that match the query
  // const inFovQuery = defineQuery([InFov]);

  const inFovEnts = inFovQuery(world);

  console.log(`expect: 25, actual: ${inFovEnts.length}`);

  for (let i = 0; i < inFovEnts.length; i++) {
    const eid = inFovEnts[i];
    removeComponent(world, InFov, eid);
  }

  return world;
};

fovSystem(world);

// add fov component to next 25 entities
for (let i = 10; i < 35; i++) {
  addComponent(world, InFov, i);
}

fovSystem(world);
