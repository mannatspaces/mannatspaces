// Default Admin Password
const ADMIN_PASSWORD = "MannatSpaces@123";

// Format phone number with country code
function formatPhoneNumber(phone) {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        cleaned = '91' + cleaned;
    }
    if (cleaned.startsWith('91') && cleaned.length === 12) {
        return '+91 ' + cleaned.slice(2, 7) + ' ' + cleaned.slice(7);
    }
    return '+' + cleaned;
}

// Validate phone number
function isValidPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 12;
}

// Generate professional WhatsApp message
function generateWhatsAppMessage(property) {
    const priceFormatted = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(property.totalPrice);

    const message = `नमस्ते! 👋

मुझे आपकी यह संपत्ति पसंद आई:

📍 *${property.name}*

🏘️ *विवरण:*
• 📌 स्थान: ${property.location}
• 🏗️ प्रकार: ${property.type}
• 📐 क्षेत्र: ${property.area} sq ft
• 💵 Rate: ₹${property.perSquareRate}/sq ft
• 💰 कुल मूल्य: ${priceFormatted}

📝 विवरण: ${property.description.substring(0, 100)}...

क्या आप कृपया इसके बारे में अधिक जानकारी प्रदान कर सकते हैं?

धन्यवाद! 🙏

-- MannatSpaces द्वारा
Har Mannat Ka Perfect Address ✨`;

    return message;
}

// Mobile Menu Handler
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navButtons = document.getElementById('navButtons');
    
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function() {
            hamburgerBtn.classList.toggle('active');
            navButtons.classList.toggle('active');
        });
        
        const navBtns = navButtons.querySelectorAll('.btn-nav');
        navBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                hamburgerBtn.classList.remove('active');
                navButtons.classList.remove('active');
            });
        });
    }
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if(hamburgerBtn) hamburgerBtn.classList.remove('active');
            if(navButtons) navButtons.classList.remove('active');
        }
    });
});

// Predefined Indore localities
const INDORE_LOCALITIES = [
    "Vijay Nagar", "Palasia", "MG Road", "AB Road", "Rau", "Super Corridor",
    "Bhawarkua", "Rajendra Nagar", "RNT Marg", "Scheme 54", "Scheme 74",
    "Sanwer Road", "Nipania", "Malharganj", "Khajrana", "Chandan Nagar",
    "Nehru Nagar", "Indraprastha", "Talawali Chanda", "Dewas Naka",
    "Gayatri Nagar", "Navlakha"
];

function getAvailableLocalities() {
    const uniqueLocalities = new Set(INDORE_LOCALITIES);
    properties.forEach(prop => {
        if (prop.locality) uniqueLocalities.add(prop.locality);
    });
    return Array.from(uniqueLocalities).sort();
}

function updateLocalityDropdown() {
    const localityFilter = document.getElementById('localityFilter');
    const propertyLocality = document.getElementById('propertyLocality');
    const editPropertyLocality = document.getElementById('editPropertyLocality');
    
    const availableLocalities = getAvailableLocalities();
    
    [localityFilter, propertyLocality, editPropertyLocality].forEach(dropdown => {
        if (!dropdown) return;
        
        const currentValue = dropdown.value;
        const isFilterDropdown = dropdown.id === 'localityFilter';
        
        dropdown.innerHTML = isFilterDropdown 
            ? '<option value="">All Localities (Indore)</option>'
            : '<option value="">Select Locality (Indore)</option>';
        
        availableLocalities.forEach(locality => {
            const option = document.createElement('option');
            option.value = locality;
            option.textContent = locality;
            dropdown.appendChild(option);
        });
        
        dropdown.value = currentValue;
    });
}

