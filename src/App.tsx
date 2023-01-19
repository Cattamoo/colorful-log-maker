import React, {CSSProperties, useState} from 'react';
import Line from "./components/Line";
import Editor from "./components/Editor";
import {ItemType} from "./components/Item";
import PlusButton from "./components/common/PlusButton";

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
		const lineArr = lines;
		lineArr.map((line, index) => {
			if(index === addedLine) {
				line.push({ ...defaultItem, id });
				setCurrent({ id, line: addedLine, item: line.length - 1 });
			}
			return line;
		})
		setLines(lineArr);
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
	const consoleText = () => {
		const text = lines.map((line) => line.map((item) => `%c${item.text}`).join('')).join('\\n');
		const style = lines.map((line) => line.map((item) => `"${styleFormatter(item.style)}"`).join(',')).join(',');
		return `console.log("${text}",${style})`;
	}
	const styleFormatter = (style: CSSProperties | undefined) => {
		return style ? `${style.color ? `color: ${style.color};` : ''}${style.backgroundColor ? `background-color: ${style.backgroundColor};` : ''}${style.fontWeight ? `font-weight: ${style.fontWeight};` : ''}${style.fontSize ? `font-size: ${style.fontSize};` : ''}` : '';
	}
	return (
		<main>
			<div className="flex">
				<ul className="flex-1 flex flex-col gap-1 p-1">
					{
						lines.map((line, index) => <Line key={index} items={line} addLine={() => handleAddItem(index)} current={current} setCurrent={handleChangeCurrent} />)
					}
					<PlusButton onClick={handleAddLine} />
				</ul>
				<Editor item={lines[current.line][current.item]} edit={handleEditItem}/>
			</div>
			<div className="break-words">
				{consoleText()}
			</div>
		</main>
	);
}
