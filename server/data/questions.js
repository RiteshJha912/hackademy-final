const mcqQuestions = [
  {
    id: 1,
    question:
      "You receive a WhatsApp video call from someone in a police uniform, in what looks like a real police station. They say your Aadhaar was used to register a SIM card sending illegal messages, and you must stay on the call for a 'virtual investigation' or be physically arrested. What should you do?",
    options: [
      'Stay on the call - ignoring a police investigation could make things worse',
      'Ask them to send an official written notice to your registered address instead',
      'Disconnect immediately - no real law enforcement agency in India conducts investigations or arrests over WhatsApp video calls',
      'Call a family member while staying on the call to act as a witness',
    ],
    correct: 2,
    explanation:
      "This is a 'Digital Arrest' scam. In India, no law - CrPC, IPC, or IT Act - permits arrest via video call. Scammers use AI-generated police station backgrounds and uniforms to appear authentic.",
    points: 15,
    difficulty: "medium",
  },
  {
    id: 2,
    question:
      "A customer service agent calls from your bank's official number (verified on Truecaller) saying your account is at risk. To 'secure' it, they ask you to download AnyDesk and share the 9-digit access code. What is the right move?",
    options: [
      'Share the code - the caller ID matched your bank and Truecaller confirmed it',
      'Refuse and hang up. Call your bank back using the number on the back of your debit card',
      'Download the app but share only the code, not your passwords',
      'Ask the agent to verify themselves by stating your account balance first',
    ],
    correct: 1,
    explanation:
      "Caller IDs and Truecaller entries can be spoofed. AnyDesk, TeamViewer, and Quick Support are legitimate remote access tools that fraudsters weaponize to take full control of your phone screen. Your bank will NEVER ask you to install such apps.",
    points: 20,
    difficulty: "hard",
  },
  {
    id: 3,
    question:
      "You're selling a second-hand phone on OLX. A buyer says he'll pay via UPI and sends you a QR code to 'confirm your account' before the payment is credited. When you scan it, your UPI app asks you to enter your PIN. What is happening?",
    options: [
      'This is normal - UPI requires PIN confirmation to receive payments too',
      'The buyer is verifying your identity before transferring a large amount',
      "You are about to make a payment, not receive one - QR codes and UPI collect requests always debit your account, never credit it",
      'The app may be buggy; try scanning from a different UPI app',
    ],
    correct: 2,
    explanation:
      "In UPI, your PIN is ONLY required when you are sending money. Any scenario where you must scan a QR code or enter your PIN to 'receive' money is a fraud.",
    points: 15,
    difficulty: "medium",
  },
  {
    id: 4,
    question:
      "You see a Telegram group offering a 'task-based earning' scheme: like YouTube videos and get paid ₹50–₹150 per task. After completing free tasks and receiving small real payments, they offer a 'premium membership' for ₹5,000 that promises ₹1,500 per task. What is this?",
    options: [
      'A legitimate micro-task platform - the initial payments prove it is real',
      'A part-time freelancing opportunity popular with students',
      "A 'task fraud' or 'pig-butchering' scam - the initial small payments are deliberate bait to build trust before the large upfront fee is stolen",
      "Potentially real, but only invest if you verify their GST registration first",
    ],
    correct: 2,
    explanation:
      "This is called 'task fraud'. The initial real payments are a deliberate investment by scammers to build trust before asking for the upgrade fee.",
    points: 20,
    difficulty: "hard",
  },
  {
    id: 5,
    question:
      "An elderly relative in a village uses AePS (Aadhaar Enabled Payment System) to withdraw cash at a local banking correspondent. They later find ₹8,000 debited in transactions they didn't make. Which attack is most likely responsible?",
    options: [
      'SIM swap fraud - their mobile number was ported without consent',
      'Biometric cloning - their fingerprint was captured and replicated to authenticate fraudulent AePS withdrawals',
      'Phishing - they clicked a fake Aadhaar update link',
      'OTP fraud - someone tricked them into sharing a one-time password',
    ],
    correct: 1,
    explanation:
      "AePS fraud via biometric cloning uses silicone rubber fingerprint replicas created from lifted prints to impersonate victims. Since AePS uses biometrics - not OTPs or PINs - traditional fraud alerts don't apply.",
    points: 25,
    difficulty: "hard",
  },
  {
    id: 6,
    question:
      "You receive a voice call that sounds exactly like your cousin asking you to urgently transfer ₹15,000 to a new number as they are stuck at a hospital. The voice, accent, and speech pattern are a perfect match. You're about to transfer. What should you do first?",
    options: [
      'Transfer immediately - you recognized the voice and it is an emergency',
      'Transfer half the amount first to test if it goes through correctly',
      "Hang up and call your cousin back on their known saved number to verify - this may be an AI deepfake voice call",
      'Ask the caller to prove identity by telling you something only they would know',
    ],
    correct: 2,
    explanation:
      "AI voice cloning requires very little audio to generate a convincing replica of any voice. The safest action is always to terminate and call back on a known, saved number.",
    points: 25,
    difficulty: "hard",
  },
  {
    id: 7,
    question:
      "After filing an ITR, you call a number you found via a Google search for 'Income Tax refund helpline' and the agent asks for your PAN, date of birth, and net banking credentials to 'process the refund directly.' What is wrong here?",
    options: [
      'Nothing - sharing credentials with the tax department is standard for refund processing',
      "The agent should have asked for your Aadhaar, not PAN, for refund verification",
      "Google search results can surface fake helpline numbers. The IT Department processes refunds automatically to your pre-validated bank account - no credentials or calls are needed",
      'You should only share this information if the call comes from a 1800 toll-free number',
    ],
    correct: 2,
    explanation:
      "Fraudsters buy Google Ads and use SEO to push fake helpline numbers to the top of search results. The Income Tax Department credits refunds directly to the bank account without needing net banking credentials.",
    points: 20,
    difficulty: "medium",
  },
  {
    id: 8,
    question:
      "Your friend tells you he made ₹80,000 in a month by investing in a stock trading group on WhatsApp, run by someone claiming to be a SEBI-certified advisor. He insists the returns are real because he could see profits in his 'portfolio dashboard' and even withdrew ₹5,000 once as proof. He asks if you want to join. What do you tell him?",
    options: [
      'Join - SEBI certification and a real withdrawal are solid proof of legitimacy',
      "Invest a small amount first to personally test the platform's credibility",
      "This is almost certainly an investment scam. The fake dashboard and one small withdrawal are deliberate trust-building tactics before a large 'investment' is demanded and stolen",
      'Ask to see the advisor\'s SEBI registration number and verify on sebi.gov.in before deciding',
    ],
    correct: 2,
    explanation:
      "The visible 'profits' are shown on a fake dashboard the scammers control, and one small withdrawal is a classic bait tactic. Real SEBI advisors don't operate through WhatsApp groups promising massive returns.",
    points: 25,
    difficulty: "hard",
  },
]

module.exports = {
  mcq: mcqQuestions,
}
