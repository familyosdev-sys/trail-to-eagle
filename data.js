// ═══════════════════════════════════════════════════════════════
// Trail to Eagle — BSA Advancement Data
// Sources: scouting.org, 2025/2026 BSA Requirements, Guide to Advancement
// Updated: June 2026 — Citizenship in Society discontinued Feb 27, 2026
// Eagle-required count reduced from 14 to 13
// ═══════════════════════════════════════════════════════════════

const RANKS = [
  // ═══ SCOUT ═══
  {
    id: "scout",
    name: "Scout",
    emblem: "🔦",
    color: "#C3B091",
    order: 1,
    motto: "Every journey starts with a single step.",
    requirements: [
      { id: "scout-1", num: "1", text: "Repeat from memory the Scout Oath, Scout Law, motto, and slogan. In your own words, explain their meaning.", subReqs: [
        { id: "scout-1a", num: "1a", text: "The Scout Oath" },
        { id: "scout-1b", num: "1b", text: "The Scout Law" },
        { id: "scout-1c", num: "1c", text: "The Scout motto" },
        { id: "scout-1d", num: "1d", text: "The Scout slogan" },
      ]},
      { id: "scout-2", num: "2", text: "Explain the significance of the First Class Scout badge.", subReqs: [
        { id: "scout-2a", num: "2a", text: "What does the three-point design of the badge mean?" },
        { id: "scout-2b", num: "2b", text: "What do the stars on the badge represent?" },
        { id: "scout-2c", num: "2c", text: "What does the eagle and shield stand for?" },
        { id: "scout-2d", num: "2d", text: "What does the scroll with the Scout motto say?" },
      ]},
      { id: "scout-3", num: "3", text: "Describe the following: the Scout sign, the Scout salute, and the Scout handshake.", subReqs: [
        { id: "scout-3a", num: "3a", text: "The Scout sign" },
        { id: "scout-3b", num: "3b", text: "The Scout salute" },
      ]},
      { id: "scout-4", num: "4", text: "Demonstrate how to properly fold the flag of the United States of America.", subReqs: [
        { id: "scout-4a", num: "4a", text: "Demonstrate folding the flag" },
        { id: "scout-4b", num: "4b", text: "Explain when the flag should be flown at half-staff" },
      ]},
      { id: "scout-5", num: "5", text: "Demonstrate you know how to tie the following knots: square knot, two half-hitches, taut-line hitch." },
      { id: "scout-6", num: "6", text: "Explain the importance of the buddy system.", subReqs: [
        { id: "scout-6a", num: "6a", text: "Explain the buddy system" },
        { id: "scout-6b", num: "6b", text: "Describe when you should use the buddy system" },
      ]},
      { id: "scout-7", num: "7", text: "Describe what to do if you become lost on a hike or in the woods." },
      { id: "scout-8", num: "8", text: "With your parent or guardian, complete the exercises in the pamphlet How to Protect Your Children From Child Abuse: A Parent's Guide and earn the Cyber Chip Award for your grade." },
    ]
  },

  // ═══ TENDERFOOT ═══
  {
    id: "tenderfoot",
    name: "Tenderfoot",
    emblem: "🌿",
    color: "#6B8E23",
    order: 2,
    motto: "The trail is opening up.",
    requirements: [
      { id: "tf-1", num: "1a", text: "Present yourself to your leader, prepared for an overnight camping trip. Show the personal gear you will bring, including how you will pack it.", subReqs: [
        { id: "tf-1b", num: "1b", text: "Show that you know how to properly pack and wear a backpack." },
      ]},
      { id: "tf-2", num: "2a", text: "Help plan a menu for one of your campouts. Show how the menu includes the four basic food groups and how to plan a nutritious meal.", subReqs: [
        { id: "tf-2b", num: "2b", text: "Help prepare and cook a meal for your patrol." },
        { id: "tf-2c", num: "2c", text: "Explain how the Outdoor Code and no-trace principles should be followed on campouts." },
        { id: "tf-2d", num: "2d", text: "After the campout, discuss with your patrol what went well and what you would do differently next time." },
      ]},
      { id: "tf-3", num: "3a", text: "Explain the significance of the Scout sign, Scout salute, and Scout handshake.", subReqs: [
        { id: "tf-3b", num: "3b", text: "Describe when you should use each." },
      ]},
      { id: "tf-4", num: "4a", text: "Demonstrate how to whip and fuse the ends of a rope.", subReqs: [
        { id: "tf-4b", num: "4b", text: "Demonstrate how to tie the following knots: two half-hitches and taut-line hitch." },
        { id: "tf-4c", num: "4c", text: "Explain when you should use each knot." },
        { id: "tf-4d", num: "4d", text: "Demonstrate how to make a rope by hand." },
      ]},
      { id: "tf-5", num: "5a", text: "Explain the importance of the buddy system as it relates to your personal safety on outings and in your everyday life.", subReqs: [
        { id: "tf-5b", num: "5b", text: "Describe what to do if you become lost on a hike or in the woods." },
      ]},
      { id: "tf-6", num: "6a", text: "Record your best in the following tests: push-ups, sit-ups, and a timed run/walk.", subReqs: [
        { id: "tf-6b", num: "6b", text: "Develop and implement a personal fitness program, and keep a log for 30 days." },
        { id: "tf-6c", num: "6c", text: "After 30 days, repeat the tests and show improvement in each one." },
      ]},
      { id: "tf-7", num: "7a", text: "Demonstrate how to find directions during the day and at night without using a compass." },
      { id: "tf-8", num: "8a", text: "Demonstrate how to properly care for and sharpen a knife, saw, and ax." },
      { id: "tf-9", num: "9a", text: "Describe the symptoms of heatstroke, hypothermia, and dehydration.", subReqs: [
        { id: "tf-9b", num: "9b", text: "Describe first aid for each condition." },
      ]},
      { id: "tf-10", num: "10a", text: "Demonstrate first aid for: blisters, minor burns, and an insect bite or sting." },
      { id: "tf-11", num: "11", text: "Tell what you have learned about the Outdoor Code and how you follow it." },
    ]
  },

  // ═══ SECOND CLASS ═══
  {
    id: "second-class",
    name: "Second Class",
    emblem: "🥾",
    color: "#4CAF50",
    order: 3,
    motto: "You're finding your stride on the trail.",
    requirements: [
      { id: "2c-1", num: "1a", text: "Demonstrate how a compass works and how to orient a map. Use a map and compass to complete an orienteering course.", subReqs: [
        { id: "2c-1b", num: "1b", text: "Explain the meaning of contour lines on a topographic map." },
      ]},
      { id: "2c-2", num: "2a", text: "Spend at least one night on a patrol or troop campout. Sleep in a tent you have helped pitch." },
      { id: "2c-3", num: "3a", text: "Identify or show evidence of at least 10 kinds of wild animals (such as mammals, birds, reptiles, fish, insects) found in your local area." },
      { id: "2c-4", num: "4", text: "Demonstrate how to use a knife, saw, and ax safely. Earn the Totin' Chip." },
      { id: "2c-5", num: "5a", text: "Participate in a flag ceremony for your unit, school, religious institution, or other community group." },
      { id: "2c-6", num: "6a", text: "Demonstrate how to treat for shock.", subReqs: [
        { id: "2c-6b", num: "6b", text: "Demonstrate first aid for a cut or scrape, snakebite, a puncture or splinter, and a bite from a possibly rabid animal." },
        { id: "2c-6c", num: "6c", text: "Demonstrate first aid for burns, choking, and stop, drop, and roll." },
        { id: "2c-6d", num: "6d", text: "Demonstrate first aid for a knocked-out tooth." },
      ]},
      { id: "2c-7", num: "7a", text: "Participate in a school, community, or troop program on the dangers of using drugs, alcohol, and tobacco and other practices that could be harmful to your health." },
      { id: "2c-8", num: "8a", text: "Participate in two hours of service on a service project(s). This can be done individually or with your patrol or troop." },
      { id: "2c-9", num: "9a", text: "Explain the buddy system and how it protects you and your friends." },
      { id: "2c-10", num: "10", text: "Demonstrate Scout spirit by living the Scout Oath and Scout Law." },
      { id: "2c-11", num: "11", text: "Participate in a Scoutmaster conference." },
    ]
  },

  // ═══ FIRST CLASS ═══
  {
    id: "first-class",
    name: "First Class",
    emblem: "⭐",
    color: "#D4A017",
    order: 4,
    motto: "The path is clear and you're walking strong.",
    requirements: [
      { id: "fc-1", num: "1a", text: "Demonstrate how to use a topographic map and compass to navigate to a destination.", subReqs: [
        { id: "fc-1b", num: "1b", text: "Using a compass and a topographic map, complete an orienteering course of at least 1 mile." },
      ]},
      { id: "fc-2", num: "2a", text: "Spend at least one night on a patrol or troop campout. Sleep in a tent you have helped pitch.", subReqs: [
        { id: "fc-2b", num: "2b", text: "On any of these campouts, you have helped plan and cook one hot breakfast or lunch, and one hot dinner." },
        { id: "fc-2c", num: "2c", text: "Plan a menu for one meal that includes all four food groups. Create a shopping list and estimate cost." },
        { id: "fc-2d", num: "2d", text: "Demonstrate how to store and dispose of food properly on a campout." },
      ]},
      { id: "fc-3", num: "3a", text: "Identify or show evidence of at least 10 kinds of native plants found in your local area." },
      { id: "fc-4", num: "4a", text: "Demonstrate how to tie the following knots: bowline, clove hitch, timber hitch, and figure eight on a bight." },
      { id: "fc-5", num: "5a", text: "Demonstrate first aid for the following: object in the eye, bite from a non-venomous snake, puncture wounds from splinters or nails, and an allergic reaction." },
      { id: "fc-6", num: "6a", text: "Demonstrate how to estimate the height or width of an object without using a measuring device.", subReqs: [
        { id: "fc-6b", num: "6b", text: "Demonstrate how to estimate the distance across a river or stream." },
      ]},
      { id: "fc-7", num: "7a", text: "Plan and conduct a court of honor, campfire program, or interfaith worship service." },
      { id: "fc-8", num: "8a", text: "Participate in three hours of service on a service project(s). This can be done individually or with your patrol or troop." },
      { id: "fc-9", num: "9a", text: "Demonstrate Scout spirit by living the Scout Oath and Scout Law in your everyday life." },
      { id: "fc-10", num: "10", text: "Participate in a Scoutmaster conference." },
      { id: "fc-11", num: "11", text: "Successfully complete a board of review." },
    ]
  },

  // ═══ STAR ═══
  {
    id: "star",
    name: "Star",
    emblem: "⭐",
    color: "#FFB300",
    order: 5,
    motto: "The stars are guiding your way.",
    requirements: [
      { id: "star-1", num: "1", text: "Be active in your troop for at least four months as a First Class Scout." },
      { id: "star-2", num: "2", text: "As a First Class Scout, demonstrate Scout spirit by living the Scout Oath and Scout Law. Tell how you have done your duty to God and how you have lived the Scout Oath and Scout Law in your everyday life." },
      { id: "star-3", num: "3", text: "Earn six merit badges, including any four from the required list for Eagle. (See the Eagle-required list in the merit badge section.)" },
      { id: "star-4", num: "4", text: "While a First Class Scout, take part in service projects totaling at least six hours of work. These projects must be approved by your Scoutmaster." },
      { id: "star-5", num: "5", text: "While a First Class Scout, serve actively in your troop for at least four months in one or more of the following positions of responsibility: patrol leader, senior patrol leader, assistant senior patrol leader, troop guide, Order of the Arrow troop representative, den chief, scribe, librarian, historian, quartermaster, bugler, junior assistant Scoutmaster, chaplain aide, instructor, webmaster, or outdoor ethics guide." },
      { id: "star-6", num: "6", text: "While a First Class Scout, participate in a Scoutmaster conference." },
      { id: "star-7", num: "7", text: "Successfully complete a board of review." },
    ]
  },

  // ═══ LIFE ═══
  {
    id: "life",
    name: "Life",
    emblem: "❤️",
    color: "#E5383B",
    order: 6,
    motto: "Life Scout — the final step before Eagle.",
    requirements: [
      { id: "life-1", num: "1", text: "Be active in your troop for at least six months as a Star Scout." },
      { id: "life-2", num: "2", text: "As a Star Scout, demonstrate Scout spirit by living the Scout Oath and Scout Law. Tell how you have done your duty to God and how you have lived the Scout Oath and Scout Law in your everyday life." },
      { id: "life-3", num: "3", text: "Earn five more merit badges (so you have at least 11 in all), including any three more from the required list for Eagle. (See the Eagle-required list.)" },
      { id: "life-4", num: "4", text: "While a Star Scout, take part in service projects totaling at least six hours of work. These projects must be approved by your Scoutmaster." },
      { id: "life-5", num: "5", text: "While a Star Scout, serve actively in your troop for at least six months in one or more of the positions of responsibility listed for Star Scout (or a Venturing crew or Sea Scout ship position)." },
      { id: "life-6", num: "6", text: "While a Star Scout, participate in a Scoutmaster conference." },
      { id: "life-7", num: "7", text: "Successfully complete a board of review." },
    ]
  },

  // ═══ EAGLE ═══
  {
    id: "eagle",
    name: "Eagle Scout",
    emblem: "🦅",
    color: "#D4A017",
    order: 7,
    motto: "The summit is within reach. You've earned your wings.",
    requirements: [
      { id: "eagle-1", num: "1", text: "Be active in your troop, crew, or ship for at least six months as a Life Scout." },
      { id: "eagle-2", num: "2", text: "As a Life Scout, demonstrate that you live by the principles of the Scout Oath and Scout Law in your everyday life and tell how you have done your duty to God. List the names of individuals who know you personally and would be willing to provide a recommendation on your behalf, including parents/guardians, religious, educational, employer (if employed), and two other references." },
      { id: "eagle-3", num: "3", text: "Earn a total of 21 merit badges, including the following 13 required badges:", subReqs: [
        { id: "eagle-3a", num: "3a", text: "First Aid", isBadge: true, badgeId: "first-aid" },
        { id: "eagle-3b", num: "3b", text: "Citizenship in the Community", isBadge: true, badgeId: "citizenship-in-the-community" },
        { id: "eagle-3c", num: "3c", text: "Citizenship in the Nation", isBadge: true, badgeId: "citizenship-in-the-nation" },
        { id: "eagle-3d", num: "3d", text: "Citizenship in the World", isBadge: true, badgeId: "citizenship-in-the-world" },
        { id: "eagle-3e", num: "3e", text: "Communication", isBadge: true, badgeId: "communication" },
        { id: "eagle-3f", num: "3f", text: "Cooking", isBadge: true, badgeId: "cooking" },
        { id: "eagle-3g", num: "3g", text: "Emergency Preparedness OR Lifesaving", isBadge: true, isAlt: true, badgeIds: ["emergency-preparedness", "lifesaving"] },
        { id: "eagle-3h", num: "3h", text: "Environmental Science OR Sustainability", isBadge: true, isAlt: true, badgeIds: ["environmental-science", "sustainability"] },
        { id: "eagle-3i", num: "3i", text: "Personal Management", isBadge: true, badgeId: "personal-management" },
        { id: "eagle-3j", num: "3j", text: "Personal Fitness", isBadge: true, badgeId: "personal-fitness" },
        { id: "eagle-3k", num: "3k", text: "Swimming OR Hiking OR Cycling", isBadge: true, isAlt: true, badgeIds: ["swimming", "hiking", "cycling"] },
        { id: "eagle-3l", num: "3l", text: "Camping", isBadge: true, badgeId: "camping" },
        { id: "eagle-3m", num: "3m", text: "Family Life", isBadge: true, badgeId: "family-life" },
      ]},
      { id: "eagle-4", num: "4", text: "While a Life Scout, serve actively in your troop, crew, or ship for six months in one or more of the following positions of responsibility.", subReqs: [
        { id: "eagle-4a", num: "4a", text: "Scout troop: Patrol leader, assistant senior patrol leader, senior patrol leader, troop guide, Order of the Arrow troop representative, den chief, scribe, librarian, historian, quartermaster, junior assistant Scoutmaster, chaplain aide, instructor, webmaster, or outdoor ethics guide." },
        { id: "eagle-4b", num: "4b", text: "Venturing crew/Sea Scout ship: President, vice president, secretary, treasurer, quartermaster, historian, den chief, guide, boatswain, boatswain's mate, yeoman, purser, storekeeper, chaplain aide, outdoor ethics guide, crew leader, media specialist, specialist, or webmaster." },
      ]},
      { id: "eagle-5", num: "5", text: "While a Life Scout, plan, develop, and give leadership to others in a service project helpful to any religious institution, any school, or your community. The project must benefit an organization other than Scouting America. Use the Eagle Scout Service Project Workbook (No. 512-927)." },
      { id: "eagle-6", num: "6", text: "Participate in a unit leader conference while a Life Scout." },
      { id: "eagle-7", num: "7", text: "Successfully complete the Eagle Scout board of review." },
    ]
  },
];

