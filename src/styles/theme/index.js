import * as helpers from '../helpers';

export const black = '#000000';
export const white = '#ffffff';

export const colors = {
  black,
  black05: helpers.transparentize(black, 5),
  black10: helpers.transparentize(black, 10),
  black12: helpers.transparentize(black, 12),
  black20: helpers.transparentize(black, 20),
  black36: helpers.transparentize(black, 36),
  black24: helpers.transparentize(black, 24),
  black40: helpers.transparentize(black, 40),
  black50: helpers.transparentize(black, 50),
  black54: helpers.transparentize(black, 54),
  black60: helpers.transparentize(black, 60),
  black80: helpers.transparentize(black, 80),
  black87: helpers.transparentize(black, 87),
  black90: helpers.transparentize(black, 90),
  blackLight: '#1a1a1a',
  fontBlack: '#333333',
  lightBlue: '#69D9F9',
  green: '#3AB676',
  green00: 'rgba(58, 182, 118, 0)',
  green20: 'rgba(58,182,118,0.2)',
  green30: 'rgba(58, 182, 118, 0.3)',
  green50: 'rgba(58, 182, 118, 0.5)',
  green70: '#2E915E',
  green80: 'rgba(58, 182, 118, 0.8)',
  greenBackground: '#244b4d',
  greenDarkBackground: '#1D2E33',
  darkGreen: '#204244',
  fontDarkGreen: '#0E2E2E',
  greenCard: '#435960',
  grey: '#7B9394',
  gray: '#7B9394',
  gray90: '#e5e5e5',
  fontGrey: '#999999',
  grayBlue: '#35444A',
  neuralBlue: '#74defa',
  orange: '#F18B14',
  red: '#EA5959',
  red70: '#B24C4E',
  white,
  white10: helpers.transparentize(white, 10),
  white20: helpers.transparentize(white, 20),
  white30: helpers.transparentize(white, 30),
  white40: helpers.transparentize(white, 40),
  white50: helpers.transparentize(white, 50),
  white60: helpers.transparentize(white, 60),
  white70: helpers.transparentize(white, 70),
  white80: helpers.transparentize(white, 80),
  white87: helpers.transparentize(white, 87),
  white90: helpers.transparentize(white, 90),
  white50green: '#9CDABA',
  white79green: '#D5E6D9',
  white74black: '#BDC9C9',
  offWhite: '#FEFEFE',
  hoverGray: '#D7DBDC',
  lightGray: '#D3DBDB',
  barLightGray: '#E1E1E1',
  barDarkGray: 'rgba(229,229,229,0.5)',
  boulder: '#757575',
  middleGray: '#808080',
  darkGray: '#4F6F70',
  darkslategray: '#2f4f4f',
  dimGray: '#666666',
  aluminum: '#999999',
  silver: '#CCCCCC',
  darkSilver: 'rgba(189,189,189,0.3)',
  selectItemColor: '#152D2E',
  firefly: '#0E2E2E',
  mineShaft: '#333333',
  dustyGray: '#999999',
  doveGray: '#666666',
};

export const fontSizes = {
  xxSmall: '12px',
  xSmall: '14px',
  small: '16px',
  medium: '18px',
  xMedium: '20px',
  large: '22px',
  xLarge: '28px',
  xxLarge: '32px'
};

export const lineHeights = {
  xSmall: 16,
  xMedium: 28
};

export const fontFamilies = {
  robotoCondensed: '"isdc-roboto-condensed", "Roboto Condensed", Helvetica, Arial, sans-serif',
  roboto: '"isdc-roboto", "Roboto", Helvetica, Arial, sans-serif'
};

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700
};

export const taskSelectInputTheme = {
  background: 'transparent',
  displayFontSize: fontSizes.xSmall,
  iconColor: colors.black50,
  iconMargin: '0',
  iconPosition: 'absolute',
  iconRightPosition: '6px',
  optionHeight: 32,
  optionListPosition: '0',
  optionsListShadow: '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
  textColor: colors.black60,
  inputColor: colors.black60,
  disabledInputColor: colors.black60
};

