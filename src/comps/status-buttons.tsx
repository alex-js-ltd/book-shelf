/** @jsxImportSource @emotion/react */
import React, { ReactElement, Fragment } from 'react'
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
  FaTimesCircle,
} from 'react-icons/fa'
import { Tooltip } from '@reach/tooltip'
import { useAsync } from 'utils/hooks'
import * as colors from 'styles/colors'
import { CircleButton, Spinner } from './lib'
import {
  useCreateListItem,
  useUpdateListItem,
  useRemoveListItem,
  useListItem,
} from 'utils/list-items'

import { Book } from '../../types'

interface Props {
  label?: string
  highlight?: string
  onClick: Function
  icon: ReactElement
}

function TooltipButton({ label, highlight, onClick, icon, ...rest }: Props) {
  const { isLoading, isError, error, run } = useAsync()

  const handleClick = () => {
    run(onClick())
  }

  return (
    <Tooltip label={isError ? error?.message : label}>
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
        aria-label={isError ? error?.message : label}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  )
}

function StatusButtons({ book }: { book: Book }) {
  const listItem = useListItem(book)
  const update = useUpdateListItem()
  const create = useCreateListItem()
  const remove = useRemoveListItem()

  return (
    <Fragment>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton
            label="Mark as unread"
            highlight={colors.yellow}
            onClick={() =>
              update.mutateAsync({ ...listItem, finishDate: null })
            }
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            highlight={colors.green}
            onClick={() =>
              update.mutateAsync({ ...listItem, finishDate: Date.now() })
            }
            icon={<FaCheckCircle />}
          />
        )
      ) : null}

      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          onClick={() => remove.mutateAsync(listItem)}
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          highlight={colors.indigo}
          onClick={() =>
            create.mutateAsync({
              ...book,
              startDate: Date.now(),
              finishDate: null,
            })
          }
          icon={<FaPlusCircle />}
        />
      )}
    </Fragment>
  )
}

export { StatusButtons }
