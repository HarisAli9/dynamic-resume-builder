var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('Shareable-link-container');
var shareableLinkElement = document.getElementById('Shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Get all form data
    var username = document.getElementById('UserName').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    var language = document.getElementById('language').value;
    var profilesummary = document.getElementById('profilesummary').value;
    var LinkedIn = document.getElementById('LinkedIn').value;
    // Store resume data
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills,
        language: language,
        profilesummary: profilesummary,
        LinkedIn: LinkedIn
    };
    localStorage.setItem(username, JSON.stringify(resumeData));
    // Generate resume HTML
    var resumeHTML = "\n        <h2><b>".concat(name, "</b></h2>\n        <h3>Personal Information</h3>\n        <p><b>Email:</b><span contenteditable=\"true\">").concat(email, "</span></p>\n        <p><b>Phone:</b><span contenteditable=\"true\">").concat(phone, "</span></p>\n        <p><b>LinkedIn:</b><span contenteditable=\"true\">").concat(LinkedIn, "</span></p>\n\n        <h3>Profile Summary</h3>\n        <p contenteditable=\"true\">").concat(profilesummary, "</p>\n\n        <h3>Education</h3>\n        <p contenteditable=\"true\">").concat(education, "</p>\n\n        <h3>Experience</h3>\n        <p contenteditable=\"true\">").concat(experience, "</p>\n\n        <h3>Skills</h3>\n        <p contenteditable=\"true\">").concat(skills, "</p>\n\n        <h3>Languages</h3>\n        <p contenteditable=\"true\">").concat(language, "</p>\n    ");
    resumeDisplayElement.innerHTML = resumeHTML;
    // Create the shareable link
    var shareableURL = "".concat(window.location.href, "?username=").concat(encodeURIComponent(username));
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('UserName').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
            document.getElementById('language').value = resumeData.language;
            document.getElementById('LinkedIn').value = resumeData.LinkedIn;
            document.getElementById('profilesummary').value = resumeData.profilesummary;
        }
    }
});
