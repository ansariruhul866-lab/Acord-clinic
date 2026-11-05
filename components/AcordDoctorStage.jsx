"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

/**
 * ACORD hero – right side: "Doctor Arches".
 * Two tall arch-shaped photo panels. The active one widens and shows
 * credentials + treatments; the other narrows into a vertical name tab.
 * Hover / tap switches. Auto-alternates until the visitor interacts.
 * No external dependencies. Images: /public/images.
 */

const WA = (n) =>
  `https://wa.me/917702941735?text=${encodeURIComponent(
    `Hello ACORD Clinics, I would like to book a consultation with ${n}.`
  )}`;

const BASE = ""; // relative path works seamlessly on localhost, Vercel, and custom domain

const DOCS = [
  {
    id: "aakash",
    name: "Dr. Aakash Singh",
    field: "Rheumatology & Immunology",
    cred: "MD, DM · AIR 1 PGIMER Chandigarh",
    img: BASE + "/images/dr-aakash-singh.jpg",
    fallbackImg: "https://acordclinic.vercel.app/images/dr-aakash-singh.jpg",
    mono: "AS",
    profile: "/doctors/dr-aakash-singh",
    tone: "r",
    tags: [
      "Arthritis & Lupus",
      "Biologics Infusion",
      "MSK Ultrasound",
      "Spondylitis",
      "Gout",
      "Vasculitis",
    ],
  },
  {
    id: "ankita",
    name: "Dr. Ankita Pundir",
    field: "Dermatology & Hair",
    cred: "Faculty at BRD Medical College · AIIMS AIR 456",
    img: BASE + "/images/dr-ankita-pundir.png",
    fallbackImg: "https://acordclinic.vercel.app/images/dr-ankita-pundir.png",
    mono: "AP",
    profile: "/doctors/dr-ankita-pundir",
    tone: "d",
    tags: [
      "Vitiligo Surgery",
      "FUE Hair Transplant",
      "Laser Hair Reduction",
      "Melasma",
      "Acne Scars",
      "BOTOX®",
    ],
  },
];

