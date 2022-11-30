import * as React from 'react'
import { Link } from 'comps/lib'
import { ListItemList } from 'comps/list-item-list'
import { Finished } from 'types'

const FinishedScreen = () => (
	<ListItemList
		filterListItems={() => (li: Finished) => li.finishDate !== null}
		noListItems={
			<p>
				Hey there! This is where books will go when you've finished reading
				them. Get started by heading over to
				<Link to='/discover'> the Discover page</Link> to add books to your
				list.
			</p>
		}
	/>
)

export { FinishedScreen }
