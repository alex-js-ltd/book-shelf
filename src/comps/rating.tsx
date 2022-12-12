/** @jsxImportSource @emotion/react */
import React, { Fragment } from 'react'
import { useUpdateListItem } from 'utils/list-items'
import { FaStar } from 'react-icons/fa'
import * as colors from 'styles/colors'
import { ErrorMessage } from 'comps/lib'

import { ListItem } from '../../types'
import { CSSObject } from '@emotion/react'

const visuallyHiddenCSS: CSSObject = {
  border: '0',
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: '0',
  position: 'absolute',
  width: '1px',
}

type Props = {
  listItem: ListItem
}

function Rating({ listItem }: Props) {
  const update = useUpdateListItem()

  const rootClassName = `list-item-${listItem.objectID}`

  if (!listItem) return null

  const stars = Array.from({ length: 5 }).map((x, i) => {
    const ratingId = `rating-${listItem.objectID}-${i}`
    const ratingValue = i + 1
    return (
      <Fragment key={i}>
        <input
          name={rootClassName}
          type="radio"
          id={ratingId}
          value={ratingValue}
          checked={ratingValue === listItem.rating}
          onChange={() => {
            update.mutateAsync({ ...listItem, rating: ratingValue })
          }}
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
              [`.${rootClassName} &:focus + label svg`]: {},
            },
          ]}
        />
        <label
          htmlFor={ratingId}
          css={{
            cursor: 'pointer',
            color: !listItem?.rating
              ? colors.gray20
              : listItem?.rating < 0
              ? colors.gray20
              : colors.orange,
            margin: 0,
          }}
        >
          <span css={visuallyHiddenCSS}>
            {ratingValue} {ratingValue === 1 ? 'star' : 'stars'}
          </span>
          <FaStar css={{ width: '16px', margin: '0 2px' }} />
        </label>
      </Fragment>
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
      {update.isError ? (
        <ErrorMessage
          error={update.error}
          variant="inline"
          //css={{ marginLeft: 6, fontSize: '0.7em' }}
        />
      ) : null}
    </div>
  )
}

export { Rating }
