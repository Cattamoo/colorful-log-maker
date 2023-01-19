import {ChangeEvent} from "react";

type Props = {
	title?: string;
	name: string;
	type?: string;
	value: string;
	onChange: ({ target }: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ title = '', name, type = 'text', value, onChange }: Props) {
	return (
		<div className="flex flex-col">
			<label className="text-xs text-zinc-600">{title}</label>
			<input className={`w-full ${type !== 'color' ? 'p-1 border-b-2 outline-0 focus:border-b-blue-500' : ''}`} name={name} type={type} value={value} onChange={onChange} />
		</div>
	);
}