const checkMailInputs = (selector) => {
    const mailInputs = document.querySelectorAll(selector);
    // Запрет кириллицы руссский можно только англ цифры собака
    mailInputs.forEach(item => {
        item.addEventListener('keypress', (e) => {
            if (e.key.match(/[^a-z 0-9 @\.]/ig)) {
                e.preventDefault();
            }
        });
    });
};

export default checkMailInputs;