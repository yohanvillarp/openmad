
export function getHashQuery () {
    const query = (window.location.hash.split('?')[1] || '');
    return new URLSearchParams(query);
};
