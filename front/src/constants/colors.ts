const colors = {
  WHITE: '#ffffff',
  BLACK: '#000000',
  GRAY_100: '#f8f8f8',
  GRAY_200: '#e7e7e7',
  GRAY_300: '#d8d8d8',
  GRAY_500: '#8e8e8e',
  GRAY_700: '#575757',
  RED_300: '#ffb4b4',
  RED_500: '#ff5f5f',
  BLUE_400: '#b4e0ff',
  BLUE_500: '#0d8aff',
  GREEN_400: '#cce6ba',
  YELLOW_400: '#ffe594',
  YELLOW_500: '#facc15',
  PURPLE_400: '#c4c4e7',
  PINK_200: '#fae2e9',
  PINK_400: '#bf5c79',
  PINK_500: '#bf5c79',
  PINK_700: '#c63b64',
} as const;

const colorHex = {
  RED: colors.PINK_400,
  YELLOW: colors.YELLOW_400,
  GREEN: colors.GREEN_400,
  BLUE: colors.BLUE_400,
  PURPLE: colors.PURPLE_400,
} as const;

export {colors, colorHex};
