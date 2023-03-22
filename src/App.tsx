import React, {CSSProperties, useState} from 'react';
import Line from "./components/Line";
import Editor from "./components/Editor";
import {ItemType} from "./components/Item";
import PlusButton from "./components/common/PlusButton";
import Header from "./components/Header";

const defaultItem = { text: '', style: {} };

export default function App() {
	const [current, setCurrent] = useState({ id: `${new Date().getTime()}`, line: 0, item: 0 })
	const [lines, setLines] = useState<ItemType[][]>([
		[
			{ ...defaultItem, id: `${new Date().getTime()}` }
		]
	]);
	const handleChangeCurrent = (id: string) => {
		lines.find((line, lineIdx) => line.find((item, itemIdx) => item.id === id && setCurrent({ id, line: lineIdx, item: itemIdx })))
	}
	const handleAddLine = () => {
		const id = `${new Date().getTime()}`;
		const lineArr = lines;
		lineArr.push([{ ...defaultItem, id }]);
		setLines(lineArr);
		setCurrent({ id, line: lineArr.length - 1, item: 0 });
	}
	const handleAddItem = (addedLine: number) => {
		const id = `${new Date().getTime()}`;
		setLines(
			lines.map((line, index) => {
				if(index === addedLine) {
					line.push({ ...defaultItem, id });
					setCurrent({ id, line: addedLine, item: line.length - 1 });
				}
				return line;
			})
		);
	}
	const handleDeleteItem = (id: string) => {
		if(lines.length === 1 && lines[0].length === 1) {
			console.debug('얘는 삭제할 수 없다!!');
			return;
		}
		setLines(lines.map((line) => line.filter((item) => item.id !== id)).filter((line) => line.length !== 0));
		setCurrent({ id: lines[0][0].id,item: 0, line: 0 });
	}
	const handleEditItem = (key: keyof ItemType, value: string) => {
		setLines(prev => {
			return prev.map((line, idx) => {
				if(idx === current.line) {
					line.map((item, idx) => {
						if(idx === current.item) {
							item[key] = key === 'style' ? JSON.parse(value) : value;
						}
						return item;
					})
				}
				return line;
			})
		})
	}
	const handleCopy = () => {
		const text = consoleText();
		navigator.clipboard
			.writeText(text)
			.then(() => {
				console.log(text);
			})
		;
	}
	const consoleText = () => {
		const text = makeTextString();
		const style = makeStyleString();
		return `console.log("${text}",${style})`;
	}
	const makeTextString = () => lines.map((line) => line.map((item) => `%c${item.text.replace(/"/g, '\\"')}`).join('')).join('\\n');
	const makeStyleString = () => lines.map((line) => line.map((item) => `"${styleFormatter(item.style)}"`).join(',')).join(',');
	const styleFormatter = (style: CSSProperties | undefined) => style ? `${style.color ? `color: ${style.color};` : ''}${style.backgroundColor ? `background-color: ${style.backgroundColor};` : ''}${style.fontWeight ? `font-weight: ${style.fontWeight};` : ''}${style.fontSize ? `font-size: ${style.fontSize};` : ''}` : '';
	return (
		<>
			<Header />
			<main className="flex flex-col lg:flex-row">
				<div className="flex flex-1 overflow-hidden">
					<ul className="flex-1 flex flex-col gap-1 p-1 overflow-auto">
						{
							lines.map((line, index) => <Line key={index} items={line} addLine={() => handleAddItem(index)} current={current} setCurrent={handleChangeCurrent} />)
						}
						<PlusButton onClick={handleAddLine} />
					</ul>
					<Editor item={lines[current.line][current.item]} edit={handleEditItem} remove={handleDeleteItem} />
				</div>
				<div className="w-full flex flex-col lg:w-1/3 xl:w-1/2">
					<div className="break-words">
						{consoleText()}
					</div>
					<button onClick={handleCopy}>Copy</button>
				</div>
			</main>
		</>
	);
}
