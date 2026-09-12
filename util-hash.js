window.App = window.App || {};

window.App.getHashQuery = function () {
    const query = (window.location.hash.split('?')[1] || '');
    return new URLSearchParams(query);
};
