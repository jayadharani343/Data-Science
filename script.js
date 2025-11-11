// Global Variables
let currentUser = null;
let recognition = null;
let synthesis = null;
let isRecording = false;
let currentMode = null;
let currentLanguage = 'en-US';
let currentExerciseIndex = 0;
let sessionStartTime = null;

// Chatbot Variables
let chatBox = null;
let chatButton = null;
let chatMessages = null;
let userInput = null;
let sendButton = null;
let closeChat = null;

// Multi-language content (Tamil and English only)
const translations = {
    'en-US': {
        app_title: 'SpeakBee',
        app_subtitle: 'Empowering speech recovery through AI technology',
        welcome_back: 'Welcome Back',
        username: 'Username',
        password: 'Password',
        login: 'Login',
        new_user: 'New user?',
        sign_up_here: 'Sign up here',
        create_account: 'Create Account',
        choose_username: 'Choose Username',
        create_password: 'Create Password',
        confirm_password: 'Confirm Password',
        full_name: 'Full Name',
        age: 'Age',
        select_condition: 'Select Condition',
        stroke: 'Stroke Recovery',
        aphasia: 'Aphasia',
        dysarthria: 'Dysarthria',
        other: 'Other',
        sign_up: 'Sign Up',
        have_account: 'Already have an account?',
        login_here: 'Login here',
        welcome: 'Welcome',
        logout: 'Logout',
        day_streak: 'Day Streak',
        total_sessions: 'Total Sessions',
        avg_accuracy: 'Average Accuracy',
        level: 'Level',
        practice_modes: 'Practice Modes',
        word_practice: 'Word Practice',
        word_practice_desc: 'Practice individual words and sounds',
        sentence_practice: 'Sentence Practice',
        sentence_practice_desc: 'Practice complete sentences',
        conversation_practice: 'Free Speech',
        conversation_practice_desc: 'Speak freely and get feedback',
        custom_practice: 'Custom Practice',
        custom_practice_desc: 'Practice your own sentences',
        tongue_training: 'Tongue Training',
        tongue_training_desc: 'Learn tongue movements with visual guides',
        easy: 'Easy',
        medium: 'Medium',
        advanced: 'Advanced',
        hard: 'Hard',
        custom: 'Custom',
        guided: 'Guided',
        back: 'Back',
        practice: 'Practice',
        practice_this: 'Practice This:',
        listen: 'Listen',
        start_speaking: 'Start Speaking',
        stop: 'Stop',
        listening: 'Listening...',
        you_said: 'What you said:',
        click_start: 'Click "Start Speaking" to begin...',
        pronunciation_score: 'Pronunciation Score',
        feedback: 'Feedback:',
        try_again: 'Try Again',
        next: 'Next',
        recent_progress: 'Recent Progress',
        no_sessions: 'No sessions yet. Start practicing to see your progress!',
        settings: 'Settings',
        speech_rate: 'Speech Rate',
        difficulty: 'Difficulty Level',
        enter_custom_sentence: 'Enter Your Own Sentence:',
        set_sentence: 'Set Sentence',
        tongue_movement_guide: 'Tongue Movement Guide',
        select_sound: 'Select Sound to Practice:',
        detailed_analysis: 'Detailed Analysis:',
        word_breakdown: 'Word Breakdown:',
        timing_analysis: 'Speech Timing:',
        pause_analysis: 'Pauses:',
        fluency_score: 'Fluency:',
        pronunciation_issues: 'Areas for Improvement:',
        speech_pattern: 'Speech Pattern:',
        custom_sound_practice: 'Practice Custom Sound/Word:',
        enter_custom_sound: 'Enter custom sound or word...',
        practice_sound: 'Practice',
        listening_tongue: 'Listening for tongue practice...',
        tongue_feedback: 'Tongue Position Feedback:',
        tongue_accuracy: 'Tongue Accuracy',
        improvement_tips: 'Improvement Tips:',
        next_sound: 'Next Sound'
    },
    'ta-IN': {
        app_title: 'ஸ்பீக்பீ',
        app_subtitle: 'AI தொழில்நுட்பத்தின் மூலம் பேச்சு மீட்சியை வலுப்படுத்துதல்',
        welcome_back: 'மீண்டும் வரவேற்கிறோம்',
        username: 'பயனர் பெயர்',
        password: 'கடவுச்சொல்',
        login: 'உள்நுழைய',
        new_user: 'புதிய பயனரா?',
        sign_up_here: 'இங்கே பதிவு செய்யுங்கள்',
        create_account: 'கணக்கு உருவாக்கவும்',
        choose_username: 'பயனர் பெயரைத் தேர்ந்தெடுக்கவும்',
        create_password: 'கடவுச்சொல்லை உருவாக்கவும்',
        confirm_password: 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
        full_name: 'முழு பெயர்',
        age: 'வயது',
        select_condition: 'நிலையைத் தேர்ந்தெடுக்கவும்',
        stroke: 'பக்கவாதம் மீட்சி',
        aphasia: 'அஃபேசியா',
        dysarthria: 'டிசார்த்ரியா',
        other: 'மற்றவை',
        sign_up: 'பதிவு செய்யுங்கள்',
        have_account: 'ஏற்கனவே கணக்கு உள்ளதா?',
        login_here: 'இங்கே உள்நுழையவும்',
        welcome: 'வரவேற்கிறோம்',
        logout: 'வெளியேறு',
        day_streak: 'நாள் தொடர்ச்சி',
        total_sessions: 'மொத்த அமர்வுகள்',
        avg_accuracy: 'சராசரி துல்லியம்',
        level: 'நிலை',
        practice_modes: 'பயிற்சி முறைகள்',
        word_practice: 'சொல் பயிற்சி',
        word_practice_desc: 'தனிப்பட்ட சொற்கள் மற்றும் ஒலிகளை பயிற்சி செய்யுங்கள்',
        sentence_practice: 'வாக்கிய பயிற்சி',
        sentence_practice_desc: 'முழுமையான வாக்கியங்களை பயிற்சி செய்யுங்கள்',
        conversation_practice: 'இலவச பேச்சு',
        conversation_practice_desc: 'சுதந்திரமாக பேசி கருத்துக்களைப் பெறுங்கள்',
        custom_practice: 'தனிப்பயன் பயிற்சி',
        custom_practice_desc: 'உங்கள் சொந்த வாக்கியங்களை பயிற்சி செய்யுங்கள்',
        tongue_training: 'நாக்கு பயிற்சி',
        tongue_training_desc: 'காட்சி வழிகாட்டுதல்களுடன் நாக்கு இயக்கங்களைக் கற்றுக்கொள்ளுங்கள்',
        easy: 'எளிது',
        medium: 'நடுத்தர',
        advanced: 'மேம்பட்ட',
        hard: 'கடினம்',
        custom: 'தனிப்பயன்',
        guided: 'வழிகாட்டப்பட்ட',
        back: 'பின்',
        practice: 'பயிற்சி',
        practice_this: 'இதை பயிற்சி செய்யுங்கள்:',
        listen: 'கேளுங்கள்',
        start_speaking: 'பேச ஆரம்பிக்கவும்',
        stop: 'நிறுத்து',
        listening: 'கேட்கிறது...',
        you_said: 'நீங்கள் சொன்னது:',
        click_start: 'தொடங்க "பேச ஆரம்பிக்கவும்" என்பதைக் கிளிக் செய்யவும்...',
        pronunciation_score: 'உச்சரிப்பு மதிப்பெண்',
        feedback: 'கருத்து:',
        try_again: 'மீண்டும் முயற்சிக்கவும்',
        next: 'அடுத்து',
        recent_progress: 'சமீபத்திய முன்னேற்றம்',
        no_sessions: 'இன்னும் அமர்வுகள் இல்லை. உங்கள் முன்னேற்றத்தைக் காண பயிற்சி செய்யத் தொடங்குங்கள்!',
        settings: 'அமைப்புகள்',
        speech_rate: 'பேச்சு வேகம்',
        difficulty: 'சிரமம் நிலை',
        enter_custom_sentence: 'உங்கள் சொந்த வாக்கியத்தை உள்ளிடவும்:',
        set_sentence: 'வாக்கியத்தை அமைக்கவும்',
        tongue_movement_guide: 'நாக்கு இயக்க வழிகாட்டி',
        select_sound: 'பயிற்சி செய்ய ஒலியைத் தேர்ந்தெடுக்கவும்:',
        detailed_analysis: 'விரிவான பகுப்பாய்வு:',
        word_breakdown: 'சொல் பிரிவு:',
        timing_analysis: 'பேச்சு நேரம்:',
        pause_analysis: 'இடைநிறுத்தங்கள்:',
        fluency_score: 'சரளம்:',
        pronunciation_issues: 'மேம்பாட்டுக்கான பகுதிகள்:',
        speech_pattern: 'பேச்சு முறை:',
        custom_sound_practice: 'தனிப்பயன் ஒலி/சொல் பயிற்சி:',
        enter_custom_sound: 'தனிப்பயன் ஒலி அல்லது சொல்லை உள்ளிடவும்...',
        practice_sound: 'பயிற்சி',
        listening_tongue: 'நாக்கு பயிற்சிக்காக கேட்கிறது...',
        tongue_feedback: 'நாக்கு நிலை கருத்து:',
        tongue_accuracy: 'நாக்கு துல்லியம்',
        improvement_tips: 'மேம்பாட்டு குறிப்புகள்:',
        next_sound: 'அடுத்த ஒலி'
    }
};

