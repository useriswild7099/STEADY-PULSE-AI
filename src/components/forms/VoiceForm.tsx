import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import FormInput from './FormInput';
import Button from './Button';
import CheckboxGroup from './CheckboxGroup';
import './forms.css';

interface VoiceFormProps {
    onBack: () => void;
    onComplete: (data: any) => void;
}

const VoiceForm: React.FC<VoiceFormProps> = ({ onBack, onComplete }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Section 1: POV
        belief: '',
        repel: '',
        frustration: '',
        // Section 2: Voice
        voiceDescriptors: [] as string[],
        banWords: '',
        rhythm: '',
        // Section 3: Taste
        loveCreators: '',
        hateCreators: '',
        // Section 4: Stories
        stories: [] as string[],
        offLimits: '',
        // Section 5: Visuals
        visibility: '',
        formats: [] as string[],
        aesthetic: '',
        // Section 6: Intent
        ctaStyle: '',
        emotionalIntent: [] as string[]
    });
    const [generatedPrompt, setPrompt] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (field: string, newValues: string[]) => {
        setFormData(prev => ({ ...prev, [field]: newValues }));
    };

    const handleRadioChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const generateVoice = () => {
        const prompt = `
Act as a Brand Ghostwriter & Strategist.

**IDENTITY & POV**
- **The Hill You Die On**: ${formData.belief}
- **Anti-Persona (Repel)**: ${formData.repel}
- **Industry Frustration**: ${formData.frustration}

**VOICE & TONE**
- **Descriptors**: ${formData.voiceDescriptors.join(', ')}
- **Rhythm**: ${formData.rhythm}
- **The 'Cringe' List**: ${formData.banWords}

**TASTE & REFERENCES**
- **Intellectual Benchmarks**: ${formData.loveCreators}
- **Hate**: ${formData.hateCreators}

**CONTENT STRATEGY**
- **Story Types**: ${formData.stories.join(', ')}
- **Formats**: ${formData.formats.join(', ')}
- **Aesthetic**: ${formData.aesthetic}
- **Visibility**: ${formData.visibility}
- **Off-Limits**: ${formData.offLimits}

**CONVERSION & FEELING**
- **CTA Style**: ${formData.ctaStyle}
- **Target Emotion**: ${formData.emotionalIntent.join(', ')}

**YOUR TASK**:
Write a "Brand Voice Guidelines" summary, then write 3 sample LinkedIn hooks that demonstrate this voice perfectly.
`;
        
        setPrompt(prompt.trim());
        setStep(4);
        // onComplete({ ...formData, generatedVoicePrompt: prompt.trim() });
    };

    return (
        <div className="form-container" style={{ paddingBottom: '4rem' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Button variant="ghost" onClick={onBack} style={{ padding: '0.5rem' }}>
                    <ArrowLeft size={20} />
                </Button>
                <div>
                    <h2 style={{ fontSize: '1.5rem', lineHeight: '1.2' }}>Brand DNA & Voice</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Right Brain Intake • ~10 Mins</p>
                </div>
            </div>

            <div className="glass-card" style={{ padding: '2rem' }}>
                {step === 1 && (
                    <div className="fade-in">
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-text-main)' }}>1. Point of View (POV)</h3>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <FormInput name="belief" label="The Hill You Die On" value={formData.belief} onChange={handleChange} placeholder="What is one industry 'truth' that you believe is actually a lie?" />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <FormInput name="repel" label="Who is this brand NOT for?" value={formData.repel} onChange={handleChange} placeholder="e.g. Quick-fix seekers, Lazy marketers" />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <FormInput name="frustration" label="What frustrates you about your industry?" value={formData.frustration} onChange={handleChange} placeholder="e.g. Too much fluff, not enough action" />
                        </div>

                        <hr style={{ borderColor: 'rgba(0,0,0,0.1)', margin: '2rem 0' }} />

                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-text-main)' }}>2. Voice Calibration</h3>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500' }}>Pick up to 3 descriptors</label>
                            <CheckboxGroup
                                options={[
                                    { label: 'Direct & No-BS', value: 'Direct' },
                                    { label: 'Calm & Authoritative', value: 'Calm' },
                                    { label: 'Analytical', value: 'Analytical' },
                                    { label: 'Warm & Empathetic', value: 'Warm' },
                                    { label: 'Contrarian', value: 'Contrarian' },
                                    { label: 'Story-First', value: 'Storytelling' }
                                ]}
                                selectedValues={formData.voiceDescriptors}
                                onChange={(vals) => handleCheckboxChange('voiceDescriptors', vals)}
                            />
                        </div>

                        <FormInput name="banWords" label="The 'Cringe' List" value={formData.banWords} onChange={handleChange} placeholder="What industry buzzwords make you instantly lose respect for the speaker?" />

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Sentence Rhythm</label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {['Punchy', 'Flowing', 'Mixed'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => handleRadioChange('rhythm', opt)}
                                        style={{
                                            flex: 1, padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)',
                                            background: formData.rhythm === opt ? 'var(--color-accent)' : 'transparent',
                                            color: formData.rhythm === opt ? 'white' : 'var(--color-text-main)', cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>



                        <Button onClick={() => setStep(2)} style={{ width: '100%', marginTop: '1rem', background: 'var(--color-accent)' }}>Next: Taste & Stories</Button>
                    </div>
                )}

                {step === 2 && (
                    <div className="fade-in">
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-text-main)' }}>3. Taste & References</h3>
                        <FormInput name="loveCreators" label="Intellectual Benchmarks" value={formData.loveCreators} onChange={handleChange} placeholder="Whose intellect do you respect? (e.g., Musk, Dalio, Jobs, or a specific industry leader)." />
                        {/* <FormInput name="hateCreators" label="Creators you Dislike (Why?)" value={formData.hateCreators} onChange={handleChange} placeholder="e.g. Generic influencers for fluff" /> */}

                        <hr style={{ borderColor: 'rgba(0,0,0,0.1)', margin: '2rem 0' }} />

                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-text-main)' }}>4. Story Assets</h3>
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500' }}>Stories you'll tell</label>
                            <CheckboxGroup
                                options={[
                                    { label: 'Failure / Lessons', value: 'Failure' },
                                    { label: 'Behind the Scenes', value: 'BTS' },
                                    { label: 'Philosophy', value: 'Philosophy' }
                                ]}
                                selectedValues={formData.stories}
                                onChange={(vals) => handleCheckboxChange('stories', vals)}
                            />
                        </div>

                        <FormInput name="offLimits" label="Strictly Off-Limits" value={formData.offLimits} onChange={handleChange} placeholder="e.g. Kids, Politics" />

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
                            <Button onClick={() => setStep(3)} style={{ background: 'var(--color-accent)' }}>Next: Visuals & Intent</Button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="fade-in">
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-text-main)' }}>5. Visuals & Format</h3>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Visibility Level</label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {['Face-Forward', 'Mixed', 'Text-Only'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => handleRadioChange('visibility', opt)}
                                        style={{
                                            flex: 1, padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)',
                                            background: formData.visibility === opt ? 'var(--color-accent)' : 'transparent',
                                            color: formData.visibility === opt ? 'white' : 'var(--color-text-main)', cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500' }}>Preferred Formats</label>
                            <CheckboxGroup
                                options={[
                                    { label: 'Written Posts', value: 'Written' },
                                    { label: 'Carousels', value: 'Carousels' },
                                    { label: 'Video', value: 'Video' },
                                    { label: 'Long-form', value: 'Long-form' }
                                ]}
                                selectedValues={formData.formats}
                                onChange={(vals) => handleCheckboxChange('formats', vals)}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Aesthetic</label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {['Minimal', 'Bold', 'No Pref'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => handleRadioChange('aesthetic', opt)}
                                        style={{
                                            flex: 1, padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)',
                                            background: formData.aesthetic === opt ? 'var(--color-accent)' : 'transparent',
                                            color: formData.aesthetic === opt ? 'white' : 'var(--color-text-main)', cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <hr style={{ borderColor: 'rgba(0,0,0,0.1)', margin: '2rem 0' }} />

                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-text-main)' }}>6. Conversion & Intent</h3>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>CTA Style</label>
                            <select
                                name="ctaStyle"
                                value={formData.ctaStyle}
                                onChange={handleChange}
                                style={{
                                    width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)',
                                    background: 'var(--color-input-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text-main)'
                                }}
                            >
                                <option value="" disabled>Select CTA Style...</option>
                                <option value="Soft">Soft Conversation</option>
                                <option value="Direct">Direct CTA</option>
                                <option value="Signature">Signature CTA</option>
                                <option value="None">No CTA</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500' }}>Target Emotion (Pick 2)</label>
                            <CheckboxGroup
                                options={[
                                    { label: 'Clear', value: 'Clear' },
                                    { label: 'Challenged', value: 'Challenged' },
                                    { label: 'Confident', value: 'Confident' },
                                    { label: 'Curious', value: 'Curious' },
                                    { label: 'Motivated', value: 'Motivated' }
                                ]}
                                selectedValues={formData.emotionalIntent}
                                onChange={(vals) => handleCheckboxChange('emotionalIntent', vals)}
                            />
                        </div>


                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
                            <Button onClick={generateVoice} style={{ background: 'var(--color-accent)', boxShadow: 'var(--color-card-shadow)' }}>Calibrate Brand</Button>
                        </div>
                        <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', textAlign: 'center', fontStyle: 'italic', opacity: 0.7 }}>
                            "By submitting this, you acknowledge that we do not do 'vanity metrics.' We build assets."
                        </p>
                    </div>
                )}

                {step === 4 && (
                    <div className="fade-in">
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{
                                width: '60px', height: '60px', background: 'var(--color-accent)', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem'
                            }}>
                                <Check color="white" size={32} />
                            </div>
                            <h3>Brand Voice Submitted</h3>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Your brand voice profile has been successfully submitted and is being processed.</p>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                             <Button onClick={() => onComplete(formData)} variant="primary" style={{ background: 'var(--color-accent)', paddingLeft: '3rem', paddingRight: '3rem' }}>
                                Continue to Dashboard
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VoiceForm;
