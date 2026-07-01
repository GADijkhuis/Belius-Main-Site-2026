export const navigateToPage = (path: string) => {
    window.location.hash = `#/${path}`;
}

export const checkLoginPage = () => {
    if (window.location.hash === `#/login`) return;

    navigateToPage(`login`);
}