// Calculate total price from per-square rate
function calculateTotalPrice() {
    const area = parseFloat(document.getElementById('propertyArea').value) || 0;
    const rate = parseFloat(document.getElementById('propertyPerSquareRate').value) || 0;
    const total = area * rate;
    
    const totalField = document.getElementById('propertyTotalPrice');
    if (totalField) {
        totalField.value = total;
    }
    
    const displayField = document.getElementById('totalPriceDisplay');
    if (displayField && total > 0) {
        const formatted = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0
        }).format(total);
        displayField.textContent = `Total: ${formatted}`;
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadPropertiesFromStorage();
    updateLocalityDropdown();
    displayPublicProperties();
    setupEventListeners();
    
    const propertyImagesInput = document.getElementById('propertyImages');
    if (propertyImagesInput) {
        propertyImagesInput.addEventListener('change', function(e) {
            previewImages(e.target.files, 'imagePreview');
        });
    }
    
    const editPropertyImagesInput = document.getElementById('editPropertyImages');
    if (editPropertyImagesInput) {
        editPropertyImagesInput.addEventListener('change', function(e) {
            previewImages(e.target.files, 'editImagePreview');
        });
    }

    // Add event listeners for price calculation
    const areaInput = document.getElementById('propertyArea');
    const rateInput = document.getElementById('propertyPerSquareRate');
    if (areaInput) areaInput.addEventListener('input', calculateTotalPrice);
    if (rateInput) rateInput.addEventListener('input', calculateTotalPrice);
});

function previewImages(files, previewElementId) {
    const preview = document.getElementById(previewElementId);
    preview.innerHTML = '';
    
    if (files.length === 0) return;
    
    const fileCount = Math.min(files.length, 15);
    for (let i = 0; i < fileCount; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            preview.appendChild(img);
        };
        
        reader.readAsDataURL(file);
    }
}

function setupEventListeners() {
    document.getElementById('publicViewBtn').addEventListener('click', switchToPublic);
    document.getElementById('adminLoginBtn').addEventListener('click', switchToAdmin);
}

function switchToPublic() {
    document.getElementById('publicView').classList.add('active');
    document.getElementById('adminView').classList.remove('active');
    document.getElementById('adminLogin').style.display = 'block';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('adminPassword').value = '';
}

function switchToAdmin() {
    document.getElementById('publicView').classList.remove('active');
    document.getElementById('adminView').classList.add('active');
    document.getElementById('adminLogin').style.display = 'block';
    document.getElementById('adminDashboard').style.display = 'none';
}

function adminLogin() {
    const password = document.getElementById('adminPassword').value;
    
    if (password === ADMIN_PASSWORD) {
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        loadAdminProperties();
        clearAdminForm();
    } else {
        alert('❌ गलत पासवर्ड! कृपया सही पासवर्ड डालें।');
        document.getElementById('adminPassword').value = '';
    }
}

function adminLogout() {
    if (confirm('क्या आप लॉगआउट करना चाहते हैं?')) {
        document.getElementById('adminLogin').style.display = 'block';
        document.getElementById('adminDashboard').style.display = 'none';
        document.getElementById('adminPassword').value = '';
    }
}

// Properties Storage
let properties = [];

function loadPropertiesFromStorage() {
    const stored = localStorage.getItem('mannatspaces_properties');
    if (stored) {
        try {
            properties = JSON.parse(stored);
        } catch(e) {
            console.error('Error loading properties:', e);
            properties = [];
        }
    }
}

function savePropertiesToStorage() {
    localStorage.setItem('mannatspaces_properties', JSON.stringify(properties));
    // Sync across tabs/windows
    window.dispatchEvent(new Event('propertyUpdate'));
}

// Listen for property updates from other tabs
window.addEventListener('storage', function(e) {
    if (e.key === 'mannatspaces_properties') {
        loadPropertiesFromStorage();
        displayPublicProperties();
        loadAdminProperties();
    }
});

