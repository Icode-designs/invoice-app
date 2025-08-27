"use client";

import { useEffect, useState } from "react";

export const useMediaQuery = (media: number) => {
  const [isMedia, setIsMedia] = useState<boolean>(false);

  useEffect(() => {
    const checkScreen = () => setIsMedia(window.innerWidth >= media);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [media]);

  return isMedia;
};
