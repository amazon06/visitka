document.addEventListener('DOMContentLoaded', () => {

    const CHARS = {
        digits:  '0123456789',
        lower:   'abcdefghijklmnopqrstuvwxyz',
        upper:   'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    const lengthInput = document.getElementById('length');
    const lengthValue = document.getElementById('lengthValue');
    const result = document.getElementById('result');
    const strength = document.getElementById('strength');

    lengthInput.addEventListener('input', () => {
        lengthValue.textContent = lengthInput.value;
    });

    function getCharset() {
        let charset = '';
        if (document.getElementById('digits').checked)  charset += CHARS.digits;
        if (document.getElementById('lower').checked)   charset += CHARS.lower;
        if (document.getElementById('upper').checked)   charset += CHARS.upper;
        if (document.getElementById('symbols').checked) charset += CHARS.symbols;
        return charset;
    }

    function generatePassword(length, charset) {
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset[Math.floor(Math.random() * charset.length)];
        }
        return password;
    }

    function checkStrength(password) {
        let score = 0;
        if (password.length >= 8)  score++;
        if (password.length >= 12) score++;
        if (password.length >= 16) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;

        if (score <= 3) return 'weak';
        if (score <= 5) return 'medium';
        return 'strong';
    }

    function updateStrength(password) {
        strength.classList.remove('weak', 'medium', 'strong');
        strength.classList.add(checkStrength(password));
    }

    document.getElementById('generate').addEventListener('click', () => {
        const length = parseInt(lengthInput.value);
        const charset = getCharset();

        if (!charset) {
            result.textContent = 'Выбери хотя бы один тип';
            strength.classList.remove('weak', 'medium', 'strong');
            return;
        }

        const password = generatePassword(length, charset);
        result.textContent = password;
        result.classList.remove('pop');
        void result.offsetWidth;
        result.classList.add('pop');
        updateStrength(password);
    });

    document.getElementById('copy').addEventListener('click', () => {
        const text = result.textContent;
        if (!text || text === '—' || text === 'Выбери хотя бы один тип') return;

        navigator.clipboard.writeText(text).then(() => {
            const btn = document.getElementById('copy');
            const original = btn.textContent;
            btn.textContent = 'Скопировано!';
            setTimeout(() => btn.textContent = original, 1200);
        });
    });

});