// Exercise content for Tamil and English only
const exercises = {
    'en-US': {
        words: ['hello', 'world', 'speech', 'therapy', 'practice', 'recovery', 'strength', 'progress', 'communication', 'improvement', 'articulation', 'pronunciation', 'clarity', 'fluency', 'confidence', 'determination'],
        sentences: [
            'Hello, how are you today?',
            'I am practicing my speech.',
            'Speech therapy helps me communicate better.',
            'Every day I get stronger.',
            'Practice makes perfect.',
            'I can speak clearly and confidently.',
            'My voice is getting stronger.',
            'Communication is important to me.'
        ]
    },
    'ta-IN': {
        words: ['வணக்கம்', 'உலகம்', 'பேச்சு', 'சிகிச்சை', 'பயிற்சி', 'மீட்சி', 'வலிமை', 'முன்னேற்றம்', 'தொடர்பு', 'மேம்பாடு', 'உச்சரிப்பு', 'தெளிவு', 'சரளம்', 'நம்பிக்கை', 'உறுதி', 'மருத்துவம்'],
        sentences: [
            'வணக்கம், இன்று எப்படி இருக்கிறீர்கள்?',
            'நான் என் பேச்சை பயிற்சி செய்கிறேன்.',
            'பேச்சு சிகிச்சை எனக்கு சிறப்பாக தொடர்பு கொள்ள உதவுகிறது.',
            'ஒவ்வொரு நாளும் நான் வலுவாகிறேன்.',
            'பயிற்சி முழுமையை உருவாக்குகிறது.',
            'என்னால் தெளிவாகவும் நம்பிக்கையுடனும் பேச முடியும்.',
            'என் குரல் வலுவாகிறது.',
            'தொடர்பு எனக்கு முக்கியம்.'
        ]
    }
};

// Tongue movement guide data with Tamil translations
const tongueGuideData = {
    'a': {
        title: 'Sound: /a/',
        titleTamil: 'ஒலி: /அ/',
        instructions: 'Place your tongue flat and low in your mouth. Open your mouth wide.',
        instructionsTamil: 'உங்கள் நாக்கை வாயில் தட்டையாகவும் தாழ்வாகவும் வைக்கவும். வாயை அகலமாக திறக்கவும்.',
        tips: 'Keep your tongue relaxed and away from your teeth.',
        tipsTamil: 'உங்கள் நாக்கை தளர்வாக வைத்து பற்களிலிருந்து விலக்கி வைக்கவும்.'
    },
    'e': {
        title: 'Sound: /e/',
        titleTamil: 'ஒலி: /எ/',
        instructions: 'Raise your tongue slightly. Keep your mouth moderately open.',
        instructionsTamil: 'உங்கள் நாக்கை சற்று உயர்த்தவும். வாயை மிதமாக திறந்து வைக்கவும்.',
        tips: 'Tongue should be in the middle position, not too high or low.',
        tipsTamil: 'நாக்கு நடுநிலையில் இருக்க வேண்டும், மிக உயரமாகவோ தாழ்வாகவோ இல்லாமல்.'
    },
    'i': {
        title: 'Sound: /i/',
        titleTamil: 'ஒலி: /இ/',
        instructions: 'Raise your tongue high towards the roof of your mouth. Smile slightly.',
        instructionsTamil: 'உங்கள் நாக்கை வாயின் மேல்பகுதியை நோக்கி உயர்த்தவும். சற்று புன்னகையுங்கள்.',
        tips: 'Keep your tongue tense and high. Your mouth should be almost closed.',
        tipsTamil: 'உங்கள் நாக்கை இறுக்கமாகவும் உயரமாகவும் வைக்கவும். வாய் கிட்டத்தட்ட மூடியிருக்க வேண்டும்.'
    },
    'o': {
        title: 'Sound: /o/',
        instructions: 'Round your lips and raise the back of your tongue.',
        tips: 'Make your mouth round like you are saying "oh". Keep tongue back.',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjlmYWZiIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9Ijc1IiByPSIzNSIgZmlsbD0iI2ZkYmE3NCIvPgo8dGV4dCB4PSIxMDAiIHk9IjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzNzQxNTEiPi9vLyBTb3VuZDwvdGV4dD4KPC9zdmc+'
    },
    'u': {
        title: 'Sound: /u/',
        instructions: 'Round your lips tightly and raise the back of your tongue high.',
        tips: 'Make your lips very round and small. Tongue should be high and back.',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjlmYWZiIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9Ijc1IiByPSIyNSIgZmlsbD0iI2ZkYmE3NCIvPgo8dGV4dCB4PSIxMDAiIHk9IjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzNzQxNTEiPi91LyBTb3VuZDwvdGV4dD4KPC9zdmc+'
    },
    'th': {
        title: 'Sound: /th/',
        instructions: 'Place your tongue between your teeth and blow air gently.',
        tips: 'Tongue tip should touch your upper teeth lightly.',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjlmYWZiIi8+CjxlbGxpcHNlIGN4PSIxMDAiIGN5PSI0NSIgcng9IjQwIiByeT0iMTAiIGZpbGw9IiNmZGJhNzQiLz4KPHR4dCB4PSIxMDAiIHk9IjUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzNzQxNTEiPi90aC8gU291bmQ8L3RleHQ+CjwvdGV4dD4KPC9zdmc+'
    },
    'r': {
        title: 'Sound: /r/',
        instructions: 'Curl your tongue tip up towards the roof of your mouth without touching.',
        tips: 'Keep tongue tense and curved. Do not let it touch the roof.',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjlmYWZiIi8+CjxwYXRoIGQ9Ik02MCA4MEM2MCA2MCA4MCA0MCAxMDAgNDBDMTIwIDQwIDE0MCA2MCA1NCA4MCIgZmlsbD0iI2ZkYmE3NCIvPgo8dGV4dCB4PSIxMDAiIHk9Ijg1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzNzQxNTEiPi9yLyBTb3VuZDwvdGV4dD4KPC9zdmc+'
    },
    'l': {
        title: 'Sound: /l/',
        instructions: 'Touch the tip of your tongue to the roof of your mouth behind your teeth.',
        tips: 'Keep tongue tip pressed against the alveolar ridge.',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjlmYWZiIi8+CjxlbGxpcHNlIGN4PSIxMDAiIGN5PSI0MCIgcng9IjMwIiByeT0iOCIgZmlsbD0iI2ZkYmE3NCIvPgo8dGV4dCB4PSIxMDAiIHk9IjQ1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzNzQxNTEiPi9sLyBTb3VuZDwvdGV4dD4KPC9zdmc+'
    },
    's': {
        title: 'Sound: /s/',
        instructions: 'Place your tongue close to the roof of your mouth and blow air through.',
        tips: 'Create a narrow channel for air to pass through.',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjlmYWZiIi8+CjxlbGxpcHNlIGN4PSIxMDAiIGN5PSI1MCIgcng9IjUwIiByeT0iMTUiIGZpbGw9IiNmZGJhNzQiLz4KPHR4dCB4PSIxMDAiIHk9IjU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzNzQxNTEiPi9zLyBTb3VuZDwvdGV4dD4KPC9zdmc+'
    },
    'z': {
        title: 'Sound: /z/',
        instructions: 'Same position as /s/ but add voice vibration.',
        tips: 'Feel the vibration in your throat while making the /s/ sound.',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjZjlmYWZiIi8+CjxlbGxpcHNlIGN4PSIxMDAiIGN5PSI1MCIgcng9IjUwIiByeT0iMTUiIGZpbGw9IiNmZGJhNzQiLz4KPGNpcmNsZSBjeD0iMTIwIiBjeT0iNDAiIHI9IjMiIGZpbGw9IiNlZjQ0NDQiLz4KPHR4dCB4PSIxMDAiIHk9IjU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzNzQxNTEiPi96LyBTb3VuZDwvdGV4dD4KPC9zdmc+'
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    checkExistingSession();
    
    // Initialize the chatbot
    if (window.SpeakBeeChatbot) {
        window.SpeakBeeChatbot.init();
    }
});

