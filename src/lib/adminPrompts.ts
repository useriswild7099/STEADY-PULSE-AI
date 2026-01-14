export const generateLeadGenPrompt = (client: any) => {
    const b = client.onboardingData?.generalData;
    const d = client.onboardingData?.brandData;
    
    if (!b) return "No business data available to generate prompt.";

    return `ROLE: You are a LinkedIn lead generation strategist for ${b.companyName || 'this client'}.

CONTEXT:
- Target Audience: ${b.audience}
- Primary Problem: ${b.problem}
- Offer Type: ${b.offerType}
- Differentiation: ${b.differentiation}
- Current Stage: ${b.stage}
- Bottleneck: ${b.blocker}

OBJECTIVE: Create a 90-day LinkedIn lead generation strategy to achieve ${b.successMetric}.

STRATEGY PARAMETERS:
- Aggressiveness Level: ${b.aggressiveness}
- Weekly Capacity: ${b.capacity}
- Hard Constraints: ${b.constraints}
- Primary Goal: ${b.priority}

REQUIREMENTS:
1. Map out weekly connection/message sequences
2. Identify 3-5 LinkedIn content pillars that attract ${b.audience}
3. Define lead qualification criteria for ${b.priority}
4. Create outreach templates using ${d?.voiceDescriptors?.join(', ') || 'Professional'} voice
5. Specify daily/weekly activity targets

BUDGET & RESOURCES:
- Monthly Revenue: ${b.revenue}
- Team Size: ${b.team}
- Existing Assets: ${b.assets?.join(', ')}

OUTPUT: Provide a detailed, actionable 90-day LinkedIn growth plan with specific tactics, templates, and KPIs.`;
};

export const generateContentPrompt = (client: any) => {
    const b = client.onboardingData?.generalData;
    const d = client.onboardingData?.brandData;

    if (!d) return "No brand DNA data available to generate prompt.";

    return `ROLE: You are a LinkedIn content strategist for ${b?.companyName || 'Client'}.

BRAND DNA:
- Voice: ${d.voiceDescriptors?.join(', ')}
- Rhythm: ${d.rhythm}
- Emoji Usage: ${d.emojis}
- Banned Words: ${d.banWords}
- Target Emotion: ${d.emotionalIntent?.join(', ')}
- CTA Style: ${d.ctaStyle}
- Aesthetic: ${d.aesthetic}
- Visibility: ${d.visibility}

POINT OF VIEW:
- Contrarian Belief: ${d.belief}
- Anti-Persona: ${d.repel}
- Industry Frustration: ${d.frustration}

CONTENT PREFERENCES:
- Story Types: ${d.stories?.join(', ')}
- Off-Limits Topics: ${d.offLimits}
- Formats: ${d.formats?.join(', ')}
- Love Creators: ${d.loveCreators}
- Hate Creators: ${d.hateCreators}

AUDIENCE INSIGHTS:
- Target: ${b?.audience}
- Big Problem: ${b?.problem}

CREATE:
1. 30-day LinkedIn content calendar with 3 posts/week
2. 5 carousel concepts that showcase ${b?.differentiation}
3. 3 personal story angles from ${d.stories?.join(', ')}
4. Engagement strategy
5. Hook templates using ${d.voiceDescriptors?.join(', ')} style

CONSTRAINTS:
- Must filter out ${d.repel}
- Never use ${d.banWords}

OUTPUT: Full content calendar with post copy, carousel outlines, and engagement playbook.`;
};

export const generateMissingAnalysis = (client: any) => {
    const b = client.onboardingData?.generalData;
    const d = client.onboardingData?.brandData;
    
    if (!b && !d) return "No data available for analysis.";

    const missing = [];
    
    // Check Business Fit gaps
    if (b) {
        if (!b.linkedin) missing.push("LinkedIn Profile URL");
        if (!b.competitors) missing.push("Competitor analysis");
        if (!b.assets || b.assets.length === 0) missing.push("Existing asset inventory");
    } else {
        missing.push("Entire Business Fit Form");
    }
    
    // Check Brand DNA gaps
    if (d) {
        if (!d.belief) missing.push("Contrarian belief (critical for differentiation)");
        if (!d.banWords) missing.push("Banned words list");
        if (!d.loveCreators) missing.push("Creator references");
    } else {
        missing.push("Entire Brand DNA Form");
    }
    
    let analysis = `MISSING ELEMENTS ANALYSIS FOR ${b?.companyName || 'CLIENT'}\n\n`;
    
    if (missing.length > 0) {
        analysis += `CRITICAL GAPS IDENTIFIED (${missing.length} items):\n`;
        missing.forEach(item => analysis += `- ${item}\n`);
        analysis += `\nIMPACT: Without this information, the strategy may lack unique positioning.\n`;
        analysis += `\nACTION REQUIRED: Request missing information from client.`;
    } else {
        analysis += `✅ COMPLETE PROFILE: All critical information provided.\n\n`;
        analysis += `STRENGTHS:\n- Clear target audience: ${b?.audience}\n`;
        analysis += `- Strong differentiation: ${b?.differentiation}\n`;
        analysis += `- Defined voice: ${d?.voiceDescriptors?.join(', ')}\n`;
    }
    
    return analysis;
};

export const generateUspStatement = (client: any) => {
    const b = client.onboardingData?.generalData;
    const d = client.onboardingData?.brandData;

    if (!b || !d) return "Insufficient data to generate USP.";

     return `UNIQUE VALUE PROPOSITION

CORE STATEMENT:
We help ${b.audience} solve ${b.problem} by offering ${b.differentiation}.

POSITIONING:
Unlike ${b.competitors || 'traditional alternatives'}, we ${b.differentiation} because we believe ${d.belief}.

VOICE MANIFESTO:
We speak in a ${d.voiceDescriptors?.join(', ')} voice that makes our audience feel ${d.emotionalIntent?.join(', ')}. We never use words like "${d.banWords}" because we are NOT for ${d.repel}.

CALL TO ACTION:
${d.ctaStyle === 'Soft' ? 'Ready to explore?' : d.ctaStyle === 'Direct' ? 'Book a call.' : 'Join the movement.'}
`;
};
