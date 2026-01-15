import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import FormInput from './FormInput';
import RadioCard from './RadioCard';
import Button from './Button';
import CheckboxGroup from './CheckboxGroup';
import './forms.css';

interface BusinessFormProps {
    onBack: () => void;
    onComplete: (data: any) => void;
}

const BusinessForm: React.FC<BusinessFormProps> = ({ onBack, onComplete }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Section 1: Essential Details
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: '+1',
        currency: '$',
        linkedin: '',
        instagram: '',
        otherLink: '',
        companyName: '',
        jobTitle: '',
        // Section 2: Identity
        role: '',
        roleOther: '',
        platform: [] as string[],
        platformOther: '',
        // Section 3: Stage
        stage: '',
        stageOther: '',
        blocker: '',
        // Section 4: Goal
        priority: '',
        priorityOther: '',
        successMetric: '',
        // Section 5: Audience
        audience: '',
        competitors: '',
        problem: '',

        // Section 6: Offer
        offerType: '',
        offerTypeOther: '',
        differentiation: '',
        unfairAdvantage: '',
        assets: [] as string[],
        assetsOther: '',
        // Section 7: Constraints & Logistics
        revenue: '',
        revenueOther: '',
        team: '',
        antiGoals: '',
        capacity: '',
        constraints: '',
        // Section 8: Output
        outputs: [] as string[],
        outputsOther: '',
        assetDetails: {} as { [key: string]: string }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAssetDetailChange = (asset: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            assetDetails: {
                ...prev.assetDetails,
                [asset]: value
            }
        }));
    };

    const handleCheckboxChange = (field: string, newValues: string[]) => {
        setFormData(prev => ({ ...prev, [field]: newValues }));
    };

    const handleRadioChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const generateStrategy = () => {
        let aiPersona = "Act as a Strategic Marketing Director.";
        if (formData.role === 'Student' || formData.priority === 'Career') {
            aiPersona = "Act as a Senior Career Strategist & Expert Recruiter.";
        }

        // Helper to get value or Other value
        const getVal = (val: string, otherVal: string) => val === 'Other' && otherVal ? otherVal : val;
        
        // Helper to join arrays with other
        const joinList = (list: string[], otherVal: string) => {
            let items = [...list];
            if (items.includes('Other') && otherVal) {
                items = items.filter(i => i !== 'Other');
                items.push(otherVal);
            }
            return items.join(', ');
        };

        const prompt = `
${aiPersona}

**CLIENT PROFILE**
- **Name**: ${formData.firstName} ${formData.lastName}
- **Contact**: ${formData.email} | ${formData.phone}
- **Role**: ${formData.role} ${formData.roleOther ? `(${formData.roleOther})` : ''} - ${formData.jobTitle} at ${formData.companyName}
- **LinkedIn**: ${formData.linkedin}
- **Instagram**: ${formData.instagram}
- **Other Link**: ${formData.otherLink}
- **Platform Focus**: ${joinList(formData.platform, formData.platformOther)}

**CONTEXT (IDENTITY & STAGE)**
- **Stage**: ${getVal(formData.stage, formData.stageOther)}
- **Current Bottleneck**: ${formData.blocker}

**TARGETS (GOAL & AUDIENCE)**
- **#1 Priority (Next 90d)**: ${getVal(formData.priority, formData.priorityOther)}
- **Success Looks Like**: ${formData.successMetric}
- **Audience**: ${formData.audience}
- **Main Problem**: ${formData.problem}
- **Competitors**: ${formData.competitors}


**OFFER & STRATEGY**
- **Offer Type**: ${getVal(formData.offerType, formData.offerTypeOther)}
- **Differentiation**: ${formData.differentiation}
- **The Unfair Advantage**: ${formData.unfairAdvantage}
- **Existing Assets**: 
${formData.assets.map(a => `  - ${a}: ${formData.assetDetails[a] || '(No link/detail)'}`).join('\n')}
${formData.assetsOther ? `  - Other: ${formData.assetsOther}` : ''}
- **Revenue**: ${getVal(formData.revenue, formData.revenueOther)}
- **Team Size**: ${formData.team}
- **Anti-Goals**: ${formData.antiGoals}
- **Execution Capacity**: ${formData.capacity}
- **Hard Constraints**: ${formData.constraints}

**REQUESTED OUTPUTS**:
${joinList(formData.outputs, formData.outputsOther).split(', ').map(out => `- ${out}`).join('\n')}

**YOUR TASK**:
Based strictly on the above, create the requested strategic assets. Start with a brief "Executive Summary" of the approach.
`;
        
        // Submit directly without showing prompt
        // Use type assertion to avoid TS error about generatedStrategyPrompt not being in formData type
        onComplete({ ...formData, generatedStrategyPrompt: prompt.trim() });
    };

    return (
        <div className="form-container" style={{ paddingBottom: '4rem' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Button variant="ghost" onClick={onBack} style={{ padding: '0.5rem' }}>
                    <ArrowLeft size={20} />
                </Button>
                <div>
                    <h2 style={{ fontSize: '1.5rem', lineHeight: '1.2' }}>Strategy Blueprint</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Left Brain Intake • ~7 Mins</p>
                </div>
            </div>

            <div className="glass-card" style={{ padding: '2rem' }}>
                {step === 1 && (
                    <div className="fade-in">
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-text-main)' }}>1. Essential Details</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <FormInput name="firstName" label="First Name" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
                            <FormInput name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
                        </div>

                        <FormInput name="email" label="Email Address" type="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" required />

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500', color: 'var(--color-text-main)' }}>Phone Number</label>
                            <div style={{ display: 'flex', gap: '0.8rem' }}>
                                <select 
                                    value={formData.countryCode}
                                    onChange={(e) => {
                                        const code = e.target.value;
                                        let newCurrency = '$'; // Default
                                        const currencyMap: {[key: string]: string} = {
                                            '+1': '$',
                                            '+44': '£',
                                            '+91': '₹',
                                            '+61': 'A$',
                                            '+65': 'S$',
                                            '+971': 'AED',
                                            '+49': '€',
                                            '+33': '€',
                                            '+31': '€', // Netherlands
                                            '+34': '€', // Spain
                                            '+81': '¥',
                                        };
                                        if (currencyMap[code]) newCurrency = currencyMap[code];
                                        
                                        setFormData(prev => ({ ...prev, countryCode: code, currency: newCurrency }));
                                    }}
                                    style={{
                                        width: '140px',
                                        padding: '1rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)',
                                        background: 'var(--color-input-bg)',
                                        color: 'var(--color-text-main)',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        appearance: 'none'
                                    }}
                                >
                                    <option value="+1">🇺🇸/🇨🇦 +1</option>
                                    <option value="+44">🇬🇧 +44</option>
                                    <option value="+91">🇮🇳 +91</option>
                                    <option value="+61">🇦🇺 +61</option>
                                    <option value="+65">🇸🇬 +65</option>
                                    <option value="+971">🇦🇪 +971</option>
                                    <option value="+49">🇩🇪 +49</option>
                                    <option value="+33">🇫🇷 +33</option>
                                    <option value="+31">🇳🇱 +31</option>
                                    <option value="+34">🇪🇸 +34</option>
                                    <option value="+81">🇯🇵 +81</option>
                                </select>
                                <div style={{ flex: 1 }}>
                                    <FormInput name="phone" value={formData.phone} onChange={handleChange} placeholder="555 000 0000" />
                                </div>
                            </div>
                        </div>

                        <FormInput name="linkedin" label="LinkedIn Profile URL" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/yourprofile" required />

                        <FormInput name="instagram" label="Instagram Profile URL (Optional)" value={formData.instagram} onChange={handleChange} placeholder="https://instagram.com/yourprofile" />

                        <FormInput name="otherLink" label="Other Link (Optional)" value={formData.otherLink} onChange={handleChange} placeholder="https://yourwebsite.com" />

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <FormInput name="companyName" label="Company Name" value={formData.companyName} onChange={handleChange} placeholder="Your Company" />
                            <FormInput name="jobTitle" label="Job Title" value={formData.jobTitle} onChange={handleChange} placeholder="e.g. CEO, Founder, Head of Marketing" />
                        </div>

                        <Button onClick={() => setStep(2)} style={{ width: '100%', marginTop: '1rem' }}>Next: Current Situation</Button>
                    </div>
                )}

                {step === 2 && (
                    <div className="fade-in">
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-text-main)' }}>2. Current Situation</h3>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500' }}>Which best describes your current role?</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.8rem' }}>
                                <RadioCard label="Founder" description="Scaling, Exiting, or Building IP" value="Founder" selectedValue={formData.role} onChange={() => handleRadioChange('role', 'Founder')} />
                                <RadioCard label="C-Suite Executive" description="CEO, CMO, CTO, VP" value="Executive" selectedValue={formData.role} onChange={() => handleRadioChange('role', 'Executive')} />
                                <RadioCard label="Solopreneur / Consultant" description="High-Ticket Services" value="Solopreneur" selectedValue={formData.role} onChange={() => handleRadioChange('role', 'Solopreneur')} />
                                <RadioCard label="Investor / VC" description="Building Deal Flow" value="Investor" selectedValue={formData.role} onChange={() => handleRadioChange('role', 'Investor')} />
                                <RadioCard label="Other" description="" value="Other" selectedValue={formData.role} onChange={() => handleRadioChange('role', 'Other')} />
                            </div>
                            {formData.role === 'Other' && (
                                <FormInput name="roleOther" placeholder="e.g. Consultant, Agency Owner, Fractional Executive" value={formData.roleOther} onChange={handleChange} style={{ marginTop: '1rem' }} />
                            )}
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500' }}>Primary platform for results</label>
                            <CheckboxGroup
                                options={[
                                    { label: 'LinkedIn', value: 'LinkedIn' }, 
                                    { label: 'Website/SEO', value: 'SEO' }, 
                                    { label: 'Instagram', value: 'Instagram' }, 
                                    { label: 'Twitter/X', value: 'Twitter' }, 
                                    { label: 'YouTube', value: 'YouTube' },
                                    { label: 'Other', value: 'Other' }
                                ]}
                                selectedValues={formData.platform}
                                onChange={(vals) => handleCheckboxChange('platform', vals)}
                            />
                            {formData.platform.includes('Other') && (
                                <FormInput name="platformOther" placeholder="e.g. TikTok, Reddit, Facebook Groups" value={formData.platformOther} onChange={handleChange} style={{ marginTop: '1rem' }} />
                            )}
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Current Stage</label>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {['Stealth Mode', 'Series A', 'Pre-IPO', 'Market Leader', 'Other'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => handleRadioChange('stage', opt)}
                                        style={{
                                            padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid var(--color-accent)',
                                            background: formData.stage === opt ? 'var(--color-accent)' : 'transparent',
                                            color: formData.stage === opt ? 'white' : 'var(--color-text-main)', cursor: 'pointer'
                                        }}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            {formData.stage === 'Other' && (
                                <FormInput name="stageOther" placeholder="e.g. Market Expansion, Rebranding, Product Launch" value={formData.stageOther} onChange={handleChange} style={{ marginTop: '1rem' }} />
                            )}
                        </div>

                        <FormInput name="blocker" label="What's NOT working?" value={formData.blocker} onChange={handleChange} placeholder="e.g. High CPA, Low Conversion Rate, Poor Lead Quality" />

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                             <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
                             <Button variant="primary" onClick={() => setStep(3)} style={{ flex: 1 }}>Next: Goal & Audience</Button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="fade-in">
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-text-main)' }}>3. Goal & Audience</h3>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500' }}>#1 Priority (Next 90 Days)</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                                <RadioCard label="Leads" description="Generate qualified leads" value="Generates Leads" selectedValue={formData.priority} onChange={() => handleRadioChange('priority', 'Generates Leads')} />
                                <RadioCard label="Bookings" description="Book calls/demos" value="Book Calls" selectedValue={formData.priority} onChange={() => handleRadioChange('priority', 'Book Calls')} />
                                <RadioCard label="Authority" description="Build trust & brand" value="Authority" selectedValue={formData.priority} onChange={() => handleRadioChange('priority', 'Authority')} />
                                <RadioCard label="Career" description="Get hired/opportunities" value="Career" selectedValue={formData.priority} onChange={() => handleRadioChange('priority', 'Career')} />
                                <RadioCard label="Other" description="Something else" value="Other" selectedValue={formData.priority} onChange={() => handleRadioChange('priority', 'Other')} />
                            </div>
                            {formData.priority === 'Other' && (
                                <FormInput name="priorityOther" placeholder="e.g. Hiring Sales Team, Building IP, Strategic Partnerships" value={formData.priorityOther} onChange={handleChange} style={{ marginTop: '1rem' }} />
                            )}
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500' }}>The North Star Metric (Success Metrics)</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.8rem' }}>
                                <RadioCard label="Shortening Sales Cycles" description="Close deals faster" value="Shorten Cycles" selectedValue={formData.successMetric} onChange={() => handleRadioChange('successMetric', 'Shorten Cycles')} />
                                <RadioCard label="Attracting Top Talent" description="Hiring & Recruiting" value="Hiring" selectedValue={formData.successMetric} onChange={() => handleRadioChange('successMetric', 'Hiring')} />
                                <RadioCard label="Investor Interest" description="Fundraising & Valuation" value="Investors" selectedValue={formData.successMetric} onChange={() => handleRadioChange('successMetric', 'Investors')} />
                                <RadioCard label="Market Valuation" description="Company Exit / IPO" value="Valuation" selectedValue={formData.successMetric} onChange={() => handleRadioChange('successMetric', 'Valuation')} />
                            </div>
                        </div>

                        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '2rem 0' }} />

                        <FormInput name="audience" label="Who are you trying to reach?" value={formData.audience} onChange={handleChange} placeholder="e.g. SaaS Founders ($1M+ ARR), Medical Practice Owners, CTOs" />
                        <FormInput name="competitors" label="The Enemy / Competition" value={formData.competitors} onChange={handleChange} placeholder="Who is the current 'category king' you want to dethrone?" />



                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
                            <Button onClick={() => setStep(4)}>Next: Offer & Reality</Button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="fade-in">
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-text-main)' }}>4. Offer & Execution Reality</h3>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500' }}>What are we selling/achieving?</label>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {['Product', 'Service', 'Job/Role', 'Personal Brand', 'Other'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => handleRadioChange('offerType', opt)}
                                        style={{
                                            padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid var(--color-accent)',
                                            background: formData.offerType === opt ? 'var(--color-accent)' : 'transparent',
                                            color: formData.offerType === opt ? 'white' : 'var(--color-text-main)', cursor: 'pointer'
                                        }}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            {formData.offerType === 'Other' && (
                                <FormInput name="offerTypeOther" placeholder="e.g. Enterprise Licensing, Fractional CMO Service, Consulting Retainer" value={formData.offerTypeOther} onChange={handleChange} style={{ marginTop: '1rem' }} />
                            )}
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <FormInput name="differentiation" label="Why you?" value={formData.differentiation} onChange={handleChange} placeholder="e.g. Proprietary Tech, 10-Year Track Record, Exclusive Partnerships" />
                        </div>
                        
                        <div style={{ marginTop: '1rem' }}>
                            <FormInput name="unfairAdvantage" label="The Unfair Advantage" value={formData.unfairAdvantage} onChange={handleChange} placeholder="What specific knowledge or proprietary data do you possess that your competitors cannot access?" />
                        </div>

                        <div style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '500' }}>The Arsenal</label>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>Do you have existing IP (Book, Podcast, Keynotes) or are we building from scratch?</p>
                            <CheckboxGroup
                                options={[
                                    { label: 'Book', value: 'Book' },
                                    { label: 'Podcast', value: 'Podcast' },
                                    { label: 'Keynotes', value: 'Keynotes' },
                                    { label: 'Newsletter', value: 'Newsletter' },
                                    { label: 'Case Studies', value: 'Case Studies' },
                                    { label: 'Building from Scratch', value: 'None' }
                                ]}
                                selectedValues={formData.assets}
                                onChange={(vals) => handleCheckboxChange('assets', vals)}
                            />
                            
                            {/* Dynamic Inputs for Selected Assets */}
                            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {formData.assets.map(asset => {
                                    if (asset === 'None' || asset === 'Other') return null;
                                    return (
                                         <div key={asset} className="fade-in">
                                            <label style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.3rem', display: 'block' }}>
                                                Link or Name for {asset}
                                            </label>
                                            <input
                                                type="text"
                                                placeholder={`Paste link or title for ${asset}...`}
                                                value={formData.assetDetails[asset] || ''}
                                                onChange={(e) => handleAssetDetailChange(asset, e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.8rem',
                                                    borderRadius: 'var(--radius-md)',
                                                    border: '1px solid var(--color-border)',
                                                    background: 'rgba(255,255,255,0.03)',
                                                    color: 'var(--color-text-main)',
                                                    outline: 'none',
                                                    fontSize: '0.9rem'
                                                }}
                                            />
                                         </div>
                                    );
                                })}
                            </div>

                            {formData.assets.includes('Other') && (
                                <FormInput name="assetsOther" placeholder="e.g. Webinar, Whitepaper" value={formData.assetsOther} onChange={handleChange} style={{ marginTop: '1rem' }} />
                            )}
                        </div>

                        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '2rem 0' }} />



                        <FormInput name="capacity" label="Weekly Capacity" value={formData.capacity} onChange={handleChange} placeholder="e.g. 20 Hours/Week, 9-5 Mon-Fri, Full-Time Team" />



                        <FormInput name="constraints" label="Hard Constraints" value={formData.constraints} onChange={handleChange} placeholder="e.g. SOC2 Compliance, No Paid Ads, Enterprise Clients Only" />

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <Button variant="secondary" onClick={() => setStep(3)}>Back</Button>
                            <Button variant="primary" onClick={() => setStep(5)}>Next: Logistics</Button>
                        </div>
                    </div>
                )}

                {step === 5 && (
                     <div className="fade-in">
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-text-main)' }}>5. Logistics & Qualifiers</h3>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500' }}>Average Monthly Revenue</label>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {[`< ${formData.currency}5k`, `${formData.currency}5k - ${formData.currency}20k`, `${formData.currency}20k - ${formData.currency}50k`, `${formData.currency}50k+`, 'Not Applicable', 'Other'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => handleRadioChange('revenue', opt)}
                                        style={{
                                            padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid var(--color-accent)',
                                            background: formData.revenue === opt ? 'var(--color-accent)' : 'transparent',
                                            color: formData.revenue === opt ? 'white' : 'var(--color-text-main)', cursor: 'pointer'
                                        }}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            {formData.revenue === 'Other' && (
                                <FormInput name="revenueOther" placeholder="e.g. $15,000/Month, $2M ARR" value={formData.revenueOther} onChange={handleChange} style={{ marginTop: '1rem' }} />
                            )}
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500' }}>Team Size</label>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {['Solo', '1 - 10', '11 - 50', '50+'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => handleRadioChange('team', opt)}
                                        style={{
                                            padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid var(--color-accent)',
                                            background: formData.team === opt ? 'var(--color-accent)' : 'transparent',
                                            color: formData.team === opt ? 'white' : 'var(--color-text-main)', cursor: 'pointer'
                                        }}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                         <FormInput name="antiGoals" label="Anti-Goals (What do you HATE?)" value={formData.antiGoals} onChange={handleChange} placeholder="e.g. Cold Calling, Direct Management, Low-Ticket Sales" />

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <Button variant="secondary" onClick={() => setStep(4)}>Back</Button>
                            <Button variant="primary" onClick={() => setStep(6)}>Next: Final Output</Button>
                        </div>
                    </div>
                )}

                {step === 6 && (
                    <div className="fade-in">
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-text-main)' }}>6. Final Output</h3>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>What should the AI build for you?</p>

                        <CheckboxGroup
                            options={[
                                { label: 'Marketing Strategy', value: 'Marketing Strategy' },
                                { label: '30-Day Content Calendar', value: '30-Day Content Calendar' },
                                { label: 'SEO Keyword & Optimization Plan', value: 'SEO Keyword Plan' },
                                { label: 'Lead Gen System', value: 'Lead Gen System' },
                                { label: 'Cold Outreach Scripts', value: 'Cold Outreach Scripts' },
                                { label: 'Landing Page Copy', value: 'Landing Page Copy' },
                                { label: 'Competitor Analysis', value: 'Competitor Analysis' },
                                { label: 'Offer Positioning', value: 'Offer Positioning' },
                                { label: 'Other', value: 'Other' }
                            ]}
                            selectedValues={formData.outputs}
                            onChange={(vals) => handleCheckboxChange('outputs', vals)}
                        />
                        {formData.outputs.includes('Other') && (
                            <FormInput name="outputsOther" placeholder="e.g. VSL Script, Email Nurture Sequence, Webinar Deck" value={formData.outputsOther} onChange={handleChange} style={{ marginTop: '1rem' }} />
                        )}

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <Button variant="secondary" onClick={() => setStep(5)}>Back</Button>
                            <Button onClick={generateStrategy} variant="primary">Submit</Button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default BusinessForm;
