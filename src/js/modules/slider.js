export default class Slider {
    constructor(page, btns) {
        // те вещи которыое описывают наш слайдер до того как он будет работать
        this.page = document.querySelector(page);
        // получить всех детей которые находятся на этой странице children – коллекция детей, которые являются элементами.
        this.slides = this.page.children;
        // потому что в первом слайдера одна стрелка, а во втором слайде две стрелки
        // буду использовать псевдомассив элементов даже если там будет один
        this.btns = document.querySelectorAll(btns);
        // текущий слайд и куда мы будем двигатся дальше
        this.slideIndex = 1;
    }

    // метод
    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        try {
            // это свойство мы с вами получаем до того мы где нибудь исопльзуем showSlides
            this.hanson.style.opacity = '0'; 

            if (n === 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('fadeInLeft');
                }, 3000);
            } else {
                this.hanson.classList.remove('fadeInLeft');
            }
        }catch(error){}

        // Array.from(this.slides).forEach(item => { потому что полувем html collection
        [...this.slides].forEach(item => {
            item.style.display = 'none';
        });
        // показываем тот который нас интересует . Если в проекте не блочная верстка а флекс то нужно поменять
        this.slides[this.slideIndex - 1].style.display = 'block';

        // показать учителя мой варинат
        // if (this.slideIndex == 3) {
        //     let hanson = document.querySelector('.hanson');
        //     hanson.style.display = 'none';

        //     setTimeout(() => {
        //         hanson.style.display = 'block';
        //     }, 5000);
        // }
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }
    // главный метод - render 
    render() {
        try {
            this.hanson = document.querySelector('.hanson');
        } catch(error){}


        // это псевдомассив даже если одна кнопка querselecall
        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                // пока что у нас одна стрелка вперед
                this.plusSlides(1);
            });
            // Родитель доступен через parentNode
            item.parentNode.previousElementSibling.addEventListener('click', (e) => {
                // это ссылка поэтому обьект события и preventDefault
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });

        // обращаясь к this первому это значит что мы обращаемся к свойству или методу которое существует внутри
        // экземплряра класса  
        this.showSlides(this.slideIndex);
    }
}
