import React from "react";

export default function Pulser() {
    return (
        <svg className="pulser" xmlns="http://www.w3.org/2000/svg" width="487" height="334" viewBox="0 0 487 334">
            <defs>
                <linearGradient id="ehosr7uxja" x1="63.641%" x2="62.074%" y1="2.599%" y2="91.365%">
                    <stop offset="0%" stopColor="#D5F2E2"/>
                    <stop offset="100%" stopColor="#25C068"/>
                    <stop offset="100%" stopColor="#25C068"/>
                </linearGradient>
                <linearGradient id="53jk4u894b" x1="93.907%" x2="12.825%" y1="54.358%" y2="54.358%">
                    <stop offset="0%" stopColor="#25C068"/>
                    <stop offset="100%" stopColor="#1EAB5B"/>
                </linearGradient>
                <linearGradient id="7svc1oyrlc" x1="67.754%" x2="12.63%" y1="44.397%" y2="44.397%">
                    <stop offset="0%" stopColor="#25C068"/>
                    <stop offset="100%" stopColor="#1EAA5A"/>
                </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
                <g>
                    <g transform="translate(-461 -103) translate(461 105)">
                        <circle cx="250" cy="165" r="145" stroke="url(#ehosr7uxja)" strokeWidth="2.4" opacity=".219" />
                        <circle cx="250" cy="165" r="124" stroke="url(#ehosr7uxja)" strokeWidth="2.4" opacity=".15" transform="rotate(-90 250 145)"/>
                        <circle cx="250.5" cy="165" r="104.5" stroke="url(#ehosr7uxja)" strokeWidth="2.4" opacity=".15" transform="rotate(-90 250.5 145.5)"/>
                        <path fill="url(#53jk4u894b)" className="box1" d="M 283.79 95 H 486.4 l -16.632 121.414 c -1.357 9.905 -9.818 17.286 -19.815 17.286 H 259.476 c -5.944 0 -10.764 -4.82 -10.764 -10.764 c 0 -1.835 0.47 -3.64 1.363 -5.242 l 8.261 -14.816 c 0.442 -0.793 0.94 -1.553 1.49 -2.274 l 14.21 -18.619 c 8.433 -11.05 7.806 -26.537 -1.493 -36.87 l -7.815 -8.682 c -5.002 -5.558 -6.28 -13.534 -3.262 -20.376 l 4.023 -9.126 C 268.687 99.68 275.864 95 283.79 95 z"/>
                        <path fill="url(#7svc1oyrlc)" className="box2" d="M 45.126 55 H 264.25 l -16.632 121.414 c -1.357 9.905 -9.818 17.286 -19.815 17.286 H 18.62 c -5.622 0 -10.18 -4.558 -10.18 -10.18 c 0 -1.948 0.559 -3.855 1.61 -5.495 l 9.598 -14.97 c 0.301 -0.47 0.623 -0.926 0.964 -1.367 l 13.63 -17.629 c 8.33 -10.774 8.336 -25.813 0.016 -36.594 l -8.91 -11.546 c -4.083 -5.292 -5.086 -12.34 -2.64 -18.56 l 3.806 -9.678 C 29.522 60.031 36.905 55 45.126 55 z" transform="rotate(-180 132.125 144.35)"/>
                        <circle cx="250" cy="166" r="71.8" stroke="rgba(255,255,255,0.15)" strokeWidth="2.4" opacity=".1"/>
                        <circle cx="250" cy="166" r="47.8" stroke="rgba(255,255,255,0.25)" strokeWidth="2.4" opacity=".1"/>
                    </g>
                </g>
            </g>
        </svg>

    )
}
