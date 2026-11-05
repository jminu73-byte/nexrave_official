import React, { useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Disc3,
  Instagram,
  Music2,
  Share2,
  X,
  Youtube,
} from 'lucide-react';
import {
  DISCOGRAPHY,
  DiscographyItem,
  FIXED_BACKGROUND_IMAGE,
  GROUP_CONCEPT_IMAGE,
  GROUP_INFO,
  MEMBERS,
  MemberProfile,
} from './data/groupData';

export default function App() {
  const [selectedMember, setSelectedMember] = useState<MemberProfile | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<DiscographyItem | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0.25);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const carouselRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(1);
      return;
    }
    const ratio = el.scrollLeft / maxScroll;
    setScrollProgress(Math.min(1, Math.max(0.15, ratio)));
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    const el = carouselRef.current;
    if (!el) return;
    const step = 320;
    el.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  const markImageFailed = (key: string) => {
    setFailedImages((prev) => ({ ...prev, [key]: true }));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="top"
      className="relative min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col justify-between overflow-x-hidden selection:bg-white selection:text-zinc-950"
    >
      {/* Fixed Full-Width Background Image (stays fixed on mouse wheel scroll) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {!failedImages['bg'] && (
          <img
            src={FIXED_BACKGROUND_IMAGE}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            onError={() => markImageFailed('bg')}
            className="h-full w-full object-cover object-center opacity-35"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/75 via-zinc-950/65 to-zinc-950/90" />
      </div>

      {/* Top Navigation Bar: Centered Title + HOME / PROFILES / DISCOGRAPHY below */}
      <header className="relative z-20 w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-8 pb-4 flex flex-col items-center justify-center gap-4">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('top');
          }}
          className="font-['Cinzel',serif] text-3xl md:text-4xl font-bold tracking-[0.35em] bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent uppercase whitespace-nowrap shrink-0 select-none"
        >
          {GROUP_INFO.name}
        </a>

        <nav
          aria-label="Section navigation"
          className="flex items-center justify-center gap-8 text-xs font-medium tracking-[0.18em] text-zinc-300 uppercase"
        >
          <button
            type="button"
            onClick={() => scrollToSection('top')}
            className="hover:text-white transition-colors whitespace-nowrap py-1"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('profiles')}
            className="hover:text-white transition-colors whitespace-nowrap py-1"
          >
            Profiles
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('discography')}
            className="hover:text-white transition-colors whitespace-nowrap py-1"
          >
            Discography
          </button>
        </nav>
      </header>

      {/* Main Single-Page Content */}
      <main className="relative z-10 flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-12 py-6 space-y-16">
        {/* Top Group Concept Banner */}
        <section aria-label="Group Concept" className="w-full">
          <div className="relative w-full bg-zinc-900/90 border border-white/15 overflow-hidden shadow-2xl">
            {!failedImages['concept'] ? (
              <img
                src={GROUP_CONCEPT_IMAGE}
                alt={`${GROUP_INFO.name} group concept`}
                referrerPolicy="no-referrer"
                onError={() => markImageFailed('concept')}
                className="w-full h-auto block"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-zinc-500 font-display text-2xl tracking-[0.3em]">
                {GROUP_INFO.name}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
          </div>
        </section>

        {/* Member Profiles Section (5 Members: Photos 1, 2, 3, 4, 5) */}
        <section id="profiles" aria-label="Member Profiles" className="w-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-lg md:text-xl font-semibold tracking-tight text-white">
                Member Profiles
              </h1>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => scrollCarousel('left')}
                aria-label="Scroll members left"
                className="p-2 border border-white/15 bg-white/5 hover:bg-white/15 text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel('right')}
                aria-label="Scroll members right"
                className="p-2 border border-white/15 bg-white/5 hover:bg-white/15 text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Row of 5 Clean Profile Cards */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="grid grid-flow-col auto-cols-[220px] sm:auto-cols-[235px] lg:auto-cols-[minmax(0,1fr)] lg:grid-flow-row lg:grid-cols-5 gap-4 overflow-x-auto no-scrollbar pb-2"
          >
            {MEMBERS.map((member) => (
              <article
                key={member.id}
                className="group flex flex-col bg-zinc-900/90 border border-white/10 overflow-hidden transition-transform duration-200 hover:-translate-y-1"
              >
                {/* Upper Portrait with uniform height and no side margins */}
                <button
                  type="button"
                  onClick={() => setSelectedMember(member)}
                  aria-label={`View ${member.koreanName} profile`}
                  style={{ backgroundColor: member.pastelBg }}
                  className="relative w-full aspect-[9/16] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-950"
                >
                  {!failedImages[member.id] ? (
                    <img
                      src={member.image}
                      alt={`${member.koreanName} (${member.englishName})`}
                      referrerPolicy="no-referrer"
                      onError={() => markImageFailed(member.id)}
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-zinc-800 font-display text-lg font-semibold tracking-widest">
                      {member.koreanName}
                    </div>
                  )}
                </button>

                {/* Bottom Info Panel */}
                <div className="p-4 bg-zinc-950/95">
                  <h2 className="font-display text-base font-semibold tracking-wider text-white uppercase truncate">
                    {member.englishName}
                  </h2>
                  <p className="text-xs text-zinc-400 tabular-nums mt-1">
                    {member.birthdate}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Group Discography & Info Section */}
        <section
          id="discography"
          aria-label="Discography"
          className="w-full bg-zinc-950/85 backdrop-blur-md border border-white/15 shadow-2xl overflow-hidden"
        >
          <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Group Name, Agency, Debut Date, Social Row */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[0.18em] text-white">
                  {GROUP_INFO.name}
                </h2>
                <p className="text-sm text-zinc-300 mt-3 leading-relaxed">
                  {GROUP_INFO.tagline}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-center gap-6 text-xs">
                  <div>
                    <span className="text-zinc-500 block">DEBUT</span>
                    <span className="text-zinc-200 font-medium tabular-nums mt-0.5 block">
                      {GROUP_INFO.debutDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">AGENCY</span>
                    <span className="text-zinc-200 font-medium mt-0.5 block">
                      {GROUP_INFO.agency}
                    </span>
                  </div>
                </div>

                {/* Social Media Icon Row */}
                <div className="flex items-center gap-3 pt-1">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Official Instagram"
                    className="p-2 border border-white/10 text-zinc-300 hover:text-white hover:border-white/30 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Official YouTube"
                    className="p-2 border border-white/10 text-zinc-300 hover:text-white hover:border-white/30 transition-colors"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a
                    href="https://spotify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Official Spotify"
                    className="p-2 border border-white/10 text-zinc-300 hover:text-white hover:border-white/30 transition-colors"
                  >
                    <Music2 className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Discography List */}
            <div className="md:col-span-7 md:border-l md:border-white/10 md:pl-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-sm font-semibold tracking-[0.15em] text-zinc-300 uppercase">
                  Discography
                </h3>
                <span className="text-xs text-zinc-500 tabular-nums">
                  {DISCOGRAPHY.length} Releases
                </span>
              </div>

              <ul className="divide-y divide-white/10">
                {DISCOGRAPHY.map((item) => {
                  const isSelected = selectedAlbum?.id === item.id;
                  return (
                    <li key={item.id} className="py-2">
                      <div className="flex items-center gap-4">
                        <div className="w-20 shrink-0 border border-white/15 bg-zinc-900 overflow-hidden">
                          <img
                            src={item.coverImage}
                            alt={`${item.albumTitle} cover`}
                            referrerPolicy="no-referrer"
                            className="w-full h-auto block"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedAlbum(isSelected ? null : item)
                          }
                          className="flex-1 min-w-0 py-2 text-left flex items-center justify-between gap-3 hover:text-white text-zinc-300 transition-colors group"
                        >
                          <div className="text-xs md:text-sm font-normal flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                            <span className="text-zinc-500 tabular-nums">
                              {item.date}
                            </span>
                            <span className="text-zinc-400">
                              [{item.type}]
                            </span>
                            <span>
                              <span className="text-white font-medium">
                                {item.albumTitle}
                              </span>
                              <span className="text-zinc-500 mx-1.5">/</span>
                              <span className="text-zinc-300">
                                {item.titleTrack}
                              </span>
                            </span>
                          </div>
                          <Disc3
                            className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                              isSelected
                                ? 'text-white rotate-90'
                                : 'text-zinc-600 group-hover:text-zinc-400'
                            }`}
                          />
                        </button>
                      </div>

                      {isSelected && (
                        <div className="pb-2 pt-2 pl-24 text-xs text-zinc-400 flex flex-wrap gap-x-3 gap-y-1">
                          {item.tracks.map((track, idx) => (
                            <span key={track} className="tabular-nums">
                              {String(idx + 1).padStart(2, '0')}. {track}
                            </span>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Footer */}
      <footer className="relative z-20 w-full max-w-[1440px] mx-auto px-6 md:px-12 py-6 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
        {/* Left: Agency Logo */}
        <div className="font-display font-bold tracking-[0.25em] text-zinc-200 shrink-0">
          {GROUP_INFO.agency}
        </div>

        {/* Center: Corporate Footer Text */}
        <p className="text-[11px] text-zinc-500 text-center">
          2026 대림대학교 AI사운드프리프로덕션 4조 ALL RIGHTS RESERVED.
        </p>

        {/* Right: Minimalist Social Media Icon Bar */}
        <div className="flex items-center gap-4 shrink-0">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a
            href="https://spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spotify"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Music2 className="w-4 h-4" />
          </a>
          <a
            href="#share"
            onClick={(e) => {
              e.preventDefault();
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            aria-label="Copy link"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </a>
        </div>
      </footer>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          />
          <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-white/15 overflow-hidden shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              aria-label="Close member modal"
              className="absolute top-3 right-3 z-20 p-2 bg-zinc-950/80 text-white hover:bg-zinc-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div
              style={{ backgroundColor: selectedMember.pastelBg }}
              className="w-full aspect-[4/4] overflow-hidden"
            >
              <img
                src={selectedMember.image}
                alt={selectedMember.englishName}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-top"
              />
            </div>

            <div className="p-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-zinc-400">
                  {selectedMember.koreanName} · {selectedMember.role}
                </p>
                <h3 className="font-display text-2xl font-bold tracking-wider text-white uppercase mt-0.5">
                  {selectedMember.englishName}
                </h3>
                <p className="text-xs text-zinc-400 tabular-nums mt-1">
                  {selectedMember.birthdate}
                </p>
              </div>

              <a
                href={`https://instagram.com/${selectedMember.instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white text-zinc-950 text-xs font-medium flex items-center gap-2 hover:bg-zinc-200 transition-colors shrink-0"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@{selectedMember.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
