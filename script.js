// DOM Elements
const themeSwitch = document.getElementById('theme-switch');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');
const caseGrid = document.querySelector('.case-grid');
const categorySelect = document.getElementById('category-select');
const caseStudyInput = document.getElementById('case-study-input');
const summaryOutput = document.getElementById('summary-output');
const generateBtn = document.getElementById('generate-btn');
const summaryLength = document.getElementById('summary-length');
const lengthValue = document.getElementById('length-value');
const downloadTxtBtn = document.getElementById('download-txt');
const downloadPdfBtn = document.getElementById('download-pdf');
const saveSummaryBtn = document.getElementById('save-summary');
const accordionItems = document.querySelectorAll('.accordion-item');
const progressFill = document.querySelector('.progress-fill');
const progressText = document.querySelector('.progress-text');
const savedSummariesGrid = document.querySelector('.saved-summaries-grid');

// Sample case study data
const caseStudies = [
    {
        id: 1,
        title: "Digital Transformation in Retail Banking",
        excerpt: "How a major bank improved customer experience through digital transformation.",
        category: "business",
        readTime: "5 min",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 2,
        title: "AI-Powered Healthcare Diagnostics",
        excerpt: "Case study on implementing AI for faster and more accurate medical diagnoses.",
        category: "healthcare",
        readTime: "7 min",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 3,
        title: "EdTech Platform Scaling Challenges",
        excerpt: "How an education startup overcame scaling challenges during rapid growth.",
        category: "education",
        readTime: "4 min",
        image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 4,
        title: "Blockchain for Supply Chain Transparency",
        excerpt: "Implementing blockchain technology to enhance supply chain visibility.",
        category: "tech",
        readTime: "6 min",
        image: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 5,
        title: "Sustainable Packaging Solutions",
        excerpt: "How a CPG company reduced environmental impact through innovative packaging.",
        category: "business",
        readTime: "3 min",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 6,
        title: "Cloud Migration for Enterprise",
        excerpt: "Case study on migrating legacy systems to cloud infrastructure.",
        category: "tech",
        readTime: "8 min",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
];

// Saved summaries
let savedSummaries = JSON.parse(localStorage.getItem('savedSummaries')) || [];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Set theme based on localStorage or preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeSwitch.checked = currentTheme === 'dark';
    
    // Load case studies
    renderCaseStudies(caseStudies);
    
    // Load saved summaries if any
    if (savedSummaries.length > 0) {
        renderSavedSummaries();
    }
    
    // Set summary length label
    updateLengthLabel();
});

// Theme switcher
themeSwitch.addEventListener('change', function() {
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Navigation
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links and sections
        navLinks.forEach(l => l.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active-section'));
        
        // Add active class to clicked link and corresponding section
        this.classList.add('active');
        const sectionId = this.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active-section');
    });
});

