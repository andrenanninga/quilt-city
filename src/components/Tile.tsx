/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const Tile = props => (
  <img
    css={css`
      width: 256px;
      height: 256px;
      background-color: #e9eeee;
      pointer-events: none;
    `}
    draggable={false}
    {...props}
  />
);

export { Tile };
