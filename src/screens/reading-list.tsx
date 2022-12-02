import { Link } from 'comps/lib'
import { ListItemList } from 'comps/list-item-list'
import { useReadingList } from 'utils/list-items'

const ReadingListScreen = () => {
	const list = useReadingList()

	return (
		<ListItemList
			list={list}
			noListItems={
				<p>
					Hey there! Welcome to your bookshelf reading list. Get started by
					heading over to <Link to='/discover'>the Discover page</Link> to add
					books to your list.
				</p>
			}
		/>
	)
}
export { ReadingListScreen }
