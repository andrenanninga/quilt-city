/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState } from "react";

const Tile = props => {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <img
      css={css`
        width: 256px;
        height: 256px;
        pointer-events: none;
        opacity: ${loaded ? 1 : 0};
        transition: opacity ease-in 0.4s;
      `}
      draggable={false}
      onLoad={() => setLoaded(true)}
      {...props}
    />
  );
};

export { Tile };
