import MainSlider from './modules/slider/slider-main';
import VideoPlayer from './modules/playVideo';

window.addEventListener('DOMContentLoaded', () => {
    // уже импортирован класс и мы на основе этого класса создаем новый обьект котороый и будем использовать
    const slider = new MainSlider({btns: '.next', page: '.page'});
    // у каждого обьекта slider будут свои методы и свои свойства и причем они будут различны , вызываем render Так как это обьект
    slider.render();
    // метод render обьеденяет всед ругие функции которые были прописаны в этом классе
    // .showup общая секция чтобы мы четко сказали в какой секции есть кнопка play потому что она несоклько раз будет повторятся 
    const player = new VideoPlayer('.showup .play', '.overlay');
    player.init();
});     