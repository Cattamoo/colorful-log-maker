import {ChangeEvent} from 'react';

type Props = {
	title?: string;
	name: string;
	type?: string;
	value: string;
	options: string[];
	onChange: ({ target }: ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({ title = '', name, value, options, onChange }: Props) {
	return (
		<div className="flex flex-col">
			<label className="text-xs text-zinc-600">{title}</label>
			<select className={`w-full p-1 border-b-2 outline-0 focus:border-b-blue-500`} name={name} value={value} onChange={onChange}>
				{
					options.map((option) => <option key={option} value={option}>{option}</option>)
				}
			</select>
		</div>
	);
}