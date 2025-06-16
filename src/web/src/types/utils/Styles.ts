import type {CSSProperties} from 'react';

export type ResponsiveStyleValue<T> =
  | T
  | ReadonlyArray<T | null>
  | {
      [key: string]: T | null;
    };

export type FlexBoxProperties = {
  flexDirection?: ResponsiveStyleValue<CSSProperties['flexDirection']>;
  alignItems?: ResponsiveStyleValue<CSSProperties['alignItems']>;
  justifyContent?: ResponsiveStyleValue<CSSProperties['justifyContent']>;
};
