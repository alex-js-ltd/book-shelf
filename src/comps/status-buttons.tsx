// @ts-nocheck
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { useEffect } from 'react';
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
  FaTimesCircle,
} from 'react-icons/fa';
import Tooltip from '@reach/tooltip';
import { useMutation } from '@tanstack/react-query';
// 🐨 you'll also need client from 'utils/api-client'
import { useAsync } from 'utils/hooks';
import * as colors from 'styles/colors';
import { CircleButton, Spinner } from './lib';

import { addToList } from 'utils/fire/add-to-list';
import { useAuth } from 'context/auth-context';

interface T {
  label?: string;
  highlight?: string;
  onClick?: Function;
  icon: React.ReactElement;
  rest?: any;
}

const TooltipButton: React.FC<T> = ({
  label,
  highlight,
  onClick,
  icon,
  ...rest
}) => {
  const { isLoading, isError, error, run, reset } = useAsync();

  function handleClick() {
    if (isError) {
      reset();
    } else {
      //run(onClick());
    }
  }
  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={{
          backgroundColor: 'white',
          ':hover,:focus': {
            color: isLoading
              ? colors.gray80
              : isError
              ? colors.danger
              : highlight,
          },
        }}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error.message : label}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  );
};

const StatusButtons: React.FC<{ book?: any }> = ({ book }) => {
  const listItem: any = null;

  return (
    <React.Fragment>
      <TooltipButton
        label='Add to list'
        highlight={colors.indigo}
        //onClick={() => mutation.mutateAsync({ user: user, book: book })}
        icon={<FaPlusCircle />}
      />
    </React.Fragment>
  );
};

export { StatusButtons };
