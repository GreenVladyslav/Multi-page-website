import Slider from "./slider";
// 29. Реализация вторичных слайдеров (меньших размеров)
export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

// #2
    decorizeSlides() {
        Array.from(this.slides).forEach(slide => {
            // даже если он не был передан то в актив класс будет передоваться пустая строка
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });
            // если активынй слайд будет у нас кнопкой то я не буду ему назначать этот класс активности 
            // closetst возвращает родительский элемент или самого себя если он подходит по такому селектору
        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }

        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }
//#4
    nextSlide() {
        // if (this.slides[1].tagName == "BUTTON" && this.slides[2].tagName == "BUTTON") {
        //     this.container.appendChild(this.slides[0]); // Slide
        //     this.container.appendChild(this.slides[1]); // Btn
        //     this.container.appendChild(this.slides[2]); // Btn
        //     this.decorizeSlides();
        // } else if (this.slides[1].tagName == "BUTTON"){
        //     this.container.appendChild(this.slides[0]); // Slide
        //     this.container.appendChild(this.slides[1]); // Btn
        //     this.decorizeSlides();
        // } else {
        //     this.container.appendChild(this.slides[0]);
        //     this.decorizeSlides();
        // }


        // // Пропуск кнопок при переключение 
        for (let i = 1; i < this.slides.length; i++) {
            if (this.slides[i].tagName !== "BUTTON") {
                this.container.appendChild(this.slides[0]);
                this.decorizeSlides();
                break; // когда условие выполнится этот цикл остановится когда последний слайд отправится на первую позицию
                // так что если элемент с конца не кнопка то берем последний элемент и помещаем перед первым
            } else {
                this.container.appendChild(this.slides[i]);
                i--;
            }
        }
    }

// #3
    bindTriggers() {
        this.next.addEventListener('click', () => {
            this.nextSlide();
            // // добавляяем в конец списка этих элементов опредленный элемент 
            // this.container.appendChild(this.slides[0]); //  БЫЛО 3стр
            // this.decorizeSlides();

        });

        this.prev.addEventListener('click', () => {
            // классчиеский паттерн количетсво слайдов минус один 
            // я хочу перебрать каждый элемент в массиве slides с конца и если последний элемент который там есть будет являтся кнопкой то я буду его пропускать 
            for (let i = this.slides.length -1; i > 0; i--) {
                if (this.slides[i].tagName !== "BUTTON") {
                    // так что если элемент с конца не кнопка то берем последний элемент и помещаем перед первым
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break; // когда условие выполнится этот цикл остановится когда последний слайд отправится на первую позицию
                }
            }

            // // active - последний слайд в нашем списке
            // let active = this.slides[this.slides.length - 1];
            // // нам необходим поставить его на первую позицию перед первым слайдом
            // this.container.insertBefore(active, this.slides[0]);
            // this.decorizeSlides(); // ,было 5стр
        });
    }

    autoplayGo() {
        let autoplay = setInterval(() => {
            this.nextSlide();
        }, 2500);
        // находим родителия например первого слайдера по факту это весь слайдеры (Все
        this.slides[0].parentNode.addEventListener('mouseenter', () => {
            clearInterval(autoplay);
        });

        this.next.addEventListener('mouseenter', () => {
            clearInterval(autoplay);
        });

        this.prev.addEventListener('mouseenter', () => {
            clearInterval(autoplay);
        });
    }

// #1
    init() {
        try {
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
            `;

            this.bindTriggers();
            this.decorizeSlides();

            if (this.autoplay) {
                this.autoplayGo();
            }

            this.slides[0].parentNode.addEventListener('mouseleave', () => {
                this.autoplayGo();
            });

            this.next.addEventListener('mouseleave', () => {
                this.autoplayGo();
            });

            this.prev.addEventListener('mouseleave', () => {
                this.autoplayGo();
            });
        } catch(e){}
    } 
}


// отфильтровать все слайдеры которые находятся внутри слайдера узнать какой из слайдов является кнопкой то есть тегом button и не назначать ему клласс 



// moveButtonsToEnd() {
//     this.slides.forEach((slide, i) => {
//         if(slide.tagName === "BUTTON") {
//             this.container.appendChild(this.slides[i]);
//         }
//     });
// }
// Метод будет вызываться каждый раз как нажимается одна из кнопок.

// nextSlide() {
//     this.container.appendChild(this.slides[0]);
//     this.decorizeSlides();
//     this.moveButtonsToEnd();
// }

// bindTriggers() {
//     this.next.addEventListener('click', () => this.nextSlide());

//     this.prev.addEventListener('click', () => {
//         let active = this.slides[0];
//         this.container.insertBefore(active, this.slides[this.slides.length - 1]);
//         this.decorizeSlides();
//         this.moveButtonsToEnd();
//     });
// }