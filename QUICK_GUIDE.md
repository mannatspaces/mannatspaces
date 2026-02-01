# MannatSpaces - Quick Reference Guide

## ✅ What Was Fixed

### 1. **Property Images Now Display Properly**
   - Admin uploads properties with images (up to 15 images per property)
   - Images display as thumbnails in the property card grid
   - Click any property to see full-size images and gallery
   - Gallery thumbnails clickable to switch main image

### 2. **Properties Show Across Your Device**
   - All properties stored locally on your device
   - Refreshing the page maintains your properties
   - Same device, same browser = all properties visible ✅
   - **Note:** For multi-device synchronization, you would need a cloud database (Firebase/Backend)

### 3. **All Text Now in English** 
   - All alerts, prompts, and messages are now in English
   - Admin panel prompts in English
   - Property error messages in English
   - WhatsApp contact messages in English

---

## 📱 How to Use

### **For Admin (Add Properties)**

1. Click "Admin Panel" button in top right
2. Enter Password: `MannatSpaces@123`
3. Fill in Property Details:
   - Property Name
   - Locality (Indore)
   - Location Description
   - Property Type (Residential, Commercial, etc.)
   - Price
   - Area (sq ft)
   - Description
   - Contact Phone Number
   - Images (up to 15)
   - YouTube Videos (optional)

4. Click "Add Property"
5. Property appears immediately on public view

### **For Public (View Properties)**

1. Click "Properties" button
2. Browse all listed properties
3. Use filters:
   - Search by name or location
   - Filter by type (Residential, Commercial, etc.)
   - Filter by locality
4. Click any property to see:
   - All images with gallery
   - Full property details
   - Agent contact options
5. Chat on WhatsApp or Call directly

### **For Admins (Manage Properties)**

- Click "Admin Panel" to login
- See "Manage Properties" section
- Edit: Click "Edit" to modify property details and images
- Delete: Click "Delete" to remove property

### **For Admins (Manage Business Partners)**

- Click "Admin Panel" to login  
- Go to "Manage Admins" section
- Add new business partners:
  - Business name
  - WhatsApp number
  - Email (optional)
  - Business notes
- Chat with admins via WhatsApp
- Delete admins if needed

---

## 🔐 Admin Credentials

**Username:** Admin  
**Password:** `MannatSpaces@123`

⚠️ **Change this password immediately for production use!**

---

## 📊 Property Storage

- **Location:** Browser LocalStorage
- **Persistence:** Data persists until browser cache is cleared
- **Maximum properties:** No hard limit (depends on storage)
- **Maximum images per property:** 15
- **Image format:** Stored as base64 (embedded in page)

---

## 🐛 Troubleshooting

### Images not showing?
- ✅ Refresh the page (Ctrl+R or Cmd+R)
- ✅ Clear browser cache if needed (Ctrl+Shift+Delete)
- ✅ Check browser storage: DevTools → Application → Local Storage

### Properties disappeared?
- Check if browser cache was cleared (clears localStorage)
- Browser data cleared = properties lost
- **Recommendation:** Backup properties periodically

### Text appears in Hindi/mixed languages?
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache and cookies

---

## 📈 Future Enhancements (Optional)

For true multi-device synchronization:
1. **Cloud Database Integration** (Firebase, MongoDB)
2. **Cloud Image Storage** (Firebase Storage, Cloudinary)
3. **User Authentication** (Login system)
4. **Advanced Analytics** (View tracking, leads)
5. **Mobile App** (iOS/Android native)

---

## 💡 Tips & Best Practices

1. **Image Quality:** Use good quality property photos (not too large)
2. **Descriptions:** Write clear, detailed property descriptions
3. **Pricing:** Keep prices updated and competitive
4. **Contact:** Use WhatsApp for reliable customer communication
5. **Backup:** Periodically take screenshots of your property listings

---

## 📞 Support

For help or questions about MannatSpaces:
- Check property details are filled correctly
- Verify images uploaded successfully
- Ensure phone numbers include country code (+91)

---

**Version:** 2.0 (Fixed)  
**Last Updated:** February 1, 2026  
**Status:** ✅ All Systems Operational
