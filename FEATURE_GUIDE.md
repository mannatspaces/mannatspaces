# 🏘️ MannatSpaces - Feature Usage Guide

## 📋 Complete Feature Documentation

---

## 1️⃣ Adding a New Property

### Step-by-Step Process:

1. **Go to Admin Panel**
   - Click "Admin Panel" button in navigation
   - Enter password: `MannatSpaces@123`
   - Click "Login"

2. **Fill Basic Information**
   - **Property Name**: e.g., "Luxury 3 BHK Apartment"
   - **Locality**: Select from dropdown (Indore areas)
   - **Exact Location**: Must fill - full address
     - Example: "123 MG Road, Near Metro Station, Indore"

3. **Property Type**
   - Residential, Commercial, Investment, Rental, Flats, Construction, Plot

4. **Area & Pricing** ⭐ NEW
   - **Area**: Enter in square feet (e.g., 1500)
   - **Price per sq ft**: Enter rate in ₹ (e.g., 5000)
   - **Total Price**: Auto-calculates as you type
     - Formula: 1500 sq ft × ₹5,000 = **₹75,00,000**

5. **Description**
   - Property details, amenities, features
   - Max 500 characters recommended

6. **Contact Number**
   - WhatsApp number for inquiries
   - Format: 10 digits (auto-formatted to +91)

7. **Add Media** (Optional)
   - **Photos**: 0-15 images max
     - Click "Choose Files" and select images
     - Shows preview of selected photos
   - **Video**: Single video file
     - Click "Choose File" to upload video
     - Supports MP4, WebM, Ogg formats
   - **Google Maps URL**: 
     - Paste Google Maps shareable link
     - Example: `https://maps.google.com/...`

8. **Submit**
   - Click "Add Property" button
   - Success message displays
   - Property appears in property grid
   - **Auto-syncs to all devices** 🔄

---

## 2️⃣ Price Calculation (Automatic)

### How It Works:
- You enter **Area** and **Price per sq ft**
- System automatically calculates **Total Price**
- Updates in real-time as you type

### Example:
```
Area: 2500 sq ft
Price per sq ft: ₹4,500
Total Price: 2500 × 4500 = ₹1,12,50,000 ✅
```

### In Property Cards:
- Displays as: `₹1,12,50,000` (formatted with commas)
- Shows in details modal
- Appears in WhatsApp message

---

## 3️⃣ Photo Management (Now Optional!)

### Before:
❌ Had to upload at least 1 photo
❌ Couldn't add property without images

### Now:
✅ Photos are completely optional
✅ Can add property with building icon (🏢)
✅ Can have 0-15 photos

### Adding Photos:
1. Click "Choose Files" next to "Upload Property Images"
2. Select up to 15 image files
3. Preview shows below input
4. If no photos selected - property shows building icon

### Photo Display:
- **Property Card**: Shows first image or building icon
- **Property Details Modal**: 
  - Large main image
  - Thumbnails for all photos
  - Click thumbnail to change main image

### Best Practices:
- Use JPG/PNG format
- Resize to ~500KB or less
- High-quality photos recommended
- Multiple angles look better

---

## 4️⃣ Video Upload (New Feature!)

### Before:
❌ Only YouTube URLs supported
❌ Complex to manage external videos

### Now:
✅ Direct video file upload
✅ Stores video in app
✅ Plays embedded in app

### Upload Process:
1. Click "Choose File" next to "Upload Property Video"
2. Select ONE video file (MP4 recommended)
3. File is converted to base64 and stored

### Video Playback:
- Displays in property details modal
- Built-in HTML5 video player
- Play/pause controls
- Works on all devices

### Supported Formats:
- MP4 (recommended)
- WebM
- Ogg
- MOV

### File Size Recommendations:
- Maximum: 100MB (may exceed storage)
- Recommended: 5-20MB
- Encode at 720p for best results

---

## 5️⃣ Google Maps Integration (New Feature!)

### How to Get Google Maps URL:
1. Open Google Maps
2. Search for property location
3. Click "Share" button
4. Copy the link
5. Paste in "Google Maps URL" field

### Example URL:
```
https://maps.google.com/maps?q=22.7196,75.8577
```

