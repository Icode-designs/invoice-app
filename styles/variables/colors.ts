import { Theme } from "@/types/theme/theme";

export const colorVariables = ({ theme }: { theme: Theme }) => `
--primary-font-color: ${theme.colors.primaryFontColor};
--secondary-font-color: ${theme.colors.secondaryFontColor};
--pending-color: ${theme.colors.pendingColor};
--paid-color: ${theme.colors.paidColor};
--form-title-color: ${theme.colors.formTitleColor};
--form-label-color: ${theme.colors.formLabelColor};
--button-100: ${theme.colors.button100};
--button-100-hover: ${theme.colors.button100Hover};
--button-200: ${theme.colors.button200};
--button-200-hover: ${theme.colors.button200Hover};
--button-300: ${theme.colors.button300};
--button-300-hover: ${theme.colors.button300Hover};
--button-400: ${theme.colors.button400};
--button-400-hover: ${theme.colors.button400Hover};
--button-500: ${theme.colors.button500};
--button-500-hover: ${theme.colors.button500Hover};
--button-600: ${theme.colors.button600};
--button-600-hover: ${theme.colors.button600Hover};
--fill-color: ${theme.colors.fillColor};
--background-color: ${theme.colors.backgroundColor};
--caution-color: ${theme.colors.cautionColor};
`;
