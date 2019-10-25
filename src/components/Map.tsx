/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useEffect } from "react";
import { useGesture } from "react-use-gesture";
import { add } from "vec-la";
import { Tile } from "./Tile";
import { useBoundingRect } from "../hooks/useBoundingRect";

const Map = () => {
  const [ref, { width, height }] = useBoundingRect<HTMLDivElement>();
  const [tiles, setTiles] = useState([]);

  const [[x, y], setPosition] = useState([0, 0]);
  const [dx, dy] = [Math.floor(x / 256), Math.floor(y / 256)];
  const columns = Math.ceil(width / 256) + 1;
  const rows = Math.ceil(height / 256) + 1;

  useEffect(() => {
    const newTiles = [];
    const activeTiles = tiles.slice(-40);
    const loadedTiles = activeTiles.map(tile => tile.position.join("/"));

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const tile = [-dx + column, -dy + row];

        if (!loadedTiles.includes(tile.join("/"))) {
          newTiles.push({
            src: `https://mapserver.mapy.cz/base-m/14-${8947 + tile[0]}-${5615 +
              tile[1]}`,
            position: tile
          });
        }
      }
    }

    setTiles([...activeTiles, ...newTiles]);
  }, [columns, rows, x, y]);

  const bind = useGesture(
    {
      // @ts-ignore
      onDrag: ({ movement, memo = [x, y] }) => {
        const nextPosition = add(memo, movement);
        setPosition(nextPosition);
        return memo;
      }
    },
    {
      event: {
        passive: false,
        capture: false
      }
    }
  );

  return (
    <div
      {...bind()}
      ref={ref}
      css={css`
        height: 600px;
        background-color: #f1f0e4;
        position: relative;
        overflow: hidden;
        border: 2px solid green;
        user-select: none;
      `}
    >
      <div
        css={css`
          position: absolute;
          transform: translate(${x}px, ${y}px);
        `}
      >
        {tiles.map(tile => (
          <Tile
            src={tile.src}
            key={tile.position.join("/")}
            style={{
              position: "absolute",
              transform: `translate(
                  ${tile.position[0] * 256 - 256}px,
                  ${tile.position[1] * 256 - 256}px)`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export { Map };
