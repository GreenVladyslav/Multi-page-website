export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        //YouTube IFrame Player API
    }
    // #4
    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (document.querySelector('iframe#frame')) {
                    this.overlay.style.display = 'flex';
                } else {
                    const path = btn.getAttribute('data-url');
                    this.createPlayer(path);
                }

                // // если плеер уже был создан ранее с другим
                // // видео, нужно удалить iframe#frame и
                // // восстановить div#frame, чтобы создать
                // // новый плеер
                // if (this.player) {
                //     this.player.destroy();
                // }
                // this.createPlayer(btn.dataset.url);
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
    }
    // #3
    createPlayer(url) {
        // Player('frame' <<сюда помещаем с index.html id и создаст новый плеер
        this.player = new YT.Player('frame', {
            // по 100% подстраиваем под верстку
            height: '100%',
            width: '100%',
            // vieoid самый важный параметр сюда будет подргужать уникальй ид котороый будет на ютубе
            videoId: `${url}`
        });

        console.log(this.player);
        this.overlay.style.display = 'flex';
    }
    // плеер подлючили #2
    init() {
        const tag = document.createElement('script');
        // Устанавливаем у него атрибут src у script
        tag.src = "https://www.youtube.com/iframe_api";
        // находим первый скрипт на странице
        const firstScriptTag = document.getElementsByTagName('script')[0];
        //обращаемся к главному родителю и прямо перед первым скриптом помещаем скрипт с iframe.api
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        this.bindTriggers();
        this.bindCloseBtn();
    }
}