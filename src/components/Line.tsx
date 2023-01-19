import Item, {ItemType} from "./Item";

type Props = {
	items: ItemType[];
	addLine: () => void;
	setCurrent: (id: string) => void
}

export default function Line({ items = [], addLine, setCurrent }: Props) {
	return (
		<li className="flex">
			<ul className="flex">
				{
					items.map(item => <Item key={item.id} {...item} setCurrent={setCurrent} />)
				}
			</ul>
			<button onClick={addLine}>+</button>
		</li>
	);
}