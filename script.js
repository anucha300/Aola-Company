// เพิ่มระบบจัดการ dropdown ที่ดีกว่า
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        let hoverTimeout;
        
        // เมื่อ hover เข้า dropdown
        dropdown.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            dropdownContent.style.display = 'block';
        });
        
        // เมื่อ hover ออกจาก dropdown
        dropdown.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                dropdownContent.style.display = 'none';
            }, 100); // หน่วงเวลา 100ms เพื่อให้เมาส์ย้ายได้
        });
        
        // เมื่อ hover เข้า dropdown-content
        dropdownContent.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
        });
        
        // เมื่อ hover ออกจาก dropdown-content
        dropdownContent.addEventListener('mouseleave', function() {
            dropdownContent.style.display = 'none';
        });
    });
});

// ฟังก์ชันสำหรับแสดงหน้าต่างๆ
function showPage(pageId) {
    // ซ่อนหน้าทั้งหมด
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // แสดงหน้าที่เลือก
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // เลื่อนขึ้นไปด้านบนของหน้า
    window.scrollTo(0, 0);
}

// ฟังก์ชันสำหรับ Navbar เมื่อเลื่อนหน้า
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// ฟังก์ชันสำหรับจัดการ Form การติดต่อ
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // ป้องกันการ submit แบบปกติ
            
            // เก็บข้อมูลจากฟอร์ม
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // ตรวจสอบข้อมูล
            if (validateForm(formData)) {
                // แสดงข้อความสำเร็จ
                showSuccessMessage();
                // รีเซ็ตฟอร์ม
                contactForm.reset();
            }
        });
    }
});

// ฟังก์ชันตรวจสอบความถูกต้องของฟอร์ม
function validateForm(data) {
    // ตรวจสอบว่าช่องที่จำเป็นไม่ว่าง
    if (!data.name.trim()) {
        showErrorMessage('กรุณากรอกชื่อ-นามสกุล');
        return false;
    }
    
    if (!data.email.trim()) {
        showErrorMessage('กรุณากรอกอีเมล');
        return false;
    }
    
    // ตรวจสอบรูปแบบอีเมล
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showErrorMessage('รูปแบบอีเมลไม่ถูกต้อง');
        return false;
    }
    
    if (!data.subject.trim()) {
        showErrorMessage('กรุณากรอกหัวข้อ');
        return false;
    }
    
    if (!data.message.trim()) {
        showErrorMessage('กรุณากรอกข้อความ');
        return false;
    }
    
    return true;
}

// ฟังก์ชันแสดงข้อความแจ้งเตือน
function showErrorMessage(message) {
    // สร้าง element สำหรับแสดงข้อความ error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert error-alert';
    errorDiv.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: inherit; font-size: 1.2rem; cursor: pointer; margin-left: 1rem;">&times;</button>
    `;
    
    // เพิ่ม CSS สำหรับ alert
    errorDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: #ff4757;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(errorDiv);
    
    // ลบข้อความหลัง 5 วินาที
    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 5000);
}

// ฟังก์ชันแสดงข้อความสำเร็จ
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert success-alert';
    successDiv.innerHTML = `
        <span>ส่งข้อความเรียบร้อยแล้ว! เราจะติดต่อกลับในเวลาอันสั้น</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: inherit; font-size: 1.2rem; cursor: pointer; margin-left: 1rem;">&times;</button>
    `;
    
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: #2ed573;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    // ลบข้อความหลัง 5 วินาที
    setTimeout(() => {
        if (successDiv.parentElement) {
            successDiv.remove();
        }
    }, 5000);
}

// เพิ่ม CSS Animation สำหรับ Alert
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    /* Smooth transitions สำหรับ cards */
    .content-card, .timeline-item, .service-item {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Loading animation สำหรับรูปภาพ */
    .card-image {
        position: relative;
        overflow: hidden;
    }
    
    .card-image::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
        transform: rotate(45deg);
        animation: shimmer 2s infinite;
    }
    
    @keyframes shimmer {
        0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
        }
        100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
        }
    }
`;
document.head.appendChild(style);

// ฟังก์ชันสำหรับ Mobile Menu (ถ้าต้องการเพิ่มในภายหลัง)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// ฟังก์ชันสำหรับ Smooth Scrolling
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// เพิ่ม Event Listeners สำหรับการคลิกที่ลิงก์ภายใน
document.addEventListener('DOMContentLoaded', function() {
    // เพิ่ม smooth scroll สำหรับลิงก์ภายใน
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScrollTo(targetId);
        });
    });
    
    // เพิ่ม intersection observer สำหรับ animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // สำเร็จแล้วจะ observe elements ที่ต้องการ animate
    const animateElements = document.querySelectorAll('.content-card, .timeline-item, .service-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// ฟังก์ชันสำหรับจัดการ Image Loading
function handleImageLoad() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            // แสดงภาพ placeholder หากโหลดไม่สำเร็จ
            this.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)';
            this.style.color = 'white';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.innerHTML = 'รูปภาพ';
        });
    });
}

// เรียกใช้ฟังก์ชันเมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', handleImageLoad);

// Console log สำหรับ developers
console.log('🚀 Company Profile Website loaded successfully!');
console.log('📝 ดูคอมเมนต์ใน HTML เพื่อดูตำแหน่งที่ต้องกรอกข้อมูล');
console.log('🎨 แก้ไข styles.css เพื่อปรับแต่งสีและรูปแบบ');
console.log('⚡ แก้ไข script.js เพื่อเพิ่มฟีเจอร์เพิ่มเติม');