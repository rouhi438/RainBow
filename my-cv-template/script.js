const toggleIcon = document.querySelector(".toggle-icon");
const hiddenBar = document.querySelector(".hidden-bar");
toggleIcon.addEventListener("click", function () {
  hiddenBar.classList.toggle("open");
  toggleIcon.classList.toggle("active");
});
// ======== header animation by loading page
window.onload = () => {
  document.querySelector("header").style.transform = "translateX(0)";
  document.querySelector("header").style.opacity = "1";
};
// ======== for reset hidden bar by resizing
window.addEventListener("resize", () => {
  if (window.innerWidth > 799) {
    hiddenBar.classList.remove("open");
    toggleIcon.classList.remove("active");
  }
});
// ======== effect fot typing text in hero section
document.addEventListener("DOMContentLoaded", () => {
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");
  const cvBtn = document.querySelector(".hero-content .btn-holder button");

  // == Read text from HTML
  const text1 = line1.textContent.trim();
  const text2 = line2.textContent.trim();

  // == Clear text so typing can start
  line1.textContent = "";
  line2.textContent = "";
  line2.style.display = "none";
  cvBtn.style.opacity = "0";

  let i = 0;
  let j = 0;

  function typeFirstSentence() {
    if (i < text1.length) {
      line1.textContent += text1.charAt(i);
      i++;
      setTimeout(typeFirstSentence, 50);
    } else {
      setTimeout(() => {
        line2.style.display = "block";
        typeSecondSentence();
      }, 400);
    }
  }

  function typeSecondSentence() {
    if (j < text2.length) {
      line2.textContent += text2.charAt(j);
      j++;
      setTimeout(typeSecondSentence, 50);
    } else {
      setTimeout(() => {
        cvBtn.style.opacity = "1";
      }, 150);
    }
  }

  typeFirstSentence();
});
//=========animate skill section on scroll
const skillLevel = document.querySelectorAll(".skill-level");

function animateSkills() {
  skillLevel.forEach((skill) => {
    const parent = skill.parentElement;
    const progress = skill.getAttribute("data-progress");
    const top = parent.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (top < windowHeight - 20) {
      skill.style.width = progress + "%";
    } else {
      skill.style.width = "0";
    }
  });
}
window.addEventListener("scroll", animateSkills);
animateSkills();

const hiddenLinks = document.querySelectorAll(".hidden-link");
hiddenLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hiddenBar.classList.remove("open");
    toggleIcon.classList.remove("active");
    setTimeout(() => {}, 100);
  });
});

//-- skill section

document.addEventListener("DOMContentLoaded", function () {
  // Tab functionality
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab");

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      button.classList.add("active");
      document.getElementById(`${tabId}-tab`).classList.add("active");

      // Animate skills in active tab
      animateTabSkills();
    });
  });

  // Animate skills in active tab
  function animateTabSkills() {
    const activeTab = document.querySelector(".tab-content.active");
    const skillLevels = activeTab.querySelectorAll(".skill-level");

    skillLevels.forEach((skill) => {
      const progress = skill.getAttribute("data-progress");
      skill.style.width = progress + "%";
    });
  }

  // Animate skills on initial load
  animateTabSkills();

  // Animate skills on scroll (for when tab becomes visible)
  function checkScroll() {
    const tabsSection = document.querySelector(".skills-tabs");
    const rect = tabsSection.getBoundingClientRect();

    if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
      animateTabSkills();
    }
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll(); // Initial check
});