function initializeApp() {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = currentLanguage;
        
        recognition.onresult = handleSpeechResult;
        recognition.onerror = handleSpeechError;
        recognition.onend = handleSpeechEnd;
        recognition.onstart = handleSpeechStart;
    } else {
        showNotification('Speech recognition is not supported in this browser. Please use Chrome or Edge.', 'error');
    }

    // Initialize Speech Synthesis
    if ('speechSynthesis' in window) {
        synthesis = window.speechSynthesis;
    }

    // Set initial language
    updateLanguage(currentLanguage);
}

function setupEventListeners() {
    // Language selectors
    document.getElementById('languageSelect').addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });
    
    document.getElementById('appLanguageSelect').addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });

    // Authentication
    document.getElementById('showSignup').addEventListener('click', showSignupForm);
    document.getElementById('showLogin').addEventListener('click', showLoginForm);
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    // Practice modes
    document.getElementById('wordPractice').addEventListener('click', () => startPracticeMode('word'));
    document.getElementById('sentencePractice').addEventListener('click', () => startPracticeMode('sentence'));
    document.getElementById('conversationPractice').addEventListener('click', () => startPracticeMode('conversation'));
    document.getElementById('customPractice').addEventListener('click', () => startPracticeMode('custom'));
    document.getElementById('tongueTraining').addEventListener('click', () => startPracticeMode('tongue'));

    // Practice controls
    document.getElementById('startRecording').addEventListener('click', startRecording);
    document.getElementById('stopRecording').addEventListener('click', stopRecording);
    document.getElementById('backToMenu').addEventListener('click', backToMenu);
    document.getElementById('tryAgain').addEventListener('click', tryAgain);
    document.getElementById('nextExercise').addEventListener('click', nextExercise);
    document.getElementById('playTarget').addEventListener('click', playTargetAudio);

    // Custom sentence and tongue training
    document.getElementById('setCustomSentence').addEventListener('click', setCustomSentence);
    document.getElementById('practiceCustomSound').addEventListener('click', practiceCustomSound);
    document.getElementById('tryTongueAgain').addEventListener('click', tryTongueAgain);
    document.getElementById('nextTongueExercise').addEventListener('click', nextTongueExercise);

    // Sound buttons for tongue training
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('sound-btn')) {
            selectSound(e.target.dataset.sound);
        }
    });

    // Settings
    document.getElementById('settingsBtn').addEventListener('click', showSettings);
    document.getElementById('closeSettings').addEventListener('click', hideSettings);
    document.getElementById('speechRate').addEventListener('input', updateSpeechRate);
    document.getElementById('difficultyLevel').addEventListener('change', updateDifficulty);
}

function updateLanguage(lang) {
    currentLanguage = lang;

    // Update recognition language
    if (recognition) {
        recognition.lang = lang;
    }

    // Update UI text
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    // Update input placeholders specifically for Tamil
    if (lang === 'ta-IN') {
        updateTamilPlaceholders();
        changeBackgroundColor('#E9DBC4'); // Tamil background color
        // Update any existing content to Tamil
        updateExistingContentToTamil();
    } else {
        changeBackgroundColor('linear-gradient(135deg, #E8B4B8 0%, #B76E79 100%)'); // Rose gold gradient
        // Reset content to English
        resetContentToEnglish();
    }

    // Update language selectors
    document.getElementById('languageSelect').value = lang;
    if (document.getElementById('appLanguageSelect')) {
        document.getElementById('appLanguageSelect').value = lang;
    }

    // Update current exercise if in practice mode
    if (currentMode) {
        updateCurrentExercise();
    }
}

function updateTamilPlaceholders() {
    // Update specific input placeholders for Tamil
    const customTextarea = document.getElementById('customSentenceText');
    if (customTextarea) {
        customTextarea.placeholder = 'உங்கள் வாக்கியத்தை இங்கே தட்டச்சு செய்யுங்கள்...';
    }

    // Update other input fields
    const inputs = {
        'loginUsername': 'பயனர் பெயரை உள்ளிடவும்',
        'loginPassword': 'கடவுச்சொல்லை உள்ளிடவும்',
        'signupUsername': 'பயனர் பெயரைத் தேர்ந்தெடுக்கவும்',
        'signupPassword': 'கடவுச்சொல்லை உருவாக்கவும்',
        'confirmPassword': 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
        'fullName': 'முழு பெயரை உள்ளிடவும்',
        'age': 'வயதை உள்ளிடவும்'
    };

    Object.keys(inputs).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.placeholder = inputs[id];
        }
    });

    // Update select options for Tamil
    const conditionSelect = document.getElementById('condition');
    if (conditionSelect) {
        const options = conditionSelect.querySelectorAll('option');
        const tamilOptions = [
            'நிலையைத் தேர்ந்தெடுக்கவும்',
            'பக்கவாதம் மீட்சி',
            'அஃபேசியா',
            'டிசார்த்ரியா',
            'மற்றவை'
        ];
        options.forEach((option, index) => {
            if (tamilOptions[index]) {
                option.textContent = tamilOptions[index];
            }
        });
    }

    // Update difficulty level select options
    const difficultySelect = document.getElementById('difficultyLevel');
    if (difficultySelect) {
        const difficultyOptions = difficultySelect.querySelectorAll('option');
        const tamilDifficultyOptions = [
            'எளிது',
            'நடுத்தர',
            'கடினம்'
        ];
        difficultyOptions.forEach((option, index) => {
            if (tamilDifficultyOptions[index]) {
                option.textContent = tamilDifficultyOptions[index];
            }
        });
    }

    // Update speech rate label
    const speechRateValue = document.getElementById('speechRateValue');
    if (speechRateValue) {
        const currentRate = document.getElementById('speechRate').value;
        speechRateValue.textContent = `${currentRate}x`;
    }

    // Update all button texts to Tamil
    updateButtonTextsToTamil();
}

function updateButtonTextsToTamil() {
    // Update sound buttons for tongue training
    const soundButtons = document.querySelectorAll('.sound-btn');
    const tamilSounds = {
        'a': 'அ',
        'e': 'எ',
        'i': 'இ',
        'o': 'ஒ',
        'u': 'உ',
        'th': 'த',
        'r': 'ர',
        'l': 'ல',
        's': 'ச',
        'z': 'ழ'
    };

    soundButtons.forEach(btn => {
        const sound = btn.dataset.sound;
        if (tamilSounds[sound]) {
            btn.textContent = tamilSounds[sound];
        }
    });
}

