import Item, {ItemType} from "./Item";

type Props = {
	items: ItemType[];
	addLine: () => void;
	current: {
		id: string;
		line: number;
		item: number;
	}
	setCurrent: (id: string) => void
}

export default function Line({ items = [], addLine, current, setCurrent }: Props) {
	return (
		<li className="flex">
			<ul className="flex">
				{
					items.map(item => <Item key={item.id} {...item} current={current} setCurrent={setCurrent} />)
				}
			</ul>
			<button onClick={addLine}>+</button>
		</li>
	);
}