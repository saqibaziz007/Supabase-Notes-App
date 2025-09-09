const SUPABASE_URL = "https://elybfiwvdnrhhodhuywg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVseWJmaXd2ZG5yaGhvZGh1eXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNDYxMjAsImV4cCI6MjA3MjkyMjEyMH0.VHvVqDIKUPhSKB05o4tTIe113iChtcIubiLhyN0rvO8";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const noteForm = document.getElementById("noteForm");
const notesContainer = document.getElementById("notesContainer");

// Check session
const session = JSON.parse(localStorage.getItem("user"));
if (!session) {
    window.location.href = "index.html";
}
const userId = session.user.id;

// Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    localStorage.removeItem("user");
    window.location.href = "index.html";
});

// Load Notes from DB
async function loadNotes() {
    const { data, error } = await supabaseClient
        .from("notes")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Load Error:", error);
        return;
    }

    notesContainer.innerHTML = "";
    data.forEach((note) => {
        const div = document.createElement("div");
        div.classList.add("note");
        div.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.content}</p>
          ${note.image_url ? `<img src="${note.image_url}" alt="Note Image">` : ""}
        `;
        notesContainer.appendChild(div);

        // Add click event for preview
        if (note.image_url) {
            div.querySelector("img").addEventListener("click", () => {
                document.getElementById("modalImg").src = note.image_url;
                document.getElementById("imgModal").style.display = "flex";
            });
        }
    });
}

loadNotes();

// Add Note
noteForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const imageFile = document.getElementById("image").files[0];
    let imageUrl = null;

    // Upload image if exists
    if (imageFile) {
        const fileName = `${userId}-${Date.now()}-${imageFile.name}`;

        const { error: uploadError } = await supabaseClient.storage
            .from("notes-images")
            .upload(fileName, imageFile);

        if (uploadError) {
            alert("Image upload failed: " + uploadError.message);
            return;
        }

        const { data: publicUrlData } = supabaseClient.storage
            .from("notes-images")
            .getPublicUrl(fileName);

        imageUrl = publicUrlData.publicUrl;
    }

    // Save note in table
    const { error: insertError } = await supabaseClient.from("notes").insert([
        { user_id: userId, title, content, image_url: imageUrl },
    ]);

    if (insertError) {
        alert("Error saving note: " + insertError.message);
        return;
    }

    await loadNotes();
    noteForm.reset();
});

// Close Modal
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("imgModal").style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target.id === "imgModal") {
        document.getElementById("imgModal").style.display = "none";
    }
});