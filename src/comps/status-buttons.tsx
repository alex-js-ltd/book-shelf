// @ts-nocheck
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { useEffect, useId } from 'react';
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
  FaTimesCircle,
} from 'react-icons/fa';
import Tooltip from '@reach/tooltip';
import { useAsync } from 'utils/hooks';
import * as colors from 'styles/colors';
import { CircleButton, Spinner } from './lib';
import { useCreateListItem, useListItem } from 'utils/list-items';

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
      run(onClick());
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
  const mutation = useCreateListItem(book);

  const listItem = useListItem(book?.id);

  return (
    <React.Fragment>
      {listItem ? null : (
        <TooltipButton
          label='Add to list'
          highlight={colors.indigo}
          onClick={() => mutation.mutateAsync()}
          icon={<FaPlusCircle />}
        />
      )}
    </React.Fragment>
  );
};

export { StatusButtons };
