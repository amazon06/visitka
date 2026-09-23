document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    const historyList = document.getElementById('history');

    function addToHistory(text) {
        const li = document.createElement('li');
        const time = new Date().toLocaleTimeString('ru-RU');
        li.textContent = `${time} — ${text}`;
        historyList.prepend(li);
    }

    document.getElementById('clearHistory').addEventListener('click', () => {
        historyList.innerHTML = '';
    });

    function showResult(element, value) {
        element.textContent = value;
        element.classList.remove('pop');
        void element.offsetWidth;
        element.classList.add('pop');
    }

    document.getElementById('rollNumber').addEventListener('click', () => {
        const min = parseInt(document.getElementById('min').value);
        const max = parseInt(document.getElementById('max').value);
        const result = document.getElementById('numberResult');

        if (isNaN(min) || isNaN(max) || min > max) {
            showResult(result, 'Ошибка');
            return;
        }

        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        showResult(result, num);
        addToHistory(`Число: ${num} (${min}–${max})`);
    });

    document.getElementById('rollList').addEventListener('click', () => {
        const text = document.getElementById('listInput').value;
        const items = text.split('\n').map(s => s.trim()).filter(Boolean);
        const result = document.getElementById('listResult');

        if (items.length === 0) {
            showResult(result, 'Пусто');
            return;
        }

        const choice = items[Math.floor(Math.random() * items.length)];
        showResult(result, choice);
        addToHistory(`Выбор: ${choice}`);
    });

    document.getElementById('rollCoin').addEventListener('click', () => {
        const result = document.getElementById('coinResult');
        const coin = Math.random() < 0.5 ? 'Орёл' : 'Решка';
        showResult(result, coin);
        addToHistory(`Монетка: ${coin}`);
    });

});