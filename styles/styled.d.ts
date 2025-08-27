import "styled-components";
import { Theme } from "@/types/theme/theme";

declare module "styled-components" {
  // eslint-disable-next-line
  export interface DefaultTheme extends Theme {}
}
