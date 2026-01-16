import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';
import { AuroraFooter } from './AuroraFooter';
import { 
  Book, Code, FileText, Lightbulb, Zap, Terminal, ChevronRight, ChevronDown,
  User, Settings, Shield, Palette, TrendingUp, MessageSquare, Clipboard,
  CheckCircle, ArrowRight, ExternalLink
} from 'lucide-react';

export function DocumentationPage() {
  const [activeSection, setActiveSection] = useState<string | null>('getting-started');
  const [expandedItems, setExpandedItems] = useState<string[]>(['getting-started']);

  const toggleItem = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Zap,
      items: [
        {
          id: 'quick-start',
          title: 'Quick Start Guide',
          content: `
## Welcome to Steady Pulse AI

Steady Pulse AI is your complete LinkedIn growth partner. We write strategic content, you approve it, and your audience grows. Here's how to get started in 3 simple steps:

### Step 1: Create Your Account
1. Click **"Start Growing"** on the homepage
2. Sign up with your email or use Google/LinkedIn OAuth
3. Verify your email to activate your account

### Step 2: Complete Your Onboarding
After signing in, you'll be guided through our onboarding process:

**Business Strategy Form**
- Company name and industry
- Target audience and ideal clients
- Current LinkedIn metrics and goals
- Competitors and market positioning
- Pain points and unique selling propositions

**Brand Voice Form**
- Tone preferences (professional, casual, authoritative)
- Content topics you want to cover
- Examples of posts you admire
- Topics to avoid
- Your unique perspective and expertise

### Step 3: Review & Approve Content
Once onboarding is complete, our team will:
- Analyze your strategy and voice DNA
- Create customized LinkedIn content for you
- Deliver posts to your Client Portal for approval
- Schedule approved content based on optimal timing
          `
        },
        {
          id: 'account-setup',
          title: 'Account Setup',
          content: `
## Setting Up Your Account

### Profile Configuration
Your Steady Pulse AI account is tied to your LinkedIn presence. Here's how to optimize your setup:

**Personal Information**
- Ensure your name matches your LinkedIn profile
- Add your company and role for personalized content
- Upload a profile photo for your dashboard

**Notification Preferences**
- Email notifications for new content ready for review
- Reminder emails for pending approvals
- Weekly engagement reports

### Security Settings
- Enable two-factor authentication (recommended)
- Review connected accounts
- Manage active sessions

### Billing & Subscription
Access your subscription status, update payment methods, and view invoices from the Settings panel in your Client Portal.
          `
        },
        {
          id: 'first-content',
          title: 'Your First Content',
          content: `
## Receiving Your First Content

### What to Expect
After completing onboarding, our content team will:

1. **Review your submissions** (1-2 business days)
2. **Create your content calendar** with strategic post timing
3. **Deliver your first batch** of LinkedIn posts

### How Content Appears in Your Portal
Navigate to the **Client Portal** to see:
- **Pending Posts**: Content awaiting your approval
- **Approved Posts**: Scheduled for publishing
- **Published Posts**: Live on your LinkedIn
- **Performance Metrics**: Engagement analytics

### Approving Content
For each post, you can:
- ✅ **Approve** - Schedules the post
- ✏️ **Request Edits** - Send feedback to our writers
- ❌ **Reject** - Decline with reason (optional)

We typically revise content within 24 hours of receiving feedback.
          `
        }
      ]
    },
    {
      id: 'client-portal',
      title: 'Client Portal Guide',
      icon: User,
      items: [
        {
          id: 'portal-overview',
          title: 'Portal Overview',
          content: `
## Client Portal Overview

Your Client Portal is your command center for managing your LinkedIn content strategy.

### Dashboard Sections

**📊 Overview Dashboard**
- Quick stats: Total posts, engagement rate, follower growth
- Pending approvals count
- Recent activity feed

**📝 Content Queue**
- View all pending content
- Sort by date, status, or topic
- Bulk approve functionality

**📈 Analytics**
- Profile views over time
- Engagement rate trends  
- Top performing posts
- Audience growth metrics

**⚙️ Settings**
- Update profile information
- Manage notification preferences
- Re-submit onboarding forms to update strategy
          `
        },
        {
          id: 'content-approval',
          title: 'Content Approval Workflow',
          content: `
## Content Approval Workflow

### Review Process

When new content is ready:

1. **Notification** - You'll receive an email alert
2. **Review** - Log into your portal to read the content
3. **Decision** - Approve, request edits, or reject
4. **Scheduling** - Approved content is queued for optimal posting time

### Making Edit Requests

When requesting changes:
- Be specific about what needs changing
- Reference particular lines or phrases
- Suggest alternatives when possible
- Our team responds within 24 hours

### Approval Best Practices

✅ **Do:**
- Review content within 48 hours for optimal scheduling
- Provide constructive feedback on rejected posts
- Let us know about upcoming events or announcements

❌ **Don't:**
- Delay approvals (affects your posting consistency)
- Make major strategy changes in edit notes (use onboarding update instead)
- Approve content you're not comfortable sharing
          `
        },
        {
          id: 'updating-strategy',
          title: 'Updating Your Strategy',
          content: `
## Updating Your Strategy

### When to Update

Consider re-submitting your onboarding forms when:
- Your business focus changes
- You're targeting a new audience
- Your role or company changes
- You want to explore new content topics
- Your brand voice has evolved

### How to Update

1. Navigate to **Client Portal**
2. Look for **"General Info"** or **"Brand Voice"** cards
3. Click **"Complete Form"** or **"Update"**
4. Submit your updated information

### What Happens Next

After updating:
- Our team reviews your new submissions
- Content strategy is adjusted accordingly
- You'll receive a confirmation email
- New content will reflect updated direction
          `
        }
      ]
    },
    {
      id: 'content-strategy',
      title: 'Content Strategy',
      icon: TrendingUp,
      items: [
        {
          id: 'content-types',
          title: 'Types of Content We Create',
          content: `
## Types of Content We Create

### Thought Leadership Posts
Establish yourself as an industry expert with:
- Industry insights and predictions
- Unique perspectives on trends
- Lessons from your experience
- Hot takes on relevant news

### Story-Based Posts
Connect emotionally with your audience:
- Personal journey narratives
- Behind-the-scenes glimpses
- Failure-to-success stories
- Day-in-the-life content

### Value Posts
Provide actionable insights:
- Tips and how-to guides
- Frameworks and methodologies
- Resource recommendations
- Case study highlights

### Engagement Posts
Drive conversations and interactions:
- Polls and questions
- Controversial (but professional) opinions
- Celebration posts (milestones, wins)
- Community shoutouts
          `
        },
        {
          id: 'posting-frequency',
          title: 'Posting Frequency & Schedule',
          content: `
## Posting Frequency & Schedule

### Recommended Frequency

**Standard Plan**: 3 posts per week
- Monday, Wednesday, Friday
- Optimal times based on your audience

**Growth Plan**: 5 posts per week  
- Monday through Friday
- Includes engagement prompts

**Premium Plan**: Daily posting + engagement
- 7 posts per week
- Comment engagement strategy

### Optimal Posting Times

Based on LinkedIn's algorithm and your audience location:
- **Morning**: 7:30 AM - 8:30 AM (local time)
- **Lunch**: 12:00 PM - 1:00 PM
- **Evening**: 5:00 PM - 6:00 PM

*We adjust based on your specific audience analytics.*

### Consistency Matters

LinkedIn's algorithm rewards consistent posting. We help you:
- Maintain regular posting schedule
- Build audience expectations
- Stay top-of-mind with connections
          `
        },
        {
          id: 'voice-guidelines',
          title: 'Brand Voice Guidelines',
          content: `
## Brand Voice Guidelines

### Understanding Your Voice DNA

During onboarding, we capture your unique voice through:

**Tone Spectrum**
- Professional ↔ Casual
- Formal ↔ Conversational
- Serious ↔ Humorous
- Reserved ↔ Bold

**Writing Style**
- Sentence length preferences
- Use of stories vs. data
- Emoji usage (none, minimal, frequent)
- Hashtag strategy

### Voice Consistency

Every post we create:
- Uses your specific vocabulary
- Reflects your value system
- Matches your expertise level
- Aligns with your professional image

### Providing Voice Examples

The best way to convey your voice:
- Share posts you've written before
- Link to articles you admire
- Describe how you speak in meetings
- List words/phrases you commonly use
          `
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics & Reporting',
      icon: TrendingUp,
      items: [
        {
          id: 'understanding-metrics',
          title: 'Understanding Your Metrics',
          content: `
## Understanding Your Metrics

### Key Performance Indicators

**Impressions**
Total number of times your content appeared in feeds. Higher impressions = greater reach.

**Engagement Rate**
(Likes + Comments + Shares) / Impressions × 100

Industry benchmarks:
- Good: 2-4%
- Great: 4-6%
- Exceptional: 6%+

**Profile Views**
Number of people who visited your profile after seeing your content.

**Follower Growth**
Net new followers gained per week/month.

**Connection Requests**
Inbound requests from potential leads and connections.

### What We Track

- Post-by-post performance
- Weekly trend analysis
- Month-over-month growth
- Top performing content themes
- Audience demographics shifts
          `
        },
        {
          id: 'weekly-reports',
          title: 'Weekly Reports',
          content: `
## Weekly Performance Reports

### What's Included

Every week, you'll receive:

**Performance Summary**
- Total impressions across all posts
- Average engagement rate
- Best performing post of the week
- Follower growth

**Content Analysis**
- Which topics resonated most
- Optimal posting times for your audience
- Engagement pattern insights

**Recommendations**
- Strategy adjustments based on data
- Topic suggestions for upcoming content
- Engagement tips

### Accessing Reports

Reports are delivered via:
- Email (PDF summary)
- Client Portal (detailed dashboard)
- Optional Slack/Teams integration
          `
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: Settings,
      items: [
        {
          id: 'common-issues',
          title: 'Common Issues',
          content: `
## Common Issues & Solutions

### Login Problems

**Can't sign in?**
1. Check if you're using the correct email
2. Try "Forgot Password" to reset
3. Clear browser cache and cookies
4. Try a different browser

**Social login not working?**
- Ensure pop-ups are enabled
- Try the direct email/password login
- Contact support if issues persist

### Portal Issues

**Content not loading?**
- Refresh the page
- Check your internet connection
- Clear browser cache
- Try incognito mode

**Can't approve content?**
- Ensure you're clicking the correct button
- Check if the content is still pending (not already approved)
- Try refreshing and approving again

### Email Notifications

**Not receiving emails?**
- Check spam/junk folder
- Add no-reply@steadypulseai.com to contacts
- Verify email address in settings
- Check notification preferences
          `
        },
        {
          id: 'faq',
          title: 'Frequently Asked Questions',
          content: `
## Frequently Asked Questions

**Q: How quickly do you deliver content after onboarding?**
A: Initial content is typically delivered within 2-3 business days after completing your onboarding forms.

**Q: Can I edit content directly or only request changes?**
A: You can request specific edits, and we'll revise accordingly. Direct editing ensures we maintain your voice consistency.

**Q: What happens if I don't approve content in time?**
A: Content remains in queue until approved. We'll send reminder emails, but your posting schedule may be affected.

**Q: Can I pause my subscription temporarily?**
A: Yes, contact support to pause for up to 30 days. Content can be queued for your return.

**Q: How do you access my LinkedIn to post?**
A: We don't need direct access. You'll receive ready-to-post content or can use our optional scheduling integration.

**Q: What if I'm not happy with the content quality?**
A: We offer unlimited revisions. If quality doesn't meet expectations, contact us for a strategy review.

**Q: Can I provide my own content ideas?**
A: Absolutely! Share topics, announcements, or specific ideas through the portal or email.
          `
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Book className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-400">Documentation</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            Everything you need to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              grow on LinkedIn
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Complete guides for using Steady Pulse AI to amplify your LinkedIn presence.
          </p>
        </div>
      </section>

      {/* Documentation Content */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Navigation */}
            <aside className="lg:w-72 shrink-0">
              <div className="lg:sticky lg:top-24 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <div key={section.id}>
                      <button
                        onClick={() => {
                          toggleItem(section.id);
                          setActiveSection(section.id);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                          activeSection === section.id 
                            ? 'bg-purple-500/20 text-purple-400' 
                            : 'hover:bg-white/5 text-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <section.icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{section.title}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${
                          expandedItems.includes(section.id) ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {expandedItems.includes(section.id) && (
                        <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
                          {section.items.map((item) => (
                            <a
                              key={item.id}
                              href={`#${item.id}`}
                              className="block py-2 px-3 text-sm text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                            >
                              {item.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {sections.map((section) => (
                <div key={section.id} className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-medium">{section.title}</h2>
                  </div>
                  
                  {section.items.map((item) => (
                    <article 
                      key={item.id} 
                      id={item.id}
                      className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-6"
                    >
                      <h3 className="text-xl font-medium mb-6 text-purple-400">{item.title}</h3>
                      <div className="prose prose-invert prose-purple max-w-none">
                        <div className="text-gray-300 leading-relaxed space-y-4 whitespace-pre-line">
                          {item.content.split('\n').map((line, i) => {
                            if (line.startsWith('## ')) {
                              return <h4 key={i} className="text-xl font-semibold text-white mt-6 mb-4">{line.replace('## ', '')}</h4>;
                            }
                            if (line.startsWith('### ')) {
                              return <h5 key={i} className="text-lg font-medium text-white mt-4 mb-2">{line.replace('### ', '')}</h5>;
                            }
                            if (line.startsWith('**') && line.endsWith('**')) {
                              return <p key={i} className="font-semibold text-white">{line.replace(/\*\*/g, '')}</p>;
                            }
                            if (line.startsWith('- ')) {
                              return <li key={i} className="ml-4 text-gray-400">{line.replace('- ', '')}</li>;
                            }
                            if (line.trim().match(/^\d+\./)) {
                              return <li key={i} className="ml-4 text-gray-400 list-decimal">{line.replace(/^\d+\.\s*/, '')}</li>;
                            }
                            if (line.startsWith('✅') || line.startsWith('❌') || line.startsWith('✏️')) {
                              return <p key={i} className="text-gray-400">{line}</p>;
                            }
                            if (line.startsWith('**Q:')) {
                              return <p key={i} className="font-semibold text-white mt-4">{line.replace(/\*\*/g, '')}</p>;
                            }
                            if (line.startsWith('A:')) {
                              return <p key={i} className="text-gray-400 mb-2">{line}</p>;
                            }
                            if (line.trim()) {
                              return <p key={i} className="text-gray-400">{line}</p>;
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </main>
          </div>
        </div>
      </section>

      {/* Help CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl p-8 border border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <MessageSquare className="w-8 h-8 text-purple-400" />
                <div>
                  <h3 className="text-lg font-medium">Still have questions?</h3>
                  <p className="text-gray-400">Our support team is here to help you succeed</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Link to="/help-center" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                  Help Center
                </Link>
                <Link to="/support" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuroraFooter />
    </div>
  );
}
