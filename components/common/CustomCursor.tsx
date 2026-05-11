"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const blurRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const blur = blurRef.current;

    if (!cursor || !blur) return;

    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      cursor.style.display = "none";
      blur.style.display = "none";
      return;
    }

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const pos = { ...mouse };
    const blurPos = { ...mouse };

    let isHidden = false;
    let currentState: "default" | "invert" = "default";

    const setNativeCursorVisible = (visible: boolean) => {
      document.body.style.cursor = visible ? "" : "none";
    };

    const showCursor = () => {
      if (!isHidden) return;
      isHidden = false;

      gsap.to([cursor, blur], {
        autoAlpha: 1,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const hideCursor = () => {
      isHidden = true;
      setNativeCursorVisible(true);

      gsap.to([cursor, blur], {
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const setDefaultStyle = () => {
      gsap.to(cursor, {
        width: 14,
        height: 14,
        backgroundColor: "rgba(85, 138, 120, 1)",
        duration: 0.56,
        ease: "power4.out",
        overwrite: "auto",
      });

      gsap.to(blur, {
        width: 34,
        height: 34,
        opacity: 0.18,
        backgroundColor: "rgba(85, 138, 120, 0.22)",
        duration: 0.56,
        ease: "power4.out",
        overwrite: "auto",
      });

      cursor.style.mixBlendMode = "normal";
    };

    const setInvertStyle = () => {
      gsap.to(cursor, {
        width: 96,
        height: 96,
        backgroundColor: "#ffffff",
        duration: 0.56,
        ease: "power4.out",
        overwrite: "auto",
      });

      gsap.to(blur, {
        width: 140,
        height: 140,
        opacity: 0.1,
        backgroundColor: "rgba(255, 255, 255, 0.18)",
        duration: 0.56,
        ease: "power4.out",
        overwrite: "auto",
      });

      cursor.style.mixBlendMode = "difference";
    };

    const animateState = (state: "default" | "invert") => {
      if (state === currentState) return;
      currentState = state;

      if (state === "invert") {
        setNativeCursorVisible(false);
        setInvertStyle();
        return;
      }

      setNativeCursorVisible(true);
      setDefaultStyle();
    };

    const isInsideRect = (x: number, y: number, rect: DOMRect, inset = 0) => {
      return (
        x >= rect.left + inset &&
        x <= rect.right - inset &&
        y >= rect.top + inset &&
        y <= rect.bottom - inset
      );
    };

    const detectState = () => {
      // Prevent cursor inversion when hovering over the header section
      const header = document.querySelector("nav");
      if (header) {
        const headerRect = header.getBoundingClientRect();
        if (mouse.y <= headerRect.bottom) {
          animateState("default");
          return;
        }
      }

      const invertTargets = document.querySelectorAll('[data-cursor="invert"]');
      let isInvert = false;

      invertTargets.forEach((el) => {
        if (isInvert) return;

        if (window.getComputedStyle(el).visibility === "hidden") return;

        const rect = el.getBoundingClientRect();

        const insetX = Math.min(24, rect.width * 0.08);
        const insetY = Math.min(14, rect.height * 0.18);

        if (isInsideRect(mouse.x, mouse.y, rect, 0)) {
          const insideX =
            mouse.x >= rect.left + insetX && mouse.x <= rect.right - insetX;
          const insideY =
            mouse.y >= rect.top + insetY && mouse.y <= rect.bottom - insetY;

          if (insideX && insideY) {
            isInvert = true;
          }
        }
      });

      if (isInvert) {
        animateState("invert");
      } else {
        animateState("default");
      }
    };

    const moveHandler = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (isHidden) showCursor();
    };

    const enterWindow = () => {
      isHidden = false;

      gsap.to([cursor, blur], {
        autoAlpha: 1,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const leaveWindow = () => {
      hideCursor();
    };

    const ticker = () => {
      pos.x += (mouse.x - pos.x) * 0.14;
      pos.y += (mouse.y - pos.y) * 0.14;

      blurPos.x += (mouse.x - blurPos.x) * 0.06;
      blurPos.y += (mouse.y - blurPos.y) * 0.06;

      detectState();

      gsap.set(cursor, {
        x: pos.x,
        y: pos.y,
        xPercent: -50,
        yPercent: -50,
      });

      gsap.set(blur, {
        x: blurPos.x,
        y: blurPos.y,
        xPercent: -50,
        yPercent: -50,
      });
    };

    gsap.set([cursor, blur], { autoAlpha: 1 });

    gsap.set(cursor, {
      width: 14,
      height: 14,
      backgroundColor: "rgba(85, 138, 120, 1)",
    });

    gsap.set(blur, {
      width: 34,
      height: 34,
      opacity: 0.18,
      backgroundColor: "rgba(85, 138, 120, 0.22)",
    });

    gsap.ticker.add(ticker);

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseenter", enterWindow);
    window.addEventListener("mouseleave", leaveWindow);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseenter", enterWindow);
      window.removeEventListener("mouseleave", leaveWindow);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div ref={blurRef} className="custom-cursor-blur" />
      <div ref={cursorRef} className="custom-cursor" />
    </>
  );
}
