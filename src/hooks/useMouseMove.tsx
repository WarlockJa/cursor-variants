import { useEffect, useState } from "react";

export default function useMouseMove() {
  const [cursorPos, setCursorPos] = useState({ mouseX: 0, mouseY: 0 });

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPos({ mouseX: e.clientX, mouseY: e.clientY });
    };

    document.addEventListener("mousemove", updateCursorPosition);

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  return cursorPos;
}
