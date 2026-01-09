
export const PROMPT_TEMPLATES = [
    {
        id: 'educational-carousel',
        name: 'The Educational Carousel',
        description: 'A step-by-step educational guide formatted for a carousel post.',
        template: (data: any) => `
You are an expert ghostwriter for a ${data.role || 'professional'} in the ${data.industry || 'general'} industry.
Your client's brand voice is: ${data.brandVoice?.communicationStyle?.join(', ') || 'Professional'}.
Their target audience is: ${data.targetAudience || 'General Audience'}.

Create a 5-7 slide Educational Carousel script based on one of their content pillars: ${data.contentPillars?.join(', ') || 'General Knowledge'}.

**Structure:**
- **Slide 1 (Hook):** A catchy title that promises a specific outcome or solves a burning problem.
- **Slide 2 (The Problem):** Briefly agitate the pain point or misconception.
- **Slide 3-5 (The Solution/Steps):** Actionable, step-by-step advice. Keep it concise.
- **Slide 6 (The "Aha!" Moment):** A key insight or summary.
- **Slide 7 (CTA):** ${data.brandVoice?.ctaStyle === 'soft' ? 'Ask a question to encourage comments.' : 'Direct them to follow or DM.'}

**Formatting Rules:**
- Use "${data.brandVoice?.punctuationStyle || 'Standard'}" punctuation.
- Emoji usage: ${data.brandVoice?.emojiPreference || 'Moderate'}.
- NEVER use these words: ${data.brandVoice?.neverUseWords || 'None'}.
`
    },
    {
        id: 'counter-intuitive-hook',
        name: 'The Counter-Intuitive Hook',
        description: 'A text-only post that challenges common industry beliefs.',
        template: (data: any) => `
You are writing a LinkedIn text post for a ${data.role || 'leader'}.
The goal is to challenge the status quo.

**Topic:** Use the client's "Unpopular Opinion": "${data.brandVoice?.unpopularOpinion || 'Standard industry advice is wrong'}".

**Structure:**
1.  **The Hook:** State the unpopular opinion boldly. (e.g., "Stop doing X. It's killing your growth.")
2.  **The Context:** Explain why most people believe the opposite and why they are wrong.
3.  **The Pivot:** Introduce the better way (the client's unique perspective).
4.  **The Proof/Logic:** Briefly explain why this new way works better.
5.  **The Takeaway:** One sentence summary.

**Voice Settings:**
- Tone: ${data.brandVoice?.communicationStyle?.includes('Contrarian') ? 'Bold and provocative' : 'Thoughtful but firm'}.
- Formatting: Short, punchy lines.
`
    },
    {
        id: 'case-study',
        name: 'The Case Study',
        description: 'A success story highlighting a win or transformation.',
        template: (data: any) => `
Write a Case Study post highlighting a client win or a personal achievement.

**Context:**
- Client Role: ${data.role}.
- Industry: ${data.industry}.
- Key Story/Win: ${data.brandVoice?.keyStories?.[0] || 'A recent client transformation'}.

**Structure:**
1.  **Headline:** A result-driven headline (e.g., "How we added $X to Y in Z days").
2.  **The "Before":** Describe the struggle or starting point.
3.  **The "Mechanism":** What specifically was changed or implemented? (Focus on strategy, not just luck).
4.  **The "After":** The tangible result.
5.  **The Lesson:** What can the reader learn and apply today?

**Style:**
- Use data where possible.
- Keep it humble but authoritative.
`
    },
    {
        id: 'strategic-overview',
        name: 'Strategic Content Overview',
        description: 'A high-level strategy document based on brand DNA.',
        template: (data: any) => `
Generate a Strategic Content Overview for this client.

**Client Profile:**
- **Role:** ${data.role}
- **Industry:** ${data.industry}
- **Target Audience:** ${data.targetAudience}
- **Primary Goal:** ${data.generalData?.primaryGoal || 'Growth'}

**Brand DNA:**
- **Values:** ${data.brandVoice?.topValues?.join(', ')}
- **Voice:** ${data.brandVoice?.communicationStyle?.join(', ')}
- **Pillars:** ${data.contentPillars?.join(', ')}

**Task:**
1.  **Summary:** precise 2-sentence positioning statement.
2.  **Content Mix:** Recommend a weekly mix of formats (e.g., 2 carousels, 3 text posts) based on their goal.
3.  **Sample Topics:** Give 3 specific post ideas for EACH content pillar.
4.  **Engagement Strategy:** How should they interact with their "Anti-Avatar" (${data.brandVoice?.antiAvatar}) vs their ideal client?
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
