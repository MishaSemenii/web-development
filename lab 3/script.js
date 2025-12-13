const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("alt-theme");

    if (document.body.classList.contains("alt-theme")) {
        themeBtn.textContent = "Повернути світлий стиль";
    } else {
        themeBtn.textContent = "Змінити стиль";
    }
});
