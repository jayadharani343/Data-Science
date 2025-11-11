# SpeakBee - Tamil & English AI Speech Therapy for Stroke Recovery

SpeakBee is a specialized speech therapy application designed for Tamil and English speaking stroke patients. Features advanced AI-powered pronunciation analysis, detailed speech breakdown, tongue movement guidance, and comprehensive progress tracking with full Tamil language support.

## 🌟 Key Features

### 🔐 **User Authentication & Profiles**
- Secure login/signup system
- Personalized user profiles with medical condition tracking
- Session persistence and data security

### 🌍 **Bilingual Support (Tamil & English)**
- **Tamil (தமிழ்)**: Complete Tamil language interface with native exercises
- **English**: Full English language support
- Real-time language switching with visual changes
- **Rose Gold Theme**: Beautiful rose gold gradient for English, warm #E9DBC4 for Tamil
- **Blue Branding**: "SpeakBee" name and symbols highlighted in blue for brand recognition
- **Complete Tamil Conversion**: All inputs, settings, and content convert to Tamil
- Localized exercises, feedback, and placeholders in Tamil
- Native pronunciation models for both languages

### 🎯 **Advanced AI-Powered Speech Analysis**
- **Real-time Speech Recognition**: Converts speech to text instantly
- **Pronunciation Scoring**: Advanced algorithm compares user speech with target pronunciation
- **Detailed Word Breakdown**: Word-by-word accuracy analysis with color coding
- **Speech Timing Analysis**: Measures speech rate, pauses, and fluency
- **Pronunciation Issue Detection**: Identifies specific areas for improvement
- **Visual Speech Patterns**: Waveform visualization of speech patterns
- **Gap Analysis**: Detects pauses and rhythm issues in speech
- **Stroke-specific Feedback**: Tailored analysis for stroke recovery needs

### 🏋️ **Enhanced Practice Modes**

#### 1. **Word Practice** (Easy)
- Individual word pronunciation
- Perfect for beginners and severe speech impairments
- Focus on basic articulation and sound formation

#### 2. **Sentence Practice** (Medium)
- Complete sentence pronunciation
- Builds fluency and rhythm
- Improves communication flow

#### 3. **Free Speech** (Advanced)
- Open conversation practice
- Fluency and clarity assessment
- Natural speech development

#### 4. **Custom Practice** (Custom)
- **NEW**: Enter your own sentences to practice
- Personalized content for specific needs
- Practice words/phrases relevant to daily life
- Perfect for therapist-assigned exercises

#### 5. **Tongue Training** (Guided)
- **NEW**: Visual tongue movement guidance
- Interactive tongue position diagrams
- Step-by-step articulation instructions
- Practice specific sounds with visual feedback
- Learn proper tongue placement for difficult sounds

### 📊 **Progress Tracking & Gamification**
- **Daily Streaks**: Motivational streak counter
- **Session History**: Detailed practice logs
- **Accuracy Metrics**: Performance analytics
- **Level System**: Progression-based achievements
- **Visual Progress Charts**: Easy-to-understand improvement tracking

### ♿ **Accessibility Features**
- **Large Touch Targets**: Optimized for motor impairments
- **High Contrast Mode**: Better visibility for visual impairments
- **Clear Typography**: Easy-to-read fonts and sizing
- **Reduced Motion Support**: Respects user preferences
- **Keyboard Navigation**: Full accessibility support

## 🚀 Installation & Setup

### **Prerequisites**
- Modern web browser (Chrome, Edge, Firefox, Safari)
- Microphone access
- Internet connection (for initial setup)

### **Quick Start**

#### **Method 1: Direct File Opening**
1. Download all files to a folder
2. Double-click `index.html`
3. Allow microphone permissions when prompted
4. Create account and start practicing!

#### **Method 2: Local Server (Recommended)**

**Using Python:**
```bash
# Navigate to project directory
cd path/to/speechcare

# Start server
python -m http.server 8000

# Open browser to: http://localhost:8000
```

