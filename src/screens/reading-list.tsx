import { Link } from 'comps/lib'
import { ListItemList } from 'comps/list-item-list'
import { Book } from 'types'
import { useListItems } from 'utils/list-items'

const ReadingListScreen = () => {
	const list = useListItems()
	console.log(list)
	const filter = list.filter((li: Book) => li.finishDate === null)

	return (
		<ListItemList
			list={filter}
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
