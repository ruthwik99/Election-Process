const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { GoogleGenAI } = require('@google/genai');
let aiClient = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    console.log("✅ Dynamic AI integration enabled via Gemini API");
  } catch (e) {
    console.error("❌ Failed to initialize Gemini API Client:", e);
  }
}

const SYSTEM_INSTRUCTION = `You are the ElectEd Election Assistant, an expert in the democratic election process (specifically focused on India but with general democratic principles). 
Answer the user's questions clearly, accurately, and concisely. Keep responses engaging. Use bullet points and markdown where appropriate.
If the question is completely unrelated to elections, democracy, or voting, politely guide the user back to the topic.`;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ===== IN-MEMORY DATA STORE =====
const quizScores = []; // { name, score, total, percentage, date }
const chatHistory = []; // { sessionId, messages[] }

// ===== ELECTION KNOWLEDGE BASE =====
const knowledgeBase = {
  // Core topics
  topics: {
    "voter registration": {
      keywords: ["register", "registration", "enroll", "voter id", "epic", "form 6", "electoral roll", "voter list", "eligible", "eligibility"],
      response: {
        title: "Voter Registration",
        content: "**Voter Registration** is the process by which eligible citizens enroll in the electoral roll to gain the right to vote.",
        points: [
          "Must be an Indian citizen and at least **18 years old**",
          "Fill **Form 6** for new registration (available online and offline)",
          "Submit with proof of age, address, and passport-sized photo",
          "A **Booth Level Officer (BLO)** verifies your details through a home visit",
          "Once approved, you receive a **Voter ID card (EPIC)**",
          "You can register online at the **National Voter Service Portal (NVSP)**",
          "Electoral rolls are updated before every election cycle"
        ],
        funFact: "India has over **950 million** registered voters — the largest electorate in the world!",
        relatedTopics: ["electoral roll", "booth level officer", "voter id"]
      }
    },
    "election day": {
      keywords: ["voting", "vote", "poll", "polling", "election day", "cast vote", "ballot", "evm"],
      response: {
        title: "Election Day / Voting Process",
        content: "**Election Day** is when registered voters exercise their democratic right by casting their ballots at designated polling stations.",
        points: [
          "Polling stations typically open from **7 AM to 6 PM**",
          "Bring your **Voter ID (EPIC)** or any approved photo identification",
          "Your identity is verified and your name is checked against the electoral roll",
          "Your left index finger is marked with **indelible ink** to prevent re-voting",
          "Vote using an **Electronic Voting Machine (EVM)**",
          "A **VVPAT** machine prints a paper slip showing your choice (visible for 7 seconds)",
          "**NOTA** (None of the Above) option is available to reject all candidates",
          "Booth is staffed by a **Presiding Officer** and polling officers",
          "Heavy security forces are deployed to maintain order"
        ],
        funFact: "India uses over **1.8 million EVMs** across approximately **1 million polling stations**, making elections the world's largest logistical exercise!",
        relatedTopics: ["evm", "vvpat", "nota", "indelible ink"]
      }
    },
    "evm": {
      keywords: ["electronic voting machine", "evm", "voting machine", "ballot unit", "control unit"],
      response: {
        title: "Electronic Voting Machine (EVM)",
        content: "**EVMs** are portable, battery-operated electronic devices used across India to record votes digitally, replacing traditional paper ballots.",
        points: [
          "Two units: **Control Unit** (with polling officer) and **Ballot Unit** (in voting booth)",
          "Each EVM can record up to **3,840 votes**",
          "Runs on a **single alkaline battery** — no electricity needed",
          "**Tamper-proof** with advanced security features and one-time programmable chips",
          "Paired with **VVPAT** for paper trail verification since 2019",
          "Manufactured by **Bharat Electronics Limited (BEL)** and **Electronics Corporation of India (ECIL)**",
          "Reduces **invalid/spoiled votes** to nearly zero",
          "First used in **1982** in Kerala, fully deployed nationwide in **2004**"
        ],
        funFact: "Each EVM costs approximately ₹17,000 and is designed to last for **15 years**!",
        relatedTopics: ["vvpat", "election day", "vote counting"]
      }
    },
    "vvpat": {
      keywords: ["vvpat", "paper trail", "paper audit", "voter verifiable", "paper slip"],
      response: {
        title: "VVPAT (Voter Verifiable Paper Audit Trail)",
        content: "**VVPAT** is a machine attached to EVMs that provides a printed paper record of the vote cast, allowing voters to verify their choice.",
        points: [
          "Prints a **paper slip** showing the candidate name, serial number, and party symbol",
          "Slip is visible through a **transparent window for 7 seconds**",
          "After display, the slip drops into a **sealed, tamper-proof box**",
          "Used for **random verification** during counting to audit EVM results",
          "Made **mandatory in all constituencies** since the 2019 general elections",
          "Supreme Court ordered verification of **5 randomly selected VVPAT machines** per assembly segment",
          "Adds transparency and voter confidence to the electronic voting process"
        ],
        funFact: "The Supreme Court of India called VVPAT an **'indispensable requirement'** for free and fair elections!",
        relatedTopics: ["evm", "vote counting", "election day"]
      }
    },
    "nota": {
      keywords: ["nota", "none of the above", "reject all", "negative vote"],
      response: {
        title: "NOTA (None of the Above)",
        content: "**NOTA** is an option on the EVM that allows voters to officially reject all candidates contesting in their constituency.",
        points: [
          "Introduced by the **Supreme Court of India** in September **2013**",
          "Appears as the **last option** on the ballot unit of the EVM",
          "Allows voters to express **dissatisfaction** without spoiling their ballot",
          "If NOTA gets the highest votes, the candidate with **next highest votes still wins**",
          "Serves as a **democratic protest tool** and indicator of voter sentiment",
          "Symbol: A **ballot paper with a cross mark** ✗",
          "Several countries have similar provisions — Colombia, Ukraine, Bangladesh"
        ],
        funFact: "In the 2019 Indian general elections, over **6.5 million voters** chose NOTA!",
        relatedTopics: ["election day", "evm", "voter rights"]
      }
    },
    "campaigning": {
      keywords: ["campaign", "rally", "manifesto", "canvass", "propaganda", "advertisement", "debate", "model code"],
      response: {
        title: "Election Campaigning",
        content: "**Election campaigning** is the period where candidates and political parties communicate their vision, policies, and promises to voters through various channels.",
        points: [
          "**Public rallies & road shows** — large gatherings to mobilize support",
          "**Door-to-door canvassing** — party workers visit homes directly",
          "**Media campaigns** — TV, radio, newspapers, social media advertising",
          "**Manifestos** — detailed policy documents released by each party",
          "**Debates** — candidates discuss issues on public platforms",
          "All activities must comply with the **Model Code of Conduct (MCC)**",
          "Campaign **expenditure limits** are strictly monitored (₹95 lakh for Lok Sabha, ₹40 lakh for state)",
          "**Silent period** — all campaigning must stop **48 hours before polling**",
          "No one can appeal to voters on **religious, caste, or communal** lines"
        ],
        funFact: "India's 2019 general election campaign cost an estimated **$8.6 billion**, making it one of the most expensive elections in history!",
        relatedTopics: ["model code of conduct", "election commission", "silent period"]
      }
    },
    "model code of conduct": {
      keywords: ["model code", "code of conduct", "mcc", "election rules", "fair play"],
      response: {
        title: "Model Code of Conduct (MCC)",
        content: "The **Model Code of Conduct** is a set of guidelines issued by the Election Commission of India for political parties and candidates to ensure free and fair elections.",
        points: [
          "Comes into effect from the **date of election announcement**",
          "Prohibits **misuse of government resources** for campaigning",
          "Bans **vote-buying**, distribution of liquor, and offering freebies",
          "Restricts **hate speech** and appeals based on religion, caste, or community",
          "Government cannot announce new **schemes or projects** during this period",
          "Ministers cannot combine **official visits with campaign activities**",
          "Political parties must seek **permission for rallies** and public meetings",
          "Violators can face **censure, FIR, or disqualification**"
        ],
        funFact: "The MCC is not legally enforceable by statute — it works on **moral authority and convention**, yet is remarkably effective!",
        relatedTopics: ["campaigning", "election commission", "election process"]
      }
    },
    "vote counting": {
      keywords: ["counting", "count", "result", "tally", "strong room", "postal ballot"],
      response: {
        title: "Vote Counting Process",
        content: "**Vote counting** is the transparent process where all votes are tallied under strict supervision, with representatives from all contesting parties present.",
        points: [
          "After polling, EVMs are sealed and stored in **secure strong rooms**",
          "Strong rooms have **24/7 CCTV surveillance** and multi-layer armed security",
          "Counting begins with **postal ballots** (military, government officials, absentee voters)",
          "EVM counts proceed **round by round** (each round = one set of EVMs)",
          "Results from each round are **displayed publicly** and shared with media",
          "**VVPAT paper slips** are verified for 5 randomly selected machines per segment",
          "Candidates or their agents can **challenge** results at any stage",
          "The **Returning Officer** declares the winner for each constituency",
          "Results are typically completed in a **single day** for the entire nation"
        ],
        funFact: "The entire counting process for India's general election — covering **543 constituencies** — is typically completed in just **one day**!",
        relatedTopics: ["evm", "vvpat", "returning officer", "government formation"]
      }
    },
    "electoral college": {
      keywords: ["electoral college", "presidential election", "president", "vice president", "indirect election"],
      response: {
        title: "Electoral College in India",
        content: "In India, the **Electoral College** is used for electing the **President and Vice President** through an indirect election process.",
        points: [
          "**Presidential Electoral College**: All elected members of Parliament (Lok Sabha + Rajya Sabha) and State Legislative Assemblies",
          "Uses a system of **proportional representation** with single transferable vote",
          "Each vote has a **calculated value** based on population represented",
          "**Vice Presidential Election**: Only elected members of both houses of Parliament vote",
          "This is different from the **US Electoral College** system used for their President",
          "For general elections (Lok Sabha), India uses **First Past the Post (FPTP)** — citizens vote directly",
          "Rajya Sabha members are elected by **State Legislature MLAs** (also indirect)"
        ],
        funFact: "The value of each MLA's vote varies by state — an UP MLA's vote is worth **208**, while a Sikkim MLA's vote is worth just **7**!",
        relatedTopics: ["election process", "first past the post", "proportional representation"]
      }
    },
    "election commission": {
      keywords: ["election commission", "eci", "chief election commissioner", "cec", "autonomous", "constitutional body"],
      response: {
        title: "Election Commission of India (ECI)",
        content: "The **Election Commission of India** is an autonomous constitutional body responsible for administering election processes in the country at all levels.",
        points: [
          "Established on **25th January 1950** (celebrated as National Voters' Day)",
          "Constitutional authority under **Article 324** of the Indian Constitution",
          "Headed by the **Chief Election Commissioner (CEC)** and two Election Commissioners",
          "Commissioners have **tenure security** — can only be removed through impeachment",
          "Supervises elections to **Parliament, State Legislatures, and President/VP offices**",
          "Has the power to **postpone or cancel elections** if necessary",
          "Enforces the **Model Code of Conduct** during election periods",
          "Operates with **complete independence** from the government",
          "Also responsible for **recognition and derecognition** of political parties"
        ],
        funFact: "The Election Commission conducts elections across **28 states and 8 Union Territories**, managing the world's largest democratic exercise!",
        relatedTopics: ["model code of conduct", "election process", "voter registration"]
      }
    },
    "government formation": {
      keywords: ["government formation", "sworn in", "oath", "majority", "coalition", "prime minister", "chief minister", "hung"],
      response: {
        title: "Government Formation",
        content: "After election results are declared, the political process of **forming a government** begins based on which party or coalition secures a majority of seats.",
        points: [
          "The party/coalition crossing the **majority mark** (half + 1 of total seats) forms the government",
          "For Lok Sabha: majority = **272 out of 543** seats",
          "The **President** invites the majority party leader to form the government",
          "If no clear majority: a **hung parliament** — coalition negotiations begin",
          "The **PM/CM designate** proves majority through a **floor test** if challenged",
          "**Swearing-in ceremony**: PM/CM and council of ministers take oath of office",
          "The largest non-ruling party becomes the **official opposition**",
          "Leader of Opposition gets **cabinet minister rank** and plays a vital role",
          "The new government presents its agenda through the **President's Address**"
        ],
        funFact: "India has had **coalition governments** at the center for most of the period between 1989 and 2014!",
        relatedTopics: ["election results", "coalition", "hung parliament"]
      }
    },
    "indelible ink": {
      keywords: ["indelible ink", "ink", "finger", "mark", "purple ink"],
      response: {
        title: "Indelible Ink",
        content: "**Indelible ink** is a semi-permanent dye applied to a voter's left index finger after they cast their vote, serving as a critical anti-fraud measure.",
        points: [
          "Applied to the **left index finger nail** and surrounding skin",
          "Contains **silver nitrate** which reacts with body salts to create a lasting stain",
          "The mark lasts for **2-4 weeks** and cannot be easily removed",
          "Manufactured exclusively by **Mysore Paints and Varnish Limited (MPVL)** in Karnataka",
          "India has used indelible ink since the **first general election in 1952**",
          "MPVL also exports this ink to **25+ countries** worldwide",
          "Prevents **bogus/duplicate voting** effectively"
        ],
        funFact: "Mysore Paints has been the **sole supplier** of election ink in India for over 70 years and exports it to countries like Malaysia, South Africa, and Canada!",
        relatedTopics: ["election day", "polling booth", "anti-fraud"]
      }
    },
    "election process": {
      keywords: ["election process", "steps", "phases", "how elections work", "overview", "cycle"],
      response: {
        title: "The Election Process — Complete Overview",
        content: "The **Indian election process** is a multi-phase democratic exercise governed by the Election Commission of India.",
        points: [
          "**Phase 1: Announcement** — Election Commission notifies dates and begins preparation (12-18 months before)",
          "**Phase 2: Voter Registration** — Citizens enroll in electoral rolls, Voter IDs issued (6-12 months before)",
          "**Phase 3: Nominations** — Candidates file papers, scrutiny, withdrawal period (4-8 weeks before)",
          "**Phase 4: Campaigning** — Rallies, media, debates under Model Code of Conduct (2-6 weeks before)",
          "**Phase 5: Polling Day** — Voters cast ballots using EVMs at designated stations",
          "**Phase 6: Counting** — Transparent counting with results declared constituency-wise (1-3 days after)",
          "**Phase 7: Government Formation** — Winner sworn in, government takes charge (within 2 weeks)"
        ],
        funFact: "A complete Indian general election cycle — from announcement to swearing-in — typically spans **2-3 months**!",
        relatedTopics: ["voter registration", "campaigning", "election day", "vote counting"]
      }
    }
  },

  // Greeting patterns
  greetings: {
    keywords: ["hello", "hi", "hey", "good morning", "good evening", "namaste", "howdy"],
    response: "👋 **Hello!** Welcome to ElectEd — your Election Process Assistant!\n\nI can help you understand:\n• Voter registration & eligibility\n• Election campaigning & rules\n• Voting day procedures\n• EVMs, VVPAT & NOTA\n• Vote counting & results\n• Government formation\n• Election Commission of India\n\nAsk me anything about elections!"
  },

  // Thank patterns
  thanks: {
    keywords: ["thank", "thanks", "thx", "appreciate"],
    response: "You're welcome! 😊 I'm glad I could help. Feel free to ask more questions about the election process anytime!\n\n💡 **Tip:** Try asking about specific topics like 'How does VVPAT work?' or 'What is the Model Code of Conduct?'"
  },

  // Default fallback
  fallback: "I'd love to help with that! Here are the topics I'm most knowledgeable about:\n\n🗳️ **Election Process** — Complete overview\n📋 **Voter Registration** — How to register\n📢 **Campaigning** — Rules and methods\n🗳️ **Election Day** — Voting procedures\n🖥️ **EVM & VVPAT** — Voting machines\n❌ **NOTA** — None of the Above\n📊 **Vote Counting** — How results are tallied\n🏛️ **Government Formation** — After the results\n⚖️ **Election Commission** — India's election authority\n📜 **Model Code of Conduct** — Campaign rules\n\nTry asking about any of these!"
};