// Render case studies
function renderCaseStudies(studies) {
    caseGrid.innerHTML = '';
    
    studies.forEach(study => {
        const card = document.createElement('div');
        card.className = 'case-card';
        
        card.innerHTML = `
            <div class="case-image" style="background-image: url('${study.image}')"></div>
            <div class="case-content">
                <h3>${study.title}</h3>
                <p>${study.excerpt}</p>
                <div class="case-meta">
                    <span class="category-tag">${study.category.charAt(0).toUpperCase() + study.category.slice(1)}</span>
                    <span class="read-time">${study.readTime} read</span>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            // In a real app, this would open the full case study
            alert(`Opening case study: ${study.title}`);
        });
        
        caseGrid.appendChild(card);
    });
}

// Filter case studies by category
categorySelect.addEventListener('change', function() {
    const category = this.value;
    
    if (category === 'all') {
        renderCaseStudies(caseStudies);
    } else {
        const filtered = caseStudies.filter(study => study.category === category);
        renderCaseStudies(filtered);
    }
});

// Summary generator functionality
generateBtn.addEventListener('click', generateSummary);

function generateSummary() {
    const text = caseStudyInput.value.trim();
    
    if (!text) {
        alert('Please enter some text to summarize');
        return;
    }
    
    // Show loading state
    summaryOutput.innerHTML = '<p class="placeholder">Generating summary... <i class="fas fa-spinner fa-spin"></i></p>';
    
    // Simulate API call with timeout
    setTimeout(() => {
        // This is a mock summary - in a real app, you would call an NLP API
        const mockSummary = generateMockSummary(text);
        displaySummary(mockSummary);
        
        // Also update the breakdown sections
        updateBreakdownSections(mockSummary);
    }, 1500);
}

function generateMockSummary(text) {
    // This is a very simple mock summarizer
    // In a real app, you would use an NLP library or API
    
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const length = parseInt(summaryLength.value);
    let summaryLengthInSentences;
    
    // Determine how many sentences to include based on slider
    if (length <= 3) {
        summaryLengthInSentences = Math.max(1, Math.floor(sentences.length * 0.2));
    } else if (length <= 7) {
        summaryLengthInSentences = Math.max(1, Math.floor(sentences.length * 0.4));
    } else {
        summaryLengthInSentences = Math.max(1, Math.floor(sentences.length * 0.6));
    }
    
    // Select some key sentences
    const summarySentences = [];
    const step = Math.max(1, Math.floor(sentences.length / summaryLengthInSentences));
    
    for (let i = 0; i < sentences.length && summarySentences.length < summaryLengthInSentences; i += step) {
        summarySentences.push(sentences[i].trim() + '.');
    }
    
    // Add some mock highlights
    const words = text.split(/\s+/);
    const importantWords = words.filter(word => word.length > 5 && Math.random() > 0.7);
    
    return {
        summary: summarySentences.join(' '),
        highlights: [...new Set(importantWords)].slice(0, 5)
    };
}

function displaySummary(summaryData) {
    let html = '';
    
    // Split summary into paragraphs
    const paragraphs = summaryData.summary.split(/\n\n+/);
    
    paragraphs.forEach(para => {
        if (para.trim()) {
            // Highlight important words
            let highlightedPara = para;
            summaryData.highlights.forEach(word => {
                const regex = new RegExp(`\\b${word}\\b`, 'gi');
                highlightedPara = highlightedPara.replace(regex, `<span class="highlight">${word}</span>`);
            });
            
            html += `<p>${highlightedPara}</p>`;
        }
    });
    
    // Add key points if we have them
    if (summaryData.highlights.length > 0) {
        html += `<div class="key-points"><h4>Key Points:</h4><ul>`;
        summaryData.highlights.forEach(word => {
            html += `<li>${word}</li>`;
        });
        html += `</ul></div>`;
    }
    
    summaryOutput.innerHTML = html;
}

function updateBreakdownSections(summaryData) {
    // This is a mock implementation - in a real app you would parse the text properly
    
    // Problem statement - first part of summary
    const problemContent = document.getElementById('problem-content');
    problemContent.innerHTML = `<p>${summaryData.summary.split('.')[0]}.</p>`;
    
    // Solution approach - middle part
    const solutionContent = document.getElementById('solution-content');
    const sentences = summaryData.summary.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const middleStart = Math.floor(sentences.length / 3);
    const middleEnd = Math.floor(sentences.length * 2 / 3);
    solutionContent.innerHTML = `<p>${sentences.slice(middleStart, middleEnd).join('. ')}.</p>`;
    
    // Results - last part
    const resultsContent = document.getElementById('results-content');
    resultsContent.innerHTML = `<p>${sentences.slice(-3).join('. ')}.</p>`;
    
    // Reset progress
    updateProgress(0);
    
    // Set up progress tracking for the accordion
    setupProgressTracking();
}

// Update summary length label
summaryLength.addEventListener('input', updateLengthLabel);

function updateLengthLabel() {
    const length = parseInt(summaryLength.value);
    let label;
    
    if (length <= 3) {
        label = 'Short';
    } else if (length <= 7) {
        label = 'Medium';
    } else {
        label = 'Long';
    }
    
    lengthValue.textContent = label;
}

// Download functionality
downloadTxtBtn.addEventListener('click', function() {
    const text = summaryOutput.innerText;
    
    if (!text || text.includes('Your generated summary will appear here')) {
        alert('No summary to download');
        return;
    }
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'case-study-summary.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

downloadPdfBtn.addEventListener('click', function() {
    const text = summaryOutput.innerText;
    
    if (!text || text.includes('Your generated summary will appear here')) {
        alert('No summary to download');
        return;
    }
    
    // In a real app, you would use a proper PDF generation library
    alert('PDF generation would happen here. In this demo, we\'re using the text download instead.');
    downloadTxtBtn.click();
});

// Save summary
saveSummaryBtn.addEventListener('click', function() {
    const text = summaryOutput.innerText;
    const inputText = caseStudyInput.value;
    
    if (!text || text.includes('Your generated summary will appear here')) {
        alert('No summary to save');
        return;
    }
    
    const title = inputText.split('\n')[0] || 'Untitled Summary';
    const summary = {
        id: Date.now(),
        title: title.length > 50 ? title.substring(0, 50) + '...' : title,
        content: text,
        date: new Date().toLocaleDateString()
    };
    
    savedSummaries.unshift(summary);
    localStorage.setItem('savedSummaries', JSON.stringify(savedSummaries));
    
    renderSavedSummaries();
    alert('Summary saved!');
});

// Render saved summaries
function renderSavedSummaries() {
    if (savedSummaries.length === 0) {
        savedSummariesGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bookmark"></i>
                <p>You haven't saved any summaries yet.</p>
            </div>
        `;
        return;
    }
    
    savedSummariesGrid.innerHTML = '';
    
    savedSummaries.forEach(summary => {
        const card = document.createElement('div');
        card.className = 'case-card';
        
        card.innerHTML = `
            <div class="case-content">
                <h3>${summary.title}</h3>
                <p class="saved-date">Saved on ${summary.date}</p>
                <p class="saved-excerpt">${summary.content.substring(0, 100)}...</p>
                <div class="case-meta">
                    <button class="view-summary">View</button>
                    <button class="delete-summary">Delete</button>
                </div>
            </div>
        `;
        
        card.querySelector('.view-summary').addEventListener('click', () => {
            viewSavedSummary(summary);
        });
        
        card.querySelector('.delete-summary').addEventListener('click', () => {
            deleteSavedSummary(summary.id);
        });
        
        savedSummariesGrid.appendChild(card);
    });
}

function viewSavedSummary(summary) {
    // Switch to generator tab
    document.querySelector('[data-section="generator"]').click();
    
    // Display the summary
    summaryOutput.innerHTML = `<p>${summary.content.replace(/\n/g, '<br>')}</p>`;
    
    // Scroll to output
    summaryOutput.scrollIntoView({ behavior: 'smooth' });
}

function deleteSavedSummary(id) {
    if (confirm('Are you sure you want to delete this summary?')) {
        savedSummaries = savedSummaries.filter(summary => summary.id !== id);
        localStorage.setItem('savedSummaries', JSON.stringify(savedSummaries));
        renderSavedSummaries();
    }
}

// Accordion functionality
accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// Progress tracking
function setupProgressTracking() {
    const contents = document.querySelectorAll('.accordion-content');
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', updateProgressAfterClick);
    });
    
    function updateProgressAfterClick() {
        const totalItems = accordionItems.length;
        let completed = 0;
        
        accordionItems.forEach(item => {
            if (item.classList.contains('active')) {
                completed++;
            }
        });
        
        const progress = (completed / totalItems) * 100;
        updateProgress(progress);
    }
}

function updateProgress(percent) {
    progressFill.style.width = `${percent}%`;
    progressText.textContent = `${Math.round(percent)}% read`;
}
