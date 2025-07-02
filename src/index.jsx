import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import 'bootstrap/dist/css/bootstrap.min.css'

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component
const MyFlixApp = () => {
    return (
        <div className="my-flix">
            <h1>MyFlix App Frontend</h1>
            <MainView />
        </div>
    );
};

// Finds the root of the app
const container = document.querySelector('#root');
const root = createRoot(container);

// Tell react to render app in the root DOM element
root.render(<MyFlixApp />);
