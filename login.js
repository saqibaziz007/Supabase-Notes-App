// Supabase Configuration
const SUPABASE_URL = "https://elybfiwvdnrhhodhuywg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVseWJmaXd2ZG5yaGhvZGh1eXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNDYxMjAsImV4cCI6MjA3MjkyMjEyMH0.VHvVqDIKUPhSKB05o4tTIe113iChtcIubiLhyN0rvO8";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// Signup/Login Tabs
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

// Login
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = loginForm.querySelector(".submit-btn");
    const btnText = btn.querySelector(".btn-text");
    const loader = btn.querySelector(".loader");

    // Show loader
    btn.disabled = true;
    btnText.textContent = "Loading...";
    loader.style.display = "inline-block";

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const { data, error } = await client.auth.signInWithPassword({ email, password });

    if (error) {
        document.getElementById("loginMsg").textContent = error.message;

        btn.disabled = false;
        btnText.textContent = "Login";
        loader.style.display = "none";
    } else {
        localStorage.setItem("user", JSON.stringify(data.session));
        window.location.href = "notes.html";
    }
});

// Signup
signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = signupForm.querySelector(".submit-btn");
    const btnText = btn.querySelector(".btn-text");
    const loader = btn.querySelector(".loader");

    // Show loader
    btn.disabled = true;
    btnText.textContent = "Loading...";
    loader.style.display = "inline-block";

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const { data, error } = await client.auth.signUp({ email, password });

    if (error) {
        document.getElementById("signupMsg").textContent = error.message;
        // Hide loader again
        btn.disabled = false;
        btnText.textContent = "Signup";
        loader.style.display = "none";
    } else {
        document.getElementById("signupMsg").style.color = "green";
        document.getElementById("signupMsg").textContent = "Signup successful! Check your email.";

        btn.disabled = false;
        btnText.textContent = "Signup";
        loader.style.display = "none";
    }
});