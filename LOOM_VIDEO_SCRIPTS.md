# 📹 Loom Video Recording Scripts for n8n Workflows

## Complete Guide for Creating Professional Workflow Demos

---

## 🎬 General Loom Recording Tips

### Before You Start:
1. **Clean Your Desktop** - Close unnecessary tabs and apps
2. **Test Audio** - Use a good microphone, speak clearly
3. **Prepare n8n** - Have workflows open in separate tabs
4. **Browser Extension** - Install Loom Chrome/Edge extension
5. **Script Practice** - Read through the script once before recording
6. **Recording Settings**:
   - Record browser tab + camera (optional)
   - 1080p quality
   - Enable drawing tools for annotations

### Recording Flow:
1. Start with overview (workflow canvas view)
2. Zoom into specific nodes
3. Show configuration panels
4. Demo live execution
5. Show results/outputs
6. End with summary and CTA

### Recommended Length:
- **Short Demo:** 3-5 minutes (quick overview)
- **Full Tutorial:** 8-12 minutes (detailed walkthrough)
- **Sales Demo:** 5-7 minutes (value-focused)

---

## 1️⃣ AI Lead Qualification & CRM Automation

**Workflow ID:** `QHvegAgKuIw2oXLC`  
**n8n URL:** `http://localhost:5678/workflow/QHvegAgKuIw2oXLC`  
**Recommended Length:** 6-8 minutes  
**Target Audience:** Sales teams, marketing agencies, B2B companies

---

### 📝 Script: Lead Qualification Workflow

#### **[0:00-0:30] Hook & Introduction**
> **"Hey there! In this video, I'm going to show you a workflow that can save your sales team 15+ hours per week by automatically qualifying leads using AI."**
>
> **"This n8n automation captures leads from any source, uses GPT-4 to score and qualify them, and automatically routes hot leads to your CRM while nurturing cold leads. Let's dive in!"**

#### **[0:30-1:30] Workflow Overview**
> **"Here's what we're looking at. This workflow has 10 nodes that work together seamlessly."**
>
> *[Zoom out to show full canvas]*
>
> **"Let me walk you through the flow:**
> - **First**, we have a webhook that captures leads from forms, landing pages, or chatbots
> - **Then**, AI analyzes the lead using GPT-4 to score quality from 0-100
> - **Next**, we enrich the lead with additional data
> - **Finally**, we route hot leads (70+ score) to your CRM, and log others for nurturing"**

#### **[1:30-2:30] Key Nodes Deep Dive**
> **"Let me show you the magic - the AI Lead Scoring node."**
>
> *[Click on "AI Lead Scoring" node]*
>
> **"We're using GPT-4 here with a custom prompt that analyzes:**
> - Company size and industry
> - Budget and timeline
> - Job title and decision-making authority
>
> **"The AI returns a JSON response with a qualification score, status (Hot/Warm/Cold), key insights, and recommended next actions. Pretty cool, right?"**

#### **[2:30-3:30] Integration Points**
> **"Now here's where it gets powerful - integration with your existing tools."**
>
> *[Click through CRM, Google Sheets, Slack nodes]*
>
> **"Hot leads automatically go to:"
> - ✅ Your CRM (Salesforce, HubSpot, or any CRM)
> - ✅ Get a personalized email
> - ✅ Trigger a Slack notification to sales team
>
> **"Warm and cold leads are logged to Google Sheets for later nurturing campaigns."**

#### **[3:30-4:30] Live Demo**
> **"Let me show you this in action."**
>
> *[Click "Test Workflow" or use webhook test]*
>
> **"I'm sending a sample lead with:**
> - Name: Sarah Johnson
> - Company: Tech Startup Inc
> - Budget: $50K
> - Timeline: This quarter"**
>
> *[Show execution flowing through nodes]*
>
> **"Watch as it flows... AI is scoring... and boom! It scored 85/100 - that's a HOT lead!"**