// ═══════════════════════════════════════════════════════════════
// MERIT BADGES
// 141 entries: 140 active + 1 discontinued (Citizenship in Society)
// Eagle-required: 13 (reduced from 14 after Citizenship in Society
//   discontinued Feb 27, 2026)
// ═══════════════════════════════════════════════════════════════

const MERIT_BADGES = [
  // ─── CITIZENSHIP ───
  { id: "american-cultures", name: "American Cultures", icon: "🌐", category: "Citizenship", eagle: false },
  { id: "american-heritage", name: "American Heritage", icon: "🗽", category: "Citizenship", eagle: false },
  { id: "american-labor", name: "American Labor", icon: "⚒️", category: "Citizenship", eagle: false },
  { id: "citizenship-in-society", name: "Citizenship in Society", icon: "🤝", category: "Citizenship", eagle: true, discontinued: true, discontinuedNote: "Discontinued Feb 27, 2026. May still count as elective if earned." },
  { id: "citizenship-in-the-community", name: "Citizenship in the Community", icon: "🏘️", category: "Citizenship", eagle: true },
  { id: "citizenship-in-the-nation", name: "Citizenship in the Nation", icon: "🏛️", category: "Citizenship", eagle: true },
  { id: "citizenship-in-the-world", name: "Citizenship in the World", icon: "🌍", category: "Citizenship", eagle: true },

  // ─── COMMUNICATIONS ───
  { id: "communication", name: "Communication", icon: "🗣️", category: "Communications", eagle: true },
  { id: "journalism", name: "Journalism", icon: "📰", category: "Communications", eagle: false },
  { id: "public-speaking", name: "Public Speaking", icon: "🎤", category: "Communications", eagle: false },
  { id: "reading", name: "Reading", icon: "📖", category: "Communications", eagle: false },
  { id: "scholarship", name: "Scholarship", icon: "🎓", category: "Communications", eagle: false },
  { id: "signs-signals-and-codes", name: "Signs, Signals, and Codes", icon: "🚩", category: "Communications", eagle: false },

  // ─── OUTDOOR ───
  { id: "archery", name: "Archery", icon: "🏹", category: "Outdoor", eagle: false },
  { id: "astronomy", name: "Astronomy", icon: "🔭", category: "Outdoor", eagle: false },
  { id: "backpacking", name: "Backpacking", icon: "🎒", category: "Outdoor", eagle: false },
  { id: "bird-study", name: "Bird Study", icon: "🦅", category: "Outdoor", eagle: false },
  { id: "camping", name: "Camping", icon: "⛺", category: "Outdoor", eagle: true },
  { id: "canoeing", name: "Canoeing", icon: "🛶", category: "Outdoor", eagle: false },
  { id: "cycling", name: "Cycling", icon: "🚴", category: "Outdoor", eagle: true, eagleAlt: true, eagleAltGroup: "swim-hike-cycle" },
  { id: "exploration", name: "Exploration", icon: "🧭", category: "Outdoor", eagle: false },
  { id: "fishing", name: "Fishing", icon: "🎣", category: "Outdoor", eagle: false },
  { id: "fly-fishing", name: "Fly-Fishing", icon: "🎣", category: "Outdoor", eagle: false },
  { id: "geocaching", name: "Geocaching", icon: "📍", category: "Outdoor", eagle: false },
  { id: "hiking", name: "Hiking", icon: "🥾", category: "Outdoor", eagle: true, eagleAlt: true, eagleAltGroup: "swim-hike-cycle" },
  { id: "horsemanship", name: "Horsemanship", icon: "🐴", category: "Outdoor", eagle: false },
  { id: "insect-study", name: "Insect Study", icon: "🦋", category: "Outdoor", eagle: false },
  { id: "kayaking", name: "Kayaking", icon: "🛶", category: "Outdoor", eagle: false },
  { id: "motorboating", name: "Motorboating", icon: "🚤", category: "Outdoor", eagle: false },
  { id: "pioneering", name: "Pioneering", icon: "🪢", category: "Outdoor", eagle: false },
  { id: "rifle-shooting", name: "Rifle Shooting", icon: "🎯", category: "Outdoor", eagle: false },
  { id: "rowing", name: "Rowing", icon: "🚣", category: "Outdoor", eagle: false },
  { id: "scuba-diving", name: "Scuba Diving", icon: "🤿", category: "Outdoor", eagle: false },
  { id: "shotgun-shooting", name: "Shotgun Shooting", icon: "🔫", category: "Outdoor", eagle: false },
  { id: "small-boat-sailing", name: "Small-Boat Sailing", icon: "⛵", category: "Outdoor", eagle: false },
  { id: "snow-sports", name: "Snow Sports", icon: "⛷️", category: "Outdoor", eagle: false },
  { id: "swimming", name: "Swimming", icon: "🏊", category: "Outdoor", eagle: true, eagleAlt: true, eagleAltGroup: "swim-hike-cycle" },
  { id: "water-sports", name: "Water Sports", icon: "🏄", category: "Outdoor", eagle: false },
  { id: "whitewater", name: "Whitewater", icon: "🚣", category: "Outdoor", eagle: false },
  { id: "wilderness-survival", name: "Wilderness Survival", icon: "🏕️", category: "Outdoor", eagle: false },

  // ─── HEALTH & SAFETY ───
  { id: "american-indian-culture", name: "American Indian Culture", icon: "🪶", category: "Health & Safety", eagle: false },
  { id: "bugling", name: "Bugling", icon: "📯", category: "Health & Safety", eagle: false },
  { id: "emergency-preparedness", name: "Emergency Preparedness", icon: "🚨", category: "Health & Safety", eagle: true, eagleAlt: true, eagleAltGroup: "ep-or-lifesaving" },
  { id: "fire-safety", name: "Fire Safety", icon: "🔥", category: "Health & Safety", eagle: false },
  { id: "first-aid", name: "First Aid", icon: "🏥", category: "Health & Safety", eagle: true },
  { id: "lifesaving", name: "Lifesaving", icon: "🛟", category: "Health & Safety", eagle: true, eagleAlt: true, eagleAltGroup: "ep-or-lifesaving" },
  { id: "orienteering", name: "Orienteering", icon: "🧭", category: "Health & Safety", eagle: false },
  { id: "public-health", name: "Public Health", icon: "💊", category: "Health & Safety", eagle: false },
  { id: "safety", name: "Safety", icon: "⚠️", category: "Health & Safety", eagle: false },
  { id: "scouting-heritage", name: "Scouting Heritage", icon: "⚜️", category: "Health & Safety", eagle: false },

  // ─── STEM ───
  { id: "animation", name: "Animation", icon: "🎬", category: "STEM", eagle: false },
  { id: "artificial-intelligence", name: "Artificial Intelligence", icon: "🤖", category: "STEM", eagle: false, isNew: true },
  { id: "chemistry", name: "Chemistry", icon: "🧪", category: "STEM", eagle: false },
  { id: "composite-materials", name: "Composite Materials", icon: "🔧", category: "STEM", eagle: false },
  { id: "cybersecurity", name: "Cybersecurity", icon: "🔒", category: "STEM", eagle: false, isNew: true },
  { id: "digital-technology", name: "Digital Technology", icon: "💻", category: "STEM", eagle: false },
  { id: "electronics", name: "Electronics", icon: "🔌", category: "STEM", eagle: false },
  { id: "energy", name: "Energy", icon: "⚡", category: "STEM", eagle: false },
  { id: "engineering", name: "Engineering", icon: "⚙️", category: "STEM", eagle: false },
  { id: "environmental-science", name: "Environmental Science", icon: "🔬", category: "STEM", eagle: true, eagleAlt: true, eagleAltGroup: "envsci-or-sustain" },
  { id: "game-design", name: "Game Design", icon: "🎮", category: "STEM", eagle: false },
  { id: "geology", name: "Geology", icon: "🪨", category: "STEM", eagle: false },
  { id: "inventing", name: "Inventing", icon: "💡", category: "STEM", eagle: false },
  { id: "mammal-study", name: "Mammal Study", icon: "🐻", category: "STEM", eagle: false },
  { id: "moviemaking", name: "Moviemaking", icon: "🎥", category: "STEM", eagle: false },
  { id: "nature", name: "Nature", icon: "🌿", category: "STEM", eagle: false },
  { id: "nuclear-science", name: "Nuclear Science", icon: "⚛️", category: "STEM", eagle: false },
  { id: "oceanography", name: "Oceanography", icon: "🌊", category: "STEM", eagle: false },
  { id: "plant-science", name: "Plant Science", icon: "🌱", category: "STEM", eagle: false },
  { id: "programming", name: "Programming", icon: "💻", category: "STEM", eagle: false },
  { id: "reptile-and-amphibian-study", name: "Reptile and Amphibian Study", icon: "🦎", category: "STEM", eagle: false },
  { id: "robotics", name: "Robotics", icon: "🤖", category: "STEM", eagle: false },
  { id: "space-exploration", name: "Space Exploration", icon: "🚀", category: "STEM", eagle: false },
  { id: "weather", name: "Weather", icon: "🌤️", category: "STEM", eagle: false },

  // ─── TRADES & CAREERS ───
  { id: "animal-science", name: "Animal Science", icon: "🐄", category: "Trades & Careers", eagle: false },
  { id: "archaeology", name: "Archaeology", icon: "🏺", category: "Trades & Careers", eagle: false },
  { id: "architecture", name: "Architecture", icon: "🏛️", category: "Trades & Careers", eagle: false },
  { id: "automotive-maintenance", name: "Automotive Maintenance", icon: "🚗", category: "Trades & Careers", eagle: false },
  { id: "aviation", name: "Aviation", icon: "✈️", category: "Trades & Careers", eagle: false },
  { id: "crime-prevention", name: "Crime Prevention", icon: "🛡️", category: "Trades & Careers", eagle: false },
  { id: "dentistry", name: "Dentistry", icon: "🦷", category: "Trades & Careers", eagle: false },
  { id: "drafting", name: "Drafting", icon: "📐", category: "Trades & Careers", eagle: false },
  { id: "electricity", name: "Electricity", icon: "💡", category: "Trades & Careers", eagle: false },
  { id: "farm-mechanics", name: "Farm Mechanics", icon: "🚜", category: "Trades & Careers", eagle: false },
  { id: "fish-and-wildlife-management", name: "Fish & Wildlife Management", icon: "🐟", category: "Trades & Careers", eagle: false },
  { id: "forestry", name: "Forestry", icon: "🌲", category: "Trades & Careers", eagle: false },
  { id: "graphic-arts", name: "Graphic Arts", icon: "🎨", category: "Trades & Careers", eagle: false },
  { id: "health-care-professions", name: "Health Care Professions", icon: "🩺", category: "Trades & Careers", eagle: false },
  { id: "landscape-architecture", name: "Landscape Architecture", icon: "🏡", category: "Trades & Careers", eagle: false },
  { id: "metalwork", name: "Metalwork", icon: "🔥", category: "Trades & Careers", eagle: false },
  { id: "mining-in-society", name: "Mining in Society", icon: "⛏️", category: "Trades & Careers", eagle: false },
  { id: "plumbing", name: "Plumbing", icon: "🔧", category: "Trades & Careers", eagle: false },
  { id: "pulp-and-paper", name: "Pulp and Paper", icon: "📄", category: "Trades & Careers", eagle: false },
  { id: "search-and-rescue", name: "Search and Rescue", icon: "🚁", category: "Trades & Careers", eagle: false },
  { id: "soil-and-water-conservation", name: "Soil and Water Conservation", icon: "💧", category: "Trades & Careers", eagle: false },
  { id: "surveying", name: "Surveying", icon: "📏", category: "Trades & Careers", eagle: false },
  { id: "truck-transportation", name: "Truck Transportation", icon: "🚛", category: "Trades & Careers", eagle: false },
  { id: "veterinary-medicine", name: "Veterinary Medicine", icon: "🐾", category: "Trades & Careers", eagle: false },
  { id: "welding", name: "Welding", icon: "⚡", category: "Trades & Careers", eagle: false },

  // ─── ARTS & HOBBIES ───
  { id: "athletics", name: "Athletics", icon: "🏃", category: "Arts & Hobbies", eagle: false },
  { id: "basketry", name: "Basketry", icon: "🧺", category: "Arts & Hobbies", eagle: false },
  { id: "chess", name: "Chess", icon: "♟️", category: "Arts & Hobbies", eagle: false },
  { id: "climbing", name: "Climbing", icon: "🧗", category: "Arts & Hobbies", eagle: false },
  { id: "coin-collecting", name: "Coin Collecting", icon: "🪙", category: "Arts & Hobbies", eagle: false },
  { id: "collections", name: "Collections", icon: "📦", category: "Arts & Hobbies", eagle: false },
  { id: "cooking", name: "Cooking", icon: "🍳", category: "Arts & Hobbies", eagle: true },
  { id: "fingerprinting", name: "Fingerprinting", icon: "🔍", category: "Arts & Hobbies", eagle: false },
  { id: "gardening", name: "Gardening", icon: "🌻", category: "Arts & Hobbies", eagle: false },
  { id: "golf", name: "Golf", icon: "⛳", category: "Arts & Hobbies", eagle: false },
  { id: "leatherwork", name: "Leatherwork", icon: "🪢", category: "Arts & Hobbies", eagle: false },
  { id: "model-design-and-building", name: "Model Design and Building", icon: "🏠", category: "Arts & Hobbies", eagle: false },
  { id: "multisport", name: "Multisport", icon: "🏅", category: "Arts & Hobbies", eagle: false, isNew: true },
  { id: "music", name: "Music", icon: "🎵", category: "Arts & Hobbies", eagle: false },
  { id: "painting", name: "Painting", icon: "🎨", category: "Arts & Hobbies", eagle: false },
  { id: "photography", name: "Photography", icon: "📷", category: "Arts & Hobbies", eagle: false },
  { id: "pottery", name: "Pottery", icon: "🏺", category: "Arts & Hobbies", eagle: false },
  { id: "radio", name: "Radio", icon: "📻", category: "Arts & Hobbies", eagle: false },
  { id: "railroading", name: "Railroading", icon: "🚂", category: "Arts & Hobbies", eagle: false },
  { id: "sculpture", name: "Sculpture", icon: "🗿", category: "Arts & Hobbies", eagle: false },
  { id: "skating", name: "Skating", icon: "⛸️", category: "Arts & Hobbies", eagle: false },
  { id: "sports", name: "Sports", icon: "⚽", category: "Arts & Hobbies", eagle: false },
  { id: "stamp-collecting", name: "Stamp Collecting", icon: "📮", category: "Arts & Hobbies", eagle: false },
  { id: "textile", name: "Textile", icon: "🧵", category: "Arts & Hobbies", eagle: false },
  { id: "theater", name: "Theater", icon: "🎭", category: "Arts & Hobbies", eagle: false },
  { id: "wood-carving", name: "Wood Carving", icon: "🪵", category: "Arts & Hobbies", eagle: false },
  { id: "woodwork", name: "Woodwork", icon: "🪚", category: "Arts & Hobbies", eagle: false },

  // ─── PERSONAL DEVELOPMENT ───
  { id: "art", name: "Art", icon: "🎨", category: "Personal Development", eagle: false },
  { id: "disabilities-awareness", name: "Disabilities Awareness", icon: "♿", category: "Personal Development", eagle: false },
  { id: "dog-care", name: "Dog Care", icon: "🐕", category: "Personal Development", eagle: false },
  { id: "family-life", name: "Family Life", icon: "👨‍👩‍👦", category: "Personal Development", eagle: true },
  { id: "genealogy", name: "Genealogy", icon: "🧬", category: "Personal Development", eagle: false },
  { id: "home-repairs", name: "Home Repairs", icon: "🔨", category: "Personal Development", eagle: false },
  { id: "personal-fitness", name: "Personal Fitness", icon: "💪", category: "Personal Development", eagle: true },
  { id: "personal-management", name: "Personal Management", icon: "📊", category: "Personal Development", eagle: true },
  { id: "pets", name: "Pets", icon: "🐈", category: "Personal Development", eagle: false },
  { id: "sustainability", name: "Sustainability", icon: "♻️", category: "Personal Development", eagle: true, eagleAlt: true, eagleAltGroup: "envsci-or-sustain" },
  { id: "traffic-safety", name: "Traffic Safety", icon: "🚦", category: "Personal Development", eagle: false },

  // ─── BUSINESS & INDUSTRY ───
  { id: "american-business", name: "American Business", icon: "💼", category: "Business & Industry", eagle: false },
  { id: "entrepreneurship", name: "Entrepreneurship", icon: "🚀", category: "Business & Industry", eagle: false },
  { id: "law", name: "Law", icon: "⚖️", category: "Business & Industry", eagle: false },
  { id: "salesmanship", name: "Salesmanship", icon: "🤝", category: "Business & Industry", eagle: false },
];

