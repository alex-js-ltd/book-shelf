/** @jsxImportSource @emotion/react */

import { ReactNode } from 'react'
import { useFormattedListItems } from 'utils/list-items'
import { BookListUL } from './lib'
import { BookRow } from './book-row'
import { Book } from 'types'

const ListItemList = ({
	noListItems,
	filterListItems,
}: {
	noListItems: ReactNode
	filterListItems: Function
}) => {
	const list = useFormattedListItems()

	const filteredList = list?.filter(li => filterListItems(li))

	if (!list?.length) {
		return (
			<div css={{ marginTop: '1em', fontSize: '1.2em' }}>{noListItems}</div>
		)
	}

	return (
		<BookListUL>
			{filteredList?.map((listItem: Book) => (
				<li key={listItem.objectID}>
					<BookRow book={listItem} />
				</li>
			))}
		</BookListUL>
	)
}

export { ListItemList }
