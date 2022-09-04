/** @jsx jsx */
import { jsx } from '@emotion/react';

import * as React from 'react';
import { useParams } from 'react-router-dom';
import * as mq from 'styles/media-queries';
import * as colors from 'styles/colors';
import { StatusButtons } from 'comps/status-buttons';
import { Rating } from 'comps/rating';
import { useBook } from 'utils/books';
import { useListItem } from 'utils/list-items';

import Tooltip from '@reach/tooltip';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { formatDate } from 'utils/misc';

const ListItemTimeframe: React.FC<{ listItem: any }> = ({ listItem }) => {
  const timeframeLabel = listItem.finishDate
    ? 'Start and finish date'
    : 'Start date';

  return (
    <Tooltip label={timeframeLabel}>
      <div aria-label={timeframeLabel} css={{ marginTop: 6 }}>
        <FaRegCalendarAlt css={{ marginTop: -2, marginRight: 5 }} />
        <span>
          {formatDate(listItem.startDate)}{' '}
          {listItem.finishDate ? `— ${formatDate(listItem.finishDate)}` : null}
        </span>
      </div>
    </Tooltip>
  );
};

const BookScreen: React.FC = () => {
  const { bookId } = useParams();

  const book = useBook(bookId);
  const listItem = useListItem(bookId);

  const { coverImageUrl, title, author, publisher, synopsis } = book;

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
              {book.loadingBook ? null : <StatusButtons book={book} />}
            </div>
          </div>
          <div css={{ marginTop: 10, height: 46 }}>
            {listItem?.finishDate ? <Rating listItem={listItem} /> : null}
            {listItem ? <ListItemTimeframe listItem={listItem} /> : null}
          </div>
          <br />
          <p>{synopsis}</p>
        </div>
      </div>
      {/* {!book.loadingBook && listItem ? (
        <NotesTextarea user={user} listItem={listItem} />
      ) : null} */}
    </div>
  );
};

export { BookScreen };
