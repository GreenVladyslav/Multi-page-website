import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/slider-mini';
import VideoPlayer from './modules/playVideo';
import Difference from './modules/difference';
import Form from './modules/forms';

window.addEventListener('DOMContentLoaded', () => {
    // уже импортирован класс и мы на основе этого класса создаем новый обьект котороый и будем использовать
    const slider = new MainSlider({btns: '.next', container: '.page'});
    // у каждого обьекта slider будут свои методы и свои свойства и причем они будут различны , вызываем render Так как это обьект
    slider.render();
    // метод render обьеденяет всед ругие функции которые были прописаны в этом классе

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        next: '.showup__next',
        prev: '.showup__prev',
        activeClass: 'card-active',
        animate: true
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
    const player = new VideoPlayer('.showup .play', '.overlay');
    player.init();

    new Difference('.officerold', '.officernew', '.officer__card-item').init();
    new Form('.form').bindPostData();
});     