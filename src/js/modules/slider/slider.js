export default class Slider {
    // ставим по умолчанию 2. благодоря диструктуризация не важен порядок передачи
    constructor({page = "", btns = "", next = "", prev = ""} = {}) {
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

}