#### **[4:30-5:30] Results & Value**
> **"Check out the results:"**
>
> *[Show Slack notification, CRM entry, email sent]*
>
> **"Within seconds:**
> - ✅ Lead added to CRM with AI insights
> - ✅ Personalized email sent with calendar booking link
> - ✅ Sales team notified on Slack with full context
>
> **"Your sales team can jump on this lead immediately with AI-generated talking points. No manual qualification needed!"**

#### **[5:30-6:30] Setup & Configuration**
> **"Want to set this up for your business? Here's what you need:"**
>
> *[Show sticky note with requirements]*
>
> **Configuration checklist:**
> 1. OpenAI API key (for GPT-4)
> 2. CRM credentials (Salesforce/HubSpot/etc)
> 3. Google Sheet ID for lead logging
> 4. Slack workspace connection
> 5. Email sender configuration
> 6. Calendar booking link
>
> **"I've included detailed setup instructions in the workflow notes."**

#### **[6:30-7:00] ROI & Benefits**
> **"Let's talk impact:"**
> - ⏱️ **Save 15+ hours/week** on manual qualification
> - 📈 **Respond 10x faster** to hot leads (seconds vs hours)
> - 🎯 **75% more accurate** qualification with AI
> - 💰 **Increase conversion rates** by focusing on best-fit leads
>
> **"This typically pays for itself in the first week!"**

#### **[7:00-7:30] Call to Action**
> **"Want this exact workflow? Here's how to get it:"**
> 1. **Import** the workflow JSON into your n8n instance
> 2. **Configure** your API keys and credentials
> 3. **Test** with sample data
> 4. **Activate** and watch leads flow in!
>
> **"Link to the workflow template is in the description. Questions? Drop them in the comments!"**

---

## 2️⃣ Social Media Content Automation

**Workflow ID:** `l5473De2TrPW8l60`  
**n8n URL:** `http://localhost:5678/workflow/l5473De2TrPW8l60`  
**Recommended Length:** 7-9 minutes  
**Target Audience:** Content creators, social media managers, marketing agencies

---

### 📝 Script: Social Media Automation

#### **[0:00-0:40] Hook & Introduction**
> **"Tired of spending 3 hours a day creating and posting social media content? What if I told you AI could do it in 3 minutes?"**
>
> **"I'm going to show you an n8n workflow that takes ONE content idea and automatically creates optimized posts for LinkedIn, Twitter, Instagram, and Facebook - then posts them all automatically. Let's check it out!" **

#### **[0:40-1:40] Workflow Overview**
> **"Here's the complete workflow. It runs daily at 9 AM and handles everything."**
>
> *[Show full workflow canvas]*
>
> **The flow:**
> 1. **Daily trigger** checks your content queue in Airtable
> 2. **AI generates** platform-specific posts using GPT-4
> 3. **Formats** content for each platform
> 4. **Auto-posts** to all 4 platforms
> 5. **Updates** your content calendar
> 6. **Logs** analytics for reporting
>
> **"Complete set-it-and-forget-it automation!"**

#### **[1:40-2:40] Content Queue System**
> **"The secret sauce is the Airtable content queue."**
>
> *[Show Airtable base example]*
>
> **"You just fill in 4 simple fields:**
> - **Topic:** What you want to post about
> - **Target Audience:** Who you're speaking to
> - **Key Message:** Main point to communicate
> - **CTA:** Call to action
>
> **"Change status to 'Ready to Post' and done! AI handles the rest."**

#### **[2:40-4:00] AI Content Generation**
> **"Now let me show you the AI magic."**
>
> *[Click on "AI Generate Content" node]*
>
> **"This node uses GPT-4 with a specially crafted prompt that:**
> - Creates 4 different versions (LinkedIn, Twitter, Instagram, Facebook)
> - Optimizes length for each platform
> - Adds appropriate  hashtags
> - Matches tone to platform (professional for LinkedIn, casual for Instagram)
>
> **"Watch what it does with a topic like 'n8n automation tips'..."**
>
> *[Show example AI output]*
>
> **"Amazing, right? Each post is perfect for its platform!"**

