import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/slider-mini';
import VideoPlayer from './modules/playVideo';
import Difference from './modules/difference';
import Form from './modules/forms';
import ShowInfo from './modules/showInfo';
import Download from './modules/download';

window.addEventListener('DOMContentLoaded', () => {
    // уже импортирован класс и мы на основе этого класса создаем новый обьект котороый и будем использовать
    const slider = new MainSlider({btns: '.next', container: '.page'});
    // у каждого обьекта slider будут свои методы и свои свойства и причем они будут различны , вызываем render Так как это обьект
    slider.render();
    // метод render обьеденяет всед ругие функции которые были прописаны в этом классе
    // #2 str modules
    const modulePageSlider = new MainSlider({container:'.moduleapp', btns: '.next', prevModule: '.prevmodule', nextModule: '.nextmodule'});
    modulePageSlider.render();

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        next: '.showup__next',
        prev: '.showup__prev',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        next: '.modules__info-btns .slick-next',
        prev: '.modules__info-btns .slick-prev',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container: '.feed__slider',
        next: '.feed__slider .slick-next',
        prev: '.feed__slider .slick-prev',
        activeClass: 'feed__item-active'
    });
    feedSlider.init();
    // .showup общая секция чтобы мы четко сказали в какой секции есть кнопка play потому что она несоклько раз будет повторятся 
    new VideoPlayer('.showup .play', '.overlay').init();
    new VideoPlayer('.module__video-item .play', '.overlay').init(); // Loan 13.1

    new Difference('.officerold', '.officernew', '.officer__card-item').init();
    new Form('.form').bindPostData();

    new ShowInfo('.plus').init();
    new Download('.download').init();
});  



// Разделить скрипты пример
// if (document.URL.includes('modules') {
//     // скрипты для страницы modules 
// } else {
//     // скрипты для главной страницы
// }