function updateExistingContentToTamil() {
    // Update any displayed target text if in practice mode
    const targetText = document.getElementById('targetText');
    if (targetText && currentMode && exercises['ta-IN']) {
        if (currentMode === 'word') {
            const tamilWord = exercises['ta-IN'].words[currentExerciseIndex % exercises['ta-IN'].words.length];
            targetText.textContent = tamilWord;
        } else if (currentMode === 'sentence') {
            const tamilSentence = exercises['ta-IN'].sentences[currentExerciseIndex % exercises['ta-IN'].sentences.length];
            targetText.textContent = tamilSentence;
        }
    }

    // Update welcome message if user is logged in
    if (currentUser) {
        const welcomeElement = document.getElementById('welcomeUser');
        if (welcomeElement) {
            welcomeElement.textContent = `வரவேற்கிறோம், ${currentUser.fullName}!`;
        }
    }
}

function resetContentToEnglish() {
    // Reset any displayed target text if in practice mode
    const targetText = document.getElementById('targetText');
    if (targetText && currentMode && exercises['en-US']) {
        if (currentMode === 'word') {
            const englishWord = exercises['en-US'].words[currentExerciseIndex % exercises['en-US'].words.length];
            targetText.textContent = englishWord;
        } else if (currentMode === 'sentence') {
            const englishSentence = exercises['en-US'].sentences[currentExerciseIndex % exercises['en-US'].sentences.length];
            targetText.textContent = englishSentence;
        }
    }

    // Reset welcome message if user is logged in
    if (currentUser) {
        const welcomeElement = document.getElementById('welcomeUser');
        if (welcomeElement) {
            welcomeElement.textContent = `Welcome, ${currentUser.fullName}!`;
        }
    }

    // Reset sound buttons to English
    const soundButtons = document.querySelectorAll('.sound-btn');
    const englishSounds = ['A', 'E', 'I', 'O', 'U', 'TH', 'R', 'L', 'S', 'Z'];
    soundButtons.forEach((btn, index) => {
        if (englishSounds[index]) {
            btn.textContent = englishSounds[index];
        }
    });
}

function changeBackgroundColor(color) {
    if (color === '#E9DBC4') {
        document.body.classList.add('tamil-mode');
        document.body.style.background = color;
    } else {
        document.body.classList.remove('tamil-mode');
        document.body.style.background = color;
    }
}

function checkExistingSession() {
    const savedUser = localStorage.getItem('speechcare_currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainApp();
        updateUserStats();
        updateStreak();
    }
}

// Authentication Functions
function showSignupForm(e) {
    e.preventDefault();
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
}

function showLoginForm(e) {
    e.preventDefault();
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!username || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    const users = JSON.parse(localStorage.getItem('speechcare_users') || '{}');

    if (users[username] && users[username].password === password) {
        currentUser = users[username];
        localStorage.setItem('speechcare_currentUser', JSON.stringify(currentUser));
        showMainApp();
        updateUserStats();
        updateStreak();
        showNotification(`Welcome back, ${currentUser.fullName}!`, 'success');
    } else {
        showNotification('Invalid username or password', 'error');
    }
}

function handleSignup(e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const fullName = document.getElementById('fullName').value.trim();
    const age = parseInt(document.getElementById('age').value);
    const condition = document.getElementById('condition').value;

    // Validation
    if (!username || !password || !fullName || !age || !condition) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }

    if (password.length < 6) {
        showNotification('Password must be at least 6 characters long', 'error');
        return;
    }

    const users = JSON.parse(localStorage.getItem('speechcare_users') || '{}');

    if (users[username]) {
        showNotification('Username already exists', 'error');
        return;
    }

    // Create new user
    const newUser = {
        username: username,
        password: password,
        fullName: fullName,
        age: age,
        condition: condition,
        streak: 0,
        totalSessions: 0,
        averageAccuracy: 0,
        level: 1,
        sessions: [],
        lastLoginDate: new Date().toDateString(),
        createdDate: new Date().toDateString(),
        settings: {
            speechRate: 0.8,
            difficulty: 'easy'
        }
    };

    users[username] = newUser;
    localStorage.setItem('speechcare_users', JSON.stringify(users));

    currentUser = newUser;
    localStorage.setItem('speechcare_currentUser', JSON.stringify(currentUser));

    showMainApp();
    updateUserStats();
    showNotification('Account created successfully! Welcome to SpeechCare!', 'success');
}

function handleLogout() {
    localStorage.removeItem('speechcare_currentUser');
    currentUser = null;
    document.getElementById('app-container').classList.add('hidden');
    document.getElementById('auth-container').classList.remove('hidden');

    // Reset forms
    document.getElementById('loginForm').reset();
    document.getElementById('signupForm').reset();
    showLoginForm({ preventDefault: () => {} });

    showNotification('Logged out successfully', 'success');
}

function showMainApp() {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    document.getElementById('welcomeUser').textContent = `Welcome, ${currentUser.fullName}!`;
}

// Practice Mode Functions
function startPracticeMode(mode) {
    currentMode = mode;
    currentExerciseIndex = 0;
    sessionStartTime = new Date();

    // Hide dashboard and show practice area
    document.querySelector('.dashboard').classList.add('hidden');
    document.querySelector('.practice-modes').classList.add('hidden');
    document.querySelector('.progress-history').classList.add('hidden');
    document.getElementById('practiceArea').classList.remove('hidden');

    // Update practice title
    const titles = {
        word: translations[currentLanguage].word_practice,
        sentence: translations[currentLanguage].sentence_practice,
        conversation: translations[currentLanguage].conversation_practice,
        custom: translations[currentLanguage].custom_practice,
        tongue: translations[currentLanguage].tongue_training
    };
    document.getElementById('practiceTitle').textContent = titles[mode];

    // Setup exercise based on mode
    if (mode === 'custom') {
        setupCustomMode();
    } else if (mode === 'tongue') {
        setupTongueTrainingMode();
    } else {
        updateCurrentExercise();
    }
    resetPracticeInterface();
}

function setupCustomMode() {
    document.getElementById('customSentenceInput').classList.remove('hidden');
    document.getElementById('targetDisplay').classList.add('hidden');
    document.getElementById('tongueGuide').classList.add('hidden');
}

function setupTongueTrainingMode() {
    document.getElementById('customSentenceInput').classList.add('hidden');
    document.getElementById('targetDisplay').classList.add('hidden');
    document.getElementById('tongueGuide').classList.remove('hidden');

    // Initialize with first sound
    selectSound('a');
}

function setCustomSentence() {
    const customText = document.getElementById('customSentenceText').value.trim();
    if (!customText) {
        showNotification('Please enter a sentence to practice', 'warning');
        return;
    }

    // Set the custom sentence as target
    document.getElementById('targetText').textContent = customText;
    document.getElementById('customSentenceInput').classList.add('hidden');
    document.getElementById('targetDisplay').classList.remove('hidden');

    showNotification('Custom sentence set! You can now practice.', 'success');
}

