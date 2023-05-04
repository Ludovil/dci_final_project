import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Container from './context/Container.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Container>
		<App />
	</Container>
);
