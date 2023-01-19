import {CSSProperties} from "react";

export type ItemType = {
	id: string;
	text: string;
	style?: CSSProperties;
}

type Props = ItemType & {
	setCurrent: (id: string) => void
};

export default function Item({ id, text, style = {}, setCurrent }: Props) {
	return (
		<li className="flex items-end border-2 p-1" style={style} onClick={() => setCurrent(id)}>
			<pre>{text}</pre>
		</li>
	);
}