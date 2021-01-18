function slider({slide, container, prevArrow, naxtArrow, curentCounter, totalCounter, wraper, field}) {
    // Slider

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(naxtArrow),
        current = document.querySelector(curentCounter),
        total = document.querySelector(totalCounter),
        slidesWraper = document.querySelector(wraper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWraper).width;

    let slidIndex = 1;
    let offset = 0;

    if(slides.length < 10){
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slidIndex}`;
    }else{
        total.textContent = slides.length;
        current.textContent = slidIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWraper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i +1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if (i==0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function changesCurrentAndOpasiti(){
        if(slides.length < 10){
            current.textContent = `0${slidIndex}`;
        }else{
            current.textContent = slidIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slidIndex - 1].style.opacity = 1;
    }

    function deleteNumberIsStrimg(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if(offset == deleteNumberIsStrimg(width) * (slides.length - 1)){
            offset = 0;
        }else{
            offset += deleteNumberIsStrimg(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slidIndex == slides.length){
            slidIndex = 1;
        }else{
            slidIndex++;
        }

        changesCurrentAndOpasiti()
    });

    prev.addEventListener('click', () => {
        if(offset == 0){
            offset = deleteNumberIsStrimg(width) * (slides.length - 1);
        }else{
            offset -= deleteNumberIsStrimg(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slidIndex == 1){
            slidIndex = slides.length;
        }else{
            slidIndex--;
        }

        changesCurrentAndOpasiti()
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slidIndex = slideTo;
            offset = deleteNumberIsStrimg(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            changesCurrentAndOpasiti();
        });
    });
}

export default slider;