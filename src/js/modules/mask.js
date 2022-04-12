const mask = (selector) => {
    let setCursorPosition = (pos, elem) => {
        elem.focus();

        // полифил для старых браузеров
        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();

            // / Сворачивает текущую выделенную область в одну точку (первую с последним)
            range.collapse(true);
            // POS - это количество симвоволов в this.value.length
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            // уставноим курсор и выделим то значение котрое сформируется с верхних параметров
            range.select();
        }
    };
    


    function createMask(event) {
        let matrix = '+1 (___) ___ __ __',
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

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });
};

export default mask;