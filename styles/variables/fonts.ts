import { League_Spartan } from "next/font/google";
import { pxToRem } from "@/utils/helpers/pxTorem";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const fontVariables = () => `
--font-family: ${leagueSpartan.style.fontFamily}, sans-serif;
--bold-font: 700;
--medium-font: 500;
--regular-font: 400;
--light-font: 300;

--font-size-h1: ${pxToRem(32)};
--font-size-h2: ${pxToRem(20)};
--font-size-h3: ${pxToRem(16)};
--font-size-h3-sm: ${pxToRem(14)};
--font-size-body: ${pxToRem(12)};
--font-size-body-sm: ${pxToRem(11)};

--line-height-h1: ${pxToRem(36)};
--line-height-h2: ${pxToRem(22)};
--line-height-h3: ${pxToRem(24)};
--line-height-h3-sm: ${pxToRem(15)};
--line-height-body:${pxToRem(15)};
--line-height-body-sm: ${pxToRem(18)};

--letter-spacing-h1: ${pxToRem(-1)};
--letter-spacing-h2: ${pxToRem(-0.63)};
--letter-spacing-h3: ${pxToRem(-0.8)};
--letter-spacing-h3-sm: ${pxToRem(-0.25)};
--letter-spacing-body: ${pxToRem(-0.25)};
--letter-spacing-body-sm: ${pxToRem(-0.23)};
`;

export default fontVariables;
