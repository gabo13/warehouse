import router from './router.js';

document.addEventListener('click', (event) => {
    const link = event.target.closest('[data-link]');
    if (!link) return;
    event.preventDefault();
    history.pushState(null, '', link.href);
    router();
});

window.addEventListener('popstate', router);

router();