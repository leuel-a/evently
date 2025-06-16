import type {PropsWithChildren} from 'react';
import {Box} from '@mui/material';
import type {BoxProps} from '@mui/material';
import type {FlexBoxProperties} from '@src/types/utils/Styles';

export interface FlexProps
  extends PropsWithChildren,
    Omit<BoxProps, 'alignItems' | 'justifyContent' | 'flexDirection'>,
    FlexBoxProperties {}

export function Flex({
  children,
  sx = {},
  alignItems,
  justifyContent,
  flexDirection,
  ...props
}: FlexProps) {
  const mergedSx = {
    ...sx,
    display: 'flex',
    alignItems,
    justifyContent,
    flexDirection,
  };

  return (
    <Box
      {...props}
      sx={mergedSx}
    >
      {children}
    </Box>
  );
}
