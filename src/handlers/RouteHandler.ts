export const navigateToPage = (path: string) => {
    window.location.href = `#/${path}`;
}

export const checkLoginPage = () => {
    if (window.location.href.startsWith("?")) return;

    window.location.href = `?#/login`;
}