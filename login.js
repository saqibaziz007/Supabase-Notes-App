<<<<<<< HEAD
// Supabase Configuration
=======
//Supabase Config
>>>>>>> 6614f0c42b322220e155afbead990fcd8e9cc067
const SUPABASE_URL = "https://elybfiwvdnrhhodhuywg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVseWJmaXd2ZG5yaGhvZGh1eXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNDYxMjAsImV4cCI6MjA3MjkyMjEyMH0.VHvVqDIKUPhSKB05o4tTIe113iChtcIubiLhyN0rvO8";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

<<<<<<< HEAD
// Signup/Login Tabs
=======
// Toggle Tabs
>>>>>>> 6614f0c42b322220e155afbead990fcd8e9cc067
loginBtn.addEventListener("click", () => {
    loginBtn.classList.add("active");
    signupBtn.classList.remove("active");
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
});

signupBtn.addEventListener("click", () => {
    signupBtn.classList.add("active");
    loginBtn.classList.remove("active");
    signupForm.classList.add("active");
    loginForm.classList.remove("active");
});

// Signup
signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const { data, error } = await client.auth.signUp({ email, password });
    if (error) {
        document.getElementById("signupMsg").textContent = error.message;
    } else {
        document.getElementById("signupMsg").style.color = "green";
        document.getElementById("signupMsg").textContent = "Signup successful! Check your email.";
    }
});

// Login
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) {
        document.getElementById("loginMsg").textContent = error.message;
    } else {
        localStorage.setItem("user", JSON.stringify(data.session));
        window.location.href = "notes.html";
    }
<<<<<<< HEAD
});
=======
});
>>>>>>> 6614f0c42b322220e155afbead990fcd8e9cc067
