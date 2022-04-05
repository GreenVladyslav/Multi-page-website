import Slider from './modules/slider';

window.addEventListener('DOMContentLoaded', () => {
    // уже импортирован класс и мы на основе этого класса создаем новый обьект котороый и будем использовать
    const slider = new Slider('.page', '.next');
    // у каждого обьекта slider будут свои методы и свои свойства и причем они будут различны 
    slider.render();
});     