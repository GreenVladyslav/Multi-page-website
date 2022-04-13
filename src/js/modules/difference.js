export default class Difference {
    // 30. Реализация блока с различиями
    constructor(oldOfficer, newOfficer, items) {
        try {
            this.oldOfficer = document.querySelector(oldOfficer);
            this.newOfficer = document.querySelector(newOfficer);
            // items мы будем полчать из каждого столбика
            this.oldItems = this.oldOfficer.querySelectorAll(items);
            this.newItems = this.newOfficer.querySelectorAll(items);
            // this.items = items; можно избавится от свойса this.items Так как оно приходит внуртир аргумента имы его сразу используем
            this.oldCounter = 0;
            this.newCounter = 0;
        } catch(e) {}
    }

    bindTriggers(container, items, counter) {
 
        container.querySelector('.plus').addEventListener('click', () => {
            if (counter !== items.length -2) {
                items[counter].style.display = 'flex';
                items[counter].classList.add('animated', 'fadeInUp');
                counter++;
            } else {
                items[counter].style.display = 'flex';
                items[counter].classList.remove('animated', 'fadeInUp');
                items[items.length - 1].remove();
                // если мы с вами дошли до последней карточки которую на нужно показать мы ее показываем и полсе этого удаляем последний блок 
            }
        });
        // сократили
        // this.newOfficer.querySelector('.plus').addEventListener('click', () => {
        //     if (this.newCounter !== this.newItems.length -2) {
        //         this.newItems[this.newCounter].style.display = 'flex';
        //         this.newCounter++;
        //     } else {
        //         this.newItems[this.newCounter].style.display = 'flex';
        //         this.newItems[this.newItems.length - 1].remove();
        //     }
        // });
    }

    // 1
    hideItems(items) {
        // делаем мы это для того чтобы мы могли оставить последний элемент на странице
        items.forEach((item, i, arr) => {
            // проверяем что тот элемент массива его номер по порядку не является послденим в этой node коллекции
            if (i !== arr.length - 1) {
                // и если мы попали не на последний элемент массива то берем..
                item.style.display = 'none';
                // когда цикл Freach дойдет до последнего элемента соответсвено условие перстанет выполнятся и последний элемент не скроется
            }
        });
        // сократил
        // this.newItems.forEach((item, i, arr) => {
        //     if (i !== arr.length - 1) {
        //         item.style.display = 'none';
        //     }
        // });
    }



    // 0
    init() {
        try {
            this.hideItems(this.oldItems);
            this.hideItems(this.newItems);
            this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
            this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
        } catch(e) {}
    }
}