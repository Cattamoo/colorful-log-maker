import {CSSProperties} from "react";

export type ItemType = {
	id: string;
	text: string;
	style?: CSSProperties;
}

type Props = ItemType & {
	current: {
		id: string;
		line: number;
		item: number;
	}
	setCurrent: (id: string) => void
};

export default function Item({ id, text, style = {}, current, setCurrent }: Props) {
	return (
		<li className={`flex items-end border-2 p-1 ${current.id === id ? 'border-blue-500' : ''}`} style={style} onClick={() => setCurrent(id)}>
			<pre>{text}</pre>
		</li>
	);
}