// ═══════════════════════════════════════════════════════════════
// CATEGORY METADATA
// ═══════════════════════════════════════════════════════════════

const MERIT_BADGE_CATEGORIES = [
  { id: "Citizenship", name: "Citizenship", icon: "🏛️", color: "#2563eb" },
  { id: "Communications", name: "Communications", icon: "📡", color: "#7c3aed" },
  { id: "Outdoor", name: "Outdoor", icon: "🌲", color: "#16a34a" },
  { id: "Health & Safety", name: "Health & Safety", icon: "🚑", color: "#dc2626" },
  { id: "STEM", name: "STEM", icon: "🔬", color: "#0891b2" },
  { id: "Trades & Careers", name: "Trades & Careers", icon: "🔧", color: "#b45309" },
  { id: "Arts & Hobbies", name: "Arts & Hobbies", icon: "🎭", color: "#db2777" },
  { id: "Personal Development", name: "Personal Development", icon: "📈", color: "#4f46e5" },
  { id: "Business & Industry", name: "Business & Industry", icon: "💼", color: "#0d9488" },
];

// ═══════════════════════════════════════════════════════════════
// EAGLE-REQUIRED GROUPS
// A Scout must earn all standalone badges PLUS one from each alt group
// ═══════════════════════════════════════════════════════════════

