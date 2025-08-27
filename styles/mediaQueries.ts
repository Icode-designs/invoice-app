import { pxToRem } from "@/utils/helpers/pxTorem";

const BREAKPOINTS = {
  TABLET: `${pxToRem(768)}`,
  DESKTOP: `${pxToRem(1024)}`,
};

const QUERIES = {
  TABLET: `(min-width: ${BREAKPOINTS.TABLET})`,
  DESKTOP: `(min-width: ${BREAKPOINTS.DESKTOP})`,
};

export default QUERIES;
