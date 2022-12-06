import { ReactNode } from 'react'

import { BookListUL } from './lib'
import { BookRow } from './book-row'
import { Book } from '../../types'

const ListItemList = ({
	noListItems,
	list,
}: {
	noListItems: ReactNode
	list: Book[]
}) => {
	if (!list?.length) {
		return (
			<div css={{ marginTop: '1em', fontSize: '1.2em' }}>{noListItems}</div>
		)
	}

	return (
		<BookListUL>
			{list?.map((listItem: Book) => (
				<li key={listItem.objectID}>
					<BookRow book={listItem} />
				</li>
			))}
		</BookListUL>
	)
}

export { ListItemList }
