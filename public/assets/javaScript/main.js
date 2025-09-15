document.addEventListener('DOMContentLoaded', function() {
    const profileElement = document.querySelector('.profile .arrow');
    const profileMenu = document.querySelector('.profile .profileMenu');
    
    if (profileElement && profileMenu) {
        profileElement.addEventListener('click', function(e) {
            e.stopPropagation();
            profileMenu.classList.toggle('show');
        });

        document.addEventListener('click', function(e) {
            if (!profileElement.contains(e.target) && !profileMenu.contains(e.target)) {
                profileMenu.classList.remove('show');
            }
        });
        
        function adjustMobileMenu() {
            if (window.innerWidth <= 768) {
                profileMenu.style.position = 'fixed';
                profileMenu.style.top = '80px';
                profileMenu.style.left = '10px';
                profileMenu.style.right = '10px';
                profileMenu.style.width = 'auto';
                profileMenu.style.maxHeight = '70vh';
                profileMenu.style.overflowY = 'auto';
            } else {
                profileMenu.style.position = 'absolute';
                profileMenu.style.top = '50px';
                profileMenu.style.right = '0';
                profileMenu.style.left = 'auto';
                profileMenu.style.width = 'auto';
                profileMenu.style.maxHeight = 'none';
                profileMenu.style.overflowY = 'visible';
            }
        }
        
        adjustMobileMenu();
        
        window.addEventListener('resize', adjustMobileMenu);
    }
});

function validateForm(event) {
    event.preventDefault();
    
    const emailInput = document.querySelector('input[name="feild1"]');
    const passwordInput = document.querySelector('input[name="feild2"]');
    
    if (!emailInput || !passwordInput) {
        console.error('لا يمكن العثور على حقول الإدخال');
        return false;
    }
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    let isValid = true;
    
    if (!email) {
        showError(emailInput, 'يرجى إدخال الإيميل');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError(emailInput, 'يرجى إدخال إيميل صحيح (مثال: user@domain.com)');
        isValid = false;
    } else {
        clearError(emailInput);
    }
    
    if (!password) {
        showError(passwordInput, 'يرجى إدخال كلمة المرور');
        isValid = false;
    } else if (!passwordRegex.test(password)) {
        showError(passwordInput, 'كلمة المرور يجب أن تحتوي على: 8 أحرف على الأقل، حرف كبير، حرف صغير، رقم، ورمز خاص (@$!%*?&)');
        isValid = false;
    } else {
        clearError(passwordInput);
    }
    
    if (isValid) {
        alert('تم تسجيل الدخول بنجاح! ✅');
    }
    
    return isValid;
}

function showError(input, message) {
    clearError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#d73700';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    errorDiv.style.padding = '5px';
    errorDiv.style.backgroundColor = '#ffe6e6';
    errorDiv.style.border = '1px solid #d73700';
    errorDiv.style.borderRadius = '4px';
    errorDiv.style.textAlign = 'right';
    errorDiv.style.direction = 'rtl';
    
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
    input.style.borderColor = '#d73700';
    input.style.boxShadow = '0 0 5px rgba(215, 55, 0, 0.3)';
}

function clearError(input) {
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    input.style.borderColor = '';
    input.style.boxShadow = '';
}

document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const emailField = form.querySelector('input[name="feild1"]');
        const passwordField = form.querySelector('input[name="feild2"]');
        
        if (emailField && passwordField) {
            form.addEventListener('submit', validateForm);
            
            emailField.addEventListener('blur', function() {
                if (this.value.trim()) {
                    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    if (!emailRegex.test(this.value.trim())) {
                        showError(this, 'تنسيق الإيميل غير صحيح');
                    } else {
                        clearError(this);
                    }
                }
            });
            
            passwordField.addEventListener('blur', function() {
                if (this.value) {
                    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                    if (!passwordRegex.test(this.value)) {
                        showError(this, 'كلمة المرور ضعيفة - يجب أن تحتوي على حرف كبير وصغير ورقم ورمز خاص');
                    } else {
                        clearError(this);
                    }
                }
            });
        }
    });
});
