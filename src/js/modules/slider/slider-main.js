import Slider from './slider';

export default class MainSlider extends Slider {
    constructor(container, btns, nextModule, prevModule) {
        // this.slides Будет тоже по умолчанию так как он зависит от this.container.children
        super(container, btns, nextModule, prevModule);
        // автоматические наследует 
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
            // 26. Всплывающий со временем блок
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

    bindTriggers() {
        // это псевдомассив даже если одна кнопка querselecall
        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                // пока что у нас одна стрелка вперед
                this.plusSlides(1);
            });
            // Родитель доступен через parentNode

            item.parentNode.previousElementSibling.addEventListener('click', (e) => {

                if (item.getAttribute('href')){
                    e.preventDefault(); // это ссылка поэтому обьект события и preventDefault
                    this.slideIndex = 1;
                    // при клике на download перекидвает на первую страницу
                    this.showSlides(this.slideIndex);
                }
            });
        }); 


        

        // рабочий метод а в toggleBtn я скоратил просто
        // // Добавляем кнопки на вторую страницу 
        // // ALL так как на каждом модуле на каждой страничке своя стрелка
        // this.prev.forEach(item => {
        //     item.addEventListener('click', (e) => {
        //         e.stopPropagation();
        //         e.preventDefault();
        //         this.plusSlides(-1);
        //     });
        // });
            

        // this.next.forEach(item => {
        //     item.addEventListener('click', (e) => {
        //         // Всплытие событий срабатывает несколько раз ! отменяем его чтобы не листать по два слайда
        //         e.stopPropagation();
        //         e.preventDefault();
        //         this.plusSlides(1);
        //     });
        // });
    }

    toggeleBtn(btnModule, sliderNumber) {
        btnModule.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(sliderNumber);
            });
        });
    }


    // главный метод - render 
    render() {
        // 33. Главный слайдер второй страницы, всплытие событий
        // Исправление ошибки так как селекторы кнопок одинковые в slider, modulPageSlider
        // Если такой конейнер был передан при вызове классва в main.js в slider, modulePage действительн существует на этой странице то мы будем выполнять эти действия
        // Если на странице у нас есть такой элемент (не undefind) то мы будем выполнять эти действия если нет то нет
        if (this.container){
            try {
                this.hanson = document.querySelector('.hanson');
            } catch(error){}
    
            // обращаясь к this первому это значит что мы обращаемся к свойству или методу которое существует внутри
            // экземплряра класса  
            this.showSlides(this.slideIndex);
            this.bindTriggers();
            this.toggeleBtn(this.nextModule, 1);
            this.toggeleBtn(this.prevModule, -1);
        }
    }
}
