/** @jsx jsx */
import { jsx } from '@emotion/react';

import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { getBook } from 'fire/get-book';
import * as mq from 'styles/media-queries';
import * as colors from 'styles/colors';
import { useAsync } from 'utils/hooks';
import { StatusButtons } from 'comps/status-buttons';
import bookPlaceholderSvg from 'assets/book-placeholder.svg';

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
};

const BookScreen: React.FC<{ user?: any }> = ({ user }) => {
  const { bookId } = useParams();
  const { data: book = loadingBook } = useQuery({
    queryKey: ['book', { bookId }],
    queryFn: () => (bookId ? getBook(bookId) : null),
  });

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
          src={book?.coverImageUrl}
          alt={`${book?.title} book cover`}
          css={{ width: '100%', maxWidth: '14rem' }}
        />
        <div>
          <div css={{ display: 'flex', position: 'relative' }}>
            <div css={{ flex: 1, justifyContent: 'space-between' }}>
              <h1>{book?.title}</h1>
              <div>
                <i>{book?.author}</i>
                <span css={{ marginRight: 6, marginLeft: 6 }}>|</span>
                <i>{book?.publisher}</i>
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
              {book !== loadingBook && (
                <StatusButtons user={user} book={book} />
              )}
            </div>
          </div>
          {/* <div css={{ marginTop: 10, height: 46 }}>
            {listItem?.finishDate ? (
              <Rating user={user} listItem={listItem} />
            ) : null}
            {listItem ? <ListItemTimeframe listItem={listItem} /> : null}
          </div> */}
          <br />
          <p>{book?.synopsis}</p>
        </div>
      </div>
      {/* {!book.loadingBook && listItem ? (
        <NotesTextarea user={user} listItem={listItem} />
      ) : null} */}
    </div>
  );
};

export { BookScreen };
