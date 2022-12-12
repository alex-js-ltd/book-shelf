/** @jsxImportSource @emotion/react */

import {
  createContext,
  cloneElement,
  useContext,
  useState,
  ReactElement,
  HTMLAttributes,
  ReactNode,
} from 'react'
import { VisuallyHidden } from '@reach/visually-hidden'
import { Dialog, CircleButton } from './lib'

const callAll =
  (...fns: Function[]) =>
  (...args: any) =>
    fns.forEach((fn: Function) => fn && fn(...args))

const ModalContext = createContext<
  { isOpen: boolean; setIsOpen: Function } | undefined
>(undefined)

function Modal({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const value = { isOpen, setIsOpen }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error(`useModal must be used within a ModalContext provider`)
  }
  return context
}

function ModalDismissButton({ children: child }: { children: ReactElement }) {
  const { setIsOpen } = useModal()

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  })
}

function ModalOpenButton({ children: child }: { children: ReactElement }) {
  const { setIsOpen } = useModal()

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  })
}

function ModalContentsBase(props: HTMLAttributes<HTMLDivElement>) {
  const { isOpen, setIsOpen } = useModal()

  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={() => setIsOpen(false)}
      css={{ minHeight: '405px' }}
      {...props}
    />
  )
}

const ModalContents = ({
  title,
  children,
  ...props
}: {
  title: string
  children: ReactElement
  props?: HTMLAttributes<HTMLDivElement>
}) => (
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
)

export { Modal, ModalDismissButton, ModalOpenButton, ModalContents }