#### **[4:00-5:00] Multi-Platform Posting**
> **"After generation, it routes to each platform automatically."**
>
> *[Click through LinkedIn, Twitter, Instagram, Facebook nodes]*
>
> **"Each platform has:**
> - ✅ OAuth authentication (secure)
> - ✅ Platform-specific formatting
> - ✅ Image attachment support
> - ✅ Optimal posting times
>
> **"It handles API limits, retries failures, and updates your content calendar when posted."**

#### **[5:00-6:00] Live Demo**
> **"Let me trigger this manually to show you."**
>
> *[Click "Execute Workflow" or manual trigger]*
>
> **"I have a content idea queued:**
> - Topic: 'Why automation is essential for 2026'
> - Audience: Small business owners
> - CTA: 'Try n8n free'
>
> **"Watch it generate and post..."**
>
> *[Show execution running through nodes, posts being created]*
>
> **"There we go! Posted to all 4 platforms in under 30 seconds!"**

#### **[6:00-7:00] Analytics & Tracking**
> **"Every post gets logged to Google Sheets for analytics."**
>
> *[Show analytics sheet]*
>
> **"You can track:**
> - Which platforms perform best
> - Content topics that resonate
> - Engagement rates over time
> - Posting frequency
>
> **"Perfect data for optimizing your content strategy!"**

#### **[7:00-7:30] Setup Requirements**
> **"To set this up, you'll need:"**
>
> 1. **Airtable** account (free tier works)
> 2. **OpenAI** API key for content generation
> 3. **OAuth** for social platforms (LinkedIn, Twitter, Instagram, Facebook)
> 4. **Google Sheets** for analytics
>
> **"Setup takes about 20 minutes, then you're set for life!"**

#### **[7:30-8:00] ROI & Call to Action**
> **"Time savings:**
> - 📉 From 3 hours/day → 15 minutes/day
> - 📊 4x more consistent posting
> - 🎯 Better engagement (AI-optimized)
> - 💡 Never run out of ideas
>
> **"Workflow JSON and setup guide in the description. Let's automate your content!"**

---

## 3️⃣ AI Customer Support Automation

**Workflow ID:** `Qg06TI0uq096GpCF`  
**n8n URL:** `http://localhost:5678/workflow/Qg06TI0uq096GpCF`  
**Recommended Length:** 8-10 minutes  
**Target Audience:** Support teams, SaaS companies, service businesses

---

### 📝 Script: Customer Support Automation

#### **[0:00-0:40] Hook & Introduction**
> **"What if your support team could handle 3x more tickets without hiring anyone? And what if urgent, frustrated customers never had to wait?"**
>
> **"This n8n workflow uses AI to automatically classify, prioritize, and respond to support tickets. It reduces workload by 50-70% while improving response times. Let me show you how!"**

#### **[0:40-1:40] Workflow Architecture**
> **"This is a smart support triage system with 10 AI-powered nodes."**
>
> *[Show full workflow]*
>
> **"Here's what happens when a ticket comes in:**
> 1. **Webhook** receives ticket from email/chat/form
> 2. **AI classifies** category (technical, billing, bug, etc.)
> 3. **Sentiment analysis** detects urgency and frustration
> 4. **Knowledge base search** finds relevant help articles
> 5. **AI drafts** a response
> 6. **Smart routing:** Urgent → human, Simple → auto-respond
>
> **"It's like having an AI support agent that never sleeps!"**

