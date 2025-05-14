# 📄 **AlignMe App - Requirement Specification Document**


## **1. Overview**

**Purpose:**
AlignMe is a mobile-first application designed for patients undergoing clear aligner treatment. The app simplifies booking dental appointments, tracking aligner usage, viewing the treatment timeline, and capturing visual progress through selfies.

**Target Users:**

* Patients undergoing orthodontic treatment with aligners
* Orthodontic clinics (optional admin portal integration later)


## **2. Functional Requirements**

### **2.1 User Authentication (Optional MVP)**

* [ ] User signup/login via email or phone number (MVP can skip this)
* [ ] Profile with basic details: name, age, treatment start date, aligner count

### **2.2 Appointment Booking**

* [x] View available time slots for clinic/dentist
* [x] Book appointment with:

  * Date
  * Time
  * Optional notes
* [x] Reschedule or cancel existing appointments
* [ ] Notifications:

  * Confirmation
  * 24h/1h reminders
  * Reschedule alerts


### **2.3 Aligner Schedule Tracker**

* [x] Define treatment duration (e.g., 20 aligners, 1 per 10 days)
* [x] Auto-generate schedule with:

  * Start date
  * Aligner # (e.g., Aligner 3/20)
  * Expected switch date
* [x] Show **past**, **current**, and **upcoming** aligners
* [x] Mark aligner as "in use", "completed", or "skipped"
* [ ] Dentist can optionally adjust schedule (future feature)


### **2.4 Timeline View**

* [x] Chronological list of:

  * Aligner # and date started
  * Notes or tags (e.g., discomfort, tight fit)
  * Icons for status: completed, in-progress, missed
* [x] Option to add manual entry for missed/makeup aligners


### **2.5 Progress Tracking with Selfies**

* [x] Weekly or custom-interval selfie reminders
* [x] Take photo in-app or upload from gallery
* [x] Store selfie with date and aligner #
* [ ] Compare mode:

  * Before/after slider
  * Grid view by week/month
* [ ] Auto-align face using face detection
* [ ] Share/export progress (optional)


### **2.6 Notifications & Reminders**

* [x] Daily reminder to wear aligners (optional toggle)
* [x] Reminder to switch aligners
* [x] Appointment reminders
* [ ] Weekly selfie prompt


### **2.7 Settings & Preferences**

* [x] Edit profile: Name, email, treatment start date
* [x] Set aligner switch frequency (e.g., every 10 days)
* [x] Enable/disable reminders


## **3. Non-Functional Requirements**

### **3.1 Performance**

* Smooth timeline scrolling
* Load images efficiently (lazy loading for selfies)

### **3.2 Security**

* Secure local storage for selfie data
* Cloud sync option (future roadmap)

### **3.3 Scalability**

* Ready to support integration with clinic dashboards or APIs

### **3.4 Platform**

* MVP: Mobile Web App / PWA or React Native
* Future: Native iOS and Android

## **4. Technical Stack Recommendation (MVP)**

| Layer         | Tech                                  |
| ------------- | ------------------------------------- |
| Frontend      | React Native / Expo                   |
| Backend       | Firebase (Firestore + Auth + Storage) |
| Notifications | Firebase Cloud Messaging              |
| Media         | React Native Camera / Expo Camera     |
| Design        | Figma + Tailwind-like design system   |


## **5. UI Components (Screens)**

1. **Home Dashboard**

   * Next appointment
   * Current aligner
   * Action buttons: Book, Timeline, Progress

2. **Book Appointment**

   * Calendar with available slots
   * Time picker
   * Confirm screen

3. **Timeline**

   * Scrollable view of aligners
   * Mark complete / add notes

4. **Progress**

   * Selfie list
   * Compare mode
   * Upload new photo

5. **Settings**

   * Profile
   * Notification preferences
   * Edit schedule

## **6. Future Enhancements**

* Clinic-side dashboard for monitoring patients
* Aligner fit tracking (AI-based from photos)
* Chat with dentist
* Integration with Apple Health / Google Fit

