import { Button } from "@mui/material";
import { useRef } from "react";

interface DoubleClickButtonProps {
  onTimeMeasured: (ms: number) => void;
  doubleClick: (ms: number) => void;
}

export default function DoubleClickButton({
  onTimeMeasured,
  doubleClick,
}: DoubleClickButtonProps) {
  const firstClickTime = useRef<number | null>(null);

  const handleClick = () => {
    const now = performance.now();
    if (firstClickTime.current === null) {
      firstClickTime.current = now;
    } else {
      const elapse = now - firstClickTime.current;
      firstClickTime.current = null;
      onTimeMeasured(Math.floor(elapse));
      doubleClick(Math.floor(elapse));
    }
  };

  return <Button variant="contained" color="secondary" size="large" onClick={handleClick}>Clique duas vezes</Button>;
}
