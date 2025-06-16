import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      white: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      white: string;
    };
  }
}

