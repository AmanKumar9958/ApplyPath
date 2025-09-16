import React from 'react';
import { useReveal } from '../hooks/useReveal';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Users, Shield, Search, Sparkles, Star, Rocket, Linkedin, Github } from 'lucide-react';
import { useClerk, useUser } from '@clerk/clerk-react';

// Reusable button
const PrimaryButton = ({ children, className = '', ...rest }) => (
    <button
        className={`group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 ring-offset-2 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/60 ${className}`}
        {...rest}
    >
        {children}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
);

// Soft badge
const SoftBadge = ({ children }) => (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
        <Sparkles className="h-3 w-3" />
        {children}
    </span>
);

const features = [
    {
        icon: <Briefcase className="h-5 w-5" />,
        title: 'Smart Matching',
        desc: 'AI-assisted role recommendations tailored to your profile.'
    },
    {
        icon: <Users className="h-5 w-5" />,
        title: 'Verified Employers',
        desc: 'Curated companies with transparent hiring practices.'
    },
    {
        icon: <Shield className="h-5 w-5" />,
        title: 'Secure & Private',
        desc: 'Your data protected with enterprise-grade security.'
    },
    {
        icon: <Search className="h-5 w-5" />,
        title: 'Advanced Filters',
        desc: 'Drill down by stack, flexibility, salary, culture, more.'
    }
];

const categories = [
    'Frontend', 'Backend', 'Full Stack', 'Data Science', 'DevOps', 'Mobile',
    'Product Design', 'AI / ML', 'Cybersecurity', 'Cloud', 'Blockchain', 'QA'
];

const testimonials = [
    {
        name: 'Alex Chen',
        role: 'Frontend Engineer @ NovaTech',
        text: 'Landed my dream role in 3 weeks. The matching accuracy is leagues ahead of others.',
        rating: 5
    },
    {
        name: 'Sara Khan',
        role: 'Data Scientist @ Quantora',
        text: 'Loved the clean process, transparent salary ranges, and fast responses.',
        rating: 5
    },
    {
        name: 'Michael Lee',
        role: 'DevOps Lead @ InfraFlow',
        text: 'Automation + curated companies removed all the noise. Brilliant platform.',
        rating: 5
    }
];

const stats = [
    { label: 'Active Jobs', value: '18K+' },
    { label: 'Companies', value: '2.4K+' },
    { label: 'Monthly Matches', value: '52K+' },
    { label: 'Avg Time To Hire', value: '12d' }
];

// Footer social links (replace href values with your real profiles)
const socialLinks = [
    { name: 'LinkedIn', label: 'LinkedIn', href: 'https://www.linkedin.com/in/aman-kumar-39a7b7292/', Icon: Linkedin },
    { name: 'GitHub', label: 'GitHub', href: 'https://github.com/AmanKumar9958', Icon: Github }
];

// Temporary remote placeholder images (royalty-free Unsplash sources). Replace with your own assets in /public/images/hero.
// Each image uses parameters for optimized size & compression.
const FEATURED_ROLE_IMAGES = [
    {
        src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=60',
        label: 'Engineering',
        credit: 'Unsplash'
    },
    {
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=60',
        label: 'Data Science',
        credit: 'Unsplash'
    },
    {
        src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=600&q=60',
        label: 'Design',
        credit: 'Unsplash'
    },
    {
        src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=60',
        label: 'DevOps',
        credit: 'Unsplash'
    },
    {
        src: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=60',
        label: 'Security',
        credit: 'Unsplash'
    },
    {
        src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=60',
        label: 'Product',
        credit: 'Unsplash'
    }
];

