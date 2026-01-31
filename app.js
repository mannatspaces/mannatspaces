// Default Admin Password
const ADMIN_PASSWORD = "MannatSpaces@123"; // Change this to a secure password

// Mobile Menu Handler
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navButtons = document.getElementById('navButtons');
    
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function() {
            hamburgerBtn.classList.toggle('active');
            navButtons.classList.toggle('active');
        });
        
        // Close menu when a nav button is clicked
        const navBtns = navButtons.querySelectorAll('.btn-nav');
        navBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                hamburgerBtn.classList.remove('active');
                navButtons.classList.remove('active');
            });
        });
    }
    
    // Close menu on window resize if screen becomes larger
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburgerBtn.classList.remove('active');
            navButtons.classList.remove('active');
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

// Get unique localities from properties + predefined ones
function getAvailableLocalities() {
    const uniqueLocalities = new Set(INDORE_LOCALITIES);
    properties.forEach(prop => {
        if (prop.locality) uniqueLocalities.add(prop.locality);
    });
    return Array.from(uniqueLocalities).sort();
}

// Update locality dropdown options
function updateLocalityDropdown() {
    const localityFilter = document.getElementById('localityFilter');
    const propertyLocality = document.getElementById('propertyLocality');
    const editPropertyLocality = document.getElementById('editPropertyLocality');
    
    const availableLocalities = getAvailableLocalities();
    
    [localityFilter, propertyLocality, editPropertyLocality].forEach(dropdown => {
        if (!dropdown) return;
        
        const currentValue = dropdown.value;
        const isFilterDropdown = dropdown.id === 'localityFilter';
        
        // Clear options except first one
        dropdown.innerHTML = isFilterDropdown 
            ? '<option value="">All Localities (Indore)</option>'
            : '<option value="">Select Locality (Indore)</option>';
        
        // Add localities
        availableLocalities.forEach(locality => {
            const option = document.createElement('option');
            option.value = locality;
            option.textContent = locality;
            dropdown.appendChild(option);
        });
        
        // Restore selection
        dropdown.value = currentValue;
    });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadPropertiesFromStorage();
    updateLocalityDropdown();
    displayPublicProperties();
    setupEventListeners();
    
    // Add image preview listeners
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
});

// Preview images in admin form
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

// Event Listeners
function setupEventListeners() {
    document.getElementById('publicViewBtn').addEventListener('click', switchToPublic);
    document.getElementById('adminLoginBtn').addEventListener('click', switchToAdmin);
}

// Switch to Public View
function switchToPublic() {
    document.getElementById('publicView').classList.add('active');
    document.getElementById('adminView').classList.remove('active');
    document.getElementById('adminLogin').style.display = 'block';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('adminPassword').value = '';
}

// Switch to Admin View
function switchToAdmin() {
    document.getElementById('publicView').classList.remove('active');
    document.getElementById('adminView').classList.add('active');
    document.getElementById('adminLogin').style.display = 'block';
    document.getElementById('adminDashboard').style.display = 'none';
}

// Admin Login
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

// Admin Logout
function adminLogout() {
    if (confirm('क्या आप लॉगआउट करना चाहते हैं?')) {
        document.getElementById('adminLogin').style.display = 'block';
        document.getElementById('adminDashboard').style.display = 'none';
        document.getElementById('adminPassword').value = '';
    }
}

// Properties Storage (using localStorage)
let properties = [];

function loadPropertiesFromStorage() {
    const stored = localStorage.getItem('mannatspaces_properties');
    if (stored) {
        properties = JSON.parse(stored);
    }
}

function savePropertiesToStorage() {
    localStorage.setItem('mannatspaces_properties', JSON.stringify(properties));
}

// Add Property (Admin)
function addProperty() {
    const name = document.getElementById('propertyName').value.trim();
    const locality = document.getElementById('propertyLocality').value;
    const location = document.getElementById('propertyLocation').value.trim();
    const type = document.getElementById('propertyType').value;
    const price = document.getElementById('propertyPrice').value;
    const area = document.getElementById('propertyArea').value;
    const description = document.getElementById('propertyDescription').value.trim();
    const phone = document.getElementById('propertyPhone').value.trim();
    const imageFiles = document.getElementById('propertyImages').files;
    const videoUrl = document.getElementById('propertyVideoUrl').value.trim();
    const videoUrl2 = document.getElementById('propertyVideoUrl2').value.trim();

    // Validation
    if (!name || !locality || !type || !price || !area || !description || !phone) {
        alert('❌ कृपया सभी आवश्यक fields भरें।');
        return;
    }

    if (imageFiles.length === 0) {
        alert('❌ कृपया कम से कम एक Property की image upload करें।');
        return;
    }

    if (imageFiles.length > 15) {
        alert('❌ अधिकतम 15 images upload कर सकते हैं।');
        return;
    }

    // Read multiple images as base64
    let imagesLoaded = 0;
    const images = [];

    Array.from(imageFiles).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            images[index] = e.target.result;
            imagesLoaded++;

            if (imagesLoaded === imageFiles.length) {
                const property = {
                    id: Date.now(),
                    name,
                    locality,
                    location,
                    type,
                    price: parseInt(price),
                    area: parseInt(area),
                    description,
                    phone,
                    images: images,
                    image: images[0], // First image as thumbnail
                    videoUrl: videoUrl || null,
                    videoUrl2: videoUrl2 || null
                };

                properties.push(property);
                savePropertiesToStorage();
                updateLocalityDropdown();
                clearAdminForm();
                loadAdminProperties();
                displayPublicProperties();
                alert('✅ Property सफलतापूर्वक जोड़ी गई! (फोटो: ' + images.length + ')');
            }
        };
        reader.readAsDataURL(file);
    });
}