**Using Node.js:**
```bash
# Navigate to project directory
cd path/to/speechcare

# Start server
npx http-server -p 8000

# Open browser to: http://localhost:8000
```

## 📁 Project Structure

```
speechcare/
├── index.html          # Main application structure
├── styles.css          # Responsive styling & accessibility
├── script.js           # Core functionality & AI analysis
└── README.md           # Documentation
```

## 🎮 How to Use

### **Getting Started**
1. **Language Selection**: Choose between English or Tamil (தமிழ்) from the top-right selector
2. **Account Creation**: Sign up with your details including medical condition
3. **Dashboard Overview**: View your progress stats and streaks

### **Tamil Language Features** 🇮🇳
When you select **"🇮🇳 தமிழ்"**:
- **Tamil Background**: Warm #E9DBC4 background color for Tamil mode (switches from rose gold)
- **Complete Tamil Interface**: All buttons, labels, and text convert to Tamil
- **Tamil Input Placeholders**: All input fields show Tamil placeholder text
- **Tamil Settings**: Difficulty levels, speech rate labels all in Tamil
- **Tamil Sound Buttons**: Tongue training buttons show Tamil letters (அ, எ, இ, etc.)
- **Tamil Exercises**: Practice Tamil words and sentences
- **Tamil Feedback**: Get pronunciation feedback in Tamil language
- **Tamil Custom Practice**: Enter your own Tamil sentences to practice
- **Tamil Tongue Training**: Instructions and tips in Tamil for proper pronunciation

