function injectSidebar() {
    const user = JSON.parse(localStorage.getItem('currentUser')) || { name: 'Student', major: 'Biomedical Informatics' };
    
    const sidebarHTML = `
    <aside class="sidebar">
        <div class="sidebar-top">
            <div class="sidebar-user">
                <div class="avatar" id="side-avatar">
                    ${user.profilePicture ? `<img src="${user.profilePicture}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">` : user.name.charAt(0)}
                </div>
                <div class="user-info">
                    <h4>${user.name}</h4>
                    <p>${user.major}</p>
                </div>
            </div>

            <nav class="nav-links">
                <a href="dashboard.html" class="nav-item ${window.location.pathname.includes('dashboard') ? 'active' : ''}">
                    <span>📊</span> Dashboard
                </a>
                <a href="courses.html" class="nav-item ${window.location.pathname.includes('courses') ? 'active' : ''}">
                    <span>📚</span> Courses
                </a>
                <a href="assignments.html" class="nav-item ${window.location.pathname.includes('assignments') ? 'active' : ''}">
                    <span>📝</span> Assignments
                </a>
                <a href="profile.html" class="nav-item ${window.location.pathname.includes('profile') ? 'active' : ''}">
                    <span>👤</span> Student Info
                </a>
            </nav>
        </div>

        <div class="sidebar-footer">
            <button class="sidebar-btn" onclick="toggleDarkMode()">
                <span>🌙</span> Toggle Dark Mode
            </button>
            <button class="sidebar-btn" style="color: var(--danger)" onclick="logout()">
                <span>🚪</span> Logout
            </button>
        </div>
    </aside>
    `;

    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
    
    // تطبيق الوضع الليلي المحفوظ عند تحميل الصفحة
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }
}

// دالة تسجيل الخروج - تم تغيير الوجهة إلى signin.html
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'signin.html'; 
}

// دالة الوضع الليلي
function toggleDarkMode() {
    document.body.classList.toggle('dark');
    // حفظ التفضيلات في المتصفح
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

document.addEventListener('DOMContentLoaded', injectSidebar);