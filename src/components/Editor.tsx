import {ChangeEvent, ChangeEventHandler, CSSProperties} from "react";
import {ItemType} from "./Item";

type Props = {
	item: ItemType;
	edit: (key: keyof ItemType, value: string) => void;
}
export default function Editor({ item, edit }: Props) {
	const handleTextEdit: ChangeEventHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const key = target.name as keyof ItemType;
		const value = target.value;
		edit(key, value);
	}
	const handleStyleEdit: ChangeEventHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const name = target.name as keyof CSSProperties;
		const value = target.value;
		edit('style', JSON.stringify({...item.style, [name]: value}));
	}
	return (
		<div className="grid grid-cols-[auto,_1fr] auto-rows-min gap-x-1 justify-start">
			<label>text</label>
			<input name="text" type="text" value={item.text} onChange={handleTextEdit} />
			<label>textColor</label>
			<input name="color" type="color" value={item.style?.color} onChange={handleStyleEdit} />
			<label>bgColor</label>
			<input name="backgroundColor" type="color" value={item.style?.backgroundColor} onChange={handleStyleEdit} />
			<label>fontSize</label>
			<input name="fontSize" type="text" value={item.style?.fontSize} onChange={handleStyleEdit} />
			<label>fontWeight</label>
			<input name="fontWeight" type="text" value={item.style?.fontWeight} onChange={handleStyleEdit} />
		</div>
	);
}