import { animate, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export function RaisedShadow(value) {
  const inactiveShadow = "0px 0px 0px rgba(0,0,0,0.17)";
  const boxShadow = useMotionValue(inactiveShadow);
  useEffect(() => {
    let isMoving = false;
    value.onChange((num) => {
      const wasMoving = isMoving;
      if (num !== 0) {
        isMoving = true;
        if (isMoving !== wasMoving) {
          animate(boxShadow, "7px 7px 25px 0px rgba(0,0,0,0.17)");
        }
      } else {
        isMoving = false;
        if (isMoving !== wasMoving) {
          animate(boxShadow, inactiveShadow);
        }
      }
    });
  }, [value, boxShadow]);

  return boxShadow;
}
