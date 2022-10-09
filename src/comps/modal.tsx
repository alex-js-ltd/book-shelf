import { jsx } from '@emotion/react';

import React, {
  createContext,
  FC,
  cloneElement,
  useContext,
  useState,
  ReactElement,
} from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import { Dialog, CircleButton } from './lib';

const callAll =
  (...fns: any) =>
  (...args: any) =>
    fns.forEach((fn: any) => fn && fn(...args));

const ModalContext = createContext<
  { isOpen: boolean; setIsOpen: Function } | undefined
>(undefined);

const Modal = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const value = { isOpen, setIsOpen };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error(`useModal must be used within a ModalContext provider`);
  }
  return context;
};

const ModalDismissButton: FC<{ children: ReactElement }> = ({
  children: child,
}) => {
  const { setIsOpen } = useModal();

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
};

const ModalOpenButton: FC<{ children: ReactElement }> = ({
  children: child,
}) => {
  const { setIsOpen } = useModal();

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  });
};

const ModalContentsBase = (props: any) => {
  const { isOpen, setIsOpen } = useModal();

  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  );
};

const ModalContents: FC<{
  title: string;
  children: ReactElement;
  props?: any;
}> = ({ title, children, ...props }) => {
  return (
    <ModalContentsBase {...props}>
      <div css={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ModalDismissButton>
          <CircleButton>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </CircleButton>
        </ModalDismissButton>
      </div>
      <h3 css={{ textAlign: 'center', fontSize: '2em' }}>{title}</h3>
      {children}
    </ModalContentsBase>
  );
};

export { Modal, ModalDismissButton, ModalOpenButton, ModalContents };
