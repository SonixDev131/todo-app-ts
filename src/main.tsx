import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './style.css';

// Tạo React root và render App component
const root = ReactDOM.createRoot(
	document.getElementById('app') as HTMLElement
);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
