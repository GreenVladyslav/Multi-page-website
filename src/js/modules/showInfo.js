export default class ShowInfo {
    constructor(triggers) {
        this.btns = document.querySelectorAll(triggers);   
    }
    // 13 пункт тех задания
    showInfo() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                // btn.closest('.module__info-show').nextElementSibling.style.display = 'block';
                const sibling = btn.parentNode.nextElementSibling;
                // sibling.nextElementSibling.style.display = 'block';
                sibling.classList.toggle('msg');
                sibling.style.marginTop = '20px';
                sibling.classList.add('animated', 'fadeInDown');
            });
        });
    }

    init() {
        this.showInfo();
    }
}