// Edit Property (Admin)
function editProperty(id) {
    const property = properties.find(p => p.id === id);
    if (!property) return;

    document.getElementById('editPropertyId').value = id;
    document.getElementById('editPropertyName').value = property.name;
    document.getElementById('editPropertyLocality').value = property.locality || '';
    document.getElementById('editPropertyLocation').value = property.location || '';
    document.getElementById('editPropertyType').value = property.type;
    document.getElementById('editPropertyPrice').value = property.price;
    document.getElementById('editPropertyArea').value = property.area;
    document.getElementById('editPropertyDescription').value = property.description;
    document.getElementById('editPropertyPhone').value = property.phone;
    document.getElementById('editPropertyVideoUrl').value = property.videoUrl || '';
    document.getElementById('editPropertyVideoUrl2').value = property.videoUrl2 || '';

    // Show existing images preview
    if (property.images && property.images.length > 0) {
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
    const price = document.getElementById('editPropertyPrice').value;
    const area = document.getElementById('editPropertyArea').value;
    const description = document.getElementById('editPropertyDescription').value.trim();
    const phone = document.getElementById('editPropertyPhone').value.trim();
    const imageFiles = document.getElementById('editPropertyImages').files;
    const videoUrl = document.getElementById('editPropertyVideoUrl').value.trim();
    const videoUrl2 = document.getElementById('editPropertyVideoUrl2').value.trim();

    // Validation
    if (!name || !locality || !type || !price || !area || !description || !phone) {
        alert('❌ कृपया सभी आवश्यक fields भरें।');
        return;
    }

    if (imageFiles.length > 15) {
        alert('❌ अधिकतम 15 images upload कर सकते हैं।');
        return;
    }

    const propertyIndex = properties.findIndex(p => p.id === id);
    if (propertyIndex !== -1) {
        if (imageFiles.length > 0) {
            // If new images are selected, read them
            let imagesLoaded = 0;
            const images = [];

            Array.from(imageFiles).forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    images[index] = e.target.result;
                    imagesLoaded++;

                    if (imagesLoaded === imageFiles.length) {
                        properties[propertyIndex] = {
                            id,
                            name,
                            locality,
                            location,
                            type,
                            price: parseInt(price),
                            area: parseInt(area),
                            description,
                            phone,
                            images: images,
                            image: images[0],
                            videoUrl: videoUrl || null,
                            videoUrl2: videoUrl2 || null
                        };
                        savePropertiesToStorage();
                        updateLocalityDropdown();
                        loadAdminProperties();
                        displayPublicProperties();
                        closeEditModal();
                        alert('✅ Property सफलतापूर्वक अपडेट की गई! (फोटो: ' + images.length + ')');
                    }
                };
                reader.readAsDataURL(file);
            });
        } else {
            // Keep existing images if no new images selected
            properties[propertyIndex] = {
                id,
                name,
                locality,
                location,
                type,
                price: parseInt(price),
                area: parseInt(area),
                description,
                phone,
                images: properties[propertyIndex].images || [properties[propertyIndex].image],
                image: properties[propertyIndex].image,
                videoUrl: videoUrl || null,
                videoUrl2: videoUrl2 || null
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

// Delete Property (Admin)
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

// Clear Admin Form
function clearAdminForm() {
    document.getElementById('propertyName').value = '';
    document.getElementById('propertyLocality').value = '';
    document.getElementById('propertyLocation').value = '';
    document.getElementById('propertyType').value = '';
    document.getElementById('propertyPrice').value = '';
    document.getElementById('propertyArea').value = '';
    document.getElementById('propertyDescription').value = '';
    document.getElementById('propertyPhone').value = '';
    document.getElementById('propertyImages').value = '';
    document.getElementById('propertyVideoUrl').value = '';
    document.getElementById('propertyVideoUrl2').value = '';
    document.getElementById('imagePreview').innerHTML = '';
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
    }).format(property.price);

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
            </div>
            <div class="property-price">${priceFormatted}</div>
            <div class="property-actions">
                <button class="btn-view" onclick="event.stopPropagation(); showPropertyDetails(this.closest('.property-card').__property)">View Details</button>
                <a href="https://wa.me/${property.phone}?text=I'm interested in your property: ${property.name}" target="_blank" class="btn-whatsapp-chat" onclick="event.stopPropagation()">💬 Chat</a>
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
    }).format(property.price);

    // Build gallery HTML for all images
    let galleryHTML = ``;
    if (property.images && property.images.length > 1) {
        galleryHTML = `<div class="photo-gallery">`;
        property.images.forEach((img, index) => {
            galleryHTML += `<img src="${img}" alt="Property photo ${index + 1}" class="gallery-thumbnail" onclick="document.getElementById('mainPropertyImage').src='${img}'">`;
        });
        galleryHTML += `</div>`;
    }

    // Build video HTML
    let videoHTML = ``;
    if (property.videoUrl || property.videoUrl2) {
        videoHTML = `<div class="property-videos" style="margin: 1.5rem 0;">`;
        if (property.videoUrl) {
            const videoId = extractYoutubeId(property.videoUrl);
            if (videoId) {
                videoHTML += `<div style="margin-bottom: 1rem;"><iframe width="100%" height="250" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen style="border-radius: 8px;"></iframe></div>`;
            } else {
                videoHTML += `<p><a href="${property.videoUrl}" target="_blank" style="color: #FF6B35; text-decoration: none; font-weight: 600;">🎥 देखें Video</a></p>`;
            }
        }
        if (property.videoUrl2) {
            const videoId2 = extractYoutubeId(property.videoUrl2);
            if (videoId2) {
                videoHTML += `<div><iframe width="100%" height="250" src="https://www.youtube.com/embed/${videoId2}" frameborder="0" allowfullscreen style="border-radius: 8px;"></iframe></div>`;
            } else {
                videoHTML += `<p><a href="${property.videoUrl2}" target="_blank" style="color: #FF6B35; text-decoration: none; font-weight: 600;">🎥 2nd Video देखें</a></p>`;
            }
        }
        videoHTML += `</div>`;
    }

    const imageCount = property.images ? property.images.length : 1;

    modalBody.innerHTML = `
        <h2>${property.name}</h2>
        <div class="property-image" id="mainPropertyImage-container">
            ${imageUrl ? `<img src="${imageUrl}" id="mainPropertyImage" alt="${property.name}" style="cursor: pointer;">` : '🏢'}
        </div>
        ${galleryHTML}
        <span class="property-type">${property.type}</span>
        <div style="color: #7f8c8d; font-size: 0.85rem; margin: 0.5rem 0;">📷 ${imageCount} फोटो</div>
        <div class="property-price">${priceFormatted}</div>
        ${videoHTML}
        <div class="property-details">
            <p><label>Location:</label><br>📍 ${property.location}</p>
            <p><label>Area:</label><br>📐 ${property.area} sq ft</p>
            <p><label>Description:</label><br>${property.description}</p>
        </div>
        <div class="whatsapp-contact-section">
            <h4>Contact Agent</h4>
            <div class="whatsapp-buttons">
                <a href="https://wa.me/${property.phone}?text=I'm interested in your property: ${property.name}%0A%0AName: ${property.name}%0ALocation: ${property.location}%0APrice: ${priceFormatted}" target="_blank" class="btn-whatsapp-modal">
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

// Extract YouTube video ID from URL
function extractYoutubeId(url) {
    if (!url) return null;
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Close Modal
function closeModal() {
    document.getElementById('propertyModal').classList.remove('show');
}

// Close Edit Modal
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
        }).format(property.price);

        item.innerHTML = `
            <div class="admin-property-info">
                <h4>${property.name}</h4>
                <p>📍 Location: ${property.location}</p>
                <p>📦 Type: ${property.type} | Area: ${property.area} sq ft | Price: ${priceFormatted}</p>
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

        // Budget matching
        let matchBudget = true;
        const price = property.price || 0;
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

