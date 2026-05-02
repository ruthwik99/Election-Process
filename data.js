// ===== ELECTION PROCESS DATA =====

const TIMELINE_DATA = [
  {
    phase: "Phase 1",
    title: "Election Announcement & Preparation",
    date: "12–18 months before Election Day",
    summary: "The government or election commission officially announces the upcoming election and begins preparations.",
    details: `The election cycle begins when the governing authority or election commission formally announces the date of the next election. This phase involves extensive administrative preparation.`,
    keyPoints: [
      "Official notification is issued by the Election Commission",
      "Electoral boundaries and constituencies are reviewed or redrawn",
      "Polling stations are identified and prepared",
      "Election officials and staff are appointed",
      "Budget allocation for conducting elections",
      "Training programs for election officers begin"
    ],
    fact: "In India, the Election Commission is an autonomous constitutional body that oversees the entire election process independently."
  },
  {
    phase: "Phase 2",
    title: "Voter Registration & Electoral Rolls",
    date: "6–12 months before Election Day",
    summary: "Citizens register to vote and electoral rolls are prepared, updated, and published.",
    details: `Voter registration is the foundation of any democratic election. During this phase, eligible citizens ensure they are registered in the electoral rolls for their constituency.`,
    keyPoints: [
      "Eligible citizens register themselves as voters",
      "Electoral rolls from previous elections are updated",
      "New voters turning eligible age are added",
      "Deceased or relocated voters are removed",
      "Photo voter ID cards (EPIC) are issued",
      "Special drives to register marginalized communities",
      "Online voter registration portals are activated"
    ],
    fact: "India has over 900 million registered voters, making it the largest electorate in the world."
  },
  {
    phase: "Phase 3",
    title: "Candidate Nominations & Scrutiny",
    date: "4–8 weeks before Election Day",
    summary: "Candidates file nomination papers, which are then scrutinized for eligibility.",
    details: `Political parties and independent candidates formally file their nominations to contest the election. Each nomination is carefully scrutinized to ensure the candidate meets all eligibility criteria.`,
    keyPoints: [
      "Candidates file nomination papers with the Returning Officer",
      "Security deposit must be paid by each candidate",
      "Documents including affidavits of assets and criminal records are submitted",
      "Scrutiny of nominations to verify eligibility",
      "Candidates may withdraw nominations within a deadline",
      "Final list of contesting candidates is published",
      "Election symbols are allotted to candidates"
    ],
    fact: "Candidates must disclose their criminal background, financial assets, and educational qualifications in their nomination affidavits."
  },
  {
    phase: "Phase 4",
    title: "Election Campaigning",
    date: "2–6 weeks before Election Day",
    summary: "Candidates and parties campaign to win voter support through rallies, media, and outreach.",
    details: `The campaign period is one of the most visible phases of the election process. Candidates and political parties engage in extensive outreach to persuade voters.`,
    keyPoints: [
      "Political rallies, road shows, and public meetings",
      "Door-to-door canvassing by party workers",
      "Media advertising — TV, radio, print, and digital",
      "Social media campaigns and online outreach",
      "Debates between candidates on key issues",
      "Election Commission enforces the Model Code of Conduct",
      "Campaign expenditure limits are monitored",
      "Campaign period ends 48 hours before polling (silent period)"
    ],
    fact: "The Model Code of Conduct prohibits parties from making promises of freebies, using government resources, or appealing to voters on religious or caste lines."
  },
  {
    phase: "Phase 5",
    title: "Polling / Voting Day",
    date: "Election Day",
    summary: "Registered voters cast their ballots at designated polling stations.",
    details: `Polling day is the culmination of the electoral process where citizens exercise their fundamental democratic right to vote. Elaborate security and logistical arrangements ensure smooth and fair voting.`,
    keyPoints: [
      "Polling stations open at designated times (typically 7 AM to 6 PM)",
      "Voters verify identity and are marked with indelible ink",
      "Votes are cast using Electronic Voting Machines (EVMs)",
      "VVPAT machines provide a paper trail for verification",
      "Booth-level officers manage each polling station",
      "Security forces are deployed to maintain order",
      "Exit polls may be conducted after voting",
      "NOTA (None of the Above) option is available"
    ],
    fact: "India uses over 1.8 million EVMs across approximately 1 million polling stations, making it the largest logistical exercise in the world."
  },
  {
    phase: "Phase 6",
    title: "Vote Counting & Results",
    date: "1–3 days after Polling",
    summary: "Votes are counted under strict supervision, and results are declared.",
    details: `After polling concludes, the sealed EVMs are transported to counting centers under heavy security. The counting process is conducted transparently with representatives from all parties present.`,
    keyPoints: [
      "EVMs are stored in secure strong rooms until counting day",
      "Counting begins with postal ballots",
      "EVM counts are tallied round by round",
      "VVPAT paper slips are verified for random samples",
      "Candidates or their agents can challenge results",
      "Results are declared constituency by constituency",
      "The Election Commission publishes official results",
      "Winning candidates receive certificates of election"
    ],
    fact: "Counting of votes for an entire general election in India is typically completed in a single day, with results declared by evening."
  },
  {
    phase: "Phase 7",
    title: "Government Formation & Swearing-In",
    date: "Within 2 weeks of Results",
    summary: "The winning party or coalition forms the government and leaders are sworn in.",
    details: `After results are declared, the political process of forming a government begins. The party or coalition with a majority is invited to form the government.`,
    keyPoints: [
      "The party/coalition with majority stakes claim to form government",
      "The head of state invites the leader to form government",
      "If no clear majority, coalition negotiations take place",
      "The Prime Minister / Chief Minister is sworn in",
      "Cabinet ministers are appointed and sworn in",
      "The new government presents its agenda",
      "Defeated candidates may file election petitions if disputes arise"
    ],
    fact: "A party needs to win a simple majority (more than half) of the total seats to form the government independently."
  }
];

