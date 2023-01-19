type Props = {
	onClick: () => void;
}

export default function PlusButton({ onClick }: Props) {
	return (
		<button className="bg-zinc-100 duration-200 hover:bg-zinc-300" onClick={onClick}>+</button>
	);
}