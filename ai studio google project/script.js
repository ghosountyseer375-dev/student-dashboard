// 1. التحقق من الهوية
function checkAuth() {
    const user = sessionStorage.getItem('currentUser');
    if (!user && !window.location.pathname.includes('signin.html') && !window.location.pathname.includes('signup.html')) {
        window.location.href = 'signin.html';
        return null;
    }
    return JSON.parse(user);
}

// 2. تسجيل الخروج
function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'signin.html';
}

// 3. الوضع الليلي
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// 4. رسم السايد بار (Placeholder)
function renderSidebar() {
    const container = document.getElementById('sidebar-placeholder');
    if (!container) return;

    const path = window.location.pathname.split("/").pop();
    
    container.innerHTML = `
        <nav id="sidebar">
            <h3 style="color: var(--primary-color); margin-bottom: 1rem;">Student Portal</h3>
            <ul class="nav-list">
                <li class="nav-item"><a href="dashboard.html" class="nav-link ${path === 'dashboard.html' ? 'active' : ''}">📊 <span>Dashboard</span></a></li>
                <li class="nav-item"><a href="courses.html" class="nav-link ${path === 'courses.html' ? 'active' : ''}">📚 <span>Courses</span></a></li>
                <li class="nav-item"><a href="assignments.html" class="nav-link ${path === 'assignments.html' ? 'active' : ''}">📝 <span>Assignments</span></a></li>
                <li class="nav-item"><a href="profile.html" class="nav-link ${path === 'profile.html' ? 'active' : ''}">👤 <span>Student Info</span></a></li>
                <li class="nav-item"><a href="profile-edit.html" class="nav-link ${path === 'profile-edit.html' ? 'active' : ''}">⚙️ <span>Edit Profile</span></a></li>
                <li class="nav-item mt-2"><button onclick="toggleTheme()" class="btn btn-primary" style="width:100%">🌓 Mode</button></li>
                <li class="nav-item"><button onclick="logout()" class="btn btn-danger" style="width:100%; margin-top:10px">Logout</button></li>
            </ul>
        </nav>
    `;
}

// التشغيل عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    renderSidebar();
    initTheme();
});

// دالة جلب البيانات الموحدة
function getUserData(email) {
    const data = localStorage.getItem(`data_${email}`);
    return data ? JSON.parse(data) : { courses: [], assignments: [] };
}