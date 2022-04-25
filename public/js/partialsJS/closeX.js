const closeBtn = document.querySelector('.closeBtn');

closeBtn.addEventListener('click', () => {
    window.location.href = '/user/' + id;
});