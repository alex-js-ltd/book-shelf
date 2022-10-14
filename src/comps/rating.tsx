/** @jsx jsx */
import { jsx } from '@emotion/react'

import * as React from 'react'

import { FaStar } from 'react-icons/fa'
import * as colors from 'styles/colors'
import { ErrorMessage } from 'comps/lib'
import { useUpdateListItem } from 'utils/list-items'
import { FinishedBook } from 'types'

const visuallyHiddenCSS: any = {
	border: '0',
	clip: 'rect(0 0 0 0)',
	height: '1px',
	margin: '-1px',
	overflow: 'hidden',
	padding: '0',
	position: 'absolute',
	width: '1px',
}

const Rating = ({ listItem }: { listItem: FinishedBook }) => {
	const update = useUpdateListItem(listItem.objectID)

	const rootClassName = `list-item-${listItem.objectID}`

	const stars = Array.from({ length: 5 }).map((x, i) => {
		const ratingId = `rating-${listItem.objectID}-${i}`
		const ratingValue = i + 1

		if (!listItem.finishDate) return null

		return (
			<React.Fragment key={i}>
				<input
					name={rootClassName}
					type='radio'
					id={ratingId}
					value={ratingValue}
					checked={ratingValue === Number(listItem.rating)}
					onChange={() =>
						update.mutateAsync({
							finishDate: listItem.finishDate,
							rating: ratingValue,
						})
					}
					css={[
						visuallyHiddenCSS,
						{
							[`.${rootClassName} &:checked ~ label`]: { color: colors.gray20 },
							[`.${rootClassName} &:checked + label`]: { color: colors.orange },
							// !important is here because we're doing special non-css-in-js things
							// and so we have to deal with specificity and cascade. But, I promise
							// this is better than trying to make this work with JavaScript.
							// So deal with it 😎
							[`.${rootClassName} &:hover ~ label`]: {
								color: `${colors.gray20} !important`,
							},
							[`.${rootClassName} &:hover + label`]: {
								color: 'orange !important',
							},
							[`.${rootClassName} &:focus + label svg`]: {
								outline: 'initial',
							},
						},
					]}
				/>
				<label
					htmlFor={ratingId}
					css={{
						cursor: 'pointer',
						color: listItem.rating <= 0 ? colors.gray20 : colors.orange,
						margin: 0,
					}}
				>
					<span css={visuallyHiddenCSS}>
						{ratingValue} {ratingValue === 1 ? 'star' : 'stars'}
					</span>
					<FaStar css={{ width: '16px', margin: '0 2px' }} />
				</label>
			</React.Fragment>
		)
	})
	return (
		<div
			onClick={e => e.stopPropagation()}
			className={rootClassName}
			css={{
				display: 'inline-flex',
				alignItems: 'center',
				[`&.${rootClassName}:hover input + label`]: {
					color: colors.orange,
				},
			}}
		>
			<span css={{ display: 'flex' }}>{stars}</span>
			{/* {isError ? (
        <ErrorMessage
          error={error}
          variant='inline'
          css={{ marginLeft: 6, fontSize: '0.7em' }}
        />
      ) : null} */}
		</div>
	)
}

export { Rating }