// ===== CHAT ENGINE =====
function findBestMatch(input) {
  const lower = input.toLowerCase().trim();

  // Check greetings
  if (knowledgeBase.greetings.keywords.some(k => lower.includes(k))) {
    return { type: 'greeting', data: knowledgeBase.greetings.response };
  }

  // Check thanks
  if (knowledgeBase.thanks.keywords.some(k => lower.includes(k))) {
    return { type: 'thanks', data: knowledgeBase.thanks.response };
  }

  // Score each topic
  let bestScore = 0;
  let bestTopic = null;

  for (const [topicName, topic] of Object.entries(knowledgeBase.topics)) {
    let score = 0;

    // Check direct topic name match (highest weight)
    if (lower.includes(topicName)) {
      score += 10;
    }

    // Check keyword matches
    for (const keyword of topic.keywords) {
      if (lower.includes(keyword)) {
        score += 3;
        // Bonus for exact word match
        const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (regex.test(lower)) {
          score += 2;
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }

  if (bestTopic && bestScore >= 3) {
    return { type: 'topic', data: bestTopic.response };
  }

  return { type: 'fallback', data: knowledgeBase.fallback };
}

function formatTopicResponse(data) {
  if (typeof data === 'string') return data;

  let response = `**${data.title}**\n\n${data.content}\n\n`;

  if (data.points && data.points.length > 0) {
    response += data.points.map(p => `• ${p}`).join('\n') + '\n\n';
  }

  if (data.funFact) {
    response += `💡 **Did you know?** ${data.funFact}\n\n`;
  }

  if (data.relatedTopics && data.relatedTopics.length > 0) {
    response += `🔗 **Related topics:** ${data.relatedTopics.join(', ')}`;
  }

  return response;
}

// ===== API ROUTES =====

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message, sessionId } = req.body;

  if (!message || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Store chat history
  let session = chatHistory.find(s => s.sessionId === sessionId);
  if (!session) {
    session = { sessionId: sessionId || Date.now().toString(), messages: [] };
    chatHistory.push(session);
  }

  // Keep only last 100 sessions
  if (chatHistory.length > 100) chatHistory.shift();

  if (aiClient) {
    try {
      // Build history for Gemini
      const contents = session.messages.map(msg => ({
        role: msg.role === 'bot' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: { systemInstruction: SYSTEM_INSTRUCTION }
      });
      
      const responseText = response.text;
      session.messages.push(
        { role: 'user', content: message, timestamp: new Date() },
        { role: 'bot', content: responseText, timestamp: new Date() }
      );

      return res.json({
        response: responseText,
        type: 'dynamic',
        sessionId: session.sessionId,
        relatedTopics: []
      });
    } catch (e) {
      console.error('LLM Error:', e);
      // Fallback to static
    }
  }

  const match = findBestMatch(message);
  const responseText = formatTopicResponse(match.data);

  session.messages.push(
    { role: 'user', content: message, timestamp: new Date() },
    { role: 'bot', content: responseText, timestamp: new Date() }
  );

  res.json({
    response: responseText,
    type: match.type,
    sessionId: session.sessionId,
    relatedTopics: match.type === 'topic' ? match.data.relatedTopics : []
  });
});

// Streaming chat endpoint (SSE)
app.get('/api/chat/stream', async (req, res) => {
  const message = req.query.message;
  const sessionId = req.query.sessionId || 'default';
  
  if (!message) {
    return res.status(400).json({ error: 'Message query param is required' });
  }

  // Set SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no'
  });

  let session = chatHistory.find(s => s.sessionId === sessionId);
  if (!session) {
    session = { sessionId: sessionId, messages: [] };
    chatHistory.push(session);
  }

  if (aiClient) {
    try {
      const contents = session.messages.map(msg => ({
        role: msg.role === 'bot' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));
      contents.push({ role: 'user', parts: [{ text: message }] });

      const responseStream = await aiClient.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: { systemInstruction: SYSTEM_INSTRUCTION }
      });
      
      let fullResponse = '';
      for await (const chunk of responseStream) {
        if (chunk.text) {
           fullResponse += chunk.text;
           res.write(`data: ${JSON.stringify({ type: 'token', content: chunk.text })}\n\n`);
        }
      }
      
      session.messages.push(
        { role: 'user', content: message, timestamp: new Date() },
        { role: 'bot', content: fullResponse, timestamp: new Date() }
      );
      
      res.write(`data: ${JSON.stringify({ type: 'done', relatedTopics: [] })}\n\n`);
      return res.end();
    } catch (e) {
      console.error('LLM Stream Error:', e);
      // Fallback
    }
  }

  // Static Fallback
  const match = findBestMatch(message);
  const responseText = formatTopicResponse(match.data);
  const relatedTopics = match.type === 'topic' ? match.data.relatedTopics || [] : [];

  session.messages.push(
    { role: 'user', content: message, timestamp: new Date() },
    { role: 'bot', content: responseText, timestamp: new Date() }
  );

  // Split into tokens (words + punctuation preserved)
  const tokens = responseText.split(/(\s+)/);
  let index = 0;

  function sendNextToken() {
    if (index < tokens.length) {
      const token = tokens[index];
      res.write(`data: ${JSON.stringify({ type: 'token', content: token })}\n\n`);
      index++;

      // Variable delay: longer after periods/newlines, shorter for regular words
      let delay = 20 + Math.random() * 25;
      if (token.includes('\n')) delay = 80 + Math.random() * 60;
      else if (token.includes('.') || token.includes('!')) delay = 60 + Math.random() * 40;
      else if (token.includes('•')) delay = 50 + Math.random() * 30;

      setTimeout(sendNextToken, delay);
    } else {
      // Send completion event with metadata
      res.write(`data: ${JSON.stringify({ type: 'done', relatedTopics })}\n\n`);
      res.end();
    }
  }

  // Small initial delay to feel natural
  setTimeout(sendNextToken, 150);

  // Handle client disconnect
  req.on('close', () => { index = tokens.length; });
});

