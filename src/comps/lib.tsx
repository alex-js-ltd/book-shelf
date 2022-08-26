import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Dialog as ReachDialog } from '@reach/dialog';
import { keyframes } from '@emotion/react';
import { FaSpinner } from 'react-icons/fa';

import * as colors from 'styles/colors';
import * as mq from 'styles/media-queries';

const buttonVariants: any = {
  primary: {
    background: '#3f51b5',
    color: 'white',
  },
  secondary: {
    background: '#f1f2f7',
    color: '#434449',
  },
};

const Button = styled.button<{ variant: string }>(
  {
    padding: '10px 15px',
    border: '0',
    lineHeight: '1',
    borderRadius: '3px',
  },
  ({ variant = 'primary' }) => buttonVariants[variant]
);

const Input = styled.input({
  borderRadius: '3px',
  border: '1px solid #f1f1f4',
  background: '#f1f2f7',
  padding: '8px 12px',
});

const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'white',
  color: '#434449',
  border: `1px solid #f1f1f4`,
  cursor: 'pointer',
});

const Dialog = styled(ReachDialog)({
  maxWidth: '450px',
  borderRadius: '3px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
  '@media (max-width: 991px)': {
    width: '100%',
    margin: '10vh auto',
  },
});

const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const BookListUL = styled.ul({
  listStyle: 'none',
  padding: '0',
  display: 'grid',
  gridTemplateRows: 'repeat(auto-fill, minmax(100px, 1fr))',
  gridGap: '1em',
});

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
});

Spinner.defaultProps = {
  'aria-label': 'loading',
};

const errorMessageVariants: any = {
  stacked: { display: 'block' },
  inline: { display: 'inline-block' },
};

const ErrorMessage: FC<{ error?: Error; variant?: string; props?: any }> = ({
  error,
  variant = 'stacked',
  ...props
}) => {
  return (
    <div
      role='alert'
      css={[{ color: colors.danger }, errorMessageVariants[variant]]}
      {...props}
    >
      <span>There was an error: </span>
      <pre
        css={[
          { whiteSpace: 'break-spaces', margin: '0', marginBottom: -5 },
          errorMessageVariants[variant],
        ]}
      >
        {error?.message}
      </pre>
    </div>
  );
};

export {
  Button,
  Input,
  CircleButton,
  Dialog,
  FormGroup,
  Spinner,
  BookListUL,
  ErrorMessage,
};
