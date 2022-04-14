export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this); // Loan 13.3 жетско привязываем контекст вызова
        //YouTube IFrame Player API
        // https://developers.google.com/youtube/iframe_api_reference?hl=ru
        // 27. Создаем видеоплеер в модальном окне
    }
    // #4
    bindTriggers() {
        this.btns.forEach((btn, i) => {
            try { // помещаяем в try catch так как на первой странице не работает плеер
                // Loan #13.4 блокируем кнопку назначаем всему блоку так как меняются стили
                const blockedElem = btn.closest('.module__video-item').nextElementSibling;

                if (i % 2 == 0) {
                    blockedElem.setAttribute('data-disabled', 'true');
                }
            } catch(e) {}

            btn.addEventListener('click', () => { // тут мы инициализировали наш плеер  // а тут отошли от типично try & catch (!btn.closest('.module__video-item')) можно и так
                if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') { // Loan #13.4 блокируем кнопку если он не тру то выполним действия
                    this.activeBtn = btn; // №№ Loan #13.3 кнопка на которую кликнул пользователь


                // если плеер на странице уже сформирован мы не будем его пересоздавать а просто откроем модальное окно 
                if (document.querySelector('iframe#frame')) {
                    this.overlay.style.display = 'flex';
                    // ## Loan #13.2 Сравниваем data-url той кнопки в котрую только что кликнули
                    if (this.path !== btn.getAttribute('data-url')) { // если он не равен то загружаем новое видео
                        this.path = btn.getAttribute('data-url');
                        this.player.loadVideoById({videoId: this.path}); //загружаем новое видео в уже готовый плеер если точно такой же путь Url (принимает видео ид)
                    }
                } else {
                    //## Loan #13.2 path = this.path Испраил баг (открывается одно и тоже видео)
                    // Path сохраняем не внутри функции а внутри class - ов вообще 
                    // Если у нас еще не было вызвано модальное окно то мы создаем новое свойство this.path
                    this.path = btn.getAttribute('data-url');
                    this.createPlayer(this.path);
                }

                // // если плеер уже был создан ранее с другим
                // // видео, нужно удалить iframe#frame и
                // // восстановить div#frame, чтобы создать
                // // новый плеер
                // if (this.player) {
                //     this.player.destroy();
                // }
                // this.createPlayer(btn.dataset.url);
                }
            });
        });



    }
    // #5
    bindCloseBtn() {
        // Один элемент
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo();
        });
        // Закрыть не по крестику
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.overlay.style.display = 'none';
                this.player.stopVideo();
            }
        });
    }
    // #3
    createPlayer(url) {
        // Player('frame' <<сюда помещаем с index.html id и создаст новый плеер
        this.player = new YT.Player('frame', { // Loan #13.3 контекст будет терятся в events потому что мы все это запускаем в новом экземпляре класса 
            // по 100% подстраиваем под верстку
            height: '100%',
            width: '100%',
            // vieoid самый важный параметр сюда будет подргужать уникальй ид котороый будет на ютубе
            videoId: `${url}`,
            // url подставляем динамически
            events: { //## Loan #13.3 не забывает про контекст вызова мы нахиодмся внутри класса
                'onStateChange': this.onPlayerStateChange
                // 'onStateChange': this.onPlayerStateChange.bind(this) можно и так привязать 
              }
        });

        this.overlay.style.display = 'flex';
    }
    // Функция по обработке изменение состояния нашего плеера (он будет срабатывать кажждый раз когда изменяется состояние нашего плеера)
    onPlayerStateChange(state) { //## Loan 13.3
        try { // помещаяем в try catch так как на первой странице не работает плеер
            // closest получает первую ноду по селектору который мы сюда передадим выше по иерархии и если подходит тот элемент на котором сработало то вернет сам элемент 
            const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
            // this.activeBtn.parentNode.nextElementSibling тоже самое но во многих случаях нам нужно находить не прямого родителя элемента, а выше по иерархии. Именно в таких случаях и нужен closest

            // cloneNode(true) - если мы используем без параметра либо передаем false то это поверхностное копирование . true - это глубокое копирование
            // мы скопируем svg оболочку svg тег который там находтся . А нам нужно скопировать все что находтся в этом теге
            const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);
            // То что мы получаем из data можно найти в документации YouTube IFrame Player API
            // и теперь когда видео закончится выполним определенные действия
            if (state.data === 0) {
                if(blockedElem.querySelector('.play__circle').classList.contains('closed')) { // Как мы понимаем по классу closed что это второе видео
                    blockedElem.querySelector('.play__circle').classList.remove('closed'); 
                    blockedElem.querySelector('svg').remove(); //удаляем замок тег с замком у второго видео!
                    blockedElem.querySelector('.play__circle').appendChild(playBtn); // заменяем на плей у второго видео
                    blockedElem.querySelector('.play__text').textContent = 'play video';
                    blockedElem.querySelector('.play__text').classList.remove('attention');
                    blockedElem.style.opacity = 1; // хоть и убрали attention со стилями но мы назначи другие стили
                    blockedElem.style.filter = 'none';

                    blockedElem.setAttribute('data-disabled', 'false'); // Loan 13.4 кнопка
                    // Можно не использовать дата атрибуты, а проверить по наличию класса отсутствия активности closed в блоке ка вариант   
                }            
            }
        } catch(e) {}
    }

    // плеер подлючили #2
    init() {
        // Проверим были ли у нас вообще какие-то кнопки переданы
        // ## Loan #13.1 Проверим пусткой массив на количетсво элементов то есть если один хоть элемент у нас будет на странице
        if(this.btns.length > 0 ) {
            const tag = document.createElement('script');
            // Устанавливаем у него атрибут src у script
            tag.src = "https://www.youtube.com/iframe_api";
            // находим первый скрипт на странице
            const firstScriptTag = document.getElementsByTagName('script')[0];
            //обращаемся к главному родителю и прямо перед первым скриптом помещаем скрипт с iframe.api
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            // ассинхронное подключение
            this.bindTriggers();
            this.bindCloseBtn(); 
        }
     }
}

// каждый экзмепляр это отдельный обьект 