const PROCESS_DATA = [
  {
    id: "registration",
    title: "Voter Registration",
    icon: "📋",
    description: "Voter registration is the process by which eligible citizens enroll themselves in the electoral roll to gain the right to vote in elections.",
    steps: [
      { title: "Check Eligibility", desc: "Must be a citizen, at least 18 years old on the qualifying date, and a resident of the constituency." },
      { title: "Obtain Registration Form", desc: "Form 6 for new registration, Form 8 for corrections, Form 7 for objections. Available online and offline." },
      { title: "Submit Application", desc: "Submit the filled form along with proof of age, address, and a passport-sized photograph to the Electoral Registration Officer." },
      { title: "Verification Process", desc: "An official (BLO - Booth Level Officer) visits your address for verification of details provided." },
      { title: "Inclusion in Electoral Roll", desc: "Once verified, your name is added to the electoral roll and you receive a Voter ID card (EPIC)." }
    ]
  },
  {
    id: "nomination",
    title: "Candidate Nomination",
    icon: "🏛️",
    description: "The nomination process ensures that only eligible candidates contest elections. It involves filing papers, scrutiny, and possible withdrawal.",
    steps: [
      { title: "Obtain Nomination Form", desc: "Candidates get the prescribed nomination form from the Returning Officer of their constituency." },
      { title: "File Nomination Papers", desc: "Submit the form with required documents, security deposit, and affidavits declaring assets and criminal cases." },
      { title: "Scrutiny of Nominations", desc: "The Returning Officer examines all nominations to ensure they meet legal requirements." },
      { title: "Withdrawal Period", desc: "Candidates have a window of 2 days after scrutiny to withdraw their nomination if they choose." },
      { title: "Final Candidate List", desc: "After withdrawal deadline, the final list of contesting candidates is published along with allotted symbols." }
    ]
  },
  {
    id: "campaigning",
    title: "Election Campaigning",
    icon: "📢",
    description: "Campaigning is the period where candidates and parties communicate their vision, policies, and promises to voters through various channels.",
    steps: [
      { title: "Strategy Planning", desc: "Parties develop their manifesto, identify key issues, and plan campaign strategies for each constituency." },
      { title: "Public Outreach", desc: "Rallies, road shows, door-to-door canvassing, and public meetings to connect directly with voters." },
      { title: "Media Campaigns", desc: "Advertising through television, radio, newspapers, social media, and digital platforms within spending limits." },
      { title: "Debates & Discussions", desc: "Candidates participate in public debates, town halls, and media interviews to present their vision." },
      { title: "Code of Conduct", desc: "All activities must comply with the Model Code of Conduct enforced by the Election Commission." },
      { title: "Silent Period", desc: "Campaigning must stop 48 hours before polling day to give voters time to make uninfluenced decisions." }
    ]
  },
  {
    id: "voting",
    title: "Voting Process",
    icon: "🗳️",
    description: "The voting process is the core of democracy where registered voters cast their ballots to choose their representatives.",
    steps: [
      { title: "Locate Your Polling Station", desc: "Find your assigned polling station using your Voter ID card or the election commission's online tools." },
      { title: "Identity Verification", desc: "Present your Voter ID or approved photo identification at the polling station for verification." },
      { title: "Indelible Ink Mark", desc: "Your left index finger is marked with indelible ink to prevent duplicate voting." },
      { title: "Cast Your Vote", desc: "Enter the voting booth, find your preferred candidate on the EVM, and press the button next to their name and symbol." },
      { title: "VVPAT Verification", desc: "A paper slip is printed by the VVPAT machine showing the candidate you voted for — visible for 7 seconds for verification." },
      { title: "Exit the Booth", desc: "After voting, exit the polling station. You may be approached for exit polls but participation is voluntary." }
    ]
  },
  {
    id: "counting",
    title: "Vote Counting",
    icon: "📊",
    description: "Vote counting is a transparent process where all votes are tallied under strict supervision with representatives from all parties present.",
    steps: [
      { title: "Strong Room Security", desc: "Sealed EVMs are stored in secure strong rooms under 24/7 CCTV surveillance and multi-layer security until counting day." },
      { title: "Counting Day Setup", desc: "Counting centers are set up with designated tables for each constituency. Counting agents from all parties are present." },
      { title: "Postal Ballot Counting", desc: "Counting begins with postal ballots — votes cast by military, government officials on duty, and absentee voters." },
      { title: "EVM Vote Counting", desc: "EVM counts proceed round by round, with results from each round displayed on boards and shared with media." },
      { title: "VVPAT Verification", desc: "Paper slips from randomly selected EVMs are counted and matched with electronic results for audit purposes." },
      { title: "Result Declaration", desc: "The Returning Officer declares the winner for each constituency after all rounds are completed and verified." }
    ]
  },
  {
    id: "results",
    title: "Results & Formation",
    icon: "🏆",
    description: "After results are declared, the process of government formation begins based on which party or coalition wins a majority of seats.",
    steps: [
      { title: "Results Compilation", desc: "The Election Commission compiles results from all constituencies and publishes comprehensive data." },
      { title: "Majority Assessment", desc: "The party or coalition that crosses the majority mark (half + 1 of total seats) is identified." },
      { title: "Government Formation Invite", desc: "The President/Governor invites the majority party/coalition leader to form the government." },
      { title: "Swearing-In Ceremony", desc: "The PM/CM and council of ministers take the oath of office and secrecy in a formal ceremony." },
      { title: "Opposition Role", desc: "The largest party not in government becomes the official opposition, playing a vital role in democratic checks." }
    ]
  }
];