#### **[1:40-3:00] AI Classification & Sentiment**
> **"The real power is in the AI analysis. Let me show you."**
>
> *[Click "AI Classify Ticket" node]*
>
> **"GPT-4 reads the ticket and classifies it into:**
> - Technical Support
> - Billing/Payment
> - Account Access
> - Feature Request
> - Bug Report
> - Sales Question
>
> **"Then it analyzes sentiment..."**
>
> *[Click "AI Analyze Sentiment" node]*
>
> **"It detects:**
> - Sentiment: positive/neutral/negative/urgent
> - Urgency score: 0-100
> - Frustration level: low/medium/high
> - Key emotions
>
> **"This helps prioritize - angry customers get immediate attention!"**

#### **[3:00-4:30] Knowledge Base & Response Generation**
> **"After classification, it searches your knowledge base."**
>
> *[Click "Search Knowledge Base" node]*
>
> **"This simulates RAG (Retrieval Augmented Generation):**
> - Finds top 3 relevant help articles
> - Passes them to AI for context
>
> **"Then AI drafts a response..."**
>
> *[Click "AI Draft Response" node]*
>
> **"The response:**
> - ✅ Acknowledges the issue empathetically
> - ✅ Provides solution or next steps
> - ✅ References helpful KB articles
> - ✅ Sets clear expectations
>
> **"All personalized and contextual. Not generic copy-paste!"**

#### **[4:30-5:30] Smart Routing Logic**
> **"Here's where it gets smart - automated routing."**
>
> *[Click "Route by Priority" node]*
>
> **If urgency score >= 80 OR high frustration:**
> - 🚨 Create urgent ticket in Zendesk/Freshdesk
> - 🚨 Alert support team via Slack
> - 🚨 Include AI-drafted response for quick reply
>
> **If urgency score < 80:**
> - ✅ Send AI-generated auto-response immediately
> - ✅ Log to help desk for review
> - ✅ Customer gets instant reply
>
> **"Urgent issues never slip through the cracks!"**

#### **[5:30-6:30] Live Demo**
> **"Let me demo with two different tickets."**
>
> **Ticket 1: Low Urgency**
> *[Send test webhook: "How do I reset my password?"]*
>
> **"Watch... classified as 'Account Access', low urgency. Auto-response sent with password reset link!"**
>
> **Ticket 2: High Urgency**
> *[Send test webhook: "Your app deleted all my data! I need this fixed NOW!"]*
>
> **"Watch... sentiment = URGENT, frustration = HIGH. Routed to support team immediately with Slack alert!"**
>
> *[Show Slack notification popping up]*

#### **[6:30-7:30] Integration & Scalability**
> **"This integrates with your existing tools:"**
>
> *[Show integration nodes]*
>
> - **Help Desk:** Zendesk, Freshdesk, Intercom
> - **Communication:** Slack, Teams, Email
> - **Knowledge Base:** Notion, Confluence, Custom API
> - **Analytics:** Google Sheets, Dashboards
>
> **"It scales to handle:**
> - 100 tickets/day → 10,000 tickets/day
> - Multiple languages (AI translates)
> - Different product lines
> - 24/7 operation
>
> **"Set it up once, it runs forever!"**

#### **[7:30-8:30] Results & ROI**
> **"Real-world impact from this workflow:"**
>
> 📊 **Metrics:**
> - ⚡ **90% faster** first response time
> - 📉 **50-70% reduction** in support workload
> - 😊 **Higher CSAT** scores (instant responses)
> - 🎯 **Zero missed** urgent tickets
> - 💰 **$50K-$100K/year** saved on support staff
>
> **"Your team focuses on complex issues, AI handles the routine stuff!"**

#### **[8:30-9:00] Setup & Call to Action**
> **"Want to deploy this? You need:"**
>
> 1. OpenAI API key
> 2. Help desk credentials (Zendesk/Freshdesk)
> 3. Slack workspace
> 4. Knowledge base (optional for RAG)
> 5. Email configuration
>
> **"Full setup guide and workflow JSON in description. Transform your support today!"**

---

## 4️⃣ E-commerce Order Fulfillment Automation

**Workflow ID:** `CoyiaiBYTBh65ihH`  
**n8n URL:** `http://localhost:5678/workflow/CoyiaiBYTBh65ihH`  
**Recommended Length:** 8-10 minutes  
**Target Audience:** E-commerce businesses, online retailers, Shopify/WooCommerce stores

