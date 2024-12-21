// Функція для шифрування
function encryptMessage(message, salt) {
    return btoa(unescape(encodeURIComponent(message + salt)));
}

// Функція для розшифрування
function decryptMessage(encryptedMessage, salt) {
    try {
        const decoded = decodeURIComponent(escape(atob(encryptedMessage)));
        if (decoded.endsWith(salt)) {
            return decoded.slice(0, -salt.length);
        } else {
            throw new Error("Невірний salt.");
        }
    } catch (error) {
        return "Помилка розшифрування: " + error.message;
    }
}

// Дії при натисканні кнопок
document.getElementById("encryptBtn").addEventListener("click", () => {
    const message = document.getElementById("message").value;
    const salt = document.getElementById("salt").value;

    if (!message || !salt) {
        document.getElementById("result").innerText = "Будь ласка, введіть повідомлення та salt.";
        return;
    }

    const encryptedMessage = encryptMessage(message, salt);
    document.getElementById("result").innerText = "Зашифроване повідомлення: " + encryptedMessage;
});

document.getElementById("decryptBtn").addEventListener("click", () => {
    const encryptedMessage = document.getElementById("message").value;
    const salt = document.getElementById("salt").value;

    if (!encryptedMessage || !salt) {
        document.getElementById("result").innerText = "Будь ласка, введіть зашифроване повідомлення та salt.";
        return;
    }

    const decryptedMessage = decryptMessage(encryptedMessage, salt);
    document.getElementById("result").innerText = "Розшифроване повідомлення: " + decryptedMessage;
});