const QUIZ_DATA = [
  {
    question: "What is the minimum age required to vote in India?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correct: 1,
    explanation: "The Constitution of India sets the minimum voting age at 18 years. This was reduced from 21 years by the 61st Amendment Act, 1988."
  },
  {
    question: "Which body is responsible for conducting elections in India?",
    options: ["Supreme Court", "Parliament", "Election Commission of India", "President of India"],
    correct: 2,
    explanation: "The Election Commission of India (ECI) is an autonomous constitutional body responsible for administering election processes at all levels."
  },
  {
    question: "What does EVM stand for?",
    options: ["Electronic Verification Machine", "Electoral Vote Machine", "Electronic Voting Machine", "Election Validation Module"],
    correct: 2,
    explanation: "EVM stands for Electronic Voting Machine, which is used across India to record votes digitally."
  },
  {
    question: "What is the purpose of VVPAT in elections?",
    options: ["To count votes automatically", "To provide a paper trail for vote verification", "To register new voters", "To display election results"],
    correct: 1,
    explanation: "VVPAT (Voter Verifiable Paper Audit Trail) prints a paper slip showing the voted candidate, allowing voters to verify their vote was recorded correctly."
  },
  {
    question: "What is the 'Model Code of Conduct'?",
    options: ["A law passed by Parliament for elections", "Guidelines for voter behavior", "A set of rules for parties and candidates during elections", "Rules for counting votes"],
    correct: 2,
    explanation: "The Model Code of Conduct is a set of guidelines issued by the Election Commission to regulate political parties and candidates during elections to ensure free and fair polls."
  },
  {
    question: "How long before polling does the campaign silence period begin?",
    options: ["24 hours", "48 hours", "72 hours", "1 week"],
    correct: 1,
    explanation: "All campaigning must cease 48 hours before the polling day begins. This silent period allows voters to make their decisions without campaign pressure."
  },
  {
    question: "What is NOTA in Indian elections?",
    options: ["A political party", "A type of ballot paper", "None of the Above option on EVM", "A voter registration form"],
    correct: 2,
    explanation: "NOTA (None of the Above) allows voters to officially reject all candidates. It was introduced by the Supreme Court in 2013."
  },
  {
    question: "What is Form 6 used for in the election process?",
    options: ["Filing candidate nomination", "New voter registration", "Filing election complaints", "Requesting postal ballot"],
    correct: 1,
    explanation: "Form 6 is the application form for new voter registration. It is used by eligible citizens to get their name included in the electoral roll."
  },
  {
    question: "What is indelible ink used for during elections?",
    options: ["Signing ballot papers", "Marking the voter's finger to prevent re-voting", "Sealing the EVMs", "Stamping nomination papers"],
    correct: 1,
    explanation: "Indelible ink is applied to the voter's left index finger after voting to prevent the same person from voting again. The mark lasts several days."
  },
  {
    question: "Who is the chief electoral officer at the constituency level?",
    options: ["District Magistrate", "Returning Officer", "Chief Election Commissioner", "Presiding Officer"],
    correct: 1,
    explanation: "The Returning Officer is the key official responsible for conducting elections in a particular constituency, including receiving nominations and declaring results."
  },
  {
    question: "What is a 'hung parliament/assembly'?",
    options: ["When elections are cancelled", "When no party gets a clear majority", "When the opposition wins", "When voter turnout is very low"],
    correct: 1,
    explanation: "A hung parliament or assembly occurs when no single party or pre-election coalition wins enough seats to form a majority government on its own."
  },
  {
    question: "What is the role of a BLO (Booth Level Officer)?",
    options: ["Counting votes at the booth", "Managing security on polling day", "Maintaining the voter list and verifying voter details at the local level", "Announcing election results"],
    correct: 2,
    explanation: "BLOs are responsible for maintaining and updating the electoral roll at the booth level, including verifying new voter applications through home visits."
  },
  {
    question: "What is a security deposit, and when is it forfeited?",
    options: ["Money paid by voters; forfeited if they don't vote", "Money paid by candidates; forfeited if they get less than 1/6th of total votes", "A bond paid by political parties to the Election Commission", "Insurance paid for EVMs"],
    correct: 1,
    explanation: "Candidates must pay a security deposit when filing nominations. It is forfeited if the candidate fails to secure at least one-sixth of the total valid votes polled."
  },
  {
    question: "When were EVMs first used on a large scale in Indian general elections?",
    options: ["1989", "1999", "2004", "2009"],
    correct: 2,
    explanation: "While EVMs were piloted in select constituencies earlier, they were used across all constituencies in Indian general elections for the first time in 2004."
  },
  {
    question: "What happens to the EVMs after voting is completed?",
    options: ["They are destroyed", "They are sent to the Election Commission headquarters", "They are sealed and stored in strong rooms under security", "They are given to political parties for verification"],
    correct: 2,
    explanation: "After polling, EVMs are sealed in the presence of candidates' agents and stored in designated strong rooms under 24/7 armed security and CCTV surveillance until counting day."
  }
];

