"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

/**
 * ACORD "Care Orbit" – right side of the hero.
 * Doctor/clinic portrait in the middle, specialty chips orbiting on a ring.
 * Tabs swap the centre + chips (auto-cycles until the visitor interacts).
 * No dependencies. Images in /public/images.
 */

const WA = (t) =>
  `https://wa.me/917702941735?text=${encodeURIComponent(
    `Hello ACORD Clinics, I would like to book a consultation${t ? " with " + t : ""}.`
  )}`;

const R = (t, href) => ({ t, href, k: "r" }); // rheumatology tone
const D = (t, href) => ({ t, href, k: "d" }); // dermatology tone
const rh = "/rheumatology/conditions/";
const de = "/dermatology/treatments/";

const TABS = [
  {
    id: "acord",
    label: "ACORD",
    sub: "Centre",
    img: "/images/acord-logo.png",
    fallbackImg: "https://acordclinic.vercel.app/images/acord-logo.png",
    logo: true,
    name: "ACORD Clinics",
    line: "Autoimmunity Centre Of excellence in Rheumatology and Dermatology",
    who: "One-Stop Solution for Your Health Needs",
    chips: [
      R("Inflammatory Arthritis", rh + "inflammatory-arthritis"),
      D("Vitiligo Surgery", de + "vitiligo-surgeries"),
      R("Lupus & Autoimmunity", rh + "connective-tissue-lupus-sle"),
      D("FUE Hair Transplant", de + "hair-restoration-transplant"),
      R("Biologics Infusion", "/rheumatology/treatments"),
      D("Laser & Energy Devices", de + "laser-energy-devices"),
      R("MSK Ultrasound", "/technology"),
      D("Acne Scar Revision", de + "acne-scar-treatments"),
    ],
  },
  {
    id: "aakash",
    label: "Dr. Aakash",
    sub: "Rheumatology",
    img: "/images/dr-aakash-singh.jpg",
    fallbackImg: "https://acordclinic.vercel.app/images/dr-aakash-singh.jpg",
    name: "Dr. Aakash Singh",
    line: "MD, DM Clinical Immunology & Rheumatology",
    who: "AIR 1 · PGIMER Chandigarh",
    chips: [
      R("Rheumatoid Arthritis", rh + "inflammatory-arthritis"),
      R("Lupus (SLE)", rh + "connective-tissue-lupus-sle"),
      R("Ankylosing Spondylitis", rh + "ankylosing-spondylitis-spine"),
      R("Gout & Crystal Arthritis", rh + "gout-crystal-arthritis"),
      R("Vasculitis", rh + "vasculitis-rare-autoimmune"),
      R("Biologics Infusion", "/rheumatology/treatments"),
      R("MSK Ultrasound Injections", "/technology"),
      R("Biopsy Diagnostics", "/technology"),
    ],
  },
  {
    id: "ankita",
    label: "Dr. Ankita",
    sub: "Dermatology",
    img: "/images/dr-ankita-pundir.png",
    fallbackImg: "https://acordclinic.vercel.app/images/dr-ankita-pundir.png",
    name: "Dr. Ankita Pundir",
    line: "MD Dermatology · Dermatosurgeon",
    who: "Faculty at BRD Medical College · AIIMS AIR 456",
    chips: [
      D("Vitiligo Surgery", de + "vitiligo-surgeries"),
      D("FUE Hair Transplant", de + "hair-restoration-transplant"),
      D("QR678® Therapy", de + "hair-restoration-transplant"),
      D("Laser Hair Reduction", de + "laser-energy-devices"),
      D("Melasma & Pigmentation", de + "laser-energy-devices"),
      D("Acne Scar Revision", de + "acne-scar-treatments"),
      D("BOTOX® & Fillers", de + "injectables-thread-lift"),
      D("Thread Lift", de + "injectables-thread-lift"),
    ],
  },
];

const Glyph = ({ k }) =>
  k === "r" ? (
    <svg
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="none"
      stroke="#fff"
      strokeWidth="2.6"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="#fff">
      <path d="M12 2l2.2 6.3L20 10l-5.8 1.7L12 18l-2.2-6.3L4 10l5.8-1.7z" />
    </svg>
  );