### In Property Details:
- "🗺️ View on Google Maps" button appears
- Clicking button opens maps in new tab
- Shows exact property location

### Benefits:
- Verify property location
- See nearby landmarks
- Check accessibility
- Calculate distances

---

## 6️⃣ Cross-Device Synchronization (New!)

### What It Does:
- Properties upload on Device A
- **Instantly appear on Device B, C, D...**
- No manual refresh needed
- All devices stay in sync

### How It Works:
1. Admin adds property on Device A
2. Saved to browser's localStorage
3. localStorage event triggered
4. Other devices detect change
5. Properties auto-reload
6. User sees update immediately

### Testing Cross-Device Sync:
1. **Device A**: Open app in browser
2. **Device B**: Open same link in another browser/tab
3. **Device A**: Add new property
4. **Device B**: Property appears instantly ✅

### Important Notes:
- ✅ Works between tabs in same browser
- ✅ Works between different browsers (same device)
- ❌ Does NOT work between different computers
- 💡 Use cloud backup for cross-device backup

---

## 7️⃣ Editing a Property

### For Admin:
1. Go to "Manage Properties" section
2. Find property to edit
3. Click "Edit" button
4. Update any field
5. **Area or Rate changed?** Total price auto-updates
6. Click "Save Changes"
7. Property updates instantly across all devices

### What Can Be Edited:
✅ All fields
✅ Photos (replace with new images)
✅ Video (upload new video)
✅ Maps URL
✅ Pricing
✅ Description
✅ Contact number

### What Stays Same:
- Property creation time
- Property ID (internal reference)

---

## 8️⃣ Deleting a Property

### Process:
1. Go to "Manage Properties" section
2. Find property to delete
3. Click "Delete" button
4. Confirm deletion dialog
5. Property removed instantly
6. Synced across all devices

### Recovery:
❌ No direct recovery (use browser backup)
💡 Tip: Backup localStorage regularly

---

## 9️⃣ Mandatory vs Optional Fields

### ✅ REQUIRED (Must Fill):
- Property Name
- Locality (Indore area)
- **Location (Exact Address)** ← NEW MANDATORY
- Property Type
- Area (sq ft)
- **Price per sq ft** ← NEW MANDATORY
- Description
- WhatsApp Number

### ⭕ OPTIONAL (Can Skip):
- Photos (0-15 images)
- Video file
- Google Maps URL

### Validation:
- Missing required fields → Alert with error message
- All validations in Hindi/English
- Phone number must be 10-12 digits

---

## 🔟 WhatsApp Integration

### Automatic Message Generation:
When user clicks "Chat on WhatsApp":
- Message includes property name
- Full address (locality + location)
- Property type and area
- Per-square rate
- Total price
- Description excerpt

### Message Format:
```
नमस्ते! 👋

मुझे आपकी यह संपत्ति पसंद आई:

📍 *Luxury 3 BHK*
🏘️ *विवरण:*
• 📌 स्थान: Vijay Nagar
• 🏗️ प्रकार: Residential
• 📐 क्षेत्र: 1500 sq ft
• 💵 Rate: ₹5000/sq ft
• 💰 कुल मूल्य: ₹75,00,000

विवरण: Beautiful apartment with...

क्या आप कृपया इसके बारे में...
```

### Sending Message:
1. Click "Chat on WhatsApp" on property card
2. WhatsApp opens with pre-filled message
3. Message is ready to send to agent
4. Agent receives inquiry with full details

---

## 1️⃣1️⃣ Search & Filter

### Search by Name:
- Type in search box
- Filters properties in real-time
- Matches property name or location

### Filter by Type:
- Select from dropdown
- Shows only that property type
- "All Types" = no filter

### Filter by Locality:
- Select Indore area
- Shows properties in that area
- "All Localities" = no filter

### Filter by Budget:
- Less than 5L
- 5L - 10L
- 10L - 25L
- 25L - 50L
- 50L+

### Combined Filters:
- Use multiple filters together
- Results narrow down as filters applied
- Clear filter by selecting "All"

---

## 1️⃣2️⃣ Mobile Features