const GLOSSARY_DATA = [
  { term: "Ballot", definition: "A process of voting, or the actual document/device on which voters indicate their choice of candidate." },
  { term: "By-Election", definition: "An election held to fill a vacancy that arises between general elections, usually due to death, resignation, or disqualification of a member." },
  { term: "Canvassing", definition: "The activity of going to people's homes to persuade them to vote for a particular candidate or party." },
  { term: "Coalition", definition: "An alliance of two or more political parties that come together to form a government when no single party has a majority." },
  { term: "Constituency", definition: "A specific geographic area whose residents are represented by an elected official. Also called an electoral district." },
  { term: "Electoral Roll", definition: "The official list of all persons eligible to vote in a particular constituency. Also known as the voters' list." },
  { term: "EVM (Electronic Voting Machine)", definition: "A portable electronic device used in Indian elections to record votes. It replaces paper ballots and ensures faster, tamper-proof voting." },
  { term: "Exit Poll", definition: "A survey conducted immediately after voters leave polling stations, asking which candidate they voted for, used to predict results." },
  { term: "First Past the Post (FPTP)", definition: "An electoral system where the candidate with the most votes in a constituency wins, regardless of whether they have an overall majority." },
  { term: "Hung Parliament", definition: "A situation where no single party wins an outright majority of seats, requiring coalition-building or minority government formation." },
  { term: "Indelible Ink", definition: "A semi-permanent ink applied to a voter's finger during elections to prevent fraudulent double-voting." },
  { term: "Manifesto", definition: "A public declaration by a political party of its policies, aims, and promises ahead of an election." },
  { term: "Model Code of Conduct", definition: "A set of guidelines issued by the Election Commission for political parties and candidates to follow during the election period to ensure fair play." },
  { term: "NOTA (None of the Above)", definition: "An option on the EVM that allows voters to officially register their disapproval of all candidates without spoiling their ballot." },
  { term: "Polling Booth", definition: "The specific location within a polling station where a voter casts their vote in privacy." },
  { term: "Presiding Officer", definition: "The official in charge of managing a specific polling station on election day, ensuring proper procedures are followed." },
  { term: "Proportional Representation", definition: "An electoral system where parties gain seats in proportion to the number of votes they receive, ensuring broader representation." },
  { term: "Returning Officer", definition: "The official responsible for conducting elections in a particular constituency, including receiving nominations and declaring results." },
  { term: "Simple Majority", definition: "The requirement of winning more than half of the total seats in a legislative body to form a government." },
  { term: "Suffrage", definition: "The right to vote in political elections. Universal suffrage means all adult citizens have the right to vote." },
  { term: "Swing Vote", definition: "Votes from undecided or independent voters that can 'swing' the result in either direction." },
  { term: "VVPAT", definition: "Voter Verifiable Paper Audit Trail — a machine attached to EVMs that prints a paper slip showing the voter's choice for verification." },
  { term: "Voter ID (EPIC)", definition: "Electors Photo Identity Card — the official photo identification issued to registered voters by the Election Commission." },
  { term: "Whip", definition: "A directive issued by a political party to its members in the legislature to vote in a particular way on a specific issue." }
];

