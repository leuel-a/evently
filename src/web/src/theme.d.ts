import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      gray: string;
      white: string;
      lightGray: string;
    };
  }

  interface PaletteOptions {
    custom: {
      gray: string;
      white: string;
      lightGray: string;
    };
  }
}