export const lightSelectInputTheme = {
  inputColor: colors.white80,
  disabledInputColor: colors.white50,
  selectArrowColor: colors.white80
};

export const darkSelectInputTheme = {
  inputColor: colors.black80,
  disabledInputColor: colors.black50,
  selectArrowColor: colors.black80
};

export const lineSelectInputTheme = {
  background: 'transparent',
  borderColor: colors.lightGray,
  displayFontSize: fontSizes.small,
  iconColor: colors.black50,
  iconMargin: '0',
  iconPosition: 'absolute',
  iconRightPosition: '6px',
  labelColor: fontSizes.xxSmall,
  optionHeight: 32,
  optionListPosition: '0',
  optionsListShadow: '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
  textColor: colors.black,
  inputPaddingRight: 22
};

export const lightRankBarTheme = {
  foregroundColor: colors.lightBlue,
  rankBackgroundColor: colors.darkGreen,
  emptyBarColor: colors.barLightGray,
  disabledOpacity: '1'
};

export const darkRankBarTheme = {
  foregroundColor: colors.lightBlue,
  rankBackgroundColor: colors.boulder,
  emptyBarColor: colors.barDarkGray,
  disabledOpacity: '0.25'
};

export const listCardTheme = {
  minHeight: 72,
  topBottomBasePadding: 9,
  borderWidth: 1,
  titleMarginBottom: 2,
  mainContentPadding: 6,
  contactabilityHeight: 28,
  cardMarginBottom: 10
};

export const boxShadows = {
  lvl1: '0px 1px 2px rgba(0, 0, 0, 0.18), 0px 1px 1px rgba(0, 0, 0, 0.12), 0px 2px 0px rgba(0, 0, 0, 0.10)',
  lvl2: '0px 1px 2px rgba(0, 0, 0, 0.18), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.10)',
  lvl3: '0px 1px 2px rgba(0, 0, 0, 0.18), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 3px 2px rgba(0, 0, 0, 0.10)',
  lvl4: '0px 2px 2px rgba(0, 0, 0, 0.18), 0px 4px 4px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.10)',
  lvl5: '0px 3px 2px rgba(0, 0, 0, 0.18), 0px 5px 4px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.10)',
  lvl6: '0px 3px 4px rgba(0, 0, 0, 0.18), 0px 6px 8px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.10)',
  lvl7: '0px 4px 4px rgba(0, 0, 0, 0.18), 0px 7px 9px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.10)',
  lvl8: '0px 5px 4px rgba(0, 0, 0, 0.18), 0px 8px 9px rgba(0, 0, 0, 0.12), 0px 3px 7px rgba(0, 0, 0, 0.10)',
  lvl9: '0px 5px 3px rgba(0, 0, 0, 0.18), 0px 9px 11px rgba(0, 0, 0, 0.12), 0px 3px 8px rgba(0, 0, 0, 0.10)',
  lvl10: '0px 6px 3px rgba(0, 0, 0, 0.18), 0px 10px 13px rgba(0, 0, 0, 0.12), 0px 4px 9px rgba(0, 0, 0, 0.10)',
  lvl11: '0px 6px 3px rgba(0, 0, 0, 0.18), 0px 11px 14px rgba(0, 0, 0, 0.12), 0px 4px 10px rgba(0, 0, 0, 0.10)',
  lvl12: '0px 7px 4px rgba(0, 0, 0, 0.18), 0px 12px 15px rgba(0, 0, 0, 0.12), 0px 5px 11px rgba(0, 0, 0, 0.10)',
  lvl13: '0px 7px 4px rgba(0, 0, 0, 0.18), 0px 13px 17px rgba(0, 0, 0, 0.12), 0px 5px 12px rgba(0, 0, 0, 0.10)',
  lvl14: '0px 7px 5px rgba(0, 0, 0, 0.18), 0px 14px 19px rgba(0, 0, 0, 0.12), 0px 5px 13px rgba(0, 0, 0, 0.10)',
  lvl15: '0px 8px 4px rgba(0, 0, 0, 0.18), 0px 15px 20px rgba(0, 0, 0, 0.12), 0px 6px 14px rgba(0, 0, 0, 0.10)',
  lvl16: '0px 8px 5px rgba(0, 0, 0, 0.18), 0px 16px 22px rgba(0, 0, 0, 0.12), 0px 6px 15px rgba(0, 0, 0, 0.10)',
  lvl17: '0px 8px 6px rgba(0, 0, 0, 0.18), 0px 17px 24px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.10)',
  lvl18: '0px 9px 6px rgba(0, 0, 0, 0.18), 0px 18px 26px rgba(0, 0, 0, 0.12), 0px 7px 17px rgba(0, 0, 0, 0.10)',
  lvl19: '0px 9px 6px rgba(0, 0, 0, 0.18), 0px 18px 27px rgba(0, 0, 0, 0.12), 0px 7px 18px rgba(0, 0, 0, 0.10)',
  lvl20: '0px 10px 7px rgba(0, 0, 0, 0.18), 0px 20px 28px rgba(0, 0, 0, 0.12), 0px 8px 19px rgba(0, 0, 0, 0.10)',
  lvl21: '0px 10px 7px rgba(0, 0, 0, 0.18), 0px 21px 30px rgba(0, 0, 0, 0.12), 0px 8px 20px rgba(0, 0, 0, 0.10)',
  lvl22: '0px 10px 8px rgba(0, 0, 0, 0.18), 0px 22px 32px rgba(0, 0, 0, 0.12), 0px 8px 21px rgba(0, 0, 0, 0.10)',
  lvl23: '0px 12px 7px rgba(0, 0, 0, 0.18), 0px 23px 33px rgba(0, 0, 0, 0.12), 0px 9px 22px rgba(0, 0, 0, 0.10)',
  lvl24: '0px 10px 8px rgba(0, 0, 0, 0.18), 0px 24px 35px rgba(0, 0, 0, 0.12), 0px 9px 23px rgba(0, 0, 0, 0.10)'
};