// Display Filtered Properties
function displayFilteredProperties(filteredProperties) {
    const grid = document.getElementById('propertiesGrid');
    const noProperties = document.getElementById('noProperties');

    grid.innerHTML = '';

    if (filteredProperties.length === 0) {
        grid.style.display = 'none';
        noProperties.textContent = 'कोई Properties नहीं मिले। अलग search term या filter try करें।';
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

// Close modal when clicking outside of it
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

// Add sample properties on first load (optional)
function addSampleProperties() {
    if (properties.length === 0) {
        const samples = [
            {
                id: 1,
                name: "Luxury Apartment - Sector 15",
                location: "Gurgaon, Haryana",
                type: "Residential",
                price: 7500000,
                area: 1800,
                description: "Beautiful 3 BHK luxury apartment with modern amenities, gym, swimming pool, and 24/7 security. Close to shopping malls and schools.",
                image: "default"
            },
            {
                id: 2,
                name: "Commercial Office Space",
                location: "Delhi, NCR",
                type: "Commercial",
                price: 25000000,
                area: 5000,
                description: "Prime commercial office space in business district. Ideal for IT companies, consulting firms, and startups. High-speed internet connectivity.",
                image: "default"
            },
            {
                id: 3,
                name: "Investment Villa Complex",
                location: "Noida Extension",
                type: "Investment",
                price: 4500000,
                area: 2500,
                description: "Plot for investment in upcoming villa complex with excellent ROI potential. 5 minutes from metro station. Ready for development.",
                image: "default"
            }
        ];
        
        properties = samples;
        savePropertiesToStorage();
        displayPublicProperties();
    }
}

// Uncomment this line to add sample data on first visit
// addSampleProperties();
