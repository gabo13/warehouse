export default async function item() {
    console.log('Rendering item page');
    try {
        const response = await fetch('/pages/item');
        const html = await response.text();
        return html;
    } catch (error) {
        console.error('Error fetching item page:', error);
        return '<h1>Error</h1><p>Failed to load item page.</p>';
    }
}