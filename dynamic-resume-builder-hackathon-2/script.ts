const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('Shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('Shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

form.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    // Get all form data
    const username = (document.getElementById('UserName') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const language = (document.getElementById('language') as HTMLTextAreaElement).value;
    const profilesummary = (document.getElementById('profilesummary') as HTMLTextAreaElement).value;
    const LinkedIn = (document.getElementById('LinkedIn') as HTMLInputElement).value;

    // Store resume data
    const resumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills,
        language,
        profilesummary,
        LinkedIn
    };

    localStorage.setItem(username, JSON.stringify(resumeData));

    // Generate resume HTML
    const resumeHTML = `
        <h2><b>${name}</b></h2>
        <h3>Personal Information</h3>
        <p><b>Email:</b><span contenteditable="true">${email}</span></p>
        <p><b>Phone:</b><span contenteditable="true">${phone}</span></p>
        <p><b>LinkedIn:</b><span contenteditable="true">${LinkedIn}</span></p>

        <h3>Profile Summary</h3>
        <p contenteditable="true">${profilesummary}</p>

        <h3>Education</h3>
        <p contenteditable="true">${education}</p>

        <h3>Experience</h3>
        <p contenteditable="true">${experience}</p>

        <h3>Skills</h3>
        <p contenteditable="true">${skills}</p>

        <h3>Languages</h3>
        <p contenteditable="true">${language}</p>
    `;

    resumeDisplayElement.innerHTML = resumeHTML;

    // Create the shareable link
    const shareableURL = `${window.location.href}?username=${encodeURIComponent(username)}`;
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});

// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});

// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);

            (document.getElementById('UserName') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;
            (document.getElementById('language') as HTMLTextAreaElement).value = resumeData.language;
            (document.getElementById('LinkedIn') as HTMLInputElement).value = resumeData.LinkedIn;
            (document.getElementById('profilesummary') as HTMLTextAreaElement).value = resumeData.profilesummary;
        }
    }
});