export const widths = {
  closedWidth: '440px',
  expandedWidth: '100%'
};

export const baseZIndex = 900000;

export const typography = {
  display2: `
    font-size: 45px;
    line-height: 52px;
    font-weight: ${fontWeights.regular};
  `,
  display1: `
    font-size: 34px;
    line-height: 40px;
    font-weight: ${fontWeights.regular};
  `,
  headline: `
    font-size: 24px;
    line-height: 32px;
    font-weight: ${fontWeights.regular};
  `,
  title: `
    font-size: 20px;
    line-height: 28px;
    font-weight: ${fontWeights.medium};
    letter-spacing: 0.5px;
  `,
  subhead2: `
    font-size: 16px;
    line-height: 28px;
    font-weight: ${fontWeights.bold};
    letter-spacing: 0.5px;
  `,
  subhead1: `
    font-size: 16px;
    line-height: 24px;
    font-weight: ${fontWeights.regular};
    letter-spacing: 0.5px;
  `,
  body2: `
    font-size: 14px;
    line-height: 24px;
    font-weight: ${fontWeights.medium};
    letter-spacing: 0.5px;
  `,
  body1: `
    font-size: 14px;
    line-height: 20px;
    font-weight: ${fontWeights.regular};
    letter-spacing: 0.5px;
  `,
  bodyCompact: `
    font-size: 14px;
    line-height: 16px;
    font-weight: ${fontWeights.regular};
    letter-spacing: 0.5px;
  `,
  caption: `
    font-size: 12px;
    line-height: 16px;
    font-weight: ${fontWeights.regular};
    letter-spacing: 0.5px;
  `
};

const pbTheme = {
  baseZIndex,
  boxShadows,
  colors,
  fontSizes,
  lineHeights,
  listCardTheme,
  fontFamilies,
  fontWeights,
  lineSelectInputTheme,
  lightSelectInputTheme,
  darkSelectInputTheme,
  taskSelectInputTheme,
  lightRankBarTheme,
  darkRankBarTheme,
  typography,
  widths
};

// module.exports = pbTheme;

export default pbTheme;
