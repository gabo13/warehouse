import item from './pages/item.js';
import container from './pages/container.js';
import camera, {startCamera, stopCamera} from './pages/camera.js';

const routes = {
    '/item': item,
    '/container': container,
    '/camera': camera,
    '/': item, // Default route
};

let currentPath = null;

export default async function router() {
    const path = window.location.pathname;
    const page = routes[path] || item;
    
    if (page) {
        if (currentPath === '/camera' && path !== '/camera') {
            await stopCamera();
        }
        const html = await page();
        document.querySelector('#app').innerHTML = html;
        if (path === '/camera') {
            await startCamera();
        }
    } else {
        document.querySelector('#app').innerHTML = '<h1>404 Not Found</h1>';
    }
    currentPath = path;

}