import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      cursor.classList.remove("cursor-disable");
      cursor.classList.remove("cursor-icons");
    };

    const handleMouseLeave = () => {
      cursor.classList.add("cursor-disable");
    };

    const handleHoverState = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const cursorType = target?.closest("[data-cursor]")?.getAttribute("data-cursor");

      cursor.classList.remove("cursor-disable", "cursor-icons");

      if (cursorType === "disable") {
        cursor.classList.add("cursor-disable");
      } else if (cursorType === "icons") {
        cursor.classList.add("cursor-icons");
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleHoverState);
    document.addEventListener("mouseout", handleHoverState);

    const frameId = requestAnimationFrame(updateCursor);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleHoverState);
      document.removeEventListener("mouseout", handleHoverState);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef} />;
};

export default Cursor;
