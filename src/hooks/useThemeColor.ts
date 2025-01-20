import { useEffect } from "react";

/**
 * Sets the theme color of the page to the given color.
 * @param bgColor - The color to set the theme color to.
 */
export const useThemeColor = (bgColor: string) => {
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", bgColor);
    }
    document.body.style.backgroundColor = bgColor;
  }, [bgColor]);
};
