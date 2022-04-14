// export default class Form {
//     // constructor(forms, url) { можно добавить еще один аргумент например URL   подставить в this.path более динамчески если пару адрессов
//     constructor(forms) {
//         this.forms = document.querySelectorAll(forms);
//         this.inputs = document.querySelectorAll('input');
//         this.message = {
//             loading: 'loading...',
//             success: 'I have good news!',
//             failure: 'I have trouble...'
//         };
//         this.path = 'assets/question.php';
//     }

//     clearInputs() {
//         this.inputs.forEach(input => {
//             input.value = '';
//         });
//     }

//     checkMailInputs() {
//         const mailInputs = document.querySelectorAll('[type="email"]');

//         mailInputs.forEach(input => {
//             input.addEventListener('keypress', function(e) {
//                 if (e.key.match(/[^a-z 0-9 @\.]/ig)) {
//                     e.preventDefault();
//                 }
//             });
//         });
//     }

//     initMask() {
//         let setCursorPosition = (pos, elem) => {
//             elem.focus();
    
//             // полифил для старых браузеров
//             if (elem.setSelectionRange) {
//                 elem.setSelectionRange(pos, pos);
//             } else if (elem.createTextRange) {
//                 let range = elem.createTextRange();
    
//                 range.collapse(true);
//                 range.moveEnd('character', pos);
//                 range.moveStart('character', pos);
//                 range.select();
//             }
//         };
        
//         function createMask(event) {
//             let matrix = '+1 (___) ___-____',
//                 i = 0,
//                 def = matrix.replace(/\D/g, ''),
//                 val = this.value.replace(/\D/g, '');
    
//             if (def.length >= val.length) {
//                 val = def;
//             }
    
//             this.value = matrix.replace(/./g, function(a) {
//                 return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
//             });
//             // Событие blur вызывается когда элемент теряет фокус
//             if (event.type === 'blur') {
//                 if (this.value.length == 2) {
//                     this.value = '';
//                 }
//             } else {
//                 setCursorPosition(this.value.length, this);
//             }
//         }
    
//         let inputs = document.querySelectorAll('[name="phone"]');
    
//         inputs.forEach(input => {
//             input.addEventListener('input', createMask);
//             input.addEventListener('focus', createMask);
//             input.addEventListener('blur', createMask);
//         });
//     }

//     async postData(url, data) {
//         let res = await fetch(url, {
//             method: 'POST',
//             body: data
//         });

//         return await res.text();
//     }

//     init() {
//         this.checkMailInputs();
//         this.initMask();

//         // можно получить конкретные импуты покторые будут находтся прямо в форме тоесть в foreach
//         this.forms.forEach(item => {
//             item.addEventListener('submit', (e) => {
//                 e.preventDefault();

//                 let statusMessage = document.createElement('div');
//                 statusMessage.style.cssText = `
//                     margin-top: 15px;
//                     font-size: 18px;
//                     color: red;
//                 `;
//                 item.parentNode.appendChild(statusMessage);

//                 statusMessage.textContent = this.message.loading;

//                 const formData = new FormData(item);
//                 //this.postData() мы обращаемся к конкретному методу который есть в конкретном обьекте
//                 this.postData(this.path, formData)
//                     .then(res => {
//                         console.log(res);
//                         statusMessage.textContent = this.message.success;
//                     })
//                     .catch(() => {
//                         statusMessage.textContent = this.message.failure;
//                     })
//                     .finally(() => {
//                         this.clearInputs();
//                         setTimeout(() => {
//                             statusMessage.remove();
//                         }, 6000);
//                     });
//             });
//         });
//     }
// }

// 1. Самое главное чтобы нужная форма была обвернута в тег form чтобы вы могли навесит обраобтчик submit
// 2. Блоки в которые вводит пользователь инфу должны быть input или div котоорые не могут быть inputами
// 3. Атрибут name, email и у select тоже есть Name должны быть даже если не используем formData с перезагрузкой страницы должны стоять атрибуты
// 4.Всегда обращайте внимание на верстку и как вооще все утроено 
// наш  проект не сильно большой в нем две формы и соотсвевно в нем будет только дин запрос поэтмоу можно поместить функцию пряом в модуль в класс форм
// если много запросов или используются в нескольких модулях то выносим их в отдельный сервис так удобно использовать и модифицировать в будущем





























// import postData from '../services/services';
// import mask from './mask';
// import checkMailInputs from './checkMailInputs';

export default class Form {
    // constructor(forms, url) { можно добавить еще один аргумент например URL   подставить в this.path более динамчески если пару адрессов
    constructor(form) {
        this.form = document.querySelectorAll(form);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Loading...',
            success: 'You are welcome!',
            failure: 'I have trouble...'
        };

        this.path = 'assets/question.php';
    }
    

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        });
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]');

        mailInputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key.match(/[^a-z 0-9 @\.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }

    initMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus();
    
            // полифил для старых браузеров
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
        
        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
    
            if (def.length >= val.length) {
                val = def;
            }
    
            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
            // Событие blur вызывается когда элемент теряет фокус
            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }
    
        let inputs = document.querySelectorAll('[name="phone"]');
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    }

    // #1
    bindPostData() {
        this.checkMailInputs();
        this.initMask();
 

        [...this.form].forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();

                const {loading, success, failure} = this.message;

                let statusMessage = document.createElement('div');
                statusMessage.classList.add('animated');
                statusMessage.classList.add('tada');
                statusMessage.style.cssText = `
                    margin-top: 50px;
                    font-size: 40px;
                    color: red;
                    text-align: center;  
                `;
                    // statusMessage.textContent = this.message.loading; попробуй так
                statusMessage.textContent = loading;
                item.parentNode.appendChild(statusMessage);

                setTimeout(() => {
                    item.style.display = 'none';
                }, 0);

                item.classList.add('animated', 'fadeOutRight');

                const formData = new FormData(item);

                this.postData(this.path, formData)
                    .then(response => {
                        console.log(response);
                        setTimeout(() => {
                            statusMessage.textContent = success;
                        }, 1000);
                    })
                    .catch((error) => {
                        console.log(error);
                        statusMessage.textContent = failure;
                    })
                    .finally(() => {
                        this.clearInputs();

                        setTimeout(() => {
                            statusMessage.remove();

                            item.style.display = 'block';
                            item.classList.remove('animated', 'fadeOutRight');
                            item.classList.add('animated', 'fadeInUp');
                        }, 6000);   

                    });

            });
        });
    }
}