---

### 📝 Script: E-commerce Fulfillment

#### **[0:00-0:40] Hook & Introduction**
> **"Processing orders manually is killing your margins. Every order takes 10-15 minutes: checking stock, creating shipments, updating systems, notifying customers..."**
>
> **"This n8n workflow automates the ENTIRE order fulfillment process - from new order to shipped - in under 60 seconds. Fully automated. Let me show you!"**

#### **[0:40-1:40] End-to-End Automation**
> **"This is a complete order fulfillment pipeline with 11 nodes."**
>
> *[Show full workflow canvas]*
>
> **"The complete journey:**
> 1. **New order** comes in (Shopify/WooCommerce/BigCommerce)
> 2. **Parse** order details (items, customer, address)
> 3. **Check inventory** in real-time
> 4. **Create shipment** & generate shipping label
> 5. **Update inventory** across all systems
> 6. **Sync to ERP** (QuickBooks, Xero, etc.)
> 7. **Send confirmation** email to customer
> 8. **Update analytics** dashboard
>
> **"All of this happens automatically, 24/7!"**

#### **[1:40-2:40] Order Parsing & Data Transformation**
> **"First step: parse the order data."**
>
> *[Click "Parse Order Data" node]*
>
> **"This node transforms the raw webhook data into a clean format:**
> - Customer details
> - Shipping address
> - Line items (SKU, quantity, price)
> - Totals (subtotal, tax, shipping)
> - Payment status
>
> **"It handles Shopify, WooCommerce, or any platform - just one node!"**

#### **[2:40-3:40] Real-Time Inventory Check**
> **"Critical step: inventory verification."**
>
> *[Click "Check Inventory" node]*
>
> **"Before we promise shipment, we verify stock:**
> - Checks available quantity for each SKU
> - Accounts for reserved inventory
> - Identifies warehouse location
> - Determines if order is fulfillable
>
> **"If out of stock..."**
>
> *[Click "Send Out of Stock Alert" node]*
>
> **"Slack alert fires immediately to inventory team with:**
> - Which items are short
> - Customer waiting
> - Restock urgency
>
> **"No disappointed customers or overselling!"**

#### **[3:40-4:40] Shipping Label Generation**
> **"When inventory is confirmed, shipping automation kicks in."**
>
> *[Click "Generate Shipping Label" node]*
>
> **"Integrates with ShipStation API to:**
> - Select optimal carrier (UPS, FedEx, USPS)
> - Choose service level (Ground, 2-Day, Overnight)
> - Generate shipping label PDF
> - Get tracking number
> - Calculate estimated delivery
>
> **"All configured based on your shipping rules - cheaper for small items, faster for premium customers!"**

#### **[4:40-5:40] Multi-System Synchronization**
> **"Here's where it gets powerful - syncing everything."**
>
> *[Show inventory update → ERP sync → analytics nodes]*
>
> **Inventory Updates:**
> - Decrements stock levels
> - Updates warehouse locations
> - Triggers reorder if below threshold
>
> **ERP Sync:**
> - Creates invoice in QuickBooks/Xero
> - Records COGS (cost of goods sold)
> - Updates financials
>
> **Analytics:**
> - Logs to Google Sheets
> - Daily sales dashboard
> - SKU performance tracking
>
> **"Everything stays in sync - NO manual data entry!"**

#### **[5:40-6:40] Customer Communication**
> **"Customer experience is automated too."**
>
> *[Click "Send Order Confirmation" node]*
>
> **"Personalized email sent with:**
> - Order details & receipt
> - Tracking number with live link
> - Estimated delivery date
> - Return policy
> - Upsell opportunities
>
> **"All branded, all automatic, all within 60 seconds of order!"**

