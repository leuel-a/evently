import * as React from 'react';
import Slide from '@mui/material/Slide';
import type {SlideProps} from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';

export const HideOnScroll = (props: HideOnScrollProps) => {
  const {children, SlideProps: slideProps = {}} = props;
  const trigger = useScrollTrigger({
    disableHysteresis: false,
    threshold: 200,
  });

  return (
    <Slide
      appear={false}
      direction="down"
      in={!trigger}
      {...slideProps}
    >
      {children}
    </Slide>
  );
};

export interface HideOnScrollProps {
  children: React.ReactElement;
  SlideProps?: SlideProps;
}