// Add Property (Admin)
function addProperty() {
    const name = document.getElementById('propertyName').value.trim();
    const locality = document.getElementById('propertyLocality').value;
    const location = document.getElementById('propertyLocation').value.trim();
    const type = document.getElementById('propertyType').value;
    const area = document.getElementById('propertyArea').value;
    const perSquareRate = document.getElementById('propertyPerSquareRate').value;
    const totalPrice = document.getElementById('propertyTotalPrice').value;
    const description = document.getElementById('propertyDescription').value.trim();
    const phone = document.getElementById('propertyPhone').value.trim();
    const imageFiles = document.getElementById('propertyImages').files;
    const videoFiles = document.getElementById('propertyVideo').files;

    // Validation
    if (!name || !locality || !location || !type || !area || !perSquareRate || !description || !phone) {
        alert('❌ कृपया सभी आवश्यक fields भरें। (Location अनिवार्य है!)');
        return;
    }

    if (!isValidPhoneNumber(phone)) {
        alert('❌ कृपया सही फोन नंबर प्रवेश करें।');
        return;
    }

    if (imageFiles.length > 15) {
        alert('❌ अधिकतम 15 images upload कर सकते हैं।');
        return;
    }

    const cleanPhone = phone.replace(/\D/g, '');

    // Read images as base64 (optional now)
    let imagesLoaded = 0;
    const images = [];
    let videoData = null;

    // Handle video upload
    if (videoFiles.length > 0) {
        const videoReader = new FileReader();
        videoReader.onload = function(e) {
            videoData = e.target.result;
            processProperty();
        };
        videoReader.readAsDataURL(videoFiles[0]);
    } else {
        processProperty();
    }

    function processProperty() {
        if (imageFiles.length === 0) {
            // Images are optional now
            createAndSaveProperty(images, videoData);
        } else {
            Array.from(imageFiles).forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    images[index] = e.target.result;
                    imagesLoaded++;

                    if (imagesLoaded === imageFiles.length) {
                        createAndSaveProperty(images, videoData);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    }

    function createAndSaveProperty(images, videoData) {
        const property = {
            id: Date.now(),
            name,
            locality,
            location,
            type,
            area: parseInt(area),
            perSquareRate: parseFloat(perSquareRate),
            totalPrice: parseFloat(totalPrice),
            description,
            phone: cleanPhone,
            images: images.length > 0 ? images : ['default'],
            image: images.length > 0 ? images[0] : 'default',
            video: videoData || null
        };

        properties.push(property);
        savePropertiesToStorage();
        updateLocalityDropdown();
        clearAdminForm();
        loadAdminProperties();
        displayPublicProperties();
        alert('✅ Property सफलतापूर्वक जोड़ी गई!');
    }
}

// Edit Property
function editProperty(id) {
    const property = properties.find(p => p.id === id);
    if (!property) return;

    document.getElementById('editPropertyId').value = id;
    document.getElementById('editPropertyName').value = property.name;
    document.getElementById('editPropertyLocality').value = property.locality || '';
    document.getElementById('editPropertyLocation').value = property.location || '';
    document.getElementById('editPropertyType').value = property.type;
    document.getElementById('editPropertyArea').value = property.area;
    document.getElementById('editPropertyPerSquareRate').value = property.perSquareRate;
    document.getElementById('editPropertyTotalPrice').value = property.totalPrice;
    document.getElementById('editPropertyDescription').value = property.description;
    document.getElementById('editPropertyPhone').value = property.phone;
    document.getElementById('editPropertyMapUrl').value = property.mapUrl || '';

    if (property.images && property.images.length > 0 && property.images[0] !== 'default') {
        const preview = document.getElementById('editImagePreview');
        preview.innerHTML = '<p style="grid-column: 1/-1; color: #7f8c8d; font-size: 0.9rem;">📷 ' + property.images.length + ' मौजूदा फोटो</p>';
    }

    document.getElementById('editModal').classList.add('show');
}

// Save Edit Property
function saveEditProperty() {
    const id = parseInt(document.getElementById('editPropertyId').value);
    const name = document.getElementById('editPropertyName').value.trim();
    const locality = document.getElementById('editPropertyLocality').value;
    const location = document.getElementById('editPropertyLocation').value.trim();
    const type = document.getElementById('editPropertyType').value;
    const area = document.getElementById('editPropertyArea').value;
    const perSquareRate = document.getElementById('editPropertyPerSquareRate').value;
    const totalPrice = document.getElementById('editPropertyTotalPrice').value;
    const description = document.getElementById('editPropertyDescription').value.trim();
    const phone = document.getElementById('editPropertyPhone').value.trim();
    const imageFiles = document.getElementById('editPropertyImages').files;
    const videoFiles = document.getElementById('editPropertyVideo').files;

    if (!name || !locality || !location || !type || !area || !perSquareRate || !description || !phone) {
        alert('❌ कृपया सभी आवश्यक fields भरें।');
        return;
    }

    if (!isValidPhoneNumber(phone)) {
        alert('❌ कृपया सही फोन नंबर प्रवेश करें।');
        return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    const propertyIndex = properties.findIndex(p => p.id === id);
    
    if (propertyIndex !== -1) {
        let imagesLoaded = 0;
        const images = [];
        let videoData = null;

        if (videoFiles.length > 0) {
            const videoReader = new FileReader();
            videoReader.onload = function(e) {
                videoData = e.target.result;
                processEditProperty();
            };
            videoReader.readAsDataURL(videoFiles[0]);
        } else {
            processEditProperty();
        }

        function processEditProperty() {
            if (imageFiles.length === 0) {
                updateProperty(properties[propertyIndex].images, videoData || properties[propertyIndex].video);
            } else {
                Array.from(imageFiles).forEach((file, index) => {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        images[index] = e.target.result;
                        imagesLoaded++;

                        if (imagesLoaded === imageFiles.length) {
                            updateProperty(images, videoData);
                        }
                    };
                    reader.readAsDataURL(file);
                });
            }
        }

        function updateProperty(imgs, vid) {
            properties[propertyIndex] = {
                id,
                name,
                locality,
                location,
                type,
                area: parseInt(area),
                perSquareRate: parseFloat(perSquareRate),
                totalPrice: parseFloat(totalPrice),
                description,
                phone: cleanPhone,
                images: imgs.length > 0 ? imgs : ['default'],
                image: imgs.length > 0 ? imgs[0] : 'default',
                video: vid || null
            };

            savePropertiesToStorage();
            updateLocalityDropdown();
            loadAdminProperties();
            displayPublicProperties();
            closeEditModal();
            alert('✅ Property सफलतापूर्वक अपडेट की गई!');
        }
    }
}

// Delete Property
function deleteProperty(id) {
    if (confirm('क्या आप इस Property को हटाना चाहते हैं?')) {
        properties = properties.filter(p => p.id !== id);
        savePropertiesToStorage();
        updateLocalityDropdown();
        loadAdminProperties();
        displayPublicProperties();
        alert('✅ Property सफलतापूर्वक हटाई गई!');
    }
}

function clearAdminForm() {
    document.getElementById('propertyName').value = '';
    document.getElementById('propertyLocality').value = '';
    document.getElementById('propertyLocation').value = '';
    document.getElementById('propertyType').value = '';
    document.getElementById('propertyArea').value = '';
    document.getElementById('propertyPerSquareRate').value = '';
    document.getElementById('propertyTotalPrice').value = '';
    document.getElementById('propertyDescription').value = '';
    document.getElementById('propertyPhone').value = '';
    document.getElementById('propertyImages').value = '';
    document.getElementById('propertyMapUrl').value = '';
    document.getElementById('propertyVideo').value = '';
    document.getElementById('imagePreview').innerHTML = '';
    document.getElementById('totalPriceDisplay').textContent = '';
}

// Display Public Properties
function displayPublicProperties() {
    const grid = document.getElementById('propertiesGrid');
    const noProperties = document.getElementById('noProperties');

    grid.innerHTML = '';

    if (properties.length === 0) {
        grid.style.display = 'none';
        noProperties.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    noProperties.style.display = 'none';

    properties.forEach(property => {
        const card = createPropertyCard(property);
        grid.appendChild(card);
    });
}

// Create Property Card
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.onclick = () => showPropertyDetails(property);

    const imageUrl = property.image && property.image !== 'default' ? property.image : null;
    const priceFormatted = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(property.totalPrice);

    card.innerHTML = `
        <div class="property-image">
            ${imageUrl ? `<img src="${imageUrl}" alt="${property.name}">` : '🏢'}
        </div>
        <div class="property-content">
            <span class="property-type">${property.type}</span>
            <h3 class="property-name">${property.name}</h3>
            <p class="property-location">📍 ${property.locality || ''}${property.location ? ', ' + property.location : ''}</p>
            <div class="property-info">
                <div class="info-item">
                    <div class="info-label">Area</div>
                    <div class="info-value">${property.area} sq ft</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Rate</div>
                    <div class="info-value">₹${property.perSquareRate}/sq ft</div>
                </div>
            </div>
            <div class="property-price">${priceFormatted}</div>
            <div class="property-actions">
                <button class="btn-view" onclick="event.stopPropagation(); showPropertyDetails(this.closest('.property-card').__property)">View Details</button>
                <a href="https://wa.me/${property.phone}?text=${encodeURIComponent(generateWhatsAppMessage(property))}" target="_blank" class="btn-whatsapp-chat" onclick="event.stopPropagation()">💬 Chat</a>
                <a href="tel:${property.phone}" class="btn-whatsapp-call" onclick="event.stopPropagation()">📞 Call</a>
            </div>
        </div>
    `;

    card.__property = property;
    return card;
}

// Show Property Details
function showPropertyDetails(property) {
    const modal = document.getElementById('propertyModal');
    const modalBody = document.getElementById('modalBody');
    
    const imageUrl = property.image && property.image !== 'default' ? property.image : null;
    const priceFormatted = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(property.totalPrice);

    let galleryHTML = ``;
    if (property.images && property.images.length > 1 && property.images[0] !== 'default') {
        galleryHTML = `<div class="photo-gallery">`;
        property.images.forEach((img, index) => {
            if (img !== 'default') {
                galleryHTML += `<img src="${img}" alt="Property photo ${index + 1}" class="gallery-thumbnail" onclick="document.getElementById('mainPropertyImage').src='${img}'">`;
            }
        });
        galleryHTML += `</div>`;
    }

    let mapHTML = ``;
    if (property.location) {
        const mapQuery = encodeURIComponent(property.location + ', Indore, India');
        mapHTML = `<div class="property-map" style="margin: 1.5rem 0;">
            <h4>📍 Location Map</h4>
            <iframe width="100%" height="300" style="border: none; border-radius: 8px;" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBu-916DwE6df7be8j-NLrQBBBVDgO4Ojw&q=${mapQuery}" allowfullscreen="" loading="lazy"></iframe>
        </div>`;
    }

    let videoHTML = ``;
    if (property.video) {
        videoHTML = `<div class="property-videos" style="margin: 1.5rem 0;">
            <h4>🎥 Video</h4>
            <video width="100%" height="300" controls style="border-radius: 8px;">
                <source src="${property.video}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>`;
    }

    const imageCount = (property.images && property.images.filter(i => i !== 'default').length) || 0;

    modalBody.innerHTML = `
        <h2>${property.name}</h2>
        <div class="property-image" id="mainPropertyImage-container">
            ${imageUrl ? `<img src="${imageUrl}" id="mainPropertyImage" alt="${property.name}" style="cursor: pointer;">` : '🏢'}
        </div>
        ${galleryHTML}
        <span class="property-type">${property.type}</span>
        ${imageCount > 0 ? `<div style="color: #7f8c8d; font-size: 0.85rem; margin: 0.5rem 0;">📷 ${imageCount} फोटो</div>` : ''}
        <div class="property-price">${priceFormatted}</div>
        ${mapHTML}
        ${videoHTML}
        <div class="property-details">
            <p><label>Location:</label><br>📍 ${property.location}</p>
            <p><label>Area:</label><br>📐 ${property.area} sq ft</p>
            <p><label>Per Square Rate:</label><br>💵 ₹${property.perSquareRate}/sq ft</p>
            <p><label>Description:</label><br>${property.description}</p>
        </div>
        <div class="whatsapp-contact-section">
            <h4>📱 Contact Agent</h4>
            <div class="whatsapp-buttons">
                <a href="https://wa.me/${property.phone}?text=${encodeURIComponent(generateWhatsAppMessage(property))}" target="_blank" class="btn-whatsapp-modal">
                    💬 Chat on WhatsApp
                </a>
                <a href="tel:${property.phone}" class="btn-call-modal">
                    📞 Call Now
                </a>
            </div>
        </div>
        <p style="margin-top: 1.5rem; text-align: center; color: #7f8c8d; font-size: 0.9rem;">
            ✨ Har Mannat Ka Perfect Address<br>
            MannatSpaces - Connecting Dreams with the Right Address
        </p>
    `;
    
    modal.classList.add('show');
}

// Close Modal
function closeModal() {
    document.getElementById('propertyModal').classList.remove('show');
}

function closeEditModal() {
    document.getElementById('editModal').classList.remove('show');
}

// Load Admin Properties
function loadAdminProperties() {
    const list = document.getElementById('adminPropertiesList');
    const noProperties = document.getElementById('noAdminProperties');

    list.innerHTML = '';

    if (properties.length === 0) {
        list.style.display = 'none';
        noProperties.style.display = 'block';
        return;
    }

    list.style.display = 'grid';
    noProperties.style.display = 'none';

    properties.forEach(property => {
        const item = document.createElement('div');
        item.className = 'admin-property-item';

        const priceFormatted = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0
        }).format(property.totalPrice);

        item.innerHTML = `
            <div class="admin-property-info">
                <h4>${property.name}</h4>
                <p>📍 Location: ${property.location}</p>
                <p>📦 Type: ${property.type} | Area: ${property.area} sq ft</p>
                <p>💵 Rate: ₹${property.perSquareRate}/sq ft | 💰 Total: ${priceFormatted}</p>
                <p>Description: ${property.description.substring(0, 60)}...</p>
            </div>
            <div class="admin-property-actions">
                <button class="btn-edit" onclick="editProperty(${property.id})">Edit</button>
                <button class="btn-danger" onclick="deleteProperty(${property.id})">Delete</button>
            </div>
        `;

        list.appendChild(item);
    });
}

