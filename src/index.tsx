import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

reportWebVitals();

console.log(`
%c %c CATTAMOO %c      %chttps://cattamoo.github.io/colorful-log-maker
%c %cCOLORFUL LOG MAKER PROJECT
`,"","color: #fff947;background-color: #000657;font-size: 2rem;","","","","color: #ffffff;background-color: #ffc72e;font-size: 0.775rem;"
);