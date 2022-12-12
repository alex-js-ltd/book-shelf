import { ReactNode } from 'react'
import { BookListUL } from './lib'
import { BookRow } from './book-row'
import { ListItem } from '../../types'

function ListItemList({
  noListItems,
  list,
}: {
  noListItems: ReactNode
  list: ListItem[]
}) {
  if (!list?.length) {
    return (
      <div css={{ marginTop: '1em', fontSize: '1.2em' }}>{noListItems}</div>
    )
  }

  return (
    <BookListUL>
      {list?.map((listItem: ListItem) => (
        <li key={listItem.objectID}>
          <BookRow<ListItem> book={listItem} />
        </li>
      ))}
    </BookListUL>
  )
}

export { ListItemList }
