/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import '@reach/dialog/styles.css';
import { FC, ReactElement, cloneElement, FormEvent } from 'react';
import { Button, Input, FormGroup } from './comps/lib';
import { Modal, ModalContents, ModalOpenButton } from './comps/modal';
import { Logo } from './comps/logo';

import * as auth from './firebase/auth';

const LoginForm: FC<{ onSubmit: Function; submitButton: ReactElement }> = ({
  onSubmit,
  submitButton,
}) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formElements = form.elements as typeof form.elements & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };

    onSubmit(formElements.email.value, formElements.password.value);
  };

  return (
    <form
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
      onSubmit={handleSubmit}
    >
      <FormGroup>
        <label htmlFor='email'>Email</label>
        <Input id='email' />
      </FormGroup>
      <FormGroup>
        <label htmlFor='password'>Password</label>
        <Input id='password' type='password' />
      </FormGroup>
      <div>{cloneElement(submitButton, { type: 'submit' })}</div>
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