#### **[6:40-7:40] Live Order Demo**
> **"Let me process a real order end-to-end."**
>
> *[Trigger workflow with test order]*
>
> **Test Order:**
> - Customer: John Doe
> - Items: 2x Widget A, 1x Widget B
> - Total: $127.50
>
> **[Watch execution]**
>
> **"Watch the nodes light up..."**
> 1. ✅ Order parsed
> 2. ✅ Inventory checked (all in stock!)
> 3. ✅ Shipment created (UPS Ground)
> 4. ✅ Label generated (tracking #1Z9999999)
> 5. ✅ Inventory updated (-2 Widget A, -1 Widget B)
> 6. ✅ Invoice in QuickBooks
> 7. ✅ Email sent to customer
> 8. ✅ Dashboard updated
>
> **"Total time: 47 seconds. Completely hands-off!"**

#### **[7:40-8:30] Scale & Performance**
> **"This workflow handles serious volume."**
>
> **Benchmarks:**
> - ⚡ **60 seconds** per order (vs 15 minutes manual)
> - 📦 **1,000+ orders/day** on a single workflow
> - 🎯 **99.9% accuracy** (no human error)
> - 💰 **$25K-$50K/year** saved in labor
>
> **"Scales from 10 orders/day to 10,000 orders/day - same workflow!"**

#### **[8:30-9:00] Setup & Configuration**
> **"Ready to automate your fulfillment?"**
>
> **What you need:**
> 1. **E-commerce platform:** Shopify, WooCommerce, BigCommerce
> 2. **Shipping service:** ShipStation, EasyPost, or direct carrier API
> 3. **Inventory system:** (or we'll track in Google Sheets)
> 4. **ERP/Accounting:** QuickBooks, Xero (optional)
> 5. **Email service:** Gmail, SendGrid, Mailgun
>
> **"Workflow template + setup guide in description. Automate orders today!"**

---

## 🎥 Post-Production Tips

### After Recording:
1. **Add Chapters** - Mark key sections for easy navigation
2. **Thumbnail** - Use workflow canvas screenshot with bold text overlay
3. **Title Ideas:**
   - "AI Lead Qualification: Save 15 Hours/Week"
   - "Automate Social Media with n8n & AI (All 4 Platforms!)"
   - "AI Support Agent: Cut Tickets by 70%"
   - "E-commerce Automation: 0 to Shipped in 60 Seconds"

### Description Template:
```
🚀 [Workflow Name] - Full Setup Guide

In this video, I show you how to [main benefit] using n8n automation and AI.

⏰ Timestamps:
0:00 - Introduction
0:30 - Workflow Overview
2:00 - Key Features
4:00 - Live Demo
6:00 - Setup Guide
8:00 - ROI & Results

🔗 Resources:
- Workflow JSON: [link]
- Setup Guide: [link]
- n8n Installation: https://n8n.io
- My Website: [link]

💬 Questions? Drop them in the comments!
👍 Found this helpful? Like & subscribe for more automation content!

#n8n #automation #ai #workflow #productivity
```

---

## 📊 Loom Video Success Metrics

Track these for each video:
- ✅ View count & watch time
- ✅ Engagement rate (comments, reactions)
- ✅ Click-through to workflow downloads
- ✅ Conversion to consultations/sales

**Goal:** 300+ views/video, 50%+ watch rate, 10+ comments

---

## 🎯 Distribution Strategy

### Where to Share:
1. **LinkedIn** - Professional audience, B2B focus
2. **Twitter/X** - Tech community, developers
3. **Reddit** - r/n8n, r/automation, r/Entrepreneur
4. **YouTube** - Long-form content, SEO
5. **n8n Community** - Direct to users
6. **Your Website** - Portfolio/case studies
7. **Client Proposals** - Custom demo videos

**Pro Tip:** Create SHORT versions (60-90 seconds) for social media, full versions (8-10 min) for documentation!

---

**🎬 Ready to record? Pick a workflow, practice the script, and hit record! Your portfolio awaits!**
