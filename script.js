const boyPic = "https://cdn-icons-png.flaticon.com/512/236/236831.png";
const girlPic = "https://cdn-icons-png.flaticon.com/512/236/236832.png";
let currentUser = {};

const courses = [
    { name: "Python", desc: "Learn Python for automation, AI, and apps.", img: "https://www.python.org/static/community_logos/python-logo.png", levels: ["Basics", "Loops", "Functions", "Project"] },
    { name: "C", desc: "Master C for system-level, embedded programming.", img: "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png", levels: ["Intro", "Pointers", "Memory Management", "Project"] },
    { name: "C++", desc: "Dive into C++ for games, OOP, performance apps.", img: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg", levels: ["Basics", "OOP", "Templates", "Project"] },
    { name: "Java", desc: "Use Java for Android, web, and cross-platform apps.", img: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg", levels: ["Intro", "OOP", "Multithreading", "Project"] },
    { name: "JavaScript", desc: "Interactive websites, full-stack development.", img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png", levels: ["Basics", "DOM", "Advanced JS", "Project"] },
    { name: "HTML", desc: "Structure web pages using semantic markup.", img: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg", levels: ["Intro", "Tags", "Forms", "Project"] },
    { name: "CSS", desc: "Design beautiful, responsive websites with CSS.", img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg", levels: ["Basics", "Layouts", "Animations", "Project"] },
    { name: "Webpages", desc: "Build and deploy modern websites.", img: "https://cdn-icons-png.flaticon.com/512/2721/2721297.png", levels: ["Planning", "Building", "Publishing"] },
    { name: "AI", desc: "Explore AI, machine learning, neural networks.", img: "https://cdn-icons-png.flaticon.com/512/2807/2807997.png", levels: ["Intro", "ML Basics", "Deep Learning", "Project"] },
    { name: "HW", desc: "Understand hardware, IoT devices, system basics.", img: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png", levels: ["Basics", "IoT", "Hardware Project"] }
];

const questions = [
    { text: "What excites you the most?", options: ["Automation & AI", "Building Websites", "Game Development"] },
    { text: "Which field interests you?", options: ["Embedded Systems", "Web Development", "Data Science"] },
    { text: "Preferred project type?", options: ["Machine Learning", "Creating Websites", "System Programming"] }
];

let currentQ = 0;
let idx = 0;
const typingText = "What do you want to learn today?";

// Login Logic
document.getElementById("googleBtn").addEventListener("click", () => {
    currentUser = { name: "Google User", gender: "male", username: "google123" };
    startApp();
});

document.getElementById("loginBtn").addEventListener("click", () => {
    const name = document.getElementById("nameInput").value.trim();
    const gender = document.getElementById("genderInput").value;
    const username = document.getElementById("usernameInput").value.trim();

    if (!name || !gender || !username) return alert("Please fill all details");

    currentUser = { name, gender, username };
    startApp();
});

function startApp() {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("mainApp").style.display = "block";
    document.getElementById("profileName").innerText = currentUser.username;
    document.getElementById("profilePic").src = currentUser.gender === "female" ? girlPic : boyPic;
    document.getElementById("dashName").innerText = currentUser.name;
    showHome();
}

// Navigation Logic
document.getElementById("profileSection").addEventListener("click", () => {
    hideAll();
    document.getElementById("dashboard").style.display = "block";
});

document.getElementById("loginBtn").addEventListener("click", () => {
    const name = document.getElementById("nameInput").value.trim();
    const gender = document.getElementById("genderInput").value;
    const username = document.getElementById("usernameInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    const password = document.getElementById("passwordInput").value;

    if (!name || !gender || !username || !email || !password) {
        return alert("Please fill all details");
    }

    // Basic validation (optional, improve if needed)
    if (!email.includes("@") || password.length < 4) {
        return alert("Enter a valid email and password (min 4 characters)");
    }

    currentUser = { name, gender, username, email, password };
    startApp();
});


document.getElementById("homeLink").addEventListener("click", showHome);
document.getElementById("coursesLink").addEventListener("click", showCourses);
document.getElementById("quizLink").addEventListener("click", showQuiz);
document.getElementById("aboutLink").addEventListener("click", () => {
    hideAll();
    document.getElementById("about").style.display = "block";
});

// Typing Animation
function typeEffect() {
    if (idx < typingText.length) {
        document.getElementById("typingText").innerHTML += typingText.charAt(idx);
        idx++;
        setTimeout(typeEffect, 100);
    }
}

// Show Sections
function showHome() {
    hideAll();
    document.getElementById("home").style.display = "block";
    document.getElementById("typingText").innerHTML = "";
    idx = 0;
    typeEffect();
}

function hideAll() {
    ["home", "courses", "detail", "quiz", "about", "dashboard"].forEach(id => {
        document.getElementById(id).style.display = "none";
    });
}

// Courses
function showCourses() {
    hideAll();
    document.getElementById("courses").style.display = "block";

    const container = document.getElementById("courseList");
    container.innerHTML = "";

    courses.forEach(c => {
        const div = document.createElement("div");
        div.className = "course";
        div.innerHTML = `<img src="${c.img}" alt="${c.name}"><h2>${c.name}</h2><p>${c.desc}</p><button class="btn">Learn ${c.name}</button>`;
        div.querySelector("button").addEventListener("click", () => showDetail(c));
        container.appendChild(div);
    });
}

// Course Details
function showDetail(course) {
    hideAll();
    document.getElementById("detail").style.display = "block";
    document.getElementById("detailTitle").innerText = course.name;
    document.getElementById("detailDesc").innerText = course.desc;
    document.getElementById("detailImg").src = course.img;

    const container = document.createElement("div");
    container.style.marginTop = "20px";

    course.levels.forEach((level, i) => {
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.innerText = level;
        btn.disabled = i !== 0;
        btn.addEventListener("click", () => completeLevel(course, i, btn));
        container.appendChild(btn);
    });

    // Add the level buttons container to the detail section
    const detailSection = document.getElementById("detail");
    detailSection.appendChild(container);

    // === Display Resources ===
    const resHeading = document.createElement("h3");
    resHeading.innerText = "Learning Resources";
    resHeading.style.marginTop = "30px";

    const resList = document.createElement("ul");
    resList.style.listStyleType = "disc";
    resList.style.paddingLeft = "20px";

    course.resources.forEach(resource => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = resource.link;
        link.innerText = resource.title;
        link.target = "_blank";
        li.appendChild(link);
        resList.appendChild(li);
    });

    detailSection.appendChild(resHeading);
    detailSection.appendChild(resList);
}


    document.getElementById("detail").appendChild(container);
}

function completeLevel(course, levelIdx, btn) {
    btn.disabled = true;
    btn.innerText += " ✅";
    showMotivation(`🎉 Great job! You finished "${course.levels[levelIdx]}"`);

    const buttons = document.querySelectorAll("#detail .btn");
    if (levelIdx + 1 < buttons.length) {
        buttons[levelIdx + 1].disabled = false;
    } else {
        showMotivation(`🚀 You completed all levels of ${course.name}! New course unlocked.`);
        unlockNextCourse(course.name);
    }
}

function unlockNextCourse(currentCourseName) {
    const idx = courses.findIndex(c => c.name === currentCourseName);
    if (idx + 1 < courses.length) {
        alert(`🔓 New Course Unlocked: ${courses[idx + 1].name}`);
    } else {
        alert("🏆 Congratulations! You finished all courses.");
    }
}

function showMotivation(msg) {
    const div = document.createElement("div");
    div.className = "motivate";
    div.innerText = msg;
    document.getElementById("detail").appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

// Quiz
function showQuiz() {
    hideAll();
    document.getElementById("quiz").style.display = "block";
    currentQ = 0;
    renderQuestion();
}

function renderQuestion() {
    const q = questions[currentQ];
    const container = document.getElementById("quizContainer");
    container.innerHTML = `<p style='margin-bottom:20px;'>${q.text}</p>`;

    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.style.margin = "10px";
        btn.innerText = opt;
        btn.addEventListener("click", () => nextQuestion(opt));
        container.appendChild(btn);
    });
}

function nextQuestion(answer) {
    if (currentQ < questions.length - 1) {
        currentQ++;
        renderQuestion();
    } else {
        let selected = "Python";
        if (answer.includes("Web")) selected = "Webpages";
        if (answer.includes("Data") || answer.includes("Machine")) selected = "AI";
        if (answer.includes("System")) selected = "C";

        const match = courses.find(c => c.name === selected);
        showDetail(match);
    }
}

// Search Logic
document.getElementById("submitBtn").addEventListener("click", () => {
    const topic = document.getElementById("topicInput").value.trim().toLowerCase();
    const filtered = courses.filter(c => c.name.toLowerCase().includes(topic));
    if (filtered.length === 1) {
        showDetail(filtered[0]);
    } else {
        showCourses(filtered);
    }
});

document.getElementById("backBtn").addEventListener("click", showCourses);
{
  name: "Python",
  desc: "Learn Python for automation, AI, and apps.",
  img: "https://www.python.org/static/community_logos/python-logo.png",
  levels: ["Basics", "Loops", "Functions", "Project"],
  resources: [
    { title: "Python Basics Video", link: "https://www.youtube.com/watch?v=rfscVS0vtbw" },
    { title: "W3Schools Python", link: "https://www.w3schools.com/python/" },
    { title: "Python Docs", link: "https://docs.python.org/3/" }
  ]
}