### Responsive Design:
✅ Optimized for all screen sizes
✅ Touch-friendly buttons (44px+)
✅ Hamburger menu on mobile
✅ Full features on mobile

### Mobile-Specific:
- Tap phone number to call
- "Chat on WhatsApp" uses mobile app
- Forms stack vertically
- Video player full-width
- Maps opens in Google Maps app

### Tested On:
- iPhone (320px - 667px)
- Android (320px - 768px)
- Tablet (768px - 1024px)
- Desktop (1024px+)

---

## 1️⃣3️⃣ Common Issues & Solutions

### ❓ Price not calculating?
**Solution**: Make sure both Area AND Rate are filled
- Check: Area field has number
- Check: Rate field has number
- Check: Both fields are required

### ❓ Photos not uploading?
**Solution**: Photos are optional now!
- You can skip photos
- Property will show building icon
- No error if photos empty

### ❓ Property not showing on another device?
**Solution**: Ensure cross-device sync:
- Check: Both devices on same network (not required)
- Check: Same browser or localStorage shared
- Wait: 2-3 seconds for sync
- Refresh: Manual refresh if needed

### ❓ Video not playing?
**Solution**: Check video format:
- Supported: MP4, WebM, Ogg
- Try: Convert to MP4
- Check: File size under 100MB
- Test: Video works on other player

### ❓ Map URL not working?
**Solution**: Use shareable link:
- Google Maps → Share → Copy link
- Don't use: Maps URL with parameters
- Test: Link opens in new browser tab
- Check: Coordinates format if custom URL

### ❓ Admin password not working?
**Solution**: Default password
- Password: `MannatSpaces@123`
- Case-sensitive
- Check: No typos
- Reset: Delete localStorage to reset

---

## 1️⃣4️⃣ Data Storage Information

### Where Is Data Stored?
- **Location**: Browser's localStorage
- **Size**: ~5-10MB capacity
- **Persistence**: Permanent (until cleared)
- **Scope**: Per website per browser

### How to Backup:
1. Open Developer Console (F12)
2. Go to "Application" tab
3. Click "Local Storage"
4. Find "mannatspaces_properties"
5. Copy the JSON value
6. Save to text file

### How to Restore:
1. Get backup JSON
2. Open Developer Console
3. Go to "Application" → "Local Storage"
4. Paste value into "mannatspaces_properties"
5. Refresh page

---

## 1️⃣5️⃣ Privacy & Security

### Data Privacy:
- ✅ Data stored locally in your browser
- ❌ No data sent to external servers
- ❌ No analytics or tracking
- ✅ You control all data

### Admin Access:
- 🔐 Protected with password
- 🔐 Password: `MannatSpaces@123`
- ⚠️ Anyone with password can manage
- 💡 Tip: Change password in code if needed

### Clearing Data:
1. Browser Settings → Clear browsing data
2. Select "Cookies and cached images"
3. Choose date range "All time"
4. Click "Clear data"
5. All properties will be deleted

---

## ✨ Best Practices

### For Admins:
1. ✅ Always fill location with full address
2. ✅ Use realistic prices with sq ft rate
3. ✅ Add high-quality photos when possible
4. ✅ Include property video for better visibility
5. ✅ Add Google Maps link for location verification
6. ✅ Write detailed description
7. ✅ Use correct property type
8. ✅ Verify phone number before posting

### For Users:
1. ✅ Read full property description
2. ✅ View all photos before inquiring
3. ✅ Check location on Google Maps
4. ✅ Watch property video if available
5. ✅ Contact via WhatsApp for quick response
6. ✅ Ask about location details
7. ✅ Request additional photos if needed

---

## 📞 Support Information

### Features Supported:
- ✅ All property types
- ✅ All Indian cities (focus: Indore)
- ✅ Mobile & desktop
- ✅ All major browsers

### Current Limitations:
- ❌ Single admin password (not per-user)
- ❌ No user authentication system
- ❌ Cross-device sync via localStorage only
- ❌ Video storage limited by browser capacity

---

**Last Updated: 2024**
**Version: 2.0 (Complete Rewrite with New Features)**
**Status: ✅ Fully Functional**
