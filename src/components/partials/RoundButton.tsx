import React from 'react';
import { Button, ButtonProps } from '@mui/material';

type CustomButtonProps = ButtonProps & {
  borderRadius?: number;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  sx = {},
  borderRadius = 10,
  ...props
}) => {
  return (
    <Button
      {...props}
      sx={{
        borderRadius,
        textTransform: 'none',
        px: 2,
        py: 1,
        ...sx,
      }}
    />
  );
};

export default CustomButton;