const CHAT_RESPONSES = {
  "election process": "The election process consists of 7 key phases:\n\n1. **Election Announcement** — Official notification and preparation\n2. **Voter Registration** — Citizens enroll in electoral rolls\n3. **Candidate Nomination** — Candidates file papers and are scrutinized\n4. **Campaigning** — Parties reach out to voters\n5. **Polling Day** — Voters cast their ballots\n6. **Vote Counting** — Ballots are tallied transparently\n7. **Government Formation** — Winners are sworn in\n\nWould you like to know more about any specific phase?",
  "steps": "The election process consists of 7 key phases:\n\n1. **Election Announcement** — Official notification and preparation\n2. **Voter Registration** — Citizens enroll in electoral rolls\n3. **Candidate Nomination** — Candidates file papers and are scrutinized\n4. **Campaigning** — Parties reach out to voters\n5. **Polling Day** — Voters cast their ballots\n6. **Vote Counting** — Ballots are tallied transparently\n7. **Government Formation** — Winners are sworn in\n\nWould you like to know more about any specific phase?",
  "voter registration": "**Voter Registration** is how citizens enroll to vote:\n\n• You must be an Indian citizen and at least **18 years old**\n• Fill **Form 6** for new registration\n• Submit with proof of age, address, and photo\n• A **Booth Level Officer (BLO)** verifies your details\n• Once approved, you receive a **Voter ID (EPIC)** card\n• You can register online at the National Voter Service Portal\n\nIndia has over **900 million** registered voters!",
  "registration": "**Voter Registration** is how citizens enroll to vote:\n\n• You must be an Indian citizen and at least **18 years old**\n• Fill **Form 6** for new registration\n• Submit with proof of age, address, and photo\n• A **Booth Level Officer (BLO)** verifies your details\n• Once approved, you receive a **Voter ID (EPIC)** card\n\nYou can register online at the National Voter Service Portal!",
  "election day": "**Election Day** is when voters cast their ballots:\n\n• Polling stations typically open **7 AM to 6 PM**\n• Bring your **Voter ID** or approved photo ID\n• Your finger is marked with **indelible ink**\n• Vote using an **EVM (Electronic Voting Machine)**\n• **VVPAT** prints a paper slip for verification\n• **NOTA** option lets you reject all candidates\n• Heavy security ensures peaceful voting\n\nIndia uses over **1.8 million EVMs** across approximately **1 million polling stations**!",
  "electoral college": "The **Electoral College** is primarily a feature of **US Presidential elections**.\n\nIn the **Indian context**, we have an **Electoral College** for:\n• **Presidential Elections** — Members of Parliament and State Legislatures vote\n• **Vice-Presidential Elections** — Members of both houses of Parliament vote\n\nFor general elections (Lok Sabha), India uses the **First Past the Post (FPTP)** system where citizens directly vote for candidates in their constituency.",
  "evm": "**Electronic Voting Machines (EVMs)** are used across India:\n\n• Portable, battery-operated devices\n• Two units: **Control Unit** (with polling officer) and **Ballot Unit** (in voting booth)\n• Each EVM can record up to **3,840 votes**\n• Tamper-proof with advanced security features\n• Paired with **VVPAT** for paper trail verification\n• First fully used in Indian general elections in **2004**\n\nEVMs have made the voting process faster and reduced ballot fraud significantly.",
  "nota": "**NOTA (None of the Above)** is a unique option in Indian elections:\n\n• Introduced by the **Supreme Court of India in 2013**\n• Allows voters to **officially reject all candidates**\n• Appears as the **last option on the EVM**\n• If NOTA gets the most votes, the candidate with the **next highest votes still wins**\n• Serves as a powerful tool for **voter dissent**\n\nNOTA empowers voters to express dissatisfaction without abstaining from the democratic process.",
  "campaign": "**Election Campaigning** involves:\n\n• **Rallies & Road Shows** — Public gatherings to mobilize support\n• **Door-to-Door Canvassing** — Party workers visit homes\n• **Media Campaigns** — TV, radio, print, and digital advertising\n• **Social Media** — Increasingly important for reaching young voters\n• **Debates** — Candidates discuss policies and issues\n\n⚠️ All campaigns must follow the **Model Code of Conduct**\n⏱️ Campaigning stops **48 hours before polling** (silent period)",
  "counting": "**Vote Counting** process:\n\n• EVMs are stored in **secure strong rooms** until counting day\n• **Postal ballots** are counted first\n• EVM results are revealed **round by round**\n• **VVPAT** paper slips are verified for random samples\n• All party agents can **observe the counting**\n• Results are declared **constituency by constituency**\n• The entire counting for a general election is typically completed in **one day**",
  "default": "That's a great question! Here's what I can help you with:\n\n• **Election Process** — The overall flow of elections\n• **Voter Registration** — How to register to vote\n• **Campaigning** — How candidates reach voters\n• **Election Day** — What happens when you vote\n• **Vote Counting** — How votes are tallied\n• **EVMs** — Electronic Voting Machines\n• **NOTA** — The 'None of the Above' option\n• **Electoral College** — How it works\n\nTry asking about any of these topics!"
};