### 🌹 **Rose Gold Design Theme**
- **Elegant Rose Gold Gradient**: Beautiful rose gold (#E8B4B8 to #B76E79) background
- **Rose Gold UI Elements**: Buttons, cards, and interactive elements in rose gold tones
- **Blue Brand Elements**: "SpeakBee" name and symbols highlighted in blue (#4169E1) for visibility
- **Professional Appearance**: Sophisticated color scheme for healthcare applications
- **High Contrast**: Rose gold colors with excellent readability
- **Consistent Branding**: Rose gold theme with blue accent for the app name and symbols

### **Enhanced Tongue Training Features** 👅
- **One-Click Sound Practice**: Click on sounds (A, E, I, O, U, TH, R, L, S, Z) to automatically start practice
- **Custom Sound Input**: Enter your own sounds or words and click "Practice" to begin
- **Automatic Recording**: No manual start button - recording begins automatically
- **Unified Voice Recognition**: Single voice recognition system for all features
- **Real-time Feedback**: Get instant feedback on tongue position and accuracy
- **Tongue Position Scoring**: 0-100% accuracy scoring for tongue placement
- **Improvement Tips**: Personalized tips based on your performance
- **Text-based Guidance**: Clear instructions without images for better focus
- **Progressive Training**: Move through sounds systematically
- **Tamil Tongue Instructions**: Complete Tamil guidance for Tamil speakers

### **Practice Sessions**

#### **Word Practice**
1. Click "Word Practice" card
2. See the target word displayed
3. Click "Listen" to hear correct pronunciation
4. Click "Start Speaking" and pronounce the word
5. Receive instant scoring and feedback
6. Use "Next" to practice more words

#### **Sentence Practice**
1. Select "Sentence Practice"
2. Read the displayed sentence
3. Practice pronunciation with audio guidance
4. Get detailed accuracy feedback
5. Progress through various sentence complexities

#### **Free Speech**
1. Choose "Free Speech" mode
2. Speak naturally about any topic
3. Receive fluency and clarity analysis
4. Build confidence in natural conversation

### **Understanding Your Scores**

- **90-100%**: Excellent pronunciation ✅
- **75-89%**: Good progress, keep practicing 🟡
- **60-74%**: Improvement needed, focus on clarity 🟠
- **Below 60%**: Needs significant practice, speak slowly ⚠️

### **Progress Tracking**
- **Daily Streaks**: Practice daily to maintain streaks
- **Session History**: Review past performance
- **Accuracy Trends**: Monitor improvement over time
- **Level Progression**: Unlock achievements through consistent practice

## 🔧 Technical Details

### **Browser Compatibility**
- **Recommended**: Chrome, Edge (best speech recognition)
- **Supported**: Firefox, Safari (limited speech features)
- **Mobile**: iOS Safari, Android Chrome

### **Speech Recognition**
- Uses Web Speech API for real-time processing
- Supports 8 languages with native pronunciation models
- Continuous recognition with interim results
- Error handling for network and permission issues

### **Data Storage**
- All data stored locally in browser (localStorage)
- No external servers or data transmission
- Complete privacy protection
- Exportable session data

### **Performance**
- Lightweight application (~500KB total)
- Offline capable after initial load
- Responsive design for all screen sizes
- Optimized for low-end devices

## 🏥 For Healthcare Providers

### **Clinical Applications**
- **Stroke Recovery**: Post-stroke speech rehabilitation
- **Aphasia Treatment**: Language recovery exercises
- **Dysarthria Management**: Articulation improvement
- **General Speech Therapy**: Supplementary practice tool

### **Patient Monitoring**
- Detailed session logs for progress review
- Accuracy trends for treatment planning
- Practice frequency monitoring
- Objective improvement metrics

### **Recommended Usage**
- **Frequency**: 15-30 minutes daily
- **Progression**: Start with words, advance to sentences
- **Consistency**: Same time daily for routine building
- **Patience**: Focus on gradual improvement

## 🛠️ Troubleshooting

### **Microphone Issues**
- Ensure browser has microphone permissions
- Check system microphone settings
- Test with other applications
- Try refreshing the page

### **Speech Recognition Problems**
- Speak clearly and at moderate pace
- Ensure quiet environment
- Check internet connection
- Try different browser

### **Performance Issues**
- Close other browser tabs
- Clear browser cache
- Update browser to latest version
- Restart browser

## 🔮 Future Enhancements

- **Advanced AI Analysis**: Phoneme-level feedback
- **Therapist Dashboard**: Professional monitoring tools
- **Custom Exercises**: Personalized practice content
- **Voice Biomarkers**: Health condition monitoring
- **Telehealth Integration**: Remote therapy sessions
- **Family Sharing**: Progress sharing with caregivers

## 📞 Support & Resources

### **For Patients**
- Practice regularly for best results
- Start with easier modes and progress gradually
- Don't get discouraged by initial low scores
- Celebrate small improvements

### **For Caregivers**
- Encourage daily practice
- Celebrate progress milestones
- Provide quiet practice environment
- Monitor streak maintenance

### **For Therapists**
- Use as supplementary tool, not replacement
- Review session data regularly
- Adjust difficulty based on progress
- Integrate with traditional therapy methods

## 🤝 Contributing

This is an open-source project designed to help stroke patients and individuals with speech disabilities. Contributions are welcome for:

- Additional language support
- Improved speech analysis algorithms
- Accessibility enhancements
- Clinical validation studies

## 📄 License

This project is dedicated to improving the lives of stroke patients and individuals with speech disabilities. Use freely for personal, educational, and clinical purposes.

---

**Made with ❤️ for stroke recovery and speech rehabilitation**

*"Every word spoken is a step toward recovery"*

## Chatbot Integration (Demo)

This project includes a local demo chatbot UI. The assistant responds locally with simple helpful replies. It is intended as a front-end integration so you can later connect to a real AI service (for example, OpenAI) via a secure server-side proxy.

To run the demo locally:

1. Open a terminal and change directory to this folder (`model`).
2. Start a simple static server (Python):

```powershell
cd "c:\Users\Jayadharani\OneDrive\Desktop\speakbee demo\model"
python -m http.server 5500
```

3. Open your browser to http://localhost:5500 and click the floating chat button (bottom-right) to try the assistant.

Notes:
- If you want to connect to OpenAI, do NOT put your API key in the frontend. Create a small server to proxy requests and keep the key secret. A commented example is included in `script.js`.
- The chat is a local demo and does not send data anywhere by default.
