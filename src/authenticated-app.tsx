/** @jsx jsx */
import { jsx } from '@emotion/react';

import * as React from 'react';
import { Button } from 'comps/lib';
import * as mq from 'styles/media-queries';

import { logout } from 'fire/auth';

import { DiscoverBooksScreen } from 'screens/discover';

const AuthenticatedApp: React.FC<{ user: any }> = ({ user }) => {
  return (
    <React.Fragment>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        {user?.email}
        <Button
          variant='secondary'
          css={{ marginLeft: '10px' }}
          onClick={logout}
        >
          Logout
        </Button>
      </div>
      <div
        css={{
          margin: '0 auto',
          padding: '4em 2em',
          maxWidth: '840px',
          width: '100%',
          display: 'grid',
          gridGap: '1em',
          gridTemplateColumns: '1fr 3fr',
          [mq.small]: {
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'auto',
            width: '100%',
          },
        }}
      >
        <DiscoverBooksScreen />
      </div>
    </React.Fragment>
  );
};

export { AuthenticatedApp };
