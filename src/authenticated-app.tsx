/** @jsxImportSource @emotion/react */

import { Routes, Route, NavLink, NavLinkProps } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { Button, FullPageErrorFallback, ErrorMessage } from 'comps/lib'
import * as mq from 'styles/media-queries'
import * as colors from 'styles/colors'

import { DiscoverBooksScreen } from 'screens/discover'
import { BookScreen } from 'screens/book'
import { ReadingListScreen } from './screens/reading-list'
import { FinishedScreen } from 'screens/finished'

import { useAuth } from 'context/auth-context'

function ErrorFallback({ error }: { error: Error }) {
  return <ErrorMessage error={error} />
}

const AuthenticatedApp = () => {
  const { user, logout } = useAuth()

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
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
          variant="secondary"
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
        <div css={{ position: 'relative' }}>
          <Nav />
        </div>
        <main css={{ width: '100%' }}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AppRoutes />
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  )
}

const Link = ({ ...props }: NavLinkProps) => (
  <NavLink
    to={props.to}
    css={{
      display: 'block',
      padding: '8px 15px 8px 10px',
      margin: '5px 0',
      width: '100%',
      height: '100%',
      color: colors.text,
      borderRadius: '2px',
      borderLeft: '5px solid transparent',
      ':hover,:focus': {
        color: colors.indigo,
        textDecoration: 'none',
        background: colors.gray10,
      },
    }}
    style={({ isActive }) =>
      isActive
        ? {
            borderLeft: `5px solid ${colors.indigo}`,
            background: colors.gray10,
          }
        : {}
    }
  >
    {props.children}
  </NavLink>
)

const Nav = () => (
  <nav
    css={{
      position: 'sticky',
      top: '4px',
      padding: '1em 1.5em',
      border: `1px solid ${colors.gray10}`,
      borderRadius: '3px',
      [mq.small]: {
        position: 'static',
        top: 'auto',
      },
    }}
  >
    <ul
      css={{
        listStyle: 'none',
        padding: '0',
      }}
    >
      <li>
        <Link to="/list">Reading List</Link>
      </li>
      <li>
        <Link to="/finished">Finished Books</Link>
      </li>
      <li>
        <Link to="/">Discover</Link>
      </li>
    </ul>
  </nav>
)

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<DiscoverBooksScreen />} />
    <Route path="/book/:bookId" element={<BookScreen />} />
    <Route path="/list" element={<ReadingListScreen />} />
    <Route path="/finished" element={<FinishedScreen />} />
  </Routes>
)

export default AuthenticatedApp
