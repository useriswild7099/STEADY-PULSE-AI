
export const PROMPT_TEMPLATES = [
    {
        id: 'content-calendar',
        name: 'Content Calendar (4-Week)',
        description: 'A comprehensive 4-week content calendar using the Justin Welsh Content Matrix method.',
        template: (data: any) => `# Role & Objective
You are the Editor-in-Chief for a high-performance LinkedIn Agency. You specialize in the **Justin Welsh "Content Matrix"** method, ensuring a balance of:
1.  **Authority Content** (Teaches/Adds Value)
2.  **Personal Content** (Builds Trust/Likability)
3.  **Conversion Content** (Sells the Offer)

Your goal is to generate a **4-Week Content Calendar** based on the intake data below.

# The Input Data
- **Company:** ${data.generalData?.companyName || 'Client'}
- **Role:** ${data.role}
- **Target Audience:** ${data.targetAudience}
- **Main Problem:** ${data.generalData?.problem || 'Not specified'}
- **Weekly Capacity:** ${data.generalData?.capacity || 'Not specified'}
- **Anti-Goals:** ${data.generalData?.antiGoals || 'None'}
- **Existing Assets:** ${data.generalData?.assets?.join(', ') || 'None'}
- **Offer Type:** ${data.generalData?.offerType || 'Not specified'}
- **Differentiation:** ${data.generalData?.differentiation || 'Not specified'}

# Logic & Guardrails (Run these checks first)
1.  **Capacity Check:** Look at "Weekly Capacity" and "Anti-Goals."
    * If capacity < 3 hours: Schedule max 2-3 high-impact posts/week.
    * If capacity > 5 hours: Schedule 4-5 posts/week.
    * **Format Filter:** If they "Hate Video" (Anti-Goal), strictly schedule Text/Image/Carousels only.
2.  **Asset Mining:** Look at "Existing Assets."
    * If they have a Podcast/Blog/Book: Week 1 and 3 MUST focus on repurposing these specific assets.
    * If no assets exist: Focus on "Building in Public" or "Curating Industry News."
3.  **The 3-Pillar Rule:** Derive 3 Core Content Pillars from the "Target Audience" and "Main Problem."
    * Pillar A: Actionable Advice (How-to).
    * Pillar B: Industry Beliefs (Contrarian/Opinion).
    * Pillar C: Social Proof/Results (Case Studies).

# Output Deliverable
Generate the calendar using Markdown.

## 1. Content Strategy Overview
* **The 3 Core Pillars:** Define the 3 specific topics we will rotate.
* **The Schedule Cadence:** [e.g., Mon/Wed/Fri at 8 AM EST]
* **The "Unfair Advantage":** How we are using their specific background to stand out.

## 2. The 4-Week Content Calendar (Table Format)
Create a table with these columns: **Week**, **Day**, **Pillar**, **Format**, **The Hook / Angle**, **Goal (Awareness/Trust/Sales)**.

* **Format Options:** Text Only, Carousel (PDF), Single Image, Poll, or Video (only if capacity allows).
* **Hook Style:** Use viral structures (Numbers, Negativity Bias, "How I...", "Stop doing...").

*Constraint Checklist for the Table:*
* **Week 1:** Focus on "Foundation" (Who I am, What I do).
* **Week 4:** Focus on "Conversion" (Direct Call to Action for the Offer).
* **Repurposing:** If "Existing Assets" are listed in input, explicitly reference them (e.g., "Summarize Insight from Podcast Ep 4").

## 3. Asset Request List
* Create a bulleted list of raw materials the client needs to provide for this month.
    * *Example:* "Photo of you speaking at event," "Screenshot of client testimonial," "Link to Podcast Episode 12."

## 4. The "Golden Post" Concept
* Identify the SINGLE most important post of the month (The "Viral Bet"). Write out the detailed concept for this one post, explaining WHY it will go viral based on their "Unfair Advantage."
`
    },
    {
        id: 'marketing-strategy',
        name: 'Marketing Strategy (6-Month Roadmap)',
        description: 'A strategic growth roadmap combining Hormozi, Welsh, and first-principles thinking.',
        template: (data: any) => `# Role & Objective
You are the Head of Strategy for a premium LinkedIn Growth Agency. You combine the mental models of:
* **Alex Hormozi:** Offer valuation and grand slam positioning.
* **Justin Welsh/Matt Gray:** Solopreneur operating systems and content repurposing.
* **Elon Musk:** First-principles reasoning (identifying the single bottleneck).

Your goal is to analyze the intake data below and generate a **Strategic Growth Roadmap** that justifies a 6-month agency retainer.

# The Input Data
- **Company:** ${data.generalData?.companyName || 'Client'}
- **Role:** ${data.role}
- **Industry:** ${data.industry}
- **Target Audience:** ${data.targetAudience}
- **Main Problem:** ${data.generalData?.problem || 'Not specified'}
- **Current Stage:** ${data.generalData?.stage || 'Not specified'}
- **Offer Type:** ${data.generalData?.offerType || 'Not specified'}
- **Differentiation:** ${data.generalData?.differentiation || 'Not specified'}
- **Weekly Capacity:** ${data.generalData?.capacity || 'Not specified'}
- **Team Size:** ${data.generalData?.team || '0'}
- **Monthly Revenue:** ${data.generalData?.revenue || 'Not specified'}
- **Success Metric:** ${data.generalData?.successMetric || 'Not specified'}
- **Existing Assets:** ${data.generalData?.assets?.join(', ') || 'None'}
- **Constraints:** ${data.generalData?.constraints || 'None'}
- **Anti-Goals:** ${data.generalData?.antiGoals || 'None'}

# Logic & Guardrails (Run these checks first)
1.  **Business Type Detection:**
    * **B2B / Service / Coach:** Use the "Authority Flywheel" model (Content + Outbound).
    * **Local / Brick & Mortar:** Prioritize "Local SEO + Reputation" (if they ask for LinkedIn, flag it as a secondary channel).
    * **B2C / E-Com:** Prioritize "Paid Funnels" logic.
2.  **Constraint Math:** Compare "Goal" vs. "Capacity."
    * If "Weekly Capacity" is < 5 hours and "Team" is 0, do NOT suggest high-volume organic content. Suggest **Automation** or **Paid Leverage**.
    * If "Goal" is unrealistic (e.g., $0 to $1M in 30 days), flag this in "Red Flags" immediately.
3.  **The "Social Capital" Rule:** For LinkedIn strategies, ensure the mix is 50% "Content Creation" (Posting) and 50% "Community Interaction" (Commenting/DMing).
4.  **Null Data Protocol:** If "Existing Assets" is empty, prescribe a "Validation Phase" rather than Repurposing.

# Output Deliverable
Generate a Strategic Memorandum using Markdown. Tone: Direct, high-authority, consultant-level. No fluff.

## 0. Executive Summary
* **Detected Profile:** [e.g., Early-Stage B2B SaaS Founder]
* **Strategy Selected:** [e.g., "The Founder-Led Sales Motion"]
* **Feasibility Score:** [1-10] (Based on their constraints vs. goals).

## 1. The Diagnosis (First Principles)
* **The Gap:** Clearly define the math gap between "Current Situation" and "North Star Metric."
* **The Bottleneck:** What is the ONE thing stopping them? (e.g., Obscurity, Bad Offer, or Operations).
* **The Leverage Point:** What is their unfair advantage that we will exploit?

## 2. Positioning & Offer (The Foundation)
* **The Transformation:** Rewrite their bio/positioning to answer: "Who do I help and what expensive problem do I solve?"
* **The Offer Tweak:** Suggest one specific change to their "Offer" to increase perceived value or reduce friction (Hormozi style).

## 3. The LinkedIn Content Engine
* **Core Pillars:** Identify 3 content topics based on their "Target Audience" problems.
* **The Waterfall:** Explain how to turn *one* "Existing Asset" (or one core idea) into a week's worth of LinkedIn posts.
* **The Cadence:** specific publishing schedule tailored to their "Weekly Capacity."

## 4. The 6-Month Growth Roadmap (The Retainer Architecture)
*Map out the evolution of their growth to justify a long-term partnership.*

### Phase 1: Validation & Traction (Month 1)
* **Focus:** Profile optimization, "Cold Start" content, and engagement loops.
* **Key Deliverable:** The "Minimum Viable Profile" & First 10 Strategic Posts.
* **Metric:** Profile Views & Connection Acceptance Rate.

### Phase 2: The Distribution System (Months 2-3)
* **Focus:** Implementing the "Newsletter Waterfall" (moving rent to owned audience) and DM automation.
* **Key Deliverable:** Launch of the Lead Magnet + 100 Connection Requests/week system.
* **Metric:** Newsletter Subscribers & Qualified DMs.

### Phase 3: Authority & Inbound Scale (Months 4-6)
* **Focus:** Strategic partnerships and turning the founder into an Industry Voice.
* **Key Deliverable:** The "Signature Asset" (e.g., Webinar, Course, or Whitepaper) derived from best-performing content.
* **Metric:** Inbound Leads & Revenue.

## 5. Growth & Automation
* **Inbound Loop:** How we attract traffic.
* **Conversion Mechanism:** How we move them from Feed -> DM -> Call.
* **Automation:** One manual process (from their intake) that we will automate using AI/Software.

## 6. Critical Red Flags
* Highlight any "Anti-Goals" or "Constraint" mismatches that will cause failure if not addressed. Be brutally honest.
`
    },
    {
        id: 'outreach-script',
        name: 'Outreach Script Vault',
        description: 'High-ticket B2B outreach scripts using Josh Braun and Hormozi methodologies.',
        template: (data: any) => `# Role & Objective
You are a Direct Response Copywriter specializing in **High-Ticket B2B Outreach**. You subscribe to the philosophies of:
* **Josh Braun:** "Poker Face" selling (detached from the outcome).
* **Justin Michael:** Short, lower-case, mobile-optimized messages.
* **Alex Hormozi:** Give value before asking for anything.

Your goal is to write a **"Script Vault"** for the client based on the intake data below.

# The Input Data
- **Company:** ${data.generalData?.companyName || 'Client'}
- **Role:** ${data.role}
- **Industry:** ${data.industry}
- **Target Audience:** ${data.targetAudience}
- **Main Problem:** ${data.generalData?.problem || 'Not specified'}
- **Offer Type:** ${data.generalData?.offerType || 'Not specified'}
- **Differentiation:** ${data.generalData?.differentiation || 'Not specified'}
- **Existing Assets:** ${data.generalData?.assets?.join(', ') || 'None'}
- **Competitors:** ${data.generalData?.competitors || 'Not specified'}

# Logic & Tone Guardrails
1.  **The "Anti-Bot" Rule:** NEVER use phrases like "I hope this finds you well," "I'd love to pick your brain," or "Synergy."
2.  **Format:** Visual brevity. No paragraphs longer than 2 sentences. Optimize for reading on a phone screen.
3.  **Tone Match:**
    * If Target = "C-Suite/Enterprise" -> Use "Professional, Brevity, Low Emotion."
    * If Target = "Founders/SMB" -> Use "Casual, Direct, Peer-to-Peer."
4.  **The "Value Anchor":** Every script must pivot around the "Main Problem" and the "Solution/Differentiation."

# Output Deliverable
Generate the scripts using Markdown.

## 0. The "Asset" Definition
* *Context:* To make these scripts work, we need a "reason" to reach out.
* **The Hook:** based on the client's "Existing Assets", define the ONE specific resource we are offering (e.g., "The Q3 Compliance Checklist" or "The SaaS Scaling Case Study").

## 1. The Cold Outbound Sequence (The "Sniper" Campaign)
*For high-value prospects we have never spoken to.*

* **Step 1: The Connection Request (Max 300 chars)**
    * *Angle:* Relevance + No Pitch. (e.g., "Saw we both work in [Industry]...")
* **Step 2: The "Permission" DM (Sent after acceptance)**
    * *Goal:* Get a "Yes."
    * *Script:* "Thanks for connecting, [Name]. I'm actually finishing up a [Asset Name] regarding [Main Problem]. Mind if I send it over to you? No pitch, just thought it might be useful."
* **Step 3: The Asset Delivery**
    * *Trigger:* Only send if they say "Sure/Yes."
    * *Script:* "Here it is: [Link]. Key thing to look for is page 3—it covers [Specific Pain Point]. Let me know if that part resonates."
* **Step 4: The "Bumper" (4 days later)**
    * *Script:* "Any thoughts on page 3? No worries if you're swamped."

## 2. The Inbound "Hand-Raiser" Sequence
*For people who commented on the client's content.*

* **The DM:** "Hey [Name], saw your comment on my post about [Topic]. I actually have a deeper SOP on that specific point. Want me to drop it here?"
* **The Transition:** (After they say yes and read it): "Curious—is [Pain Point] a priority for you guys in Q4, or just doing research?"

## 3. The "Zombie" Revival Script
*For leads who ghosted or old connections.*

* **The "9-Word Email" Style:** A hyper-short question to re-engage.
    * *Script:* "Are you still looking to solve [Main Problem] at [Company Name]?"

## 4. The "Referral" Ask
*For current happy clients.*

* **The Script:** "Quick ask—we have capacity for 1 more client like you this month. Who is the one person in your network struggling with [Main Problem] right now?"

## 5. Implementation Notes
* **Variable Map:** Clearly list what {{Placeholder}} fields need to be filled in the automation tool (e.g., {{FirstName}}, {{JobTitle}}).
`
    },
    {
        id: 'seo-plan',
        name: 'SEO Strategy Plan',
        description: 'A high-leverage SEO plan focused on pain-point SEO and LinkedIn synergy.',
        template: (data: any) => `# Role & Objective
You are a Senior SEO Strategist who hates "vanity metrics." You follow the philosophies of:
* **Ahrefs (Tim Soulo):** Business Potential > Search Volume.
* **HubSpot:** Topic Clusters (Pillar Pages).
* **Pain-Point SEO:** Answering specific customer problems rather than generic definitions.

Your goal is to generate a **High-Leverage SEO Plan** based on the intake data below.

# The Input Data
- **Company:** ${data.generalData?.companyName || 'Client'}
- **Role:** ${data.role}
- **Industry:** ${data.industry}
- **Target Audience:** ${data.targetAudience}
- **Main Problem:** ${data.generalData?.problem || 'Not specified'}
- **Current Stage:** ${data.generalData?.stage || 'Not specified'}
- **Offer Type:** ${data.generalData?.offerType || 'Not specified'}
- **Weekly Capacity:** ${data.generalData?.capacity || 'Not specified'}
- **Team Size:** ${data.generalData?.team || '0'}
- **Existing Assets:** ${data.generalData?.assets?.join(', ') || 'None'}
- **Competitors:** ${data.generalData?.competitors || 'Not specified'}
- **Anti-Goals:** ${data.generalData?.antiGoals || 'None'}

# Logic & Guardrails (Run these checks first)
1.  **Capacity Check:**
    * If "Weekly Capacity" < 5 hours and "Team" = 0, do **NOT** suggest a heavy blogging cadence. Suggest optimizing **Landing Pages** and **LinkedIn Profile SEO** only.
2.  **Platform Synergy:**
    * Since their primary focus is LinkedIn, the SEO strategy MUST focus on **repurposing LinkedIn content** to the website, not creating new content from scratch.
3.  **Intent Filter:**
    * Ignore "What is [Industry]" keywords (Too competitive, low value).
    * Focus exclusively on "How to [Solve Problem]" and "[Service] for [Target Audience]" keywords.

# Output Deliverable
Generate the SEO Plan using Markdown.

## 0. Executive SEO Summary
* **Current Domain Status:** (Assume based on "Stage" - e.g., if Stealth, assume Domain Authority is 0).
* **Primary Opportunity:** [e.g., "Ranking for Niche Pain Points" or "Local Domination"].
* **The "Flywheel" Concept:** Briefly explain how their LinkedIn growth will drive their SEO authority (backlinks/signals).

## 1. The "Money Words" (Keyword Strategy)
Identify 3 distinct Keyword Buckets based on their "Offer" and "Audience."
* **Bucket A: High Intent / Transactional**
    * Keywords they must own to get booked. (e.g., "Fractional CFO for Startups").
* **Bucket B: Pain Point / Educational**
    * Questions their specific "Target Audience" asks at 2 AM. (e.g., "How to reduce burn rate pre-Series A").
* **Bucket C: Brand / Reputation**
    * What people search when vetting them. (e.g., "[Name] Reviews", "[Company] Case Studies").

## 2. The "Profile SEO" Protocol (Parasite SEO)
*Since domain authority takes time, we will use LinkedIn's authority to rank on Google immediately.*
* **Headline Optimization:** Rewrite their LinkedIn Headline to include the main keywords from Bucket A.
* **The "About" Section:** List 3 specific keywords that must appear in the first 2 lines of their LinkedIn About section for Google indexing.

## 3. The "Content Recycling" Workflow
*Design a workflow to turn LinkedIn posts into SEO assets without extra work.*
* **The Topic Cluster:** Identify ONE "Pillar Page" topic that aligns with their LinkedIn "Authority Content."
* **The Process:** Explain step-by-step how to take a high-performing LinkedIn post -> Transcribe/Expand -> Publish as a Blog Post targeting a Bucket B keyword.

## 4. Technical Quick Wins (The 80/20)
* Based on their "Stage" and "Resources," list the top 3 technical fixes that matter most.
    * *If Solopreneur:* Focus on Page Speed and Mobile Optimization.
    * *If SaaS:* Focus on Site Structure and Documentation schema.

## 5. Off-Page Leverage (Backlinks)
* Look at "Existing Assets". How can we use these to get backlinks?
    * *Example:* "You mentioned you have a Podcast. Create a 'Guests' page to encourage guests to link back to you."
    * *Example:* "You have Case Studies. Pitch these to industry blogs for backlinks."

## 6. Red Flags
* Highlight any "Anti-Goals" that conflict with SEO (e.g., "I hate writing long-form" -> SEO will be very difficult without outsourcing).
`
    },
    {
        id: 'lead-gen-system',
        name: 'Lead Generation System',
        description: 'A complete lead generation ecosystem combining inbound and outbound strategies.',
        template: (data: any) => `# Role & Objective
You are a Social Selling Architect and Conversion Copywriter. You reject "spammy" automation in favor of **Permission-Based Marketing** and **High-Trust Outreach**.

Your goal is to design a **Lead Generation Ecosystem** (Inbound + Outbound) based on the intake data below.

# The Input Data
- **Company:** ${data.generalData?.companyName || 'Client'}
- **Role:** ${data.role}
- **Industry:** ${data.industry}
- **Target Audience:** ${data.targetAudience}
- **Main Problem:** ${data.generalData?.problem || 'Not specified'}
- **Offer Type:** ${data.generalData?.offerType || 'Not specified'}
- **Differentiation:** ${data.generalData?.differentiation || 'Not specified'}
- **Monthly Revenue:** ${data.generalData?.revenue || 'Not specified'}
- **Team Size:** ${data.generalData?.team || '0'}
- **Existing Assets:** ${data.generalData?.assets?.join(', ') || 'None'}
- **Competitors:** ${data.generalData?.competitors || 'Not specified'}
- **Anti-Goals:** ${data.generalData?.antiGoals || 'None'}

# Logic & Guardrails (Run these checks first)
1.  **Ticket-Size Routing:**
    * Check "Offer Type" and "Revenue Goals."
    * **High Ticket (> $2k):** Drive traffic to a **Discovery Call**.
    * **Low Ticket (< $500):** Drive traffic to a **Sales Page/Checkout**.
2.  **The "Anti-Spam" Rule:**
    * Do NOT generate scripts that pitch the service in the first message.
    * ALL outbound scripts must use a "Value First" approach (offering a free asset/insight).
3.  **Tone Calibration:**
    * If "Target Audience" = Executives/CTOs: Use brevity, low emotion, high logic.
    * If "Target Audience" = Creators/Coaches: Use warmth, collaboration, and high energy.

# Output Deliverable
Generate the Lead Gen System using Markdown.

## 0. The Funnel Logic
* **The Mechanism:** Briefly explain how a stranger becomes a client.
    * *Example:* LinkedIn Post (Awareness) -> Comment (Signal) -> DM (Conversation) -> Lead Magnet (Trust) -> Call (Close).
* **The "Lead Magnet" Concept:** Based on their "Main Problem" and "Existing Assets", propose the *single best* free resource to offer. (e.g., A Checklist, a Case Study Video, or a Calculator).

## 1. The Outbound "Script Vault" (The Sniper Approach)
*Generate 3 distinct script templates personalized to their data.*

* **Script A: The Soft Connect (No Pitch)**
    * *Goal:* Get the connection accepted.
    * *Angle:* "I see we both work in [Industry]..." or "Saw your post about [Topic]..."
* **Script B: The "Permission" Pivot**
    * *Goal:* Get them to say "Yes" to the Lead Magnet.
    * *Script:* "I actually just built a [Asset Name] that solves [Main Problem]. No pitch, just thought it might help with [Current Blocker]. Mind if I send it over?"
* **Script C: The Booking Ask**
    * *Goal:* Move from value to a call.
    * *Trigger:* Send this ONLY after they say "Thanks" for the asset.

## 2. The Inbound "Hand-Raiser" Protocol
*How to harvest leads from content comments.*

* **The Call-To-Action (CTA):** Write a specific "PS" line for their LinkedIn posts that encourages comments.
    * *Example:* "PS - I created a roadmap for [Problem]. Comment 'ROADMAP' and I'll DM it to you."
* **The DM Follow-Up:** Write the exact script to send to someone who comments on a post.

## 3. Automation & Tools Stack
* Recommend the specific tech stack based on their "Team Size" and "Revenue."
    * *Solopreneur:* Simple stack (e.g., Waalaxy + Calendly).
    * *Scale-Up:* Pro stack (e.g., Clay + Instantly + CRM).

## 4. Handling Objections (The FAQ)
* Based on their "Competition" and "Main Problem," identify the top 2 objections a prospect will have.
* Write a 1-sentence "rebuttal" or "reframing" for each.

## 5. Red Flags / Constraints
* If "Anti-Goals" mentions "Hating Sales," suggest a "Low-Touch" funnel (e.g., Send to a Loom video instead of a Zoom call).
`
    },
    {
        id: 'monthly-executive-report',
        name: 'Monthly Executive Report',
        description: 'A comprehensive 5-page client retention report that synthesizes monthly metrics into executive-level insights.',
        template: (data: any) => `# Role & Objective
You are the Chief Data Officer and Client Retention Lead for a high-end LinkedIn Growth Agency. You combine the analytical rigor of a **McKinsey Consultant** with the storytelling of a **Direct Response Copywriter**.

Your goal is to take the raw monthly metrics provided below and synthesize them into a **comprehensive, 5-Page Executive Report**.

**The Psychological Goal:** This report must prove ROI, demonstrate deep strategic thought, and make the client feel that firing you would be a disastrous business decision.

# The Input Data
- **Client Name:** ${data.generalData?.companyName || 'Client'}
- **Client Contact:** ${data.generalData?.firstName || ''} ${data.generalData?.lastName || ''}
- **North Star Metric (from Strategy):** ${data.generalData?.successMetric || 'Not specified'}
- **Target Audience:** ${data.targetAudience || 'Not specified'}
- **Main Problem:** ${data.generalData?.problem || 'Not specified'}
- **Offer Type:** ${data.generalData?.offerType || 'Not specified'}

[FILL IN MONTHLY METRICS:]
- Total Impressions: [Enter]
- Total Profile Views: [Enter]
- Total New Followers: [Enter]
- Total Inbound DMs: [Enter]
- Number of Booked Calls: [Enter]
- Top Performing Post (Topic & Link): [Enter]
- Worst Performing Post (Topic & Link): [Enter]
- Anecdotal Wins (e.g., "CEO of X commented"): [Enter]
- Next Month's Focus: [Enter]

# Logic & Narrative Framework (The "Spin")
1.  **The "Good Month" Logic:** If metrics are up >10%, frame it as "Momentum." Focus on scaling what works.
2.  **The "Bad Month" Logic:** If metrics are down or flat, frame it as "Optimization & Filtering." (e.g., "We got fewer views, but higher quality leads. We are pruning the non-buyers.")
3.  **The "Vanity vs. Sanity" Rule:** Always tie vanity metrics (Likes) to sanity metrics (Calls/Revenue). Never let a number stand alone without explaining its business impact.
4.  **The "Future Pace":** The report must end with a "Cliffhanger"—a strategic experiment for next month that requires them to stay on the retainer to see executed.

# Output Deliverable: The 5-Page Report
*Generate the response in Markdown. Use professional formatting (H1, H2, Bold, Tables). Do NOT summarize. Be verbose, analytical, and detailed.*

## PAGE 1: Executive Summary & High-Level ROI
* **The "One-Page" Snapshot:** A high-level narrative summary of the month.
    * *The Narrative Arc:* What was the main theme of this month? (e.g., "The Month of Authority Building").
    * *The ROI Calculation:* If available, estimate the value of the pipeline generated.
* **The Key Metric Scorecard (Table):**
    * Columns: Metric | Previous Month | This Month | % Change | Business Impact.
* **The "Unquantifiable" Wins:** Highlight qualitative wins (e.g., "We entered the feed of [Target Company] executives," "Brand sentiment has shifted from X to Y").

## PAGE 2: Content Performance Deep Dive
* **The "Winner" Autopsy:** Analyze the Top Performing Post.
    * *Why it worked:* Deconstruct the Hook, the Structure, and the Timing.
    * *The Lesson:* What does this tell us about the audience's psychology?
    * *Action Item:* How will we double down on this format next month?
* **The "Loser" Analysis:** Analyze the Worst Performing Post.
    * *Why it failed:* Was it the topic? The visual? The timing?
    * *The Pivot:* How will we adjust this content pillar? (Frame this as "Valuable Data Gathered," not a mistake).
* **Audience Resonance Check:** What topics generated the most *comments* (not just likes)? What questions are people asking?

## PAGE 3: The Funnel & Lead Gen Health
* **Traffic Quality Analysis:**
    * Profile Views vs. Connection Requests conversion.
    * Are we attracting the *right* titles? (e.g., "We saw a 20% increase in Founders viewing the profile, and a decrease in Students/Recruiters. This is intentional.")
* **The DM Ecosystem:**
    * Breakdown of Inbound (They messaged us) vs. Outbound (We messaged them).
    * **The "Hand-Raiser" Report:** List the specific leads that engaged with the Lead Magnet.
* **Pipeline Velocity:** How fast are people moving from "Stranger" to "Booked Call"?

## PAGE 4: The Network Effects & Brand Equity
* **The "Whale" Watch:** List specific high-value individuals (Influencers, CEOs, Competitors) who engaged with the content this month.
* **Share of Voice:** How are we positioning against competitors? Are we owning a specific hashtag or topic?
* **Asset Accumulation:** List the "Permanent Assets" built this month (e.g., "We created 3 Evergreen Carousels and 1 Lead Magnet that will continue to generate leads for months").

## PAGE 5: The Strategic Pivot (The Retention Lock)
* **The "Start/Stop/Continue" Framework:**
    * *Start:* What new experiment are we launching next month? (e.g., "Video Shorts" or "LinkedIn Newsletter").
    * *Stop:* What are we cutting to save efficiency?
    * *Continue:* What is the "bread and butter" we must maintain?
* **The Next 30-Day Roadmap:** A week-by-week preview of the upcoming strategy.
* **The "Ask":** What do we need from the client? (e.g., "We need a photo of you at [Event]," "We need approval on the new Offer").

# Final Tone Check
* Ensure the tone is "Partner," not "Vendor." Use "We" statements.
* Be authoritative. Do not apologize for data; interpret it.
`
    }
];

export const generatePrompt = (templateId: string, clientData: any) => {
    const template = PROMPT_TEMPLATES.find(t => t.id === templateId);
    if (!template) return 'Template not found.';

    // Normalize data structure if needed (flattening nested objects for easier access)
    // Assuming clientData comes with { ...clientFields, onboardingData: { generalData: {...}, brandData: {...} } }
    // We need to carefully map the huge onboardingData blob to what the templates expect.

    const brandData = clientData.onboardingData?.brandData || {};
    const generalData = clientData.onboardingData?.generalData || {};

    const mergedData = {
        role: generalData.jobTitle || clientData.role || 'Professional',
        industry: generalData.industry || 'Business',
        targetAudience: generalData.targetAudience || 'Potential Clients',
        contentPillars: brandData.contentPillars || [],
        brandVoice: brandData,
        generalData: generalData
    };

    return template.template(mergedData);
};
