import { useCallback, useState, useRef, MutableRefObject } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

type Rect = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
};

function getRect<T extends HTMLElement>(element?: T): Rect {
  let rect: Rect = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0
  };

  if (element) rect = element.getBoundingClientRect();

  return rect;
}

function useBoundingRect<T extends HTMLElement>(): [
  MutableRefObject<T | undefined>,
  Rect
] {
  const ref = useRef<T>();

  const [rect, setRect] = useState<Rect>(
    ref && ref.current ? getRect(ref.current) : getRect()
  );

  const handleResize = useCallback(() => {
    if (!ref.current) return;
    setRect(getRect(ref.current));
  }, [ref]);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    handleResize();

    // @ts-ignore
    if (typeof ResizeObserver === "function") {
      // @ts-ignore
      let resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(element);

      return () => {
        if (!resizeObserver) return;
        resizeObserver.disconnect();
        resizeObserver = null;
      };
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ref, handleResize]);

  return [ref, rect];
}

export { useBoundingRect };
