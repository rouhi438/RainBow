//======= I get image upload file  from AI ======///

const input = document.getElementById("photoInput");
const preview = document.getElementById("preview");
const label = document.getElementById("uploadLabel");

input.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block"; // عکس نشون داده میشه
      label.style.opacity = 0; // SVG مخفی میشه
    };
    reader.readAsDataURL(file);
  }
});

//========================================//

const degreeLanguage = document.querySelectorAll(".deg");
degreeLanguage.forEach((element) => {
  element.addEventListener("click", function () {
    element.classList.toggle("degBG");
  });
});
