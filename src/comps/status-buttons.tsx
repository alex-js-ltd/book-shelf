// @ts-nocheck
/** @jsx jsx */
import { jsx } from '@emotion/react';

import * as React from 'react';
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
  FaTimesCircle,
} from 'react-icons/fa';
import Tooltip from '@reach/tooltip';
import { useMutation } from 'react-query';
// 🐨 you'll also need client from 'utils/api-client'
import { useAsync } from 'utils/hooks';
import * as colors from 'styles/colors';
import { CircleButton, Spinner } from './lib';

import { addToList } from 'fire/add-to-list';

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
  const { isLoading, isError, error, run } = useAsync();

  const handleClick = () => {
    if (!onClick) {
      return;
    }
    run(onClick());
  };

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

const StatusButtons: React.FC<{ user?: any; book?: any }> = ({
  user,
  book,
}) => {
  const listItem: any = null;

  // const [create] = useMutation(({ user, book }) =>
  //   addToList({ user: user, book: book })
  // );

  return (
    <React.Fragment>
      {listItem ? (
        Boolean(listItem?.finishDate) ? (
          <TooltipButton
            label='Unmark as read'
            highlight={colors.yellow}
            // 🐨 add an onClick here that calls update with the data we want to update
            // 💰 to mark a list item as unread, set the finishDate to null
            // {id: listItem.id, finishDate: null}
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label='Mark as read'
            highlight={colors.green}
            // 🐨 add an onClick here that calls update with the data we want to update
            // 💰 to mark a list item as read, set the finishDate
            // {id: listItem.id, finishDate: Date.now()}
            icon={<FaCheckCircle />}
          />
        )
      ) : null}
      {listItem ? (
        <TooltipButton
          label='Remove from list'
          highlight={colors.danger}
          // 🐨 add an onClick here that calls remove
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label='Add to list'
          highlight={colors.indigo}
          onClick={() => addToList({ user: user, book: book })}
          icon={<FaPlusCircle />}
        />
      )}
    </React.Fragment>
  );
};

export { StatusButtons };
