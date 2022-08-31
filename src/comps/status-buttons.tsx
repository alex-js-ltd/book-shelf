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
import { useAsync } from 'utils/hooks';
import * as colors from 'styles/colors';
import { CircleButton, Spinner } from './lib';
import {
  useCreateListItem,
  useRemoveListItem,
  useListItem,
  useUpdateListItem,
} from 'utils/list-items';

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
  const listItem = useListItem(book?.objectID);
  const create = useCreateListItem(book);
  const remove = useRemoveListItem(book);
  const update = useUpdateListItem(book);

  return (
    <React.Fragment>
      {listItem && listItem?.finishDate && (
        <TooltipButton
          label='Mark as unread'
          highlight={colors.yellow}
          onClick={() => update.mutateAsync({ finishDate: null })}
          icon={<FaBook />}
        />
      )}

      {listItem && !listItem?.finishDate && (
        <TooltipButton
          label='Mark as read'
          highlight={colors.green}
          onClick={() => update.mutateAsync({ finishDate: Date.now() })}
          icon={<FaCheckCircle />}
        />
      )}

      {!listItem && (
        <TooltipButton
          label='Add to list'
          highlight={colors.indigo}
          onClick={() => create.mutateAsync()}
          icon={<FaPlusCircle />}
        />
      )}

      {listItem && (
        <TooltipButton
          label='Remove from list'
          highlight={colors.danger}
          onClick={() => remove.mutateAsync()}
          icon={<FaMinusCircle />}
        />
      )}
    </React.Fragment>
  );
};

export { StatusButtons };
