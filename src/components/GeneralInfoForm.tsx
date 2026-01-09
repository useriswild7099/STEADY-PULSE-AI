import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface GeneralInfoFormProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

type UserCategory = 
  | 'founder' 
  | 'student' 
  | 'coach' 
  | 'realestate' 
  | 'sales' 
  | 'author' 
  | 'healthcare' 
  | 'legal' 
  | 'finance' 
  | 'creative'
  | 'enterprise_saas'
  | 'tech_firm'
  | 'vc_startup'
  | 'recruitment'
  | 'consulting'
  | 'investment_firm'
  | 'marketing_agency'
  | 'small_business'
  | '';

export function GeneralInfoForm({ onComplete, onBack }: GeneralInfoFormProps) {
  const [formData, setFormData] = useState({
    // Essential Details
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+1',
    phone: '',
    linkedinUrl: '',
    instagramUrl: '',
    otherUrl: '',
    companyNameGeneral: '',
    jobTitle: '',
    
    // Role Selection
    category: '' as UserCategory,
    
    // A. Founder/Executive
    industry: '',
    companyStage: '',
    primaryGoal: '',
    targetAudience: '',
    contentFrequencyCurrent: '',
    
    // B. Student/Job Seeker
    fieldOfStudy: '',
    graduationYear: '',
    targetRoles: '',
    industriesOfInterest: '',
    linkedinActivity: '',
    studentGoal: '',
    
    // C. Coach/Consultant
    coachingNiche: '',
    offerPriceRange: '',
    idealClient: '',
    leadConversion: '',
    contentStyle: '',
    
    // D. Real Estate Agent
    market: '',
    focus: '',
    businessModel: '',
    contentGoal: '',
    visualAssets: '',
    
    // E. Sales Professional
    salesRole: '',
    salesIndustry: '',
    salesGoal: '',
    salesContentFocus: '',
    salesTargetAudience: '',
    
    // F. Author/Speaker
    bookTitle: '',
    speakingNiche: '',
    authorGoal: '',
    authorAudience: '',
    currentPlatforms: '',
    
    // G. Healthcare Professional
    specialty: '',
    practiceType: '',
    healthcareGoal: '',
    contentBoundaries: '',
    
    // H. Legal Professional
    practiceArea: '',
    firmType: '',
    legalGoal: '',
    contentComfortLevel: '',
    avoidTopics: '',
    
    // I. Financial Advisor
    licenses: '',
    clientFocus: '',
    services: '',
    financialContentStyle: '',
    
    // J. Creative Professional
    discipline: '',
    portfolioLink: '',
    creativeGoal: '',
    creativeStyle: '',
    shareProcess: '',
    
    // Enterprise SaaS
    companyName: '',
    companyWebsite: '',
    targetICP: '',
    linkedinGoal: '',
    monthlySpend: '',
    salesMotion: '',
    
    // Tech Firm
    techServices: '',
    geographicFocus: '',
    biggestBottleneck: '',
    dealSize: '',
    positioning: '',
    
    // VC Startup
    fundingStage: '',
    growthFocus: '',
    founderActive: '',
    contentGoalVC: '',
    
    // Recruitment
    recruitmentNiche: '',
    placementFee: '',
    workingBasis: '',
    linkedinUse: '',
    automatedOutbound: '',
    
    // Consulting
    consultingSpecialty: '',
    projectValue: '',
    targetClients: '',
    consultingGoal: '',
    currentPositioning: '',
    
    // Investment Firm
    focusArea: '',
    investmentGoal: '',
    investmentDealSize: '',
    
    // Marketing Agency
    whiteLabel: '',
    agencyClientProfile: '',
    serviceModel: '',
    needCaseStudies: '',
    
    // Small Business
    businessType: '',
    revenueRange: '',
    monthlyBudget: '',
    smallBizGoal: '',
    
    // Universal Questions
    goal60Days: '',
    idealPeopleLocation: '',
    bestContentType: '',
    postingFrequency: '',
    ctaPreference: '',
    structuredPlan: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
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
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-black/90 text-white text-sm px-4 py-2 rounded-full mb-4">
            <span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-xs">1</span>
            <span>The Business Fit</span>
          </div>
          <h1 className="text-5xl md:text-6xl tracking-[-0.03em] mb-4">
            Personal Branding & Lead Gen
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Your answers will shape a content strategy that builds trust, showcases expertise, and converts your ideal audience—whether they're clients, patients, employers, or collaborators.
          </p>
        </div>

        <div className="space-y-8">
          {/* Essential Details Section */}
          <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5">
            <h2 className="text-3xl tracking-[-0.02em] mb-2">Your Essential Details</h2>
            <p className="text-sm text-gray-500 mb-6">Let's start with the basics</p>
            
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="you@company.com"
                  className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                />
              </div>
              
              {/* Phone Number with Country Code */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
                <div className="flex gap-3">
                  <select
                    value={formData.countryCode}
                    onChange={(e) => handleInputChange('countryCode', e.target.value)}
                    className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all w-32"
                  >
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+86">🇨🇳 +86</option>
                    <option value="+81">🇯🇵 +81</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+39">🇮🇹 +39</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+7">🇷🇺 +7</option>
                    <option value="+55">🇧🇷 +55</option>
                    <option value="+52">🇲🇽 +52</option>
                    <option value="+82">🇰🇷 +82</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+31">🇳🇱 +31</option>
                    <option value="+46">🇸🇪 +46</option>
                    <option value="+41">🇨🇭 +41</option>
                    <option value="+47">🇳🇴 +47</option>
                    <option value="+64">🇳🇿 +64</option>
                    <option value="+27">🇿🇦 +27</option>
                    <option value="+351">🇵🇹 +351</option>
                    <option value="+48">🇵🇱 +48</option>
                    <option value="+63">🇵🇭 +63</option>
                    <option value="+66">🇹🇭 +66</option>
                    <option value="+60">🇲🇾 +60</option>
                    <option value="+62">🇮🇩 +62</option>
                    <option value="+84">🇻🇳 +84</option>
                    <option value="+20">🇪🇬 +20</option>
                    <option value="+234">🇳🇬 +234</option>
                  </select>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="555 000 0000"
                    className="flex-1 backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>
              </div>

              {/* LinkedIn URL */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">LinkedIn Profile URL *</label>
                <input
                  type="url"
                  required
                  value={formData.linkedinUrl}
                  onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                />
                <p className="text-xs text-gray-500 mt-2">The account you want us to grow</p>
              </div>

              {/* Instagram URL */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Instagram Profile URL (optional)</label>
                <input
                  type="url"
                  value={formData.instagramUrl}
                  onChange={(e) => handleInputChange('instagramUrl', e.target.value)}
                  placeholder="https://instagram.com/yourprofile"
                  className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                />
                <p className="text-xs text-gray-500 mt-2">If you want cross-platform growth</p>
              </div>

              {/* Other URL */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Other Link (optional)</label>
                <input
                  type="url"
                  value={formData.otherUrl}
                  onChange={(e) => handleInputChange('otherUrl', e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                />
                <p className="text-xs text-gray-500 mt-2">Website, portfolio, company page, or any related link</p>
              </div>

              {/* Company & Job Title */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyNameGeneral}
                    onChange={(e) => handleInputChange('companyNameGeneral', e.target.value)}
                    placeholder="Your company or organization"
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Job Title/Position</label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    placeholder="e.g., CEO, Marketing Director"
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>
              </div>


            </div>
          </div>

          {/* Section 1: Role Selection */}
          <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5">
            <h2 className="text-3xl tracking-[-0.02em] mb-2">Which best describes you?</h2>
            <p className="text-sm text-gray-500 mb-6">This customizes your entire experience</p>
            
            <div className="space-y-3">
              {[
                { value: 'founder', label: 'Founder / Executive', desc: 'Building authority & generating B2B leads' },
                { value: 'student', label: 'Student / Job Seeker', desc: 'Seeking internships, jobs, or mentorship' },
                { value: 'coach', label: 'Coach / Consultant', desc: 'Attracting high-ticket ($1K+) clients' },
                { value: 'realestate', label: 'Real Estate Agent', desc: 'Growing listings, buyers, or team' },
                { value: 'sales', label: 'Sales Professional', desc: 'Building a personal sales brand (e.g., on LinkedIn)' },
                { value: 'author', label: 'Author / Speaker', desc: 'Expanding thought leadership & book/speaking opportunities' },
                { value: 'healthcare', label: 'Healthcare Professional', desc: 'Educating the public & attracting patients/referrals' },
                { value: 'legal', label: 'Legal Professional', desc: 'Building trust & credibility (e.g., family law, IP, corporate)' },
                { value: 'finance', label: 'Financial Advisor', desc: 'Attracting ideal HNW or retail clients' },
                { value: 'creative', label: 'Creative Professional', desc: 'Showcasing portfolio (designer, photographer, filmmaker, etc.)' },
              ].map((option) => (
                <label key={option.value} className="flex items-start gap-3 cursor-pointer group backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-4 hover:bg-white/60 transition-all">
                  <input
                    type="radio"
                    name="category"
                    value={option.value}
                    required
                    checked={formData.category === option.value}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="mt-1 w-4 h-4 accent-black"
                  />
                  <div className="flex-1">
                    <div className="group-hover:text-black transition-colors">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Premium LinkedIn Growth Section */}
          <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5">
            <h2 className="text-3xl tracking-[-0.02em] mb-2">Or select from Premium Tier</h2>
            <p className="text-sm text-gray-500 mb-6">For B2B Tech, Founders, Agencies & High-Growth Service Firms</p>
            
            <div className="space-y-3">
              {[
                { value: 'enterprise_saas', label: 'Enterprise SaaS / B2B Tech', desc: 'AI, Cloud, Cybersecurity (Series A–C)' },
                { value: 'tech_firm', label: 'Mid–Large B2B Tech Firm', desc: 'IT Services, Dev Shop, Product Agency' },
                { value: 'vc_startup', label: 'VC-Funded Startup', desc: 'Series A–C stage with growth focus' },
                { value: 'recruitment', label: 'Recruitment / Staffing Agency', desc: 'Tech Hiring, Executive Search' },
                { value: 'consulting', label: 'Consulting / Professional Services', desc: 'Management, Legal, Finance, IT' },
                { value: 'investment_firm', label: 'Real Estate / Investment Firm', desc: 'PE, Family Office, CRE' },
                { value: 'marketing_agency', label: 'Marketing / Sales Agency', desc: 'White-label or client services' },
                { value: 'small_business', label: 'Small Business / Local Founder', desc: 'Under $1M revenue' },
              ].map((option) => (
                <label key={option.value} className="flex items-start gap-3 cursor-pointer group backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-4 hover:bg-white/60 transition-all">
                  <input
                    type="radio"
                    name="category"
                    value={option.value}
                    required
                    checked={formData.category === option.value}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="mt-1 w-4 h-4 accent-black"
                  />
                  <div className="flex-1">
                    <div className="group-hover:text-black transition-colors">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Conditional Sections */}
          
          {/* A. Founder/Executive */}
          {formData.category === 'founder' && (
            <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5 animate-slideDown">
              <h2 className="text-3xl tracking-[-0.02em] mb-6">Founder / Executive Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Industry *</label>
                  <input
                    type="text"
                    required
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Company stage *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Pre-seed', 'Seed', 'Series A+', 'Bootstrapped'].map((stage) => (
                      <label key={stage} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="companyStage"
                          value={stage}
                          required
                          checked={formData.companyStage === stage}
                          onChange={(e) => handleInputChange('companyStage', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{stage}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Primary goal *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Fundraising', 'Leads', 'Talent', 'Media'].map((goal) => (
                      <label key={goal} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="primaryGoal"
                          value={goal}
                          required
                          checked={formData.primaryGoal === goal}
                          onChange={(e) => handleInputChange('primaryGoal', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Target audience *</label>
                  <input
                    type="text"
                    required
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Current content frequency *</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['None', 'Sporadic', 'Weekly'].map((freq) => (
                      <label key={freq} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="contentFrequencyCurrent"
                          value={freq}
                          required
                          checked={formData.contentFrequencyCurrent === freq}
                          onChange={(e) => handleInputChange('contentFrequencyCurrent', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{freq}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* B. Student/Job Seeker */}
          {formData.category === 'student' && (
            <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5 animate-slideDown">
              <h2 className="text-3xl tracking-[-0.02em] mb-6">Student / Job Seeker Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Field of study / specialization *</label>
                  <input
                    type="text"
                    required
                    value={formData.fieldOfStudy}
                    onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Graduation year *</label>
                  <input
                    type="text"
                    required
                    value={formData.graduationYear}
                    onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                    placeholder="e.g., 2025"
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Target roles *</label>
                  <input
                    type="text"
                    required
                    value={formData.targetRoles}
                    onChange={(e) => handleInputChange('targetRoles', e.target.value)}
                    placeholder="e.g., Software Engineer, Product Manager"
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Industries of interest *</label>
                  <input
                    type="text"
                    required
                    value={formData.industriesOfInterest}
                    onChange={(e) => handleInputChange('industriesOfInterest', e.target.value)}
                    placeholder="e.g., FinTech, AI, E-commerce"
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Current LinkedIn activity *</label>
                  <div className="space-y-2">
                    {['Barely active', 'Posting projects', 'Networking'].map((activity) => (
                      <label key={activity} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="linkedinActivity"
                          value={activity}
                          required
                          checked={formData.linkedinActivity === activity}
                          onChange={(e) => handleInputChange('linkedinActivity', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{activity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Goal *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Internships', 'Full-time roles', 'Mentorship', 'Personal brand'].map((goal) => (
                      <label key={goal} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="studentGoal"
                          value={goal}
                          required
                          checked={formData.studentGoal === goal}
                          onChange={(e) => handleInputChange('studentGoal', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* C. Coach/Consultant */}
          {formData.category === 'coach' && (
            <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5 animate-slideDown">
              <h2 className="text-3xl tracking-[-0.02em] mb-6">Coach / Consultant Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Niche *</label>
                  <input
                    type="text"
                    required
                    value={formData.coachingNiche}
                    onChange={(e) => handleInputChange('coachingNiche', e.target.value)}
                    placeholder="e.g., Sales coaching for SaaS founders"
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Offer price range *</label>
                  <div className="space-y-2">
                    {['<$1K', '$1K–$5K', '$5K+'].map((range) => (
                      <label key={range} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="offerPriceRange"
                          value={range}
                          required
                          checked={formData.offerPriceRange === range}
                          onChange={(e) => handleInputChange('offerPriceRange', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Ideal client *</label>
                  <input
                    type="text"
                    required
                    value={formData.idealClient}
                    onChange={(e) => handleInputChange('idealClient', e.target.value)}
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Lead conversion method *</label>
                  <div className="space-y-2">
                    {['DMs', 'Calendly', 'Lead magnet'].map((method) => (
                      <label key={method} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="leadConversion"
                          value={method}
                          required
                          checked={formData.leadConversion === method}
                          onChange={(e) => handleInputChange('leadConversion', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Content style *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Tactical tips', 'Client stories', 'Frameworks', 'Hot takes'].map((style) => (
                      <label key={style} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="contentStyle"
                          value={style}
                          required
                          checked={formData.contentStyle === style}
                          onChange={(e) => handleInputChange('contentStyle', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{style}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* D. Real Estate Agent */}
          {formData.category === 'realestate' && (
            <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5 animate-slideDown">
              <h2 className="text-3xl tracking-[-0.02em] mb-6">Real Estate Agent Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Market *</label>
                  <input
                    type="text"
                    required
                    value={formData.market}
                    onChange={(e) => handleInputChange('market', e.target.value)}
                    placeholder="e.g., Luxury condos in Miami"
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Focus *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Buyers', 'Sellers', 'Both', 'Investor clients'].map((foc) => (
                      <label key={foc} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="focus"
                          value={foc}
                          required
                          checked={formData.focus === foc}
                          onChange={(e) => handleInputChange('focus', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{foc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Business model *</label>
                  <div className="space-y-2">
                    {['Solo', 'Team', 'Brokerage'].map((model) => (
                      <label key={model} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="businessModel"
                          value={model}
                          required
                          checked={formData.businessModel === model}
                          onChange={(e) => handleInputChange('businessModel', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{model}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Content goal *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Listings', 'Buyer leads', 'Team recruitment'].map((goal) => (
                      <label key={goal} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="contentGoal"
                          value={goal}
                          required
                          checked={formData.contentGoal === goal}
                          onChange={(e) => handleInputChange('contentGoal', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Visual assets *</label>
                  <div className="space-y-2">
                    {['High-quality photos', 'Drone videos', 'Client testimonials'].map((asset) => (
                      <label key={asset} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="visualAssets"
                          value={asset}
                          required
                          checked={formData.visualAssets === asset}
                          onChange={(e) => handleInputChange('visualAssets', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{asset}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* E. Sales Professional */}
          {formData.category === 'sales' && (
            <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5 animate-slideDown">
              <h2 className="text-3xl tracking-[-0.02em] mb-6">Sales Professional Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Role *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['AE', 'SDR', 'Sales Leader', 'Sales Trainer'].map((role) => (
                      <label key={role} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="salesRole"
                          value={role}
                          required
                          checked={formData.salesRole === role}
                          onChange={(e) => handleInputChange('salesRole', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{role}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Industry *</label>
                  <input
                    type="text"
                    required
                    value={formData.salesIndustry}
                    onChange={(e) => handleInputChange('salesIndustry', e.target.value)}
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Goal *</label>
                  <div className="space-y-2">
                    {['Job opportunities', 'Personal brand', 'Side consulting'].map((goal) => (
                      <label key={goal} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="salesGoal"
                          value={goal}
                          required
                          checked={formData.salesGoal === goal}
                          onChange={(e) => handleInputChange('salesGoal', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Content focus *</label>
                  <div className="space-y-2">
                    {['Sales frameworks', 'Deal breakdowns', 'Career journey'].map((focus) => (
                      <label key={focus} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="salesContentFocus"
                          value={focus}
                          required
                          checked={formData.salesContentFocus === focus}
                          onChange={(e) => handleInputChange('salesContentFocus', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{focus}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Target audience *</label>
                  <div className="space-y-2">
                    {['Recruiters', 'Founders', 'Fellow sellers'].map((audience) => (
                      <label key={audience} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="salesTargetAudience"
                          value={audience}
                          required
                          checked={formData.salesTargetAudience === audience}
                          onChange={(e) => handleInputChange('salesTargetAudience', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{audience}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* F. Author/Speaker */}
          {formData.category === 'author' && (
            <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5 animate-slideDown">
              <h2 className="text-3xl tracking-[-0.02em] mb-6">Author / Speaker Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Book title / topic *</label>
                  <input
                    type="text"
                    required
                    value={formData.bookTitle}
                    onChange={(e) => handleInputChange('bookTitle', e.target.value)}
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Speaking niche *</label>
                  <input
                    type="text"
                    required
                    value={formData.speakingNiche}
                    onChange={(e) => handleInputChange('speakingNiche', e.target.value)}
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Primary goal *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Book sales', 'Speaking gigs', 'Media features', 'Community'].map((goal) => (
                      <label key={goal} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="authorGoal"
                          value={goal}
                          required
                          checked={formData.authorGoal === goal}
                          onChange={(e) => handleInputChange('authorGoal', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Audience *</label>
                  <input
                    type="text"
                    required
                    value={formData.authorAudience}
                    onChange={(e) => handleInputChange('authorAudience', e.target.value)}
                    placeholder="e.g., Mid-career women in tech"
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Current platforms *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['LinkedIn', 'Newsletter', 'Podcast', 'YouTube'].map((platform) => (
                      <label key={platform} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="currentPlatforms"
                          value={platform}
                          required
                          checked={formData.currentPlatforms === platform}
                          onChange={(e) => handleInputChange('currentPlatforms', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* G. Healthcare Professional */}
          {formData.category === 'healthcare' && (
            <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5 animate-slideDown">
              <h2 className="text-3xl tracking-[-0.02em] mb-6">Healthcare Professional Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Specialty *</label>
                  <input
                    type="text"
                    required
                    value={formData.specialty}
                    onChange={(e) => handleInputChange('specialty', e.target.value)}
                    placeholder="e.g., Pediatric dentistry, Mental health therapy"
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Practice type *</label>
                  <div className="space-y-2">
                    {['Private', 'Clinic', 'Telehealth'].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="practiceType"
                          value={type}
                          required
                          checked={formData.practiceType === type}
                          onChange={(e) => handleInputChange('practiceType', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Goal *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['New patients', 'Educate public', 'Referrals', 'Reduce no-shows'].map((goal) => (
                      <label key={goal} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="healthcareGoal"
                          value={goal}
                          required
                          checked={formData.healthcareGoal === goal}
                          onChange={(e) => handleInputChange('healthcareGoal', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Content boundaries *</label>
                  <div className="space-y-2">
                    {['Can share cases (anonymized)', 'Educational only', 'Brand awareness'].map((boundary) => (
                      <label key={boundary} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="contentBoundaries"
                          value={boundary}
                          required
                          checked={formData.contentBoundaries === boundary}
                          onChange={(e) => handleInputChange('contentBoundaries', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{boundary}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="backdrop-blur-xl bg-blue-50/50 border border-blue-200/50 rounded-xl p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Compliance Note:</strong> We'll ensure HIPAA/local regulation alignment in all content
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* H. Legal Professional */}
          {formData.category === 'legal' && (
            <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5 animate-slideDown">
              <h2 className="text-3xl tracking-[-0.02em] mb-6">Legal Professional Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Practice area *</label>
                  <input
                    type="text"
                    required
                    value={formData.practiceArea}
                    onChange={(e) => handleInputChange('practiceArea', e.target.value)}
                    placeholder="e.g., Startup law, Estate planning"
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Firm type *</label>
                  <div className="space-y-2">
                    {['Solo', 'Boutique', 'Big Law'].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="firmType"
                          value={type}
                          required
                          checked={formData.firmType === type}
                          onChange={(e) => handleInputChange('firmType', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Goal *</label>
                  <div className="space-y-2">
                    {['Client inquiries', 'Media commentary', 'Referrals'].map((goal) => (
                      <label key={goal} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="legalGoal"
                          value={goal}
                          required
                          checked={formData.legalGoal === goal}
                          onChange={(e) => handleInputChange('legalGoal', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Content comfort level *</label>
                  <div className="space-y-2">
                    {['General guidance', 'Case studies (redacted)', 'Myth-busting'].map((level) => (
                      <label key={level} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="contentComfortLevel"
                          value={level}
                          required
                          checked={formData.contentComfortLevel === level}
                          onChange={(e) => handleInputChange('contentComfortLevel', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Avoid</label>
                  <input
                    type="text"
                    value={formData.avoidTopics}
                    onChange={(e) => handleInputChange('avoidTopics', e.target.value)}
                    placeholder="e.g., Don't mention court wins or No pricing"
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* I. Financial Advisor */}
          {formData.category === 'finance' && (
            <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5 animate-slideDown">
              <h2 className="text-3xl tracking-[-0.02em] mb-6">Financial Advisor Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">License/certifications *</label>
                  <input
                    type="text"
                    required
                    value={formData.licenses}
                    onChange={(e) => handleInputChange('licenses', e.target.value)}
                    placeholder="e.g., CFP, Series 7"
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Client focus *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['HNW', 'Young professionals', 'Retirees', 'Small biz owners'].map((focus) => (
                      <label key={focus} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="clientFocus"
                          value={focus}
                          required
                          checked={formData.clientFocus === focus}
                          onChange={(e) => handleInputChange('clientFocus', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{focus}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Services *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Wealth mgmt', 'Tax planning', 'Retirement', 'Insurance'].map((service) => (
                      <label key={service} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="services"
                          value={service}
                          required
                          checked={formData.services === service}
                          onChange={(e) => handleInputChange('services', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Content style *</label>
                  <div className="space-y-2">
                    {['Educational', 'Market updates', 'Client journey'].map((style) => (
                      <label key={style} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="financialContentStyle"
                          value={style}
                          required
                          checked={formData.financialContentStyle === style}
                          onChange={(e) => handleInputChange('financialContentStyle', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{style}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="backdrop-blur-xl bg-blue-50/50 border border-blue-200/50 rounded-xl p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Compliance Note:</strong> We'll align with FINRA/regulatory guidelines
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* J. Creative Professional */}
          {formData.category === 'creative' && (
            <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5 animate-slideDown">
              <h2 className="text-3xl tracking-[-0.02em] mb-6">Creative Professional Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Discipline *</label>
                  <input
                    type="text"
                    required
                    value={formData.discipline}
                    onChange={(e) => handleInputChange('discipline', e.target.value)}
                    placeholder="e.g., Brand designer, Wedding photographer"
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Portfolio link *</label>
                  <input
                    type="url"
                    required
                    value={formData.portfolioLink}
                    onChange={(e) => handleInputChange('portfolioLink', e.target.value)}
                    placeholder="https://"
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Goal *</label>
                  <div className="space-y-2">
                    {['Client commissions', 'Brand collabs', 'Job opportunities'].map((goal) => (
                      <label key={goal} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="creativeGoal"
                          value={goal}
                          required
                          checked={formData.creativeGoal === goal}
                          onChange={(e) => handleInputChange('creativeGoal', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Style *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Minimalist', 'Bold', 'Documentary', 'Conceptual'].map((style) => (
                      <label key={style} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="creativeStyle"
                          value={style}
                          required
                          checked={formData.creativeStyle === style}
                          onChange={(e) => handleInputChange('creativeStyle', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{style}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Do you share process/work-in-progress? *</label>
                  <div className="space-y-2">
                    {['Yes', 'No', 'Occasionally'].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="shareProcess"
                          value={option}
                          required
                          checked={formData.shareProcess === option}
                          onChange={(e) => handleInputChange('shareProcess', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Premium Tier Conditionals continue in next message due to length... */}
          
          {/* Universal Questions */}
          {formData.category && (
            <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5 animate-slideDown">
              <h2 className="text-3xl tracking-[-0.02em] mb-6">Universal Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">What's your #1 goal for the next 60 days? *</label>
                  <textarea
                    required
                    value={formData.goal60Days}
                    onChange={(e) => handleInputChange('goal60Days', e.target.value)}
                    placeholder="e.g., Land 3 coaching clients, Get 5 recruiter DMs, Grow to 10K followers"
                    rows={3}
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Where do your ideal people spend time online? *</label>
                  <input
                    type="text"
                    required
                    value={formData.idealPeopleLocation}
                    onChange={(e) => handleInputChange('idealPeopleLocation', e.target.value)}
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">What kind of content gets the best response from your network? *</label>
                  <input
                    type="text"
                    required
                    value={formData.bestContentType}
                    onChange={(e) => handleInputChange('bestContentType', e.target.value)}
                    className="w-full backdrop-blur-xl bg-white/60 border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Preferred posting frequency *</label>
                  <div className="space-y-2">
                    {['1x/week', '2–3x/week', '4–5x/week'].map((freq) => (
                      <label key={freq} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="postingFrequency"
                          value={freq}
                          required
                          checked={formData.postingFrequency === freq}
                          onChange={(e) => handleInputChange('postingFrequency', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{freq}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Call-to-action preference *</label>
                  <div className="space-y-2">
                    {[
                      'DM me or Follow for more.',
                      'Book a call',
                      'Download my guide',
                      'Comment below'
                    ].map((cta) => (
                      <label key={cta} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="ctaPreference"
                          value={cta}
                          required
                          checked={formData.ctaPreference === cta}
                          onChange={(e) => handleInputChange('ctaPreference', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{cta}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Are you open to a structured 2–3 month content plan for compounding growth? *</label>
                  <div className="space-y-2">
                    {[
                      'Yes – I\'m ready to invest',
                      'Maybe – show me the plan first',
                      'No – just need one-off help'
                    ].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer backdrop-blur-xl bg-white/40 border border-white/30 rounded-xl p-3 hover:bg-white/60 transition-all">
                        <input
                          type="radio"
                          name="structuredPlan"
                          value={option}
                          required
                          checked={formData.structuredPlan === option}
                          onChange={(e) => handleInputChange('structuredPlan', e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Continue Button */}
          {formData.category && (
            <div className="flex justify-center pt-6 animate-slideUp">
              <button
                type="submit"
                className="bg-black text-white px-12 py-5 rounded-full hover:bg-gray-800 transition-all hover:scale-105 hover:shadow-xl text-lg"
              >
                Continue to Brand Voice →
              </button>
            </div>
          )}
        </div>
      </form>

      {/* Custom Animations */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.5s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