// Filter Properties
function filterProperties() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const typeFilter = document.getElementById('typeFilter').value;
    const localityFilter = document.getElementById('localityFilter').value;
    const budgetFilter = document.getElementById('budgetFilter').value;

    const filtered = properties.filter(property => {
        const matchSearch = property.name.toLowerCase().includes(searchTerm) ||
                           (property.location && property.location.toLowerCase().includes(searchTerm)) ||
                           (property.locality && property.locality.toLowerCase().includes(searchTerm));
        const matchType = !typeFilter || property.type === typeFilter;
        const matchLocality = !localityFilter || (property.locality && property.locality === localityFilter);

        let matchBudget = true;
        const price = property.totalPrice || 0;
        switch(budgetFilter) {
            case 'lt5': matchBudget = price < 500000; break;
            case '5to10': matchBudget = price >= 500000 && price < 1000000; break;
            case '10to25': matchBudget = price >= 1000000 && price < 2500000; break;
            case '25to50': matchBudget = price >= 2500000 && price < 5000000; break;
            case '50plus': matchBudget = price >= 5000000; break;
            default: matchBudget = true;
        }

        return matchSearch && matchType && matchLocality && matchBudget;
    });

    displayFilteredProperties(filtered);
}

function displayFilteredProperties(filteredProperties) {
    const grid = document.getElementById('propertiesGrid');
    const noProperties = document.getElementById('noProperties');

    grid.innerHTML = '';

    if (filteredProperties.length === 0) {
        grid.style.display = 'none';
        noProperties.textContent = 'कोई Properties नहीं मिले।';
        noProperties.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    noProperties.style.display = 'none';

    filteredProperties.forEach(property => {
        const card = createPropertyCard(property);
        grid.appendChild(card);
    });
}

window.onclick = function(event) {
    const propertyModal = document.getElementById('propertyModal');
    const editModal = document.getElementById('editModal');
    
    if (event.target === propertyModal) {
        propertyModal.classList.remove('show');
    }
    
    if (event.target === editModal) {
        editModal.classList.remove('show');
    }
}