function selectSound(sound) {
    // Remove active class from all buttons
    document.querySelectorAll('.sound-btn').forEach(btn => btn.classList.remove('active'));

    // Add active class to selected button
    const selectedBtn = document.querySelector(`[data-sound="${sound}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }

    // Set current sound for practice
    currentTongueSound = sound;

    // Update tongue guide based on current language
    const guideData = tongueGuideData[sound];
    if (guideData) {
        if (currentLanguage === 'ta-IN') {
            // Use Tamil content
            document.getElementById('soundTitle').textContent = guideData.titleTamil || guideData.title;
            document.getElementById('tongueInstructions').textContent = guideData.instructionsTamil || guideData.instructions;
            document.getElementById('tipText').textContent = guideData.tipsTamil || guideData.tips;
        } else {
            // Use English content
            document.getElementById('soundTitle').textContent = guideData.title;
            document.getElementById('tongueInstructions').textContent = guideData.instructions;
            document.getElementById('tipText').textContent = guideData.tips;
        }
        // Image removed as requested
    }

    // Automatically start recording after a short delay
    setTimeout(() => {
        startTongueRecording();
    }, 1500);
}

function updateCurrentExercise() {
    if (!currentMode || !exercises[currentLanguage]) return;

    const targetDisplay = document.getElementById('targetDisplay');
    const targetText = document.getElementById('targetText');
    const targetTranslation = document.getElementById('targetTranslation');
    const customSentenceInput = document.getElementById('customSentenceInput');
    const tongueGuide = document.getElementById('tongueGuide');

    // Hide all displays first
    targetDisplay.style.display = 'none';
    customSentenceInput.classList.add('hidden');
    tongueGuide.classList.add('hidden');

    if (currentMode === 'conversation') {
        return; // No target display for free conversation
    } else if (currentMode === 'custom') {
        customSentenceInput.classList.remove('hidden');
        return;
    } else if (currentMode === 'tongue') {
        tongueGuide.classList.remove('hidden');
        selectSound('a'); // Default to 'a' sound
        return;
    }

    // Show target display for word and sentence modes
    targetDisplay.style.display = 'block';

    let exerciseContent;
    if (currentMode === 'word') {
        exerciseContent = exercises[currentLanguage].words[currentExerciseIndex % exercises[currentLanguage].words.length];
    } else if (currentMode === 'sentence') {
        exerciseContent = exercises[currentLanguage].sentences[currentExerciseIndex % exercises[currentLanguage].sentences.length];
    }

    targetText.textContent = exerciseContent;

    // Show translation if different language
    if (currentLanguage !== 'en-US' && exercises['en-US']) {
        let englishContent;
        if (currentMode === 'word') {
            englishContent = exercises['en-US'].words[currentExerciseIndex % exercises['en-US'].words.length];
        } else if (currentMode === 'sentence') {
            englishContent = exercises['en-US'].sentences[currentExerciseIndex % exercises['en-US'].sentences.length];
        }
        targetTranslation.textContent = `(${englishContent})`;
        targetTranslation.style.display = 'block';
    } else {
        targetTranslation.style.display = 'none';
    }
}

function resetPracticeInterface() {
    document.getElementById('speechResult').innerHTML = `<span>${translations[currentLanguage].click_start}</span>`;
    document.getElementById('resultsPanel').classList.add('hidden');
    document.getElementById('startRecording').classList.remove('hidden');
    document.getElementById('stopRecording').classList.add('hidden');
    document.getElementById('recordingIndicator').classList.add('hidden');
}

// Speech Recognition Functions
function startRecording() {
    if (!recognition) {
        showNotification('Speech recognition not available', 'error');
        return;
    }

    isRecording = true;
    document.getElementById('startRecording').classList.add('hidden');
    document.getElementById('stopRecording').classList.remove('hidden');
    document.getElementById('recordingIndicator').classList.remove('hidden');
    document.getElementById('speechResult').innerHTML = `<span>${translations[currentLanguage].listening}</span>`;

    try {
        recognition.start();
    } catch (error) {
        console.error('Speech recognition error:', error);
        stopRecording();
        showNotification('Failed to start speech recognition', 'error');
    }
}

function stopRecording() {
    if (recognition && isRecording) {
        recognition.stop();
    }

    isRecording = false;
    document.getElementById('startRecording').classList.remove('hidden');
    document.getElementById('stopRecording').classList.add('hidden');
    document.getElementById('recordingIndicator').classList.add('hidden');
}

function handleSpeechStart() {
    console.log('Speech recognition started');
}

function handleSpeechResult(event) {
    let finalTranscript = '';
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
            finalTranscript += transcript;
        } else {
            interimTranscript += transcript;
        }
    }

    const speechResult = document.getElementById('speechResult');
    speechResult.textContent = finalTranscript + interimTranscript;

    if (finalTranscript.trim()) {
        setTimeout(() => {
            analyzeResults(finalTranscript.trim());
        }, 500);
    }
}

function handleSpeechError(event) {
    console.error('Speech recognition error:', event.error);
    stopRecording();

    let errorMessage = 'Speech recognition error occurred';
    switch (event.error) {
        case 'no-speech':
            errorMessage = 'No speech detected. Please try again.';
            break;
        case 'audio-capture':
            errorMessage = 'Microphone not accessible. Please check permissions.';
            break;
        case 'not-allowed':
            errorMessage = 'Microphone permission denied. Please allow microphone access.';
            break;
        case 'network':
            errorMessage = 'Network error. Please check your connection.';
            break;
    }

    document.getElementById('speechResult').textContent = errorMessage;
    showNotification(errorMessage, 'error');
}

function handleSpeechEnd() {
    if (isRecording) {
        stopRecording();
    }
}

// Speech Analysis and Scoring
function analyzeResults(spokenText) {
    const resultsPanel = document.getElementById('resultsPanel');
    const scoreValue = document.getElementById('scoreValue');
    const scoreCategory = document.getElementById('scoreCategory');
    const feedbackText = document.getElementById('feedbackText');

    let targetText = '';
    let accuracy = 0;
    let feedback = '';

    if (currentMode === 'conversation') {
        // Free speech mode - analyze fluency and clarity
        accuracy = analyzeFreeSpech(spokenText);
        feedback = generateFreeSpeechFeedback(spokenText, accuracy);
    } else {
        // Word or sentence practice - compare with target
        targetText = document.getElementById('targetText').textContent.toLowerCase();
        accuracy = calculatePronunciationAccuracy(targetText, spokenText.toLowerCase());
        feedback = generatePronunciationFeedback(targetText, spokenText, accuracy);
    }

    // Update score display
    scoreValue.textContent = Math.round(accuracy);
    updateScoreCircle(accuracy);

    // Update score category
    let category = '';
    let categoryClass = '';
    if (accuracy >= 90) {
        category = 'Excellent!';
        categoryClass = 'excellent';
    } else if (accuracy >= 75) {
        category = 'Good!';
        categoryClass = 'good';
    } else if (accuracy >= 60) {
        category = 'Keep Practicing!';
        categoryClass = 'good';
    } else {
        category = 'Needs Improvement';
        categoryClass = 'needs-improvement';
    }

    scoreCategory.textContent = category;
    scoreCategory.className = `score-category ${categoryClass}`;

    // Update feedback
    feedbackText.textContent = feedback;

    // Show results
    resultsPanel.classList.remove('hidden');

    // Save session data
    saveSessionData(spokenText, targetText, accuracy);

    // Show detailed analysis
    showDetailedAnalysis(spokenText, targetText, accuracy);
}

function showDetailedAnalysis(spokenText, targetText, accuracy) {
    // Word-by-word breakdown
    const wordBreakdown = document.getElementById('wordBreakdown');
    if (targetText && currentMode !== 'conversation') {
        const targetWords = targetText.toLowerCase().split(/\s+/);
        const spokenWords = spokenText.toLowerCase().split(/\s+/);

        wordBreakdown.innerHTML = targetWords.map((word, index) => {
            let className = 'word-item ';
            if (index < spokenWords.length) {
                const similarity = calculateWordSimilarity(word, spokenWords[index]);
                if (similarity > 0.8) className += 'correct';
                else if (similarity > 0.5) className += 'partial';
                else className += 'incorrect';
            } else {
                className += 'incorrect';
            }
            return `<span class="${className}">${word}</span>`;
        }).join('');
    } else {
        wordBreakdown.innerHTML = '<span class="word-item correct">Free speech mode - no word comparison</span>';
    }

    // Speech timing analysis
    const words = spokenText.split(/\s+/).filter(word => word.length > 0);
    const speechRate = Math.round((words.length / (sessionStartTime ? (new Date() - sessionStartTime) / 60000 : 1)) * 60);
    document.getElementById('speechRate').textContent = `${speechRate} words/min`;

    // Pause analysis
    const pauseAnalysis = speechRate < 100 ? 'Slow pace' : speechRate > 180 ? 'Fast pace' : 'Normal pace';
    document.getElementById('pauseAnalysis').textContent = pauseAnalysis;

    // Fluency score
    const fluencyScore = Math.min(100, Math.max(60, accuracy + (speechRate > 80 && speechRate < 160 ? 10 : -5)));
    document.getElementById('fluencyScore').textContent = `${Math.round(fluencyScore)}%`;

    // Pronunciation issues
    const issues = identifyPronunciationIssues(spokenText, targetText);
    const issuesContainer = document.getElementById('pronunciationIssues');
    if (issues.length > 0) {
        issuesContainer.innerHTML = issues.map(issue => `
            <div class="issue-item">
                <h6>${issue.type}</h6>
                <p>${issue.description}</p>
            </div>
        `).join('');
    } else {
        issuesContainer.innerHTML = '<div class="issue-item"><h6>Great job!</h6><p>No major pronunciation issues detected.</p></div>';
    }

    // Draw waveform (simplified visualization)
    drawSpeechWaveform(spokenText);
}

function identifyPronunciationIssues(spoken, target) {
    const issues = [];

    if (!target || currentMode === 'conversation') {
        // For free speech, provide general feedback
        const words = spoken.split(/\s+/);
        if (words.length < 3) {
            issues.push({
                type: 'Length',
                description: 'Try speaking longer sentences to improve fluency.'
            });
        }
        return issues;
    }

    const targetWords = target.toLowerCase().split(/\s+/);
    const spokenWords = spoken.toLowerCase().split(/\s+/);

    // Check for missing words
    if (spokenWords.length < targetWords.length) {
        issues.push({
            type: 'Incomplete Speech',
            description: 'Some words were not spoken. Try to complete the full sentence.'
        });
    }

    // Check for word accuracy
    let incorrectCount = 0;
    targetWords.forEach((word, index) => {
        if (index < spokenWords.length) {
            const similarity = calculateWordSimilarity(word, spokenWords[index]);
            if (similarity < 0.7) {
                incorrectCount++;
            }
        }
    });

    if (incorrectCount > targetWords.length * 0.3) {
        issues.push({
            type: 'Pronunciation Clarity',
            description: 'Focus on pronouncing each word clearly and slowly.'
        });
    }

    return issues;
}

function drawSpeechWaveform(spokenText) {
    const canvas = document.getElementById('waveformCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Simple waveform visualization based on text
    const words = spokenText.split(/\s+/);
    const barWidth = canvas.width / Math.max(words.length, 10);

    ctx.fillStyle = '#4f46e5';
    words.forEach((word, index) => {
        const height = (word.length / 10) * canvas.height * 0.8;
        const x = index * barWidth;
        const y = (canvas.height - height) / 2;

        ctx.fillRect(x, y, barWidth - 2, height);
    });

    // Add baseline
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
}

function calculatePronunciationAccuracy(target, spoken) {
    // Normalize text
    target = target.replace(/[^\w\s]/g, '').toLowerCase();
    spoken = spoken.replace(/[^\w\s]/g, '').toLowerCase();

    // Split into words
    const targetWords = target.split(/\s+/).filter(word => word.length > 0);
    const spokenWords = spoken.split(/\s+/).filter(word => word.length > 0);

    if (targetWords.length === 0) return 0;

    let totalScore = 0;
    let wordCount = 0;

    // Compare each target word with spoken words
    for (let i = 0; i < targetWords.length; i++) {
        const targetWord = targetWords[i];
        let bestMatch = 0;

        // Find best matching spoken word
        for (let j = 0; j < spokenWords.length; j++) {
            const spokenWord = spokenWords[j];
            const similarity = calculateWordSimilarity(targetWord, spokenWord);
            bestMatch = Math.max(bestMatch, similarity);
        }

        totalScore += bestMatch;
        wordCount++;
    }

    // Penalty for extra words
    const extraWords = Math.max(0, spokenWords.length - targetWords.length);
    const penalty = extraWords * 0.1;

    const accuracy = Math.max(0, (totalScore / wordCount) - penalty) * 100;
    return Math.min(100, accuracy);
}

function calculateWordSimilarity(word1, word2) {
    if (word1 === word2) return 1.0;

    // Levenshtein distance
    const matrix = [];
    const len1 = word1.length;
    const len2 = word2.length;

    for (let i = 0; i <= len1; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = word1[i - 1] === word2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }

    const distance = matrix[len1][len2];
    const maxLen = Math.max(len1, len2);
    return maxLen === 0 ? 1 : (maxLen - distance) / maxLen;
}

function analyzeFreeSpech(spokenText) {
    const words = spokenText.split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;

    // Base score on word count and complexity
    let score = Math.min(90, wordCount * 5);

    // Bonus for longer sentences
    if (wordCount > 5) score += 10;
    if (wordCount > 10) score += 10;

    // Bonus for varied vocabulary
    const uniqueWords = new Set(words.map(word => word.toLowerCase()));
    const vocabularyRatio = uniqueWords.size / wordCount;
    score += vocabularyRatio * 20;

    return Math.min(100, Math.max(60, score));
}

function generatePronunciationFeedback(target, spoken, accuracy) {
    const feedbacks = {
        'en-US': {
            excellent: [
                "Excellent pronunciation! Your speech is very clear.",
                "Perfect! You pronounced that beautifully.",
                "Outstanding! Your articulation is excellent."
            ],
            good: [
                "Good job! Your pronunciation is improving.",
                "Well done! Keep practicing to perfect it.",
                "Nice work! You're making great progress."
            ],
            needsWork: [
                "Keep practicing! Try speaking more slowly.",
                "Good effort! Focus on each syllable.",
                "You're improving! Practice makes perfect."
            ]
        },
        'ta-IN': {
            excellent: [
                "சிறந்த உச்சரிப்பு! உங்கள் பேச்சு மிகவும் தெளிவாக உள்ளது.",
                "சரியானது! நீங்கள் அதை அழகாக உச்சரித்தீர்கள்.",
                "சிறப்பானது! உங்கள் உச்சரிப்பு மிகச்சிறந்தது."
            ],
            good: [
                "நல்ல வேலை! உங்கள் உச்சரிப்பு மேம்பட்டு வருகிறது.",
                "நன்றாக செய்தீர்கள்! முழுமையாக்க தொடர்ந்து பயிற்சி செய்யுங்கள்.",
                "நல்ல வேலை! நீங்கள் சிறந்த முன்னேற்றம் காட்டுகிறீர்கள்."
            ],
            needsWork: [
                "தொடர்ந்து பயிற்சி செய்யுங்கள்! மெதுவாக பேச முயற்சிக்கவும்.",
                "நல்ல முயற்சி! ஒவ்வொரு எழுத்திலும் கவனம் செலுத்துங்கள்.",
                "நீங்கள் மேம்பட்டு வருகிறீர்கள்! பயிற்சி முழுமையை உருவாக்குகிறது."
            ]
        }
    };

    const langFeedbacks = feedbacks[currentLanguage] || feedbacks['en-US'];
    let category;

    if (accuracy >= 90) {
        category = langFeedbacks.excellent;
    } else if (accuracy >= 75) {
        category = langFeedbacks.good;
    } else {
        category = langFeedbacks.needsWork;
    }

    return category[Math.floor(Math.random() * category.length)];
}

function generateFreeSpeechFeedback(spokenText, accuracy) {
    const wordCount = spokenText.split(/\s+/).filter(word => word.length > 0).length;

    const feedbacks = {
        'en-US': [
            `Great! You spoke ${wordCount} words clearly.`,
            `Excellent free speech! Your fluency is improving.`,
            `Well done! You expressed yourself clearly.`,
            `Good job! Your communication skills are developing.`
        ],
        'ta-IN': [
            `சிறப்பு! நீங்கள் ${wordCount} சொற்களை தெளிவாக பேசினீர்கள்.`,
            `சிறந்த இலவச பேச்சு! உங்கள் சரளம் மேம்பட்டு வருகிறது.`,
            `நன்றாக செய்தீர்கள்! நீங்கள் தெளிவாக வெளிப்படுத்தினீர்கள்.`,
            `நல்ல வேலை! உங்கள் தொடர்பு திறன்கள் வளர்ந்து வருகின்றன.`
        ]
    };

    const langFeedbacks = feedbacks[currentLanguage] || feedbacks['en-US'];
    return langFeedbacks[Math.floor(Math.random() * langFeedbacks.length)];
}

function updateScoreCircle(score) {
    const scoreCircle = document.querySelector('.score-circle');
    scoreCircle.style.setProperty('--score', score);

    // Update color based on score
    let color;
    if (score >= 90) {
        color = '#22c55e'; // Green
    } else if (score >= 75) {
        color = '#f59e0b'; // Yellow
    } else {
        color = '#ef4444'; // Red
    }

    scoreCircle.style.background = `conic-gradient(${color} 0deg, ${color} ${score * 3.6}deg, var(--bg-tertiary) ${score * 3.6}deg)`;
}

// Session Management
function saveSessionData(spokenText, targetText, accuracy) {
    const session = {
        id: Date.now(),
        date: new Date().toISOString(),
        mode: currentMode,
        language: currentLanguage,
        spokenText: spokenText,
        targetText: targetText,
        accuracy: Math.round(accuracy),
        duration: sessionStartTime ? Math.round((new Date() - sessionStartTime) / 1000) : 0
    };

    currentUser.sessions.push(session);
    currentUser.totalSessions++;

    // Update average accuracy
    const totalAccuracy = currentUser.sessions.reduce((sum, s) => sum + s.accuracy, 0);
    currentUser.averageAccuracy = Math.round(totalAccuracy / currentUser.sessions.length);

    // Update level based on total sessions and accuracy
    updateUserLevel();

    // Save to localStorage
    const users = JSON.parse(localStorage.getItem('speechcare_users') || '{}');
    users[currentUser.username] = currentUser;
    localStorage.setItem('speechcare_users', JSON.stringify(users));
    localStorage.setItem('speechcare_currentUser', JSON.stringify(currentUser));

    // Update UI
    updateUserStats();
    updateSessionHistory();
}

function updateUserLevel() {
    const sessionsPerLevel = 10;
    const accuracyBonus = currentUser.averageAccuracy > 80 ? 1 : 0;
    const newLevel = Math.floor(currentUser.totalSessions / sessionsPerLevel) + 1 + accuracyBonus;
    currentUser.level = Math.max(currentUser.level, newLevel);
}

function updateUserStats() {
    document.getElementById('streakCount').textContent = currentUser.streak;
    document.getElementById('totalSessions').textContent = currentUser.totalSessions;
    document.getElementById('averageAccuracy').textContent = `${currentUser.averageAccuracy}%`;
    document.getElementById('userLevel').textContent = currentUser.level;
}

function updateStreak() {
    const today = new Date().toDateString();
    const lastLogin = currentUser.lastLoginDate;

    if (lastLogin !== today) {
        const lastDate = new Date(lastLogin);
        const todayDate = new Date(today);
        const diffTime = Math.abs(todayDate - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            currentUser.streak++;
        } else if (diffDays > 1) {
            currentUser.streak = 1;
        }

        currentUser.lastLoginDate = today;

        // Save updated user data
        const users = JSON.parse(localStorage.getItem('speechcare_users') || '{}');
        users[currentUser.username] = currentUser;
        localStorage.setItem('speechcare_users', JSON.stringify(users));
        localStorage.setItem('speechcare_currentUser', JSON.stringify(currentUser));
    }
}

function updateSessionHistory() {
    const sessionHistory = document.getElementById('sessionHistory');
    const recentSessions = currentUser.sessions.slice(-10).reverse();

    if (recentSessions.length === 0) {
        sessionHistory.innerHTML = `<p>${translations[currentLanguage].no_sessions}</p>`;
        return;
    }

    sessionHistory.innerHTML = recentSessions.map(session => {
        const date = new Date(session.date).toLocaleDateString();
        const time = new Date(session.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const modeText = translations[currentLanguage][`${session.mode}_practice`] || session.mode;

        return `
            <div class="session-item">
                <div class="session-info">
                    <strong>${modeText}</strong>
                    <small>${date} at ${time}</small>
                </div>
                <div class="session-score">${session.accuracy}%</div>
            </div>
        `;
    }).join('');
}

// Control Functions
function backToMenu() {
    document.getElementById('practiceArea').classList.add('hidden');
    document.querySelector('.dashboard').classList.remove('hidden');
    document.querySelector('.practice-modes').classList.remove('hidden');
    document.querySelector('.progress-history').classList.remove('hidden');

    stopRecording();
    currentMode = null;
    sessionStartTime = null;
}

function tryAgain() {
    resetPracticeInterface();
}

function nextExercise() {
    currentExerciseIndex++;
    updateCurrentExercise();
    resetPracticeInterface();
}

// Audio Functions
function playTargetAudio() {
    const text = document.getElementById('targetText').textContent;

    if (synthesis) {
        // Cancel any ongoing speech
        synthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = currentLanguage;
        utterance.rate = currentUser.settings?.speechRate || 0.8;
        utterance.pitch = 1;
        utterance.volume = 1;

        // Try to find a voice for the current language
        const voices = synthesis.getVoices();
        const voice = voices.find(v => v.lang.startsWith(currentLanguage.split('-')[0]));
        if (voice) {
            utterance.voice = voice;
        }

        synthesis.speak(utterance);
    } else {
        showNotification('Text-to-speech is not supported in this browser', 'error');
    }
}

// Settings Functions
function showSettings() {
    document.getElementById('settingsModal').classList.remove('hidden');

    // Load current settings
    document.getElementById('speechRate').value = currentUser.settings?.speechRate || 0.8;
    document.getElementById('speechRateValue').textContent = `${currentUser.settings?.speechRate || 0.8}x`;
    document.getElementById('difficultyLevel').value = currentUser.settings?.difficulty || 'easy';
}

function hideSettings() {
    document.getElementById('settingsModal').classList.add('hidden');
}

function updateSpeechRate(e) {
    const rate = parseFloat(e.target.value);
    document.getElementById('speechRateValue').textContent = `${rate}x`;

    if (!currentUser.settings) currentUser.settings = {};
    currentUser.settings.speechRate = rate;
    saveUserSettings();
}

function updateDifficulty(e) {
    const difficulty = e.target.value;

    if (!currentUser.settings) currentUser.settings = {};
    currentUser.settings.difficulty = difficulty;
    saveUserSettings();
}

function saveUserSettings() {
    const users = JSON.parse(localStorage.getItem('speechcare_users') || '{}');
    users[currentUser.username] = currentUser;
    localStorage.setItem('speechcare_users', JSON.stringify(users));
    localStorage.setItem('speechcare_currentUser', JSON.stringify(currentUser));
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        zIndex: '10000',
        maxWidth: '400px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });

    // Set background color based on type
    const colors = {
        success: '#22c55e',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Tongue Training Functions
let isTongueRecording = false;
let currentTongueSound = 'a';

function practiceCustomSound() {
    const customSound = document.getElementById('customSoundText').value.trim();
    if (!customSound) {
        showNotification('Please enter a sound or word to practice', 'warning');
        return;
    }

    // Set the custom sound as current target
    currentTongueSound = customSound;
    showNotification(`Ready to practice: ${customSound}`, 'success');

    // Automatically start recording
    setTimeout(() => {
        startTongueRecording();
    }, 1000);
}

function startTongueRecording() {
    if (!recognition) {
        showNotification('Speech recognition not available', 'error');
        return;
    }

    // Stop any existing recording first
    if (isRecording) {
        stopRecording();
    }

    isTongueRecording = true;
    document.getElementById('tongueRecordingIndicator').classList.remove('hidden');
    document.getElementById('tongueResults').classList.add('hidden');

    try {
        // Store the original onresult handler
        const originalOnResult = recognition.onresult;

        // Set tongue-specific result handler
        recognition.onresult = function(event) {
            handleTongueResult(event);
            // Restore original handler after processing
            recognition.onresult = originalOnResult;
        };

        recognition.start();
    } catch (error) {
        console.error('Tongue recording error:', error);
        stopTongueRecording();
        showNotification('Failed to start tongue practice', 'error');
    }
}

function stopTongueRecording() {
    if (recognition && isTongueRecording) {
        try {
            recognition.stop();
        } catch (error) {
            console.error('Error stopping tongue recording:', error);
        }
    }

    isTongueRecording = false;
    document.getElementById('tongueRecordingIndicator').classList.add('hidden');
}

function handleTongueResult(event) {
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
        }
    }

    if (finalTranscript.trim()) {
        setTimeout(() => {
            analyzeTongueResults(finalTranscript.trim());
        }, 500);
    }
}

function analyzeTongueResults(spokenText) {
    const targetSound = currentTongueSound.toLowerCase();
    const spoken = spokenText.toLowerCase();

    // Calculate tongue accuracy
    let accuracy = 0;
    if (targetSound === spoken) {
        accuracy = 95 + Math.random() * 5; // 95-100%
    } else if (spoken.includes(targetSound) || targetSound.includes(spoken)) {
        accuracy = 70 + Math.random() * 20; // 70-90%
    } else {
        accuracy = 40 + Math.random() * 30; // 40-70%
    }

    // Show results
    showTongueResults(spokenText, accuracy);
}

function showTongueResults(spokenText, accuracy) {
    const resultsPanel = document.getElementById('tongueResults');
    const scoreValue = document.getElementById('tongueScoreValue');
    const scoreCategory = document.getElementById('tongueCategory');
    const feedbackText = document.getElementById('tongueFeedbackText');
    const improvementTips = document.getElementById('tongueImprovementTips');

    // Update score
    scoreValue.textContent = Math.round(accuracy);
    updateTongueScoreCircle(accuracy);

    // Update category
    let category = '';
    let categoryClass = '';
    if (accuracy >= 90) {
        category = currentLanguage === 'ta-IN' ? 'சிறப்பானது!' : 'Excellent!';
        categoryClass = 'excellent';
    } else if (accuracy >= 75) {
        category = currentLanguage === 'ta-IN' ? 'நல்லது!' : 'Good!';
        categoryClass = 'good';
    } else {
        category = currentLanguage === 'ta-IN' ? 'மேம்பாடு தேவை' : 'Needs Improvement';
        categoryClass = 'needs-improvement';
    }

    scoreCategory.textContent = category;
    scoreCategory.className = `score-category ${categoryClass}`;

    // Generate feedback
    const feedback = generateTongueFeedback(spokenText, accuracy);
    feedbackText.textContent = feedback;

    // Generate improvement tips
    const tips = generateTongueImprovementTips(accuracy);
    improvementTips.innerHTML = tips.map(tip => `<div class="improvement-tip">${tip}</div>`).join('');

    // Show results
    resultsPanel.classList.remove('hidden');
}

function generateTongueFeedback(spokenText, accuracy) {
    const feedbacks = {
        'en-US': {
            excellent: [
                'Perfect tongue position! Your articulation is excellent.',
                'Outstanding! You positioned your tongue correctly.',
                'Excellent tongue control and sound production.'
            ],
            good: [
                'Good tongue positioning! Keep practicing for perfection.',
                'Well done! Your tongue movement is improving.',
                'Nice work! You\'re getting the hang of it.'
            ],
            needsWork: [
                'Keep practicing! Focus on tongue placement.',
                'Try to position your tongue more precisely.',
                'Practice the tongue movement slowly and deliberately.'
            ]
        },
        'ta-IN': {
            excellent: [
                'சரியான நாக்கு நிலை! உங்கள் உச்சரிப்பு சிறப்பானது.',
                'அருமை! நீங்கள் நாக்கை சரியாக வைத்தீர்கள்.',
                'சிறந்த நாக்கு கட்டுப்பாடு மற்றும் ஒலி உற்பத்தி.'
            ],
            good: [
                'நல்ல நாக்கு நிலை! முழுமைக்காக தொடர்ந்து பயிற்சி செய்யுங்கள்.',
                'நன்றாக செய்தீர்கள்! உங்கள் நாக்கு இயக்கம் மேம்பட்டு வருகிறது.',
                'நல்ல வேலை! நீங்கள் புரிந்துகொண்டு வருகிறீர்கள்.'
            ],
            needsWork: [
                'தொடர்ந்து பயிற்சி செய்யுங்கள்! நாக்கு வைப்பில் கவனம் செலுத்துங்கள்.',
                'உங்கள் நாக்கை மிகவும் துல்லியமாக வைக்க முயற்சிக்கவும்.',
                'நாக்கு இயக்கத்தை மெதுவாகவும் வேண்டுமென்றே பயிற்சி செய்யுங்கள்.'
            ]
        }
    };

    const langFeedbacks = feedbacks[currentLanguage] || feedbacks['en-US'];
    let category;

    if (accuracy >= 90) {
        category = langFeedbacks.excellent;
    } else if (accuracy >= 75) {
        category = langFeedbacks.good;
    } else {
        category = langFeedbacks.needsWork;
    }

    return category[Math.floor(Math.random() * category.length)];
}

function generateTongueImprovementTips(accuracy) {
    const tips = {
        'en-US': {
            high: [
                'Maintain consistent tongue position',
                'Practice daily for muscle memory',
                'Try varying speech speed'
            ],
            medium: [
                'Focus on tongue tip placement',
                'Use a mirror to check tongue position',
                'Practice tongue exercises regularly'
            ],
            low: [
                'Start with slower speech',
                'Practice basic tongue positions',
                'Work on tongue flexibility exercises'
            ]
        },
        'ta-IN': {
            high: [
                'நிலையான நாக்கு நிலையை பராமரிக்கவும்',
                'தசை நினைவுக்காக தினமும் பயிற்சி செய்யுங்கள்',
                'பேச்சு வேகத்தை மாற்றி முயற்சிக்கவும்'
            ],
            medium: [
                'நாக்கு நுனி வைப்பில் கவனம் செலுத்துங்கள்',
                'நாக்கு நிலையை சரிபார்க்க கண்ணாடியைப் பயன்படுத்துங்கள்',
                'நாக்கு பயிற்சிகளை தொடர்ந்து செய்யுங்கள்'
            ],
            low: [
                'மெதுவான பேச்சுடன் தொடங்குங்கள்',
                'அடிப்படை நாக்கு நிலைகளை பயிற்சி செய்யுங்கள்',
                'நாக்கு நெகிழ்வுத்தன்மை பயிற்சிகளில் வேலை செய்யுங்கள்'
            ]
        }
    };

    const langTips = tips[currentLanguage] || tips['en-US'];

    if (accuracy >= 85) {
        return langTips.high;
    } else if (accuracy >= 65) {
        return langTips.medium;
    } else {
        return langTips.low;
    }
}

function updateTongueScoreCircle(score) {
    const scoreCircle = document.querySelector('.tongue-score-circle');
    if (scoreCircle) {
        scoreCircle.style.setProperty('--score', score);

        let color;
        if (score >= 90) {
            color = '#E8B4B8'; // Rose gold
        } else if (score >= 75) {
            color = '#D4A4A8'; // Darker rose gold
        } else {
            color = '#B76E79'; // Deep rose gold
        }

        scoreCircle.style.background = `conic-gradient(${color} 0deg, ${color} ${score * 3.6}deg, var(--bg-tertiary) ${score * 3.6}deg)`;
    }
}

function tryTongueAgain() {
    document.getElementById('tongueResults').classList.add('hidden');
}

function nextTongueExercise() {
    // Move to next sound
    const sounds = ['a', 'e', 'i', 'o', 'u', 'th', 'r', 'l', 's', 'z'];
    const currentIndex = sounds.indexOf(currentTongueSound);
    const nextIndex = (currentIndex + 1) % sounds.length;
    selectSound(sounds[nextIndex]);
    document.getElementById('tongueResults').classList.add('hidden');
}

// Initialize session history on app load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (currentUser) {
            updateSessionHistory();
        }
    }, 1000);
});
