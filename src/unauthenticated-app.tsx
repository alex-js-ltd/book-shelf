/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import '@reach/dialog/styles.css';
import { FC, ReactElement, cloneElement } from 'react';
import { Button, Input, FormGroup } from './comps/lib';
import { Modal, ModalContents, ModalOpenButton } from './comps/modal';
import { Logo } from './comps/logo';

const LoginForm: FC<{ onSubmit: Function; submitButton: ReactElement }> = ({
  onSubmit,
  submitButton,
}) => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    onSubmit(email.value, password.value).then((res: any) => console.log(res));
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

const UnauthenticatedApp: FC<{ login: Function; register: Function }> = ({
  login,
  register,
}) => {
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
              onSubmit={login}
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
              onSubmit={register}
              submitButton={<Button variant='secondary'>Register</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  );
};

export { UnauthenticatedApp };
