document.addEventListener('DOMContentLoaded', () => {

    // Реакция глаза на курсор мыши
    const eye = document.querySelector('.eye');
    const pupil = document.querySelector('.pupil');
    const notObserving = document.querySelector('.not-observing');

    let isOverNotObserving = false;

    function centerPupil() {
        pupil.style.left = '8px';
        pupil.style.top = '4px';
    }

    centerPupil();

    notObserving.addEventListener('mouseenter', () => {
        isOverNotObserving = true;
        centerPupil();
    });

    notObserving.addEventListener('mouseleave', () => {
        isOverNotObserving = false;
    });

    document.addEventListener('mousemove', e => {
        if (isOverNotObserving) return;

        const rect = eye.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const angle = Math.atan2(y, x);
        const radiusX = 5;
        const radiusY = 2;
        pupil.style.left = 8 + radiusX * Math.cos(angle) + 'px';
        pupil.style.top = 4 + radiusY * Math.sin(angle) + 'px';
    });

    // Реакция глаза на наклон телефона
    window.addEventListener('deviceorientation', (event) => {
        if (isOverNotObserving) return;

        const tiltX = event.beta;
        const tiltY = event.gamma;

        const clampedTiltX = Math.max(-30, Math.min(30, tiltX));
        const clampedTiltY = Math.max(-30, Math.min(30, tiltY));

        const radiusX = 5;
        const radiusY = 2;

        const offsetX = (clampedTiltY / 30) * radiusX;
        const offsetY = (clampedTiltX / 30) * radiusY;

        pupil.style.left = 8 - offsetX + 'px';
        pupil.style.top = 4 - offsetY + 'px';
    });

    // Запрос IP
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('footer').innerHTML = '<strong>Ваш IP: </strong>' + data.ip + '.';
        })
        .catch(error => {
            document.getElementById('footer').innerHTML = '<strong>Служба поддержки.</strong>';
        });
});