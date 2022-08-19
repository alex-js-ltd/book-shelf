/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import '@reach/dialog/styles.css';
import { FC, ReactElement, cloneElement, SyntheticEvent } from 'react';
import { Button, Input, FormGroup } from './comps/lib';
import { Modal, ModalContents, ModalOpenButton } from './comps/modal';
import { Logo } from './comps/logo';

const LoginForm: FC<{ onSubmit: Function; submitButton: ReactElement }> = ({
  onSubmit,
  submitButton,
}) => {
  const handleSubmit = (event: SyntheticEvent | any) => {
    event.preventDefault();
    const { username, password } = event.target.elements;

    onSubmit({
      username: username.value,
      password: password.value,
    });
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
        <label htmlFor='username'>Username</label>
        <Input id='username' />
      </FormGroup>
      <FormGroup>
        <label htmlFor='password'>Password</label>
        <Input id='password' type='password' />
      </FormGroup>
      <div>{cloneElement(submitButton, { type: 'submit' })}</div>
    </form>
  );
};

function App() {
  function login(formData: any) {
    console.log('login', formData);
  }

  function register(formData: any) {
    console.log('register', formData);
  }

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
}

export default App;
