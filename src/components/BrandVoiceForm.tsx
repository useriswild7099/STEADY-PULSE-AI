import { useState } from 'react';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { api } from '../lib/api';

interface BrandVoiceFormProps {
  generalData: any;
  onComplete: () => void;
  onBack: () => void;
}

export function BrandVoiceForm({ generalData, onComplete, onBack }: BrandVoiceFormProps) {

  const [formData, setFormData] = useState({
    // Core Values & Beliefs
    topValues: ['', '', ''],
    unpopularOpinion: '',
    antiAvatar: '',

    // Voice & Vibe Check
    communicationStyle: [] as string[],
    neverUseWords: '',
    punctuationStyle: '',
    emojiPreference: '',
    hashtagPreference: '',

    // Influencer Taste Test
    creatorsAdmire: '',
    creatorsAnnoying: '',

    // Content Source Code
    contentPillars: ['', '', ''],
    feedIdeasMethod: [] as string[],
    keyStories: [] as string[],

    // Visual Identity
    headshotsStatus: '',
    brandColors: '',
    postFormatPreference: '',
    fontStyle: '',

    // Formatting Rules
    firstPersonVoice: '',
    ctaStyle: '',
    referenceCompetitors: '',
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayInputChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof formData] as string[]).map((item: string, i: number) =>
        i === index ? value : item
      )
    }));
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof formData] as string[]), value]
        : (prev[field as keyof typeof formData] as string[]).filter(item => item !== value)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + uploadedFiles.length > 5) {
      alert('Maximum 5 files allowed');
      return;
    }
    setUploadedFiles(prev => [...prev, ...files].slice(0, 5));
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      // Combine both forms data
      const completeData = {
        generalData,
        brandData: formData,
        // headshots: uploadedFiles, // Handle file upload separately or convert to base64 if needed. API doesn't support multipart yet in this simple implementation? Schema says Mixed.
      };

      console.log('Submitting complete form data:', completeData);

      await api.post('/client/onboarding', completeData, token);

      onComplete();
    } catch (error: any) {
      alert(error.message || 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFCFD] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-gray-200/40 via-transparent to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-gray-100/30 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-gray-200/50 backdrop-blur-xl bg-white/40">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 backdrop-blur-xl bg-white/50 border border-white/40 rounded-full px-5 py-2 hover:bg-white/70 transition-all hover:shadow-lg text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to General Info</span>
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-black/90 text-white text-sm px-4 py-2 rounded-full mb-4">
            <span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-xs">2</span>
            <span>Brand Voice</span>
          </div>
          <h1 className="text-4xl md:text-5xl tracking-[-0.03em] mb-4">
            🧬 The Ghostwriter's Secret Sauce: Brand DNA Intake Form
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            So your content doesn't just sound like you—it <span className="italic">is</span> you.
          </p>
        </div>

        <div className="space-y-8">
          {/* Section 1: Core Values & Beliefs */}
          <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5">
            <h2 className="text-3xl tracking-[-0.02em] mb-2">1. Core Values & Beliefs</h2>
            <p className="text-sm text-gray-500 mb-6">(What guides your decisions—even when no one's watching?)</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-700 mb-3">
                  Top 3 non-negotiable values in your work: *
                </label>
                <p className="text-xs text-gray-500 mb-3">(e.g., Integrity, Speed, Simplicity, Empathy, Precision)</p>
                <div className="space-y-3">
                  {[0, 1, 2].map((index) => (
                    <input
                      key={index}
                      type="text"
                      value={formData.topValues[index]}
                      onChange={(e) => handleArrayInputChange('topValues', index, e.target.value)}
                      placeholder={`Value ${index + 1}`}
                      required
                      maxLength={20}
                      className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-3">
                  Unpopular opinion in your industry: *
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  (e.g., "Most personal branding is performative noise," or "AI won't replace coaches—it'll expose lazy ones")
                </p>
                <textarea
                  value={formData.unpopularOpinion}
                  onChange={(e) => handleInputChange('unpopularOpinion', e.target.value)}
                  placeholder="Share your contrarian take..."
                  rows={4}
                  required
                  className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-3">
                  Who are you trying to REPEL? (The "Anti-Avatar") *
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  (e.g., "People who want $500/month growth hacks," "Founders who won't commit to 90 days," "Clients who say 'just make it go viral'")
                </p>
                <textarea
                  value={formData.antiAvatar}
                  onChange={(e) => handleInputChange('antiAvatar', e.target.value)}
                  placeholder="Describe who you DON'T want to work with..."
                  rows={4}
                  required
                  className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Voice & Vibe Check */}
          <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5">
            <h2 className="text-3xl tracking-[-0.02em] mb-2">2. Voice & Vibe Check</h2>
            <p className="text-sm text-gray-500 mb-6">(We're reverse-engineering your personality)</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-700 mb-3">Your natural communication style: *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Contrarian & Bold',
                    'Warm & Empathetic',
                    'Data-Driven & Precise',
                    'Witty & Irreverent',
                    'Calm & Authoritative',
                    'Storyteller (Narrative-First)',
                    'Minimalist & Direct',
                  ].map((style) => (
                    <label key={style} className="flex items-center gap-3 cursor-pointer group backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-4 hover:bg-white/60 transition-all">
                      <input
                        type="checkbox"
                        checked={formData.communicationStyle.includes(style)}
                        onChange={(e) => handleCheckboxChange('communicationStyle', style, e.target.checked)}
                        className="w-4 h-4 accent-black rounded"
                      />
                      <span className="group-hover:text-black transition-colors">{style}</span>
                    </label>
                  ))}
                  <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <span className="text-sm text-gray-700">Other:</span>
                      <input
                        type="text"
                        placeholder="Specify..."
                        className="flex-1 bg-transparent border-b border-gray-300 px-2 py-1 focus:outline-none focus:border-black transition-all text-sm"
                        onBlur={(e) => {
                          if (e.target.value) {
                            handleCheckboxChange('communicationStyle', e.target.value, true);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-3">
                  Words or phrases you NEVER want used:
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  (e.g., "hustle," "game-changer," "synergy," "unlock your potential," "crushing it")
                </p>
                <input
                  type="text"
                  value={formData.neverUseWords}
                  onChange={(e) => handleInputChange('neverUseWords', e.target.value)}
                  placeholder="Comma-separated list..."
                  className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-3">Punctuation & rhythm preference: *</label>
                <div className="space-y-3">
                  {[
                    { value: 'short-punchy', label: 'Short. Punchy. Sentences.' },
                    { value: 'flowing', label: 'Flowing, lyrical paragraphs' },
                    { value: 'mix', label: 'Mix of both' },
                    { value: 'bold-emphasis', label: 'I use bold for emphasis, not italics' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer group backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-4 hover:bg-white/60 transition-all">
                      <input
                        type="radio"
                        name="punctuationStyle"
                        value={option.value}
                        required
                        checked={formData.punctuationStyle === option.value}
                        onChange={(e) => handleInputChange('punctuationStyle', e.target.value)}
                        className="w-4 h-4 accent-black"
                      />
                      <span className="group-hover:text-black transition-colors">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-3">Emojis: *</label>
                <div className="space-y-3">
                  {[
                    { value: 'love', label: 'Love them (2–3 per post)' },
                    { value: 'sparingly', label: 'Use sparingly (1 max)' },
                    { value: 'never', label: 'Never' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer group backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-4 hover:bg-white/60 transition-all">
                      <input
                        type="radio"
                        name="emojiPreference"
                        value={option.value}
                        required
                        checked={formData.emojiPreference === option.value}
                        onChange={(e) => handleInputChange('emojiPreference', e.target.value)}
                        className="w-4 h-4 accent-black"
                      />
                      <span className="group-hover:text-black transition-colors">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-3">Hashtags: *</label>
                <div className="space-y-3">
                  {[
                    { value: 'strategic', label: 'Strategic (3–5 niche tags)' },
                    { value: 'minimal', label: 'Minimal (1–2)' },
                    { value: 'none', label: 'None — they feel spammy' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer group backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-4 hover:bg-white/60 transition-all">
                      <input
                        type="radio"
                        name="hashtagPreference"
                        value={option.value}
                        required
                        checked={formData.hashtagPreference === option.value}
                        onChange={(e) => handleInputChange('hashtagPreference', e.target.value)}
                        className="w-4 h-4 accent-black"
                      />
                      <span className="group-hover:text-black transition-colors">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Influencer Taste Test */}
          <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5">
            <h2 className="text-3xl tracking-[-0.02em] mb-2">3. Influencer Taste Test</h2>
            <p className="text-sm text-gray-500 mb-6">(Fastest way to calibrate your aesthetic)</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-700 mb-3">
                  3 creators you admire (and why): *
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  (e.g., "Lenny Rachitsky – clear, deep, no fluff," "Alex Hormozi – direct, polarizing, high-signal")
                </p>
                <textarea
                  value={formData.creatorsAdmire}
                  onChange={(e) => handleInputChange('creatorsAdmire', e.target.value)}
                  placeholder="List creators and what you admire about their style..."
                  rows={5}
                  required
                  className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-3">
                  3 creators you find annoying (and why): *
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  (e.g., "Generic '6-figure' coaches with no point of view," "Overly polished carousel spam")
                </p>
                <textarea
                  value={formData.creatorsAnnoying}
                  onChange={(e) => handleInputChange('creatorsAnnoying', e.target.value)}
                  placeholder="List creators/styles you want to avoid..."
                  rows={5}
                  required
                  className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Content Source Code */}
          <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5">
            <h2 className="text-3xl tracking-[-0.02em] mb-2">4. Content "Source Code"</h2>
            <p className="text-sm text-gray-500 mb-6">(How we keep your content fresh for 6–12 months)</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-700 mb-3">
                  Your "Big 3" Content Pillars: *
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  If you could only post about 3 topics forever, what would they be?
                </p>
                <div className="space-y-3">
                  {[0, 1, 2].map((index) => (
                    <input
                      key={index}
                      type="text"
                      value={formData.contentPillars[index]}
                      onChange={(e) => handleArrayInputChange('contentPillars', index, e.target.value)}
                      placeholder={`Pillar ${index + 1}`}
                      required
                      className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-3">
                  How will you feed us ideas? (Choose all that apply) *
                </label>
                <div className="space-y-3">
                  {[
                    'Monthly 20-min voice note',
                    'Weekly Slack/WhatsApp updates',
                    'Share articles/news I react to',
                    'Quarterly strategy call',
                    "I'll give you full creative freedom (based on this form)",
                  ].map((method) => (
                    <label key={method} className="flex items-center gap-3 cursor-pointer group backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-4 hover:bg-white/60 transition-all">
                      <input
                        type="checkbox"
                        checked={formData.feedIdeasMethod.includes(method)}
                        onChange={(e) => handleCheckboxChange('feedIdeasMethod', method, e.target.checked)}
                        className="w-4 h-4 accent-black rounded"
                      />
                      <span className="group-hover:text-black transition-colors">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-3">
                  Key stories we should know:
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  (We'll ask for details later—but flag which ones matter)
                </p>
                <div className="space-y-3">
                  {[
                    'My origin story (how I got here)',
                    'A major failure that changed me',
                    'A client win that proves my method',
                    'A personal belief that drives my work',
                  ].map((story) => (
                    <label key={story} className="flex items-center gap-3 cursor-pointer group backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-4 hover:bg-white/60 transition-all">
                      <input
                        type="checkbox"
                        checked={formData.keyStories.includes(story)}
                        onChange={(e) => handleCheckboxChange('keyStories', story, e.target.checked)}
                        className="w-4 h-4 accent-black rounded"
                      />
                      <span className="group-hover:text-black transition-colors">{story}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Visual Identity */}
          <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5">
            <h2 className="text-3xl tracking-[-0.02em] mb-2">5. Visual Identity (LinkedIn-Specific)</h2>
            <p className="text-sm text-gray-500 mb-6">(Because even text posts have visual rhythm)</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-700 mb-3">Headshots: *</label>
                <div className="space-y-3">
                  {[
                    { value: 'have-headshots', label: 'I have 3–5 professional, consistent headshots' },
                    { value: 'need-help', label: 'I need help with visual direction' },
                    { value: 'no-face', label: 'I prefer no face (just text/graphics)' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer group backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-4 hover:bg-white/60 transition-all">
                      <input
                        type="radio"
                        name="headshotsStatus"
                        value={option.value}
                        required
                        checked={formData.headshotsStatus === option.value}
                        onChange={(e) => handleInputChange('headshotsStatus', e.target.value)}
                        className="w-4 h-4 accent-black"
                      />
                      <span className="group-hover:text-black transition-colors">{option.label}</span>
                    </label>
                  ))}
                </div>

                {formData.headshotsStatus === 'have-headshots' && (
                  <div className="mt-4">
                    <label className="block text-sm text-gray-700 mb-2">Upload your headshots (3-5 recommended):</label>
                    <div className="backdrop-blur-xl bg-white/60 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-black/30 transition-all">
                      <input
                        type="file"
                        id="headshots"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label htmlFor="headshots" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                        <div className="text-sm text-gray-700 mb-1">
                          Click to upload or drag and drop
                        </div>
                        <div className="text-xs text-gray-500">
                          PNG, JPG up to 10MB each
                        </div>
                      </label>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3">
                            <span className="text-sm truncate flex-1">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="ml-2 text-gray-500 hover:text-black transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-3">
                  Brand colors (if any):
                </label>
                <p className="text-xs text-gray-500 mb-3">(e.g., "Navy + gold," or "Just black/white")</p>
                <input
                  type="text"
                  value={formData.brandColors}
                  onChange={(e) => handleInputChange('brandColors', e.target.value)}
                  placeholder="Your brand colors..."
                  className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-3">Post format preference: *</label>
                <div className="space-y-3">
                  {[
                    { value: 'text-only', label: 'Text-only (clean, high-contrast)' },
                    { value: 'carousel', label: 'Carousel PDFs (I have Canva templates)' },
                    { value: 'custom-graphics', label: 'Custom graphics (you design them)' },
                    { value: 'mix', label: 'Mix—depends on the message' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer group backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-4 hover:bg-white/60 transition-all">
                      <input
                        type="radio"
                        name="postFormatPreference"
                        value={option.value}
                        required
                        checked={formData.postFormatPreference === option.value}
                        onChange={(e) => handleInputChange('postFormatPreference', e.target.value)}
                        className="w-4 h-4 accent-black"
                      />
                      <span className="group-hover:text-black transition-colors">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-3">Font/style for carousels (if applicable):</label>
                <div className="space-y-3">
                  {[
                    { value: 'minimal', label: 'Minimal (Helvetica, clean lines)' },
                    { value: 'bold-modern', label: 'Bold & modern (Montserrat, gradients)' },
                    { value: 'no-preference', label: 'No preference — surprise me' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer group backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-4 hover:bg-white/60 transition-all">
                      <input
                        type="radio"
                        name="fontStyle"
                        value={option.value}
                        checked={formData.fontStyle === option.value}
                        onChange={(e) => handleInputChange('fontStyle', e.target.value)}
                        className="w-4 h-4 accent-black"
                      />
                      <span className="group-hover:text-black transition-colors">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Formatting Rules */}
          <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5">
            <h2 className="text-3xl tracking-[-0.02em] mb-2">6. Formatting Rules</h2>
            <p className="text-sm text-gray-500 mb-6">(The tiny details that build trust)</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-700 mb-3">First-person voice: *</label>
                <div className="space-y-3">
                  {[
                    { value: 'always-i', label: 'Always "I" (personal)' },
                    { value: 'mix', label: 'Mix of "I" and "we"' },
                    { value: 'mostly-we', label: 'Mostly "we" (company voice)' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer group backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-4 hover:bg-white/60 transition-all">
                      <input
                        type="radio"
                        name="firstPersonVoice"
                        value={option.value}
                        required
                        checked={formData.firstPersonVoice === option.value}
                        onChange={(e) => handleInputChange('firstPersonVoice', e.target.value)}
                        className="w-4 h-4 accent-black"
                      />
                      <span className="group-hover:text-black transition-colors">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-3">CTA style: *</label>
                <div className="space-y-3">
                  {[
                    { value: 'soft', label: 'Soft: "Let me know your thoughts"' },
                    { value: 'direct', label: 'Direct: "DM \'GROWTH\'"' },
                    { value: 'signature', label: 'Signature: "DM me or Follow for more."' },
                    { value: 'no-cta', label: 'No CTA — let the content speak' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer group backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-4 hover:bg-white/60 transition-all">
                      <input
                        type="radio"
                        name="ctaStyle"
                        value={option.value}
                        required
                        checked={formData.ctaStyle === option.value}
                        onChange={(e) => handleInputChange('ctaStyle', e.target.value)}
                        className="w-4 h-4 accent-black"
                      />
                      <span className="group-hover:text-black transition-colors">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-3">How often should we reference competitors? *</label>
                <div className="space-y-3">
                  {[
                    { value: 'never', label: 'Never' },
                    { value: 'rarely', label: 'Rarely (only to contrast philosophy)' },
                    { value: 'often', label: 'Often (to position against noise)' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer group backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-4 hover:bg-white/60 transition-all">
                      <input
                        type="radio"
                        name="referenceCompetitors"
                        value={option.value}
                        required
                        checked={formData.referenceCompetitors === option.value}
                        onChange={(e) => handleInputChange('referenceCompetitors', e.target.value)}
                        className="w-4 h-4 accent-black"
                      />
                      <span className="group-hover:text-black transition-colors">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Final Submission */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-black/5 to-gray-200/20 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5 text-center">
            <h2 className="text-2xl tracking-[-0.02em] mb-3">✅ Final Submission</h2>
            <p className="text-gray-600 mb-6">
              With this, we don't just write for you—we become your ghost voice.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white px-12 py-5 rounded-full hover:bg-gray-800 transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg"
            >
              {isSubmitting ? 'Submitting Your Brand DNA...' : 'Submit Brand DNA Form'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
