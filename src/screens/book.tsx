/** @jsx jsx */
import { jsx } from '@emotion/react';

import * as React from 'react';
import { useParams } from 'react-router-dom';
//import { client } from 'utils/api-client';
import { getBook } from 'fire/get-book';
import * as mq from 'styles/media-queries';
import { useAsync } from 'utils/hooks';
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
  const { data, run } = useAsync();

  React.useEffect(() => {
    if (!bookId) {
      return;
    }
    run(getBook(bookId));
  }, [run, bookId, user]);

  const { title, author, coverImageUrl, publisher, synopsis } =
    data ?? loadingBook;

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
          </div>
          <br />
          <p>{synopsis}</p>
        </div>
      </div>
    </div>
  );
};

export { BookScreen };
