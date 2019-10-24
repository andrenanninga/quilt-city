import { NowRequest, NowResponse } from "@now/node";

// const tile = (req: NowRequest, res: NowResponse) => {
//   const { direction } = req.query;
//   const [dx, dy] = {
//     north: [0, -1],
//     south: [0, 1],
//     west: [-1, 0],
//     east: [1, 0]
//   }[direction as string] || [0, 0];

//   const z = parseInt(req.query.z as string, 10);
//   const x = parseInt(req.query.x as string, 10) + dx;
//   const y = parseInt(req.query.y as string, 10) + dy;

//   const url = `https://mapserver.mapy.cz/base-m/${z}-${x}-${y}`;

//   res.status(200).send({ url, x, y, z });
// };

const tile = (req: NowRequest, res: NowResponse) => {
  const { north, east, south, west } = req.query;

  const z = 14;
  const x = Math.round(Math.random() * 10000);
  const y = Math.round(Math.random() * 10000);

  const img = `https://mapserver.mapy.cz/base-m/${z}-${x}-${y}`;

  res.status(200).send({ img, x, y, z });
};

export default tile;
