export default class Download {
    constructor(triggers) {
        this.btns = document.querySelectorAll(triggers);
        // В релаьно проекте будут разыне файлы в каждом модуле ну и путь к файлу соотвествено разный можно использовать switch case
        // определяем по какому-то параметру какая это кнопка и там будет подставить тот путь которыой соотвесуте этой кнопке
        this.path = 'assets/img/mainbg.jpg';
    }
    // метод за формирования запроса что пользователь скачивает файл
    downloadItem(path) {
        // Для того чтобы скаачать элемент со страницы мы должны клинкуть по ссылке у которой есть специальный атрибут
        const element = document.createElement('a');
        // создали виртуальный элемент ссылки и атрибута 
        element.setAttribute('href', path); // path - тот путь который приходит в функцию this.downloadItem(this.path)
        element.setAttribute('download', 'nice_picture'); // атрибут download 

        element.style.display = 'none'; // на странице он не должен появится мы не видим его 
        document.body.appendChild(element); // помещаем его ссылка есть на странице

        element.click(); // вот так тоже можно вызвать событие

        document.body.removeChild(element); // после того как действие при клике совершится мы его убираем (ссылка отработа)
    }

    init() {
        this.btns.forEach(item => { // если будет пустой массив то он просто не запустится
            item.addEventListener('click', () => { //обязательно callbacl ввиде стрелочной
                this.downloadItem(this.path);
                //this.path можно сформировать динамически в заисимтости от кнопки на которую мы нажали
                // можно определить у item data атрибут и в зависимости от него подставить опредленные значения
            });
        });
    }
}