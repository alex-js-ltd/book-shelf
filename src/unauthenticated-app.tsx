/** @jsx jsx */
import { jsx } from '@emotion/react';

import { FC, ReactElement, cloneElement, FormEvent } from 'react';
import { Button, Input, FormGroup, Spinner, ErrorMessage } from 'comps/lib';
import { Modal, ModalContents, ModalOpenButton } from 'comps/modal';
import { Logo } from 'comps/logo';
import { useAsync } from './utils/hooks';
import * as auth from 'utils/firebase/auth';

const LoginForm: FC<{ onSubmit: Function; submitButton: ReactElement }> = ({
  onSubmit,
  submitButton,
}) => {
  const { isLoading, isError, error, run } = useAsync();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formElements = form.elements as typeof form.elements & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };

    run(onSubmit(formElements.email.value, formElements.password.value));
  };

  return (
    <form
      onSubmit={handleSubmit}
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        '> div': {
          margin: '10px auto',
          width: '100%',
          maxWidth: '300px',
        },
      }}
    >
      <FormGroup>
        <label htmlFor='email'>Email</label>
        <Input id='email' />
      </FormGroup>
      <FormGroup>
        <label htmlFor='password'>Password</label>
        <Input id='password' type='password' />
      </FormGroup>
      <div>
        {cloneElement(
          submitButton,
          { type: 'submit' },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isLoading ? <Spinner css={{ marginLeft: 5 }} /> : null
        )}
      </div>
      {isError ? <ErrorMessage error={error} /> : null}
    </form>
  );
};

const UnauthenticatedApp: FC = () => {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <Logo width='80' height='80' />
      <h1>Bookshelf</h1>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gridGap: '0.75rem',
        }}
      >
        <Modal>
          <ModalOpenButton>
            <Button variant='primary'>Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label='Login form' title='Login'>
            <LoginForm
              onSubmit={auth.login}
              submitButton={<Button variant='primary'>Login</Button>}
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant='secondary'>Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label='Registration form' title='Register'>
            <LoginForm
              onSubmit={auth.register}
              submitButton={<Button variant='secondary'>Register</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  );
};

export { UnauthenticatedApp };