// Quiz score endpoints
app.post('/api/quiz/score', (req, res) => {
  const { name, score, total } = req.body;

  if (score === undefined || total === undefined) {
    return res.status(400).json({ error: 'Score and total are required' });
  }

  const entry = {
    id: Date.now().toString(),
    name: name || 'Anonymous',
    score: parseInt(score),
    total: parseInt(total),
    percentage: Math.round((parseInt(score) / parseInt(total)) * 100),
    date: new Date().toISOString()
  };

  quizScores.push(entry);

  // Keep top 50 scores
  quizScores.sort((a, b) => b.percentage - a.percentage);
  if (quizScores.length > 50) quizScores.length = 50;

  res.json({
    entry,
    rank: quizScores.findIndex(s => s.id === entry.id) + 1,
    totalAttempts: quizScores.length
  });
});

app.get('/api/quiz/leaderboard', (req, res) => {
  res.json({
    leaderboard: quizScores.slice(0, 10),
    totalAttempts: quizScores.length
  });
});

// Topics list endpoint
app.get('/api/topics', (req, res) => {
  const topics = Object.entries(knowledgeBase.topics).map(([key, val]) => ({
    id: key,
    title: val.response.title,
    keywords: val.keywords.slice(0, 5)
  }));
  res.json({ topics });
});

// Topic detail endpoint
app.get('/api/topics/:id', (req, res) => {
  const topic = knowledgeBase.topics[req.params.id];
  if (!topic) {
    return res.status(404).json({ error: 'Topic not found' });
  }
  res.json({ topic: topic.response });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), version: '1.0.0' });
});

// Serve index for all other routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`\n🗳️  ElectEd Server running at http://localhost:${PORT}`);
  console.log(`📡 API endpoints:`);
  console.log(`   POST /api/chat          — Chat with the assistant`);
  console.log(`   POST /api/quiz/score    — Submit quiz score`);
  console.log(`   GET  /api/quiz/leaderboard — View top scores`);
  console.log(`   GET  /api/topics        — List all topics`);
  console.log(`   GET  /api/topics/:id    — Get topic details\n`);
});