export default function AcordDoctorStage() {
  const [a, setA] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setA((n) => (n + 1) % 2), 6500);
    return () => clearInterval(t);
  }, [auto]);

  const pick = (n) => {
    setAuto(false);
    setA(n);
  };

  return (
    <div className="ad">
      <style>{css}</style>

      {/* soft colour blobs */}
      <i className="ad-blob b1" />
      <i className="ad-blob b2" />

      <div className="ad-row">
        {DOCS.map((d, n) => (
          <article
            key={d.id}
            className={`ad-card ${d.tone} ${a === n ? "on" : ""}`}
            style={{ "--shift": n ? "34px" : "0px" }}
            onMouseEnter={() => pick(n)}
            onClick={() => pick(n)}
          >
            <span className="ad-mono">{d.mono}</span>
            <img
              src={d.img}
              alt={d.name}
              onError={(e) => {
                if (e.currentTarget.src !== d.fallbackImg) {
                  e.currentTarget.src = d.fallbackImg;
                } else {
                  e.currentTarget.style.display = "none";
                }
              }}
            />
            <div className="ad-shade" />

            {/* collapsed label */}
            <div className="ad-vert">
              <span>{d.name}</span>
              <small>{d.field}</small>
            </div>

            {/* expanded info */}
            <div className="ad-info">
              <span className="ad-field">{d.field}</span>
              <h3>{d.name}</h3>
              <p>{d.cred}</p>
              <ul>
                {d.tags.map((t, i) => (
                  <li key={t} style={{ "--i": i }}>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="ad-btns">
                <a
                  href={WA(d.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p"
                  onClick={(e) => e.stopPropagation()}
                >
                  Book Consultation
                </a>
                <Link
                  href={d.profile}
                  className="g"
                  onClick={(e) => e.stopPropagation()}
                >
                  Profile →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* emblem sitting between the two arches */}
      <div className="ad-emblem">
        <span>A</span>
        <img
          src={BASE + "/images/acord-logo.png"}
          alt="ACORD"
          onError={(e) => {
            if (e.currentTarget.src !== "https://acordclinic.vercel.app/images/acord-logo.png") {
              e.currentTarget.src = "https://acordclinic.vercel.app/images/acord-logo.png";
            } else {
              e.currentTarget.style.display = "none";
            }
          }}
        />
      </div>

      {/* floating proof badges */}
      <div className="ad-badge top">
        <b>
          4.9<span>★</span>
        </b>
        <small>1,000+ Google reviews</small>
      </div>
      <div className="ad-badge bot">
        <b>2 Branches</b>
        <small>Gorakhpur · Bhagalpur</small>
      </div>

      {/* progress dots */}
      <div className="ad-dots">
        {DOCS.map((d, n) => (
          <button
            key={d.id}
            aria-label={d.name}
            className={a === n ? "on" : ""}
            onClick={() => pick(n)}
          />
        ))}
      </div>
    </div>
  );
}

const css = `
.ad{--navy:#1F2F98;--sky:#22b8e0;--mint:#18c7a0;position:relative;width:min(520px,92vw);margin-inline:auto;
  padding:18px 0 46px;font-family:inherit}
.ad-blob{position:absolute;border-radius:50%;filter:blur(46px);opacity:.55;z-index:0}
.b1{width:56%;aspect-ratio:1;left:-6%;top:10%;background:#b9c4ff}
.b2{width:56%;aspect-ratio:1;right:-6%;bottom:6%;background:#a4efdc}

.ad-row{position:relative;z-index:1;display:flex;gap:14px;height:min(540px,120vw);align-items:stretch}
.ad-card{position:relative;flex:1;min-width:0;overflow:hidden;cursor:pointer;
  border-radius:999px 999px 28px 28px;translate:0 var(--shift);margin-bottom:calc(var(--shift)*-1);
  background:linear-gradient(160deg,#2b3cc0,#22b8e0);box-shadow:0 30px 60px -28px rgba(31,47,152,.55);
  transition:flex .7s cubic-bezier(.3,.9,.2,1),border-radius .7s,box-shadow .4s}
.ad-card.d{background:linear-gradient(160deg,#18c7a0,#22b8e0)}
.ad-mono{position:absolute;inset:0;display:grid;place-items:center;font-size:84px;font-weight:800;color:rgba(255,255,255,.35)}
.ad-card.on{flex:2.3;border-radius:240px 240px 28px 28px}
.ad-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 12%;
  filter:saturate(.85) brightness(.97);transition:filter .5s,scale .8s}
.ad-card.on img{filter:none;scale:1.04}
.ad-shade{position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(10,20,80,.78))}
.ad-card:not(.on) .ad-shade{background:linear-gradient(180deg,rgba(255,255,255,.1) 30%,rgba(10,20,80,.85))}

/* collapsed vertical label */
.ad-vert{position:absolute;left:50%;bottom:22px;translate:-50% 0;writing-mode:vertical-rl;rotate:180deg;
  color:#fff;white-space:nowrap;transition:opacity .3s;display:flex;gap:8px;align-items:flex-start}
.ad-vert span{font-weight:700;font-size:15px}.ad-vert small{font-size:11px;opacity:.75;letter-spacing:.06em;text-transform:uppercase}
.ad-card.on .ad-vert{opacity:0;pointer-events:none}

/* expanded info */
.ad-info{position:absolute;left:0;right:0;bottom:0;padding:18px;color:#fff;opacity:0;translate:0 18px;pointer-events:none;
  transition:opacity .35s,translate .5s}
.ad-card.on .ad-info{opacity:1;translate:0 0;pointer-events:auto;transition-delay:.25s}
.ad-field{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;
  padding:5px 10px;border-radius:999px;background:rgba(255,255,255,.18);backdrop-filter:blur(8px)}
.ad-info h3{margin:10px 0 2px;font-size:21px;font-weight:800;line-height:1.1}
.ad-info p{margin:0 0 12px;font-size:12px;opacity:.85}
.ad-info ul{list-style:none;margin:0 0 14px;padding:0;display:flex;flex-wrap:wrap;gap:6px}
.ad-info li{font-size:11px;font-weight:600;padding:5px 10px;border-radius:999px;color:#0f1b4d;background:#fff;
  opacity:0;scale:.7}
.ad-card.on li{animation:ad-pop .5s cubic-bezier(.2,1.4,.4,1) both;animation-delay:calc(var(--i)*60ms + 450ms)}
.ad-card.r li{box-shadow:inset 0 -2px 0 var(--navy)}.ad-card.d li{box-shadow:inset 0 -2px 0 var(--mint)}
@keyframes ad-pop{to{opacity:1;scale:1}}
.ad-btns{display:flex;gap:8px;align-items:center}
.ad-btns a{text-decoration:none;font-size:12px;font-weight:700;border-radius:12px;padding:10px 14px}
.ad-btns .p{background:#fff;color:var(--navy)}.ad-btns .g{color:#fff;border:1px solid rgba(255,255,255,.5)}

/* emblem + badges */
.ad-emblem{position:absolute;z-index:3;left:50%;top:2px;translate:-50% 0;width:62px;height:62px;border-radius:50%;
  background:#fff;box-shadow:0 12px 26px -8px rgba(31,47,152,.5);display:grid;place-items:center;border:3px solid #fff}
.ad-emblem img{position:absolute;width:80%;height:80%;object-fit:contain;background:#fff;border-radius:50%}
.ad-emblem span{font-weight:800;color:var(--navy);font-size:24px}
.ad-badge{position:absolute;z-index:3;background:rgba(255,255,255,.92);backdrop-filter:blur(10px);border-radius:16px;
  padding:9px 13px;box-shadow:0 14px 30px -12px rgba(31,47,152,.5);animation:ad-float 5s ease-in-out infinite}
.ad-badge b{display:block;font-size:17px;color:#0f1b4d;line-height:1}.ad-badge b span{color:#f5a524;margin-left:2px}
.ad-badge small{font-size:10.5px;color:#0f1b4d;opacity:.65}
.ad-badge.top{right:-6px;top:90px}.ad-badge.bot{left:-6px;bottom:64px;animation-delay:-2.5s}
@keyframes ad-float{50%{translate:0 -8px}}

.ad-dots{position:absolute;z-index:3;left:50%;bottom:10px;translate:-50% 0;display:flex;gap:8px}
.ad-dots button{width:8px;height:8px;border-radius:999px;border:0;background:rgba(31,47,152,.25);padding:0;cursor:pointer;transition:.3s}
.ad-dots .on{width:26px;background:var(--navy)}

@media(max-width:480px){.ad-info h3{font-size:17px}.ad-badge.top{right:0}.ad-badge.bot{left:0}.ad-info li{font-size:10px}}
@media(prefers-reduced-motion:reduce){.ad *{animation:none!important;transition-duration:.01s!important}}
`;