const LandingPage = () => {
    const { openSignIn } = useClerk();
    const { user } = useUser();

    useReveal();
    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-background via-background to-background/95 text-foreground selection:bg-primary/20 selection:text-primary">
            {/* Glow background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl opacity-40" />
                <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-accent/30 blur-3xl opacity-40" />
            </div>

            {/* Hero */}
            <section className="relative z-10">
                <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 md:pt-16">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div className="space-y-8 reveal" data-delay="100">
                            <SoftBadge>Next‑gen Job Discovery</SoftBadge>
                            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                                Find Work That
                                <span className="relative ml-2 inline-block">
                                    <span className="relative z-10 bg-gradient-to-r from-primary to-primary/70">
                                        Moves You
                                    </span>
                                    <span className="absolute inset-x-0 -bottom-1 h-2 rounded-full bg-primary/20 blur-sm" />
                                </span>
                            </h1>
                            <p className="max-w-xl text-lg text-muted-foreground">
                                Curated roles. Real compensation. Intelligent matching. Your path to a meaningful career just accelerated.
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                {/* <PrimaryButton>Explore Jobs</PrimaryButton> */}
                                <Link to="/all-jobs" className='rounded-lg border border-border/60 bg-background/60'>
                                    <PrimaryButton>Explore Jobs</PrimaryButton>
                                </Link>
                            </div>
                            <div className="flex flex-wrap gap-10 pt-6">
                                {stats.map((s,i) => (
                                    <div key={s.label} className="reveal" data-delay={`${200 + i*80}`}> 
                                        <div className="text-2xl font-semibold">{s.value}</div>
                                        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Hero Media Card (Images Replacing Text List) */}
                        <div className="relative mx-auto w-full max-w-xl reveal" data-delay="250">
                            <div className="relative rounded-3xl border border-border/60 bg-gradient-to-br from-background/60 to-background/30 p-5 backdrop-blur-xl shadow-xl shadow-black/5 overflow-hidden">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                            <Search className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">Featured Roles</p>
                                            <p className="text-xs text-muted-foreground">Visual inspiration</p>
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Gallery</span>
                                </div>
                                {/* Image grid */}
                                <div className="grid grid-cols-3 gap-3">
                                    {FEATURED_ROLE_IMAGES.map((img,i) => (
                                        <div key={img.src} className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl reveal" data-delay={`${150 + i*70}`}> 
                                            <img
                                                src={img.src}
                                                alt={`${img.label} role visual`}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                                            <span className="absolute bottom-1 left-1 right-1 rounded-md bg-black/40 px-2 py-1 text-[10px] font-medium tracking-wide text-white backdrop-blur-sm">
                                                {img.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                {/* Bottom highlight */}
                                <div className="mt-5 flex items-center justify-between rounded-xl bg-primary/5 p-3">
                                    <div>
                                        <p className="text-xs font-medium">Personalized Matches Enabled</p>
                                        <p className="text-[10px] text-muted-foreground">Driven by your interests</p>
                                    </div>
                                    <div className="relative h-9 w-9">
                                        <div className="absolute inset-0 animate-ping rounded-full bg-primary/25" />
                                        <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
                                            <Sparkles className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pointer-events-none absolute -left-6 -top-6 h-32 w-32 rounded-full bg-primary/30 blur-2xl opacity-40" />
                            <div className="pointer-events-none absolute -right-4 bottom-10 h-24 w-24 rounded-full bg-accent/30 blur-2xl opacity-40" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="relative z-10 border-t border-border/60">
                <div className="mx-auto max-w-7xl px-6 py-20">
                    <div className="mb-10 flex items-end justify-between reveal" data-delay="100">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Browse Categories</h2>
                            <p className="mt-1 text-sm text-muted-foreground">Explore roles across diverse tech domains.</p>
                        </div>
                        <Link to="/all-jobs" className="text-sm font-medium text-primary hover:underline">View all</Link>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {categories.map((c,i) => (
                            <div
                                key={c}
                                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-background/60 to-background/30 p-5 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 reveal" data-delay={`${100 + i*60}`}
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold">{c}</p>
                                    <div className="rounded-full bg-primary/10 p-2 text-primary transition-all group-hover:scale-110">
                                        <Link to="/all-jobs">
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                                <p className="mt-2 text-xs text-muted-foreground">247 openings</p>
                                <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/20 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="relative z-10">
                <div className="mx-auto max-w-7xl px-6 py-20">
                    <div className="mx-auto max-w-2xl text-center reveal" data-delay="100">
                        <h2 className="text-2xl font-bold md:text-3xl">Why Choose ApplyPath</h2>
                        <p className="mt-3 text-sm text-muted-foreground">
                            Purpose-built to streamline modern hiring for candidates & teams.
                        </p>
                    </div>
                    <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {features.map((f,i) => (
                            <div
                                key={f.title}
                                className="group relative flex flex-col gap-4 rounded-2xl border border-border/60 bg-gradient-to-br from-background/60 to-background/20 p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 reveal" data-delay={`${120 + i*80}`}
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    {f.icon}
                                </div>
                                <h3 className="text-sm font-semibold">{f.title}</h3>
                                <p className="text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
                                <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary">
                                    Learn more <ArrowRight className="h-3 w-3" />
                                </span>
                                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-primary/40 transition-opacity group-hover:opacity-100" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="relative z-10 border-t border-border/60 bg-gradient-to-b from-background/40 to-background/10">
                <div className="mx-auto max-w-7xl px-6 py-20">
                    <div className="mb-12 max-w-xl reveal" data-delay="100">
                        <h2 className="text-2xl font-bold md:text-3xl">Loved by Professionals</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Stories from people who found roles that matter.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {testimonials.map((t,i) => (
                            <div
                                key={t.name}
                                className="relative flex flex-col gap-4 rounded-2xl border border-border/60 bg-gradient-to-br from-background/60 to-background/30 p-6 transition-all hover:border-primary/40 reveal" data-delay={`${140 + i*100}`}
                            >
                                <div className="flex gap-1">
                                    {Array.from({length: t.rating}).map((_,i)=>(
                                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                    ))}
                                </div>
                                <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
                                <div className="mt-auto pt-2">
                                    <p className="text-sm font-semibold">{t.name}</p>
                                    <p className="text-xs text-muted-foreground">{t.role}</p>
                                </div>
                                <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/20 blur-2xl opacity-0 transition-opacity hover:opacity-100" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative z-10">
                <div className="mx-auto max-w-5xl px-6 py-24">
                    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 p-10 backdrop-blur-xl reveal" data-delay="120">
                        <div className="grid gap-10 md:grid-cols-2">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                                    Ready to Accelerate Your Career?
                                </h2>
                                <p className="mt-4 text-sm text-muted-foreground">
                                    Create a profile and get matched to high-intent roles within hours, not weeks.
                                </p>
                                <div className="mt-8 flex flex-wrap gap-4">
                                    {user ? (
                                        <Link to="/profile">
                                            <PrimaryButton>Go to Profile</PrimaryButton>
                                        </Link>
                                    ) : (
                                        <PrimaryButton onClick={() => openSignIn()}>Create Profile</PrimaryButton>
                                    )}
                                </div>
                                <p className="mt-4 text-[11px] text-muted-foreground">
                                    No credit card required. Basic plan is free forever.
                                </p>
                            </div>
                            <div className="relative">
                                <div className="grid gap-4">
                                    {[
                                        { k: 'Match Accuracy', v: '92%' },
                                        { k: 'Avg Response Boost', v: '3.4x' },
                                        { k: 'Time Saved / Search', v: '18h' },
                                        { k: 'User Satisfaction', v: '97%' }
                                    ].map(item => (
                                        <div
                                            key={item.k}
                                            className="flex items-center justify-between rounded-xl border border-border/60 bg-background/50 px-5 py-4 text-sm"
                                        >
                                            <span className="font-medium">{item.k}</span>
                                            <span className="font-semibold text-primary">{item.v}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="pointer-events-none absolute -right-6 bottom-0 h-32 w-32 rounded-full bg-primary/30 blur-2xl opacity-50" />
                            </div>
                        </div>
                        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/30 blur-3xl opacity-40" />
                        <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-accent/30 blur-3xl opacity-30" />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-border/60">
                <div className="mx-auto max-w-7xl px-6 py-12">
                    {/* Brand + Tagline */}
                    <div className="reveal" data-delay="80">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                            <div className="flex items-center gap-2 mb-3 sm:mb-0">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
                                    <Rocket className="h-5 w-5" />
                                </div>
                                <span className="text-base font-semibold">ApplyPath</span>
                            </div>
                            <p className="text-xs max-w-sm leading-relaxed text-muted-foreground">
                                Connecting talent with meaningful work through intelligent matching.
                            </p>
                        </div>
                    </div>
                    {/* Bottom Row */}
                    <div className="mt-8 flex flex-col gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between reveal" data-delay="160">
                        <p className="text-[11px] text-muted-foreground order-2 sm:order-1">
                            © {new Date().getFullYear()} ApplyPath. All rights reserved.
                        </p>
                        <div className="flex gap-4 order-1 sm:order-2">
                            {socialLinks.map(({ name, label, href, Icon }) => (
                                <a
                                    key={name}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="group inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                                >
                                    <Icon className="h-4 w-4 opacity-80 transition-opacity group-hover:opacity-100" />
                                    <span>{label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;