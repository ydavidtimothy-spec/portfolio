document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // THEME TOGGLE FUNCTIONALITY
    // ========================================
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;

    // Get saved theme from localStorage or default to 'dark'
    const getSavedTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        // Default to dark theme (as requested)
        return 'dark';
    };

    // Apply theme to document
    // Apply theme to document
    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update Calendly Widget Theme (Dynamic)
        const calendlyContainer = document.getElementById('calendly-embed-container');
        if (calendlyContainer) {
            const baseUrl = "https://calendly.com/ydavidtimothy/30min";
            const commonParams = "hide_landing_page_details=1&hide_gdpr_banner=1";
            let themeParams = "";

            if (theme === 'dark') {
                // Dark Mode: Slate-900 bg, Slate-200 text, Sky-400 primary
                themeParams = "&background_color=0f172a&text_color=e2e8f0&primary_color=38bdf8";
            } else {
                // Light Mode: Slate-50 bg, Slate-800 text, Sky-600 primary
                themeParams = "&background_color=f8fafc&text_color=1e293b&primary_color=0284c7";
            }

            const fullUrl = `${baseUrl}?${commonParams}${themeParams}`;

            // Check if widget is already loaded (iframe) or still waiting (div)
            const iframe = calendlyContainer.querySelector('iframe');
            if (iframe) {
                if (iframe.src !== fullUrl) {
                    iframe.src = fullUrl;
                }
            } else {
                calendlyContainer.setAttribute('data-url', fullUrl);
            }
        }
    };

    // Initialize theme on page load
    const initTheme = () => {
        const savedTheme = getSavedTheme();
        applyTheme(savedTheme);
    };

    // Toggle between light and dark
    const toggleTheme = () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    };

    // Initialize theme immediately
    initTheme();

    // Add click event to theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // ========================================
    // Loading Screen with Typewriter Effect
    // ========================================
    const loaderScreen = document.querySelector('.loader-screen');
    const typewriter = document.querySelector('.typewriter');

    if (loaderScreen && typewriter) {
        const brandName = 'david.yoro';
        const accentStart = 5; // Index where ".yoro" starts
        let charIndex = 0;

        const typeInterval = setInterval(() => {
            if (charIndex < brandName.length) {
                const char = brandName[charIndex];
                if (charIndex >= accentStart) {
                    // Add accent color for ".yoro"
                    if (charIndex === accentStart) {
                        typewriter.innerHTML += '<span class="accent">';
                    }
                    typewriter.innerHTML += char;
                    if (charIndex === brandName.length - 1) {
                        typewriter.innerHTML += '</span>';
                    }
                } else {
                    typewriter.innerHTML += char;
                }
                charIndex++;
            } else {
                clearInterval(typeInterval);
                // Hide cursor after typing completes
                const cursor = document.querySelector('.cursor');
                if (cursor) cursor.style.display = 'none';

                // Fade out loader after a brief pause
                setTimeout(() => {
                    loaderScreen.classList.add('hidden');
                }, 600);
            }
        }, 120); // Typing speed: 120ms per character
    }

    // Scroll Animations using Intersection Observer with Staggering
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        // Group entries by parent to handle staggering
        const parentGroups = new Map();

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                if (!parentGroups.has(parent)) {
                    parentGroups.set(parent, []);
                }
                parentGroups.get(parent).push(entry.target);
                observer.unobserve(entry.target);
            }
        });

        // Apply animations with delay for each group
        parentGroups.forEach((targets) => {
            // Sort targets by DOM order to ensure sequential animation
            targets.sort((a, b) => {
                return Array.from(a.parentElement.children).indexOf(a) - Array.from(b.parentElement.children).indexOf(b);
            });

            targets.forEach((target, index) => {
                setTimeout(() => {
                    target.classList.add('visible');
                }, index * 100); // 100ms stagger delay
            });
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('nav-active');

            // Hamburger animation transform
            const spans = menuToggle.querySelectorAll('span');
            if (nav.classList.contains('nav-active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.transform = 'rotate(-45deg) translate(5px, -6px)';
                spans[1].style.width = '24px'; // Ensure same width
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            }
        });
    }

    // Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    function filterProjects(category) {
        projectCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.classList.add('hidden');
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
    }

    // Initialize with active filter (n8n by default)
    const activeBtn = document.querySelector('.filter-btn.active');
    if (activeBtn) {
        filterProjects(activeBtn.getAttribute('data-filter'));
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            filterProjects(filterValue);
        });
    });

    // Smooth scroll for anchor links (handling offsetting for fixed header)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            nav.classList.remove('nav-active'); // Close mobile menu on click

            // Reset hamburger if closing
            if (menuToggle) {
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Rotating Words Animation
    const rotatingWords = document.querySelector('.rotating-words');
    if (rotatingWords) {
        const words = rotatingWords.querySelectorAll('.word');
        let currentIndex = 0;

        setInterval(() => {
            words[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % words.length;
            words[currentIndex].classList.add('active');
        }, 3000); // Change word every 3 seconds
    }

    // Cursor Glow Effect
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });

        // Show glow on interactive elements
        const interactiveElements = document.querySelectorAll('.card, .project-card, .btn-cta, .contact-pill');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorGlow.classList.add('active'));
            el.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));
        });
    }

    // Magnetic Button Effect
    const magneticButtons = document.querySelectorAll('.btn-cta, .btn-primary');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // Scroll Progress Bar
    const scrollProgress = document.querySelector('.scroll-progress');

    // Parallax Effect on Hero Background
    const heroSection = document.querySelector('.hero');

    // Floating CTA Button - Show after scrolling past hero
    const floatingCta = null; // Removed

    // Consolidated Scroll Listener with RequestAnimationFrame
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;

                // 1. Scroll Progress
                if (scrollProgress) {
                    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const scrollPercent = (scrollTop => scrollTop / docHeight * 100)(scrollY); // Calc inside
                    scrollProgress.style.width = scrollPercent + '%';
                }

                // 2. Parallax Hero
                if (heroSection) {
                    heroSection.style.backgroundPositionY = scrollY * 0.3 + 'px';
                }

                // 3. Floating CTA Removed

                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });

    // Exit Intent Popup
    const exitPopup = document.getElementById('exitPopup');
    const exitClose = document.querySelector('.exit-popup-close');
    let hasShownPopup = false;

    if (exitPopup) {
        // Show on mouse leaving viewport (desktop only)
        document.addEventListener('mouseout', (e) => {
            if (!hasShownPopup && e.clientY < 10 && !e.relatedTarget) {
                exitPopup.classList.add('active');
                hasShownPopup = true;
            }
        });

        // Close button
        if (exitClose) {
            exitClose.addEventListener('click', () => {
                exitPopup.classList.remove('active');
            });
        }

        // Close on backdrop click
        exitPopup.addEventListener('click', (e) => {
            if (e.target === exitPopup) {
                exitPopup.classList.remove('active');
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                exitPopup.classList.remove('active');
            }
        });
    }

    // ========================================
    // EXIT INTENT FORM - GHL WEBHOOK INTEGRATION
    // ========================================
    // IMPORTANT: Replace the URL below with your GoHighLevel webhook URL
    const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/EAtoIMKLPmk5lNFYiA3n/webhook-trigger/5259cc05-45a2-4cf3-b8bc-5ca8c5554f5c'; // <-- LINE 294: PUT YOUR GHL WEBHOOK HERE

    const exitForm = document.getElementById('exitForm');
    const exitEmailInput = document.getElementById('exitEmail');

    if (exitForm && exitEmailInput) {
        exitForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = exitEmailInput.value.trim();
            if (!email) return;

            // Disable form while submitting
            const submitBtn = exitForm.querySelector('.exit-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                // Send to GHL Webhook
                await fetch(GHL_WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        source: 'Portfolio Exit Intent',
                        lead_magnet: 'Automation Checklist',
                        timestamp: new Date().toISOString()
                    })
                });

                // Success - show thank you message
                exitForm.innerHTML = '<p style="color: #38bdf8; font-weight: 600;">✓ Check your email for the checklist!</p>';

                // Close popup after 2 seconds
                setTimeout(() => {
                    exitPopup.classList.remove('active');
                }, 2000);

            } catch (error) {
                console.error('Webhook error:', error);
                submitBtn.textContent = 'Error - Try Again';
                submitBtn.disabled = false;

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                }, 2000);
            }
        });
    }

    // ========================================
    // MOBILE CALENDLY DRAWER LOGIC
    // ========================================
    const mobileBookBtn = document.getElementById('mobile-book-btn');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const calendlyDrawer = document.getElementById('calendlyDrawer');
    const drawerCloseBtn = document.querySelector('.drawer-close');
    const drawerContent = document.getElementById('drawerContent');
    const calendlyWidget = document.getElementById('calendly-embed-container');
    const drawerHandle = document.querySelector('.drawer-handle-bar');

    // Track original parent to move it back if needed
    let originalWidgetParent = calendlyWidget ? calendlyWidget.parentElement : null;

    function openDrawer() {
        if (!calendlyDrawer || !calendlyWidget) return;

        // Move widget to drawer
        drawerContent.appendChild(calendlyWidget);

        // Show drawer
        drawerOverlay.classList.add('active');
        calendlyDrawer.classList.add('active');
        document.body.classList.add('drawer-open');
    }

    function closeDrawer() {
        if (!calendlyDrawer) return;

        // Hide drawer
        drawerOverlay.classList.remove('active');
        calendlyDrawer.classList.remove('active');
        document.body.classList.remove('drawer-open');

        // Move widget back after animation (timeout matching CSS transition)
        setTimeout(() => {
            if (originalWidgetParent && calendlyWidget) {
                originalWidgetParent.appendChild(calendlyWidget);
            }
        }, 500);
    }

    if (mobileBookBtn) {
        mobileBookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openDrawer();
        });
    }

    if (drawerCloseBtn) {
        drawerCloseBtn.addEventListener('click', closeDrawer);
    }

    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', closeDrawer);
    }

    // Drag to close logic (Simple version)
    let startY = 0;
    let currentY = 0;

    if (drawerHandle && calendlyDrawer) {
        drawerHandle.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        }, { passive: true });

        drawerHandle.addEventListener('touchmove', (e) => {
            currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            if (diff > 0) {
                // Dragging down - visuals
                calendlyDrawer.style.transform = `translateY(${diff}px)`;
            }
        }, { passive: true });

        drawerHandle.addEventListener('touchend', (e) => {
            const diff = currentY - startY;
            // If dragged down more than 100px, close
            if (diff > 100) {
                calendlyDrawer.style.transform = ''; // Reset inline style
                closeDrawer();
            } else {
                // Bounce back
                calendlyDrawer.style.transform = '';
            }
            startY = 0;
            currentY = 0;
        });
    }

    // Handle Resize - Close drawer if resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 640 && calendlyDrawer && calendlyDrawer.classList.contains('active')) {
            closeDrawer();
        }
    });

    // ========================================
    // PROJECT IMAGE LIGHTBOX
    // ========================================
    const lightbox = document.getElementById('projectLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxCloseBtn = document.querySelector('.lightbox-close');
    const lightboxOverlay = document.querySelector('.lightbox-overlay');

    function openLightbox(card) {
        const img = card.querySelector('.project-image img');
        const title = card.querySelector('.project-info h3');
        const psrBlocks = card.querySelectorAll('.psr-block');

        if (!img || !lightbox) return;

        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxTitle.textContent = title ? title.textContent : '';

        // Clone PSR blocks into lightbox description
        lightboxDescription.innerHTML = '';
        psrBlocks.forEach(block => {
            lightboxDescription.appendChild(block.cloneNode(true));
        });

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Attach click to all project images
    document.querySelectorAll('.project-card .project-image').forEach(imgWrapper => {
        imgWrapper.addEventListener('click', () => {
            const card = imgWrapper.closest('.project-card');
            if (card) openLightbox(card);
        });
    });

    // Close handlers
    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ========================================
    // INTERACTIVE ARCHITECTURE INSPECTOR
    // ========================================
    const archNodeData = {
        firecrawl: {
            title: "Firecrawl Webhook Scraper",
            layer: "INGESTION LAYER",
            latency: "120ms avg",
            protocol: "REST / HTTPS Webhook",
            desc: "Extracts LLM-ready markdown from prospect websites and directories, stripping DOM bloat and headers automatically.",
            payload: JSON.stringify({
                source: "firecrawl.dev/v1/crawl",
                status: "success",
                data: {
                    domain: "targetcompany.com",
                    technologies: ["Shopify Plus", "Klaviyo", "Gorgias"],
                    decisionMakers: [{ title: "Head of Operations", linkedin: "verified" }]
                }
            }, null, 2)
        },
        jotform: {
            title: "JotForm Instant Webhook",
            layer: "INGESTION LAYER",
            latency: "45ms avg",
            protocol: "JSON Postback",
            desc: "Zero-latency form capture triggering downstream multi-channel workflows within milliseconds of user submission.",
            payload: JSON.stringify({
                event: "submission.created",
                form_id: "lead_inquiry_b2b",
                raw_answers: { full_name: "Marcus Vance", budget: "$15,000", urgency: "Immediate" }
            }, null, 2)
        },
        vision: {
            title: "Multimodal Vision OCR",
            layer: "INGESTION LAYER",
            latency: "850ms avg",
            protocol: "OpenAI GPT-4o Vision API",
            desc: "Parses email attachments, scanned invoices, bills of lading, and PDF documentation into structured tabular data.",
            payload: JSON.stringify({
                document: "invoice_scan_0492.pdf",
                confidence: 0.984,
                parsed_table: { invoice_id: "INV-9921", subtotal: 14250.00, currency: "USD" }
            }, null, 2)
        },
        n8n: {
            title: "n8n Workflow Engine (Self-Hosted)",
            layer: "ORCHESTRATION LAYER",
            latency: "18ms internal bus",
            protocol: "Docker Container / Microservice",
            desc: "Primary deterministic state machine coordinating routing arrays, error-catching routines, and multi-agent coordination.",
            payload: JSON.stringify({
                workflow: "autonomous_lead_orchestrator_v3",
                execution_id: 81923,
                active_branches: ["enrich_apollo", "score_icp", "trigger_voice_call"]
            }, null, 2)
        },
        make: {
            title: "Make.com Failover Router",
            layer: "ORCHESTRATION LAYER",
            latency: "60ms avg",
            protocol: "API Webhook Scenarios",
            desc: "High-volume transactional scenarios with native fallback retry queues (DLQ) and instant status callbacks.",
            payload: JSON.stringify({
                scenario_id: 104928,
                trigger: "webhook.catch",
                fallback_active: false,
                operations_logged: 1
            }, null, 2)
        },
        telnyx: {
            title: "Telnyx AI Telephony Agent",
            layer: "AGENT SWARM",
            latency: "740ms round-trip",
            protocol: "WebSocket / Telnyx SIP Trunk",
            desc: "Sub-second voice engine handling inbound calls and outbound outreach with 34+ dynamic objection responses and warm live transfer.",
            payload: JSON.stringify({
                call_id: "call_tx_8302",
                agent_state: "in_call",
                detected_objection: "already_have_vendor",
                live_action: "execute_pivot_and_offer_audit"
            }, null, 2)
        },
        llm: {
            title: "Tiered LLM Inference Engine",
            layer: "AGENT SWARM",
            latency: "450ms - 1.2s",
            protocol: "OpenAI / Claude / Gemini APIs",
            desc: "Context-aware inference routing structured classification, semantic qualification, and automated email drafting.",
            payload: JSON.stringify({
                model: "gpt-4o-mini",
                intent: "high_urgency_inquiry",
                qualification_score: 92,
                auto_reply_ready: true
            }, null, 2)
        },
        apollo: {
            title: "Apollo.io Lead Enrichment",
            layer: "AGENT SWARM",
            latency: "310ms avg",
            protocol: "REST API v2",
            desc: "Instant prospect enrichment matching verified corporate emails, direct dials, company headcount, and revenue tiers.",
            payload: JSON.stringify({
                company: "Acme Logistics LLC",
                headcount: 140,
                verified_phone: "+1 (555) 302-8491",
                decision_maker: "Chief Revenue Officer"
            }, null, 2)
        },
        ghl: {
            title: "GoHighLevel (GHL) CRM",
            layer: "PERSISTENCE & CRM",
            latency: "110ms API sync",
            protocol: "GHL OAuth2 v2 API",
            desc: "Core pipeline management, conversation audit trail, automated SMS cadences, and sales calendar scheduling.",
            payload: JSON.stringify({
                contact_id: "ghl_cnt_9941",
                pipeline_stage: "Discovery Call Scheduled",
                tags: ["qualified_b2b", "voice_agent_booked"],
                sms_reminder_queued: true
            }, null, 2)
        },
        supabase: {
            title: "Supabase Relational Cache & Audit",
            layer: "PERSISTENCE & CRM",
            latency: "14ms query speed",
            protocol: "PostgreSQL with RLS",
            desc: "Persistent transaction history, idempotency logging to prevent duplicate calls, and deep analytics data warehouse.",
            payload: JSON.stringify({
                table: "pipeline_audit_logs",
                action: "call_completed_transferred",
                idempotency_key: "idem_904812",
                recorded_at: "2025-03-01T14:22:09Z"
            }, null, 2)
        }
    };

    window.selectArchNode = function(key) {
        document.querySelectorAll('.arch-card').forEach(c => c.classList.remove('active'));
        const selectedCard = document.querySelector(`.arch-card[data-node="${key}"]`);
        if (selectedCard) selectedCard.classList.add('active');

        const data = archNodeData[key];
        if (!data) return;

        const titleEl = document.getElementById('inspectorTitle');
        const layerEl = document.getElementById('inspectorLayer');
        const latencyEl = document.getElementById('inspectorLatency');
        const protocolEl = document.getElementById('inspectorProtocol');
        const descEl = document.getElementById('inspectorDesc');
        const payloadEl = document.getElementById('inspectorPayload');

        if (titleEl) titleEl.textContent = data.title;
        if (layerEl) layerEl.textContent = data.layer;
        if (latencyEl) latencyEl.textContent = data.latency;
        if (protocolEl) protocolEl.textContent = data.protocol;
        if (descEl) descEl.textContent = data.desc;
        if (payloadEl) payloadEl.textContent = data.payload;
    };

    // ========================================
    // VOICE AGENT OBJECTION SIMULATOR
    // ========================================
    const objectionScenarios = {
        vendor: {
            prospect: '"We already have an existing vendor handling this and we are totally locked into our contract."',
            agent: '"Totally understand! Many of our current clients said the same when we first connected. We don\'t ask anyone to break contracts — we simply run a zero-friction 15-minute diagnostic to benchmark your current speed-to-lead and catch leaks. Would you be open to seeing the side-by-side numbers?"',
            action: 'CALENDAR_CHECK_AVAILABILITY &bull; Trigger GHL Stage: "Benchmark Offered"'
        },
        email: {
            prospect: '"Can you just send me an email with all the details and pricing so I can review it later?"',
            agent: '"I can certainly do that! To make sure I send the exact architecture and pricing tier tailored to your lead volume, are you processing closer to 50 leads a month, or over 500 right now?"',
            action: 'DYNAMIC_LEAD_ENRICHMENT &bull; Update CRM Custom Field: "monthly_lead_volume"'
        },
        time: {
            prospect: '"I\'m in the middle of a meeting right now, I really do not have time for this."',
            agent: '"Completely respect your time! I\'ll let you go right away. I can shoot you a quick calendar link via SMS right now so you can pick a 10-minute window when you\'re free. Does that work?"',
            action: 'DISPATCH_SMS_CALENDAR_LINK &bull; Trigger Voicemail/SMS Sequence'
        },
        skeptic: {
            prospect: '"Wait... are you an AI robot or an actual human person?"',
            agent: '"Haha, great ear! I am actually an AI voice assistant custom-engineered for this business. I\'m designed so prospects don\'t have to wait hours for answers. Can I share a 30-second summary of how this system cuts response times under 25 seconds?"',
            action: 'DISCLOSE_AI_PERSONA &bull; Log Sentiment: "Impressed Skeptic"'
        }
    };

    window.switchObjection = function(key) {
        document.querySelectorAll('.objection-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`.objection-btn[onclick*="'${key}'"]`);
        if (activeBtn) activeBtn.classList.add('active');

        const d = objectionScenarios[key];
        if (!d) return;

        const prospectEl = document.getElementById('prospectSpeech');
        const agentEl = document.getElementById('agentSpeech');
        const actionEl = document.getElementById('agentAction');

        if (prospectEl) prospectEl.textContent = d.prospect;
        if (agentEl) agentEl.textContent = d.agent;
        if (actionEl) {
            actionEl.innerHTML = `<span class="action-badge">AUTOMATED FUNCTION CALL</span><code>${d.action}</code>`;
        }
    };

    // ========================================
    // COMMANDCODE CLI TERMINAL WIDGET
    // ========================================
    const terminalOut = document.getElementById('inlineTerminalOutput');
    const terminalIn = document.getElementById('inlineTerminalInput');

    const cliResponses = {
        help: `<p style="color:#d29922;">Available commands: <strong>projects</strong>, <strong>skills</strong>, <strong>architecture</strong>, <strong>career</strong>, <strong>alre</strong>, <strong>contact</strong>, <strong>clear</strong></p>`,
        projects: `<div style="color:#7ee787;">$ yoro projects --featured</div>
<p style="margin:4px 0;"><strong>[ALRE]</strong> Autonomous Lead-to-Revenue Engine &bull; n8n + Apollo + Firecrawl (95% research time saved)</p>
<p style="margin:4px 0;"><strong>[Voice-AI]</strong> Telnyx AI + Twilio Outbound Caller &bull; Make.com (85% automated handling)</p>
<p style="margin:4px 0;"><strong>[GHL-ClubWorx]</strong> Academy Integration Engine &bull; GoHighLevel (90% admin reduction)</p>
<p style="margin:4px 0;"><strong>[Customer-Service]</strong> Contextual AI Agent &bull; n8n + Gemini (3s response latency)</p>`,
        skills: `<div style="color:#7ee787;">$ cat skills.json</div>
<pre style="color:#79c0ff;background:#161b22;padding:8px;border-radius:4px;font-size:0.75rem;">
{
  "voice_telephony": ["Telnyx AI", "VAPI", "Twilio SIP", "Live Warm Transfers"],
  "orchestration": ["n8n (Self-Hosted)", "Make.com", "Zapier"],
  "ecom_operations": ["Shopify Admin", "Gorgias", "LTL Carrier APIs", "WISMO Automation"],
  "crm_systems": ["GoHighLevel (GHL)", "HubSpot", "Monday.com", "Salesforce"],
  "data_extraction": ["Firecrawl API", "Apollo API", "Multimodal Vision OCR"],
  "inference": ["ChatGPT Models", "Claude", "Gemini", "Persistent Memory"]
}
</pre>`,
        architecture: `<div style="color:#7ee787;">$ yoro architecture --inspect</div>
<p>Current architecture: <strong>Lavish Dark Technical Standard v2.0</strong></p>
<p>&bull; Ingestion Layer: Firecrawl Webhooks + Gmail Vision</p>
<p>&bull; Orchestration Layer: n8n Core + Make.com Failover Router</p>
<p>&bull; Agent Swarm: Telnyx AI Telephony + Apollo API + LLM Tiering</p>
<p>&bull; Persistence Layer: GoHighLevel + Supabase + Sheets</p>
<p style="color:#38bdf8;">See section #architecture above for interactive node inspector.</p>`,
        career: `<div style="color:#7ee787;">$ history --career</div>
<p><strong>2025 - Present:</strong> Automation Workflow Specialist (Freelance, US & Canadian Clients)</p>
<p><strong>Aug 2025 - Aug 2026 (1 Year):</strong> Shopify Customer Support & Operations Specialist (AiroLift™, Remote US & Canada)</p>
<p><strong>2024 - 2025:</strong> Process Trainer & Operations Tech Lead (IBEX, Davao City)</p>
<p><strong>2023 - 2024:</strong> Billing SME & Escalations Mentor (IBEX, Davao City)</p>`,
        contact: `<div style="color:#7ee787;">$ curl yoro.contact</div>
<p>Email: <a href="mailto:ydavidtimothy@gmail.com" style="color:#79c0ff;">ydavidtimothy@gmail.com</a></p>
<p>Phone: +63 963 975 9929</p>
<p>LinkedIn: <a href="https://www.linkedin.com/in/david-yoro-2082b32a1/" target="_blank" style="color:#79c0ff;">david-yoro</a></p>
<p>Upwork: <a href="https://www.upwork.com/freelancers/~01940039609a004629?mp_source=share" target="_blank" style="color:#79c0ff;">Top Rated Profile ↗</a></p>
<p>Calendly: <a href="https://calendly.com/ydavidtimothy/30min" target="_blank" style="color:#7ee787;">Book 30-Min Call ↗</a></p>`,
        alre: `<p style="color:#7ee787;">Redirecting to ALRE Autonomous Engine Deep-Dive...</p>`
    };

    window.execTerminalCmd = function(cmd) {
        if (!terminalOut) return;
        cmd = cmd.trim().toLowerCase();

        if (cmd === 'clear') {
            terminalOut.innerHTML = '';
            return;
        }

        if (cmd === 'alre') {
            window.location.href = 'alre.html';
            return;
        }

        let response = cliResponses[cmd];
        if (!response) {
            response = `<p style="color:#ff5f56;">zsh: command not found: ${cmd}. Type 'help' for available commands.</p>`;
        }

        terminalOut.innerHTML += `<div style="margin-top:10px;"><span style="color:#7ee787;">$ ${cmd}</span>${response}</div>`;
        terminalOut.scrollTop = terminalOut.scrollHeight;
    };

    if (terminalIn) {
        terminalIn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = terminalIn.value.trim();
                terminalIn.value = '';
                if (val) execTerminalCmd(val);
            }
        });
    }

    // ========================================
    // 1-CLICK COPY EMAIL TO CLIPBOARD
    // ========================================
    window.copyEmailToClipboard = function(e) {
        if (e) e.preventDefault();
        const email = 'ydavidtimothy@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            const toast = document.getElementById('copyToast');
            if (toast) {
                toast.classList.add('active');
                setTimeout(() => toast.classList.remove('active'), 2500);
            }
        }).catch(err => {
            console.warn('Clipboard write failed:', err);
        });
    };

});
