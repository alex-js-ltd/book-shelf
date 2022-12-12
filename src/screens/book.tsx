/** @jsxImportSource @emotion/react */

import React, { Fragment, useMemo, SyntheticEvent, FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import * as mq from 'styles/media-queries'
import * as colors from 'styles/colors'

import { useBook } from 'utils/books'
import { useListItem, useUpdateListItem } from 'utils/list-items'

import { Rating } from 'comps/rating'
import { StatusButtons } from 'comps/status-buttons'
import { isLoading, isFinished } from 'client-types'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { Tooltip } from '@reach/tooltip'
import { formatDate } from 'utils/misc'
import { Textarea, Spinner, ErrorMessage } from 'comps/lib'
import debounceFn from 'debounce-fn'
import { ListItem } from '../../types'

const BookScreen = () => {
  const { bookId } = useParams()

  const book = useBook(bookId)
  const listItem = useListItem(book)

  const { coverImageUrl, title, author, publisher, synopsis } = book

  return (
    <div>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gridGap: '2em',
          marginBottom: '1em',
          [mq.small]: {
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <img
          src={coverImageUrl}
          alt={`${title} book cover`}
          css={{ width: '100%', maxWidth: '14rem' }}
        />
        <div>
          <div css={{ display: 'flex', position: 'relative' }}>
            <div css={{ flex: 1, justifyContent: 'space-between' }}>
              <h1>{title}</h1>
              <div>
                <i>{author}</i>
                <span css={{ marginRight: 6, marginLeft: 6 }}>|</span>
                <i>{publisher}</i>
              </div>
            </div>
            <div
              css={{
                right: 0,
                color: colors.gray80,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                minHeight: 100,
              }}
            >
              {isLoading(book) ? null : <StatusButtons book={book} />}
            </div>
          </div>
          <div css={{ marginTop: 10, height: 46 }}>
            {listItem && isFinished(listItem) ? (
              <Rating listItem={listItem} />
            ) : null}
            {listItem ? <ListItemTimeframe listItem={listItem} /> : null}
          </div>
          <br />
          <p>{synopsis}</p>
        </div>
      </div>
      {!isLoading(book) && listItem ? (
        <NotesTextarea listItem={listItem} />
      ) : null}
    </div>
  )
}

function ListItemTimeframe({ listItem }: { listItem: ListItem }) {
  const timeframeLabel = listItem.finishDate
    ? 'Start and finish date'
    : 'Start date'

  return (
    <Tooltip label={timeframeLabel}>
      <div aria-label={timeframeLabel} css={{ marginTop: 6 }}>
        <FaRegCalendarAlt css={{ marginTop: -2, marginRight: 5 }} />
        <span>
          {listItem.startDate ? formatDate(listItem.startDate) : null}
          {listItem.finishDate ? `— ${formatDate(listItem.finishDate)}` : null}
        </span>
      </div>
    </Tooltip>
  )
}

function NotesTextarea({ listItem }: { listItem: ListItem }) {
  const { mutateAsync, isError, error, isLoading } = useUpdateListItem()

  const debouncedMutate = useMemo(
    () => debounceFn(mutateAsync, { wait: 300 }),
    [mutateAsync],
  )

  function handleNotesChange(e: SyntheticEvent<HTMLTextAreaElement>) {
    debouncedMutate({ ...listItem, notes: e.currentTarget.value })
  }

  return (
    <Fragment>
      <div>
        <label
          htmlFor="notes"
          css={{
            display: 'inline-block',
            marginRight: 10,
            marginTop: '0',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
          }}
        >
          Notes
        </label>
        {isError ? (
          <ErrorMessage
            variant="inline"
            error={error}
            //css={{ fontSize: '0.7em' }}
          />
        ) : null}
        {isLoading ? <Spinner /> : null}
      </div>
      <Textarea
        id="notes"
        defaultValue={listItem?.notes}
        onChange={handleNotesChange}
        css={{ width: '100%', minHeight: 300 }}
      />
    </Fragment>
  )
}

export { BookScreen }
