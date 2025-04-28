document.addEventListener('DOMContentLoaded', () => {

    // Работа глазика
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
