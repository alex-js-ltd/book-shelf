/** @jsx jsx */
import { jsx } from '@emotion/react'

import React from 'react'
import {
	FaCheckCircle,
	FaPlusCircle,
	FaMinusCircle,
	FaBook,
	FaTimesCircle,
} from 'react-icons/fa'
import { Tooltip } from '@reach/tooltip'
import { useAsync } from 'utils/hooks'
import * as colors from 'styles/colors'
import { CircleButton, Spinner } from './lib'
import {
	useCreateListItem,
	useRemoveListItem,
	useListItem,
	useUpdateListItem,
} from 'utils/list-items'

import { Book } from 'types'

interface Props {
	label?: string
	highlight?: string
	onClick: Function
	icon: React.ReactElement
}

const TooltipButton = ({ label, highlight, onClick, icon, ...rest }: Props) => {
	const { isLoading, isError, error, run } = useAsync()

	const handleClick = () => {
		run(onClick())
	}

	return (
		<Tooltip label={isError ? error?.message : label}>
			<CircleButton
				css={{
					backgroundColor: 'white',
					':hover,:focus': {
						color: isLoading
							? colors.gray80
							: isError
							? colors.danger
							: highlight,
					},
				}}
				disabled={isLoading}
				onClick={handleClick}
				aria-label={isError ? error?.message : label}
				{...rest}
			>
				{isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
			</CircleButton>
		</Tooltip>
	)
}

const StatusButtons = ({ book }: { book: Book }) => {
	const listItem = useListItem(book.objectID)
	const create = useCreateListItem(book)
	const remove = useRemoveListItem()
	const update = useUpdateListItem(book.objectID)

	return (
		<React.Fragment>
			{listItem ? (
				Boolean(listItem.finishDate) ? (
					<TooltipButton
						label='Mark as unread'
						highlight={colors.yellow}
						onClick={() => update.mutateAsync({ finishDate: null, rating: 0 })}
						icon={<FaBook />}
					/>
				) : (
					<TooltipButton
						label='Mark as read'
						highlight={colors.green}
						onClick={() =>
							update.mutateAsync({ finishDate: Date.now(), rating: 0 })
						}
						icon={<FaCheckCircle />}
					/>
				)
			) : null}

			{listItem ? (
				<TooltipButton
					label='Remove from list'
					highlight={colors.danger}
					onClick={() => remove.mutateAsync({ bookId: book.objectID })}
					icon={<FaMinusCircle />}
				/>
			) : (
				<TooltipButton
					label='Add to list'
					highlight={colors.indigo}
					onClick={() => create.mutateAsync()}
					icon={<FaPlusCircle />}
				/>
			)}
		</React.Fragment>
	)
}

export { StatusButtons }
