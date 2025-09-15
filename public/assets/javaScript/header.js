document.addEventListener('DOMContentLoaded', () => {
    // Logo click → go to home
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            window.location.href = '/';
        });
    }

    // Sign out button → go to /logout
    const signOutBtn = document.getElementById('signOutBtn');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', () => {
            window.location.href = '/logout';
        });
    }
});
