export default class Slider {
    constructor(page, btns) {
        // те вещи которыое описывают наш слайдер до того как он будет работать
        this.page = document.querySelector(page);
        // получить всех детей которые находятся на этой странице
        this.slides = this.page.children;
        // потому что в первом слайдера одна стрелка, а во втором слайде две стрелки
        // буду использовать псевдо массив элементов даже если там будет один
        this.btns = document.querySelectorAll(btns);
        // текущий слайд и куда мы будем двигатся дальше
        this.slideIndex = 1;
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        // Array.from(this.slides).forEach(item => {
        [...this.slides].forEach(item => {
            item.style.display = 'none';
        });
        // показываем тот который нас интересует . Если в проекте не блочная верстка а флекс то нужно поменять
        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    render() {
        // это псевдомассив даже если одна кнопка querselecall
        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                this.plusSlides(1);
            });

            item.parentNode.previousElementSibling.addEventListener('click', (e) => {
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
