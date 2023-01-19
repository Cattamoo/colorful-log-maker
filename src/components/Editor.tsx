import {ChangeEvent, ChangeEventHandler, CSSProperties} from "react";
import {ItemType} from "./Item";
import Input from "./common/Input";
import RemoveButton from "./common/RemoveButton";

type Props = {
	item: ItemType;
	edit: (key: keyof ItemType, value: string) => void;
	remove: (id: string) => void;
}
export default function Editor({ item, edit, remove }: Props) {
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
		<div className="flex flex-col gap-2">
			<Input name="text" title="텍스트" value={item.text} onChange={handleTextEdit} />
			<Input name="color" type="color" title="글자색" value={`${item.style?.color || '#000000'}`} onChange={handleStyleEdit} />
			<Input name="backgroundColor" type="color" title="배경색" value={`${item.style?.backgroundColor || '#ffffff'}`} onChange={handleStyleEdit} />
			<Input name="fontSize" title="폰트크기" value={`${item.style?.fontSize != null ? item.style?.fontSize : '0.75rem'}`} onChange={handleStyleEdit} />
			<Input name="fontWeight" title="폰트두께" value={`${item.style?.fontWeight != null ? item.style?.fontWeight : 'normal'}`} onChange={handleStyleEdit} />
			<RemoveButton onClick={() => remove(item.id)} />
		</div>
	);
}