const EAGLE_REQUIRED_GROUPS = [
  { id: "er-camping", badge: "camping", label: "Camping", type: "required" },
  { id: "er-cit-community", badge: "citizenship-in-the-community", label: "Citizenship in the Community", type: "required" },
  { id: "er-cit-nation", badge: "citizenship-in-the-nation", label: "Citizenship in the Nation", type: "required" },
  { id: "er-cit-world", badge: "citizenship-in-the-world", label: "Citizenship in the World", type: "required" },
  { id: "er-communication", badge: "communication", label: "Communication", type: "required" },
  { id: "er-cooking", badge: "cooking", label: "Cooking", type: "required" },
  { id: "er-ep-lifesaving", badges: ["emergency-preparedness", "lifesaving"], label: "Emergency Preparedness OR Lifesaving", type: "alt" },
  { id: "er-envsci-sustain", badges: ["environmental-science", "sustainability"], label: "Environmental Science OR Sustainability", type: "alt" },
  { id: "er-family-life", badge: "family-life", label: "Family Life", type: "required" },
  { id: "er-first-aid", badge: "first-aid", label: "First Aid", type: "required" },
  { id: "er-personal-fitness", badge: "personal-fitness", label: "Personal Fitness", type: "required" },
  { id: "er-personal-mgmt", badge: "personal-management", label: "Personal Management", type: "required" },
  { id: "er-swim-hike-cycle", badges: ["swimming", "hiking", "cycling"], label: "Swimming OR Hiking OR Cycling", type: "alt" },
];

// ═══════════════════════════════════════════════════════════════
// SCOUT OATH, LAW, MOTTO, SLOGAN, AND OUTDOOR CODE
// ═══════════════════════════════════════════════════════════════

const SCOUT_PRINCIPLES = {
  oath: "On my honor I will do my best to do my duty to God and my country and to obey the Scout Law; to help other people at all times; to keep myself physically strong, mentally awake, and morally straight.",
  law: "A Scout is trustworthy, loyal, helpful, friendly, courteous, kind, obedient, cheerful, thrifty, brave, clean, and reverent.",
  motto: "Be Prepared",
  slogan: "Do a Good Turn Daily",
  outdoorCode: "As an American, I will do my best to be clean in my outdoor manners, be careful with fire, be considerate in the outdoors, and be conservation-minded."
};