export default function AcordOrbitHero() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const tab = TABS[i];

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setI((n) => (n + 1) % TABS.length), 7500);
    return () => clearInterval(id);
  }, [auto]);

  const pick = (n) => {
    setAuto(false);
    setI(n);
  };
  const N = tab.chips.length;

  return (
    <div className="ao">
      <style>{css}</style>

      <div className="ao-stage">
        {/* background rings, sweep & drifting particles */}
        <div className="ao-glow" />
        <div className="ao-r ao-r1" />
        <div className="ao-r ao-r2" />
        <div className="ao-r ao-r3" />
        <div className="ao-sweep" />
        <i className="ao-p ao-p1" />
        <i className="ao-p ao-p2" />
        <i className="ao-p ao-p3" />

        {/* orbit */}
        <div className="ao-orbit" key={tab.id + "-o"}>
          {tab.chips.map((c, n) => {
            const a = (360 / N) * n - 90;
            return (
              <div
                className="ao-slot"
                key={c.t}
                style={{ "--a": a + "deg", "--i": n }}
              >
                <div className="ao-chip">
                  <Link className={`ao-body ao-${c.k}`} href={c.href}>
                    <span className="ao-ic">
                      <Glyph k={c.k} />
                    </span>
                    {c.t}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* centre portrait */}
        <div className="ao-core" key={tab.id + "-c"}>
          <div className="ao-ring">
            <div className={`ao-photo ${tab.logo ? "ao-logo" : ""}`}>
              <img
                src={tab.img}
                alt={tab.name}
                onError={(e) => {
                  if (tab.fallbackImg && e.currentTarget.src !== tab.fallbackImg) {
                    e.currentTarget.src = tab.fallbackImg;
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* caption + CTA */}
      <div className="ao-cap" key={tab.id + "-t"}>
        <div>
          <b>{tab.name}</b>
          <span>{tab.line}</span>
          {tab.who && <em>{tab.who}</em>}
        </div>
        <a
          className="ao-cta"
          href={WA(tab.logo ? "" : tab.name)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book Consultation
        </a>
      </div>

      {/* tabs */}
      <div className="ao-tabs" role="tablist">
        {TABS.map((t, n) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={n === i}
            className={n === i ? "on" : ""}
            onClick={() => pick(n)}
          >
            {t.label}
            <small>{t.sub}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

const css = `
.ao{--navy:#1F2F98;--sky:#22b8e0;--mint:#18c7a0;--size:min(470px,88vw);
  width:var(--size);margin-inline:auto;font-family:inherit;color:#0f1b4d}
.ao-stage{position:relative;width:var(--size);height:var(--size)}
.ao-stage:hover .ao-orbit,.ao-stage:hover .ao-chip{animation-play-state:paused}

/* ambient layers */
.ao-glow{position:absolute;inset:6%;border-radius:50%;
  background:radial-gradient(circle,rgba(34,184,224,.28),rgba(24,199,160,.10) 55%,transparent 72%);filter:blur(10px)}
.ao-r{position:absolute;border-radius:50%;left:50%;top:50%;translate:-50% -50%;border:1px dashed rgba(31,47,152,.18)}
.ao-r1{width:84%;height:84%} .ao-r2{width:60%;height:60%;border-style:solid;border-color:rgba(34,184,224,.22)}
.ao-r3{width:98%;height:98%;border-color:rgba(24,199,160,.16)}
.ao-sweep{position:absolute;inset:8%;border-radius:50%;
  background:conic-gradient(from 0deg,transparent 0 290deg,rgba(34,184,224,.22) 360deg);
  -webkit-mask:radial-gradient(circle,transparent 30%,#000 31%);mask:radial-gradient(circle,transparent 30%,#000 31%);
  animation:ao-spin 9s linear infinite}
.ao-p{position:absolute;left:50%;top:50%;width:7px;height:7px;border-radius:50%;background:var(--sky);
  box-shadow:0 0 12px var(--sky);animation:ao-spin var(--d) linear infinite;transform-origin:0 0}
.ao-p1{--d:14s;translate:calc(var(--size)*.42) 0} .ao-p2{--d:22s;background:var(--mint);box-shadow:0 0 12px var(--mint);translate:calc(var(--size)*-.30) 0}
.ao-p3{--d:30s;background:var(--navy);box-shadow:0 0 12px var(--navy);translate:0 calc(var(--size)*.36)}

/* orbit + chips (chips counter-rotate so text stays upright) */
.ao-orbit{position:absolute;inset:0;animation:ao-spin 70s linear infinite}
.ao-slot{position:absolute;left:50%;top:50%;width:0;height:0;
  transform:rotate(var(--a)) translateX(calc(var(--size)*.42))}
.ao-chip{position:absolute;left:0;top:0;animation:ao-up 70s linear infinite}
@keyframes ao-up{from{transform:rotate(calc(var(--a)*-1))}to{transform:rotate(calc(var(--a)*-1 - 360deg))}}
@keyframes ao-spin{to{transform:rotate(360deg)}}
.ao-body{display:flex;align-items:center;gap:7px;translate:-50% -50%;white-space:nowrap;text-decoration:none;
  padding:6px 12px 6px 6px;border-radius:999px;font-size:12px;font-weight:600;color:#0f1b4d;
  background:rgba(255,255,255,.88);backdrop-filter:blur(8px);border:1px solid rgba(31,47,152,.12);
  box-shadow:0 8px 20px -8px rgba(31,47,152,.35);
  animation:ao-pop .6s cubic-bezier(.2,1.4,.4,1) both;animation-delay:calc(var(--i)*70ms + 150ms);
  transition:box-shadow .2s,background .2s}
.ao-body:hover{background:#fff;box-shadow:0 12px 26px -8px rgba(34,184,224,.7)}
.ao-ic{width:24px;height:24px;border-radius:50%;display:grid;place-items:center}
.ao-r .ao-ic,.ao-body.ao-r .ao-ic{background:linear-gradient(135deg,var(--navy),#4a5cf0)}
.ao-body.ao-d .ao-ic{background:linear-gradient(135deg,var(--sky),var(--mint))}
@keyframes ao-pop{from{opacity:0;scale:.4}to{opacity:1;scale:1}}

/* centre */
.ao-core{position:absolute;left:50%;top:50%;width:44%;aspect-ratio:1;translate:-50% -50%;animation:ao-in .7s ease both}
@keyframes ao-in{from{opacity:0;scale:.85;filter:blur(6px)}to{opacity:1;scale:1;filter:none}}
.ao-ring{width:100%;height:100%;border-radius:50%;padding:5px;
  background:conic-gradient(from 0deg,var(--navy),var(--sky),var(--mint),var(--navy));
  box-shadow:0 20px 50px -14px rgba(31,47,152,.55);animation:ao-spin 12s linear infinite}
.ao-photo{width:100%;height:100%;border-radius:50%;overflow:hidden;background:#e8f7fc;border:4px solid #fff;
  animation:ao-spin 12s linear infinite reverse}
.ao-photo img{width:100%;height:100%;object-fit:cover;object-position:50% 15%;display:block}
.ao-logo{background:#fff}.ao-logo img{object-fit:contain;padding:14%}

/* caption */
.ao-cap{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:14px;
  padding:12px 14px;border-radius:16px;background:rgba(255,255,255,.8);border:1px solid rgba(31,47,152,.1);
  animation:ao-in .5s ease both}
.ao-cap b{display:block;font-size:15px}.ao-cap span{display:block;font-size:12px;opacity:.7;margin-top:2px}
.ao-cap em{display:block;font-style:normal;font-size:11px;font-weight:700;color:var(--navy);margin-top:3px}
.ao-cta{flex:none;background:linear-gradient(135deg,var(--navy),#3446c8);color:#fff;text-decoration:none;
  font-size:12px;font-weight:700;padding:10px 14px;border-radius:12px}

/* tabs */
.ao-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:10px;padding:5px;border-radius:14px;
  background:rgba(31,47,152,.06)}
.ao-tabs button{border:0;border-radius:10px;padding:8px 4px;background:transparent;cursor:pointer;
  font:700 12px/1.1 inherit;color:#0f1b4d;transition:.25s}
.ao-tabs small{display:block;font-size:9.5px;font-weight:600;opacity:.6;margin-top:2px;letter-spacing:.04em;text-transform:uppercase}
.ao-tabs .on{background:linear-gradient(135deg,var(--navy),#3446c8);color:#fff;box-shadow:0 8px 18px -8px var(--navy)}

@media(max-width:480px){.ao-body{font-size:10.5px;padding:4px 9px 4px 4px}.ao-ic{width:20px;height:20px}.ao-slot{transform:rotate(var(--a)) translateX(calc(var(--size)*.40))}}
@media(prefers-reduced-motion:reduce){.ao *{animation-duration:.01s!important;animation-iteration-count:1!important}}
`;
