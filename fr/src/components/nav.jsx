'use client';

import { Link } from 'react-router-dom';
import GradientText from './effects/textgradient';
import WarpText from './effects/warp';
import GlowCursor from './effects/cursor';

const PillNav = ({
  logo,
  logoAlt = 'Logo',
  items = [],
  activeHref = '/',
  className = ''
}) => {
  const basePillClasses =
    'flex items-center justify-center rounded-full px-6 md:px-8 py-3 font-semibold text-[0.82rem] md:text-[0.92rem] uppercase tracking-[0.12em] transition-all duration-300';

  return (
    <div className={`absolute left-1/2 top-5 z-50 w-[min(92vw,980px)] -translate-x-1/2 ${className}`}>
      <GlowCursor
        color="#67E8F9"
        secondaryColor="#A78BFA"
        trailLength={40}
        trailWidth={8}
        trailTaper={0.8}
        followSpeed={0.16}
        glowIntensity={1.9}
        glowSpread={1.2}
        hotspot={0.65}
        brightness={1.25}
        opacity={0.7}
        pulseSpeed={1.1}
        noiseStrength={0.035}
        idleFade
        idleTimeout={700}
        fadeDuration={900}
        blendMode="screen"
        className="w-full h-full"
      >
        <nav
          className="flex items-center justify-between gap-3 rounded-full border border-white/10 bg-transparent px-2 py-2 h-full"
          aria-label="Primary navigation"
        >
          <ul className="flex flex-1 items-center justify-center gap-3 overflow-hidden rounded-full bg-transparent px-1 py-1">
            {items.map(item => {
              const isActive = activeHref === item.href;
              const isHomeTab = item.href === '/';

              return (
                <li key={item.href} className="flex-1">
                  <Link
                    to={item.href}
                    className={`${basePillClasses} ${
                      isActive
                        ? 'bg-white/20 text-white shadow-inner ring-1 ring-white/10'
                        : 'bg-transparent text-white/90 hover:bg-white/10'
                    }`}
                    style={{ minWidth: '110px' }}
                  >
                    {isActive && isHomeTab ? (
                      <GradientText
                        colors={['#27ff86', '#f4daa1', '#46f2ec']}
                        animationSpeed={1.5}
                        showBorder
                      >
                        {item.label}
                      </GradientText>
                    ) : (
                      <WarpText
                        text={item.label}
                        color="#f8f5ff"
                        warpStrength={0.08}
                        warpScale={2.5}
                        speed={1.55}
                        pointerInfluence={6}
                        pointerStrength={4.38}
                        refraction={0.018}
                        ripple
                        fontSize={20}
                        lineHeight={0.89}
                        className="!min-h-0 !h-[26px] !w-full"
                        style={{ height: '26px', width: '100%' }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </GlowCursor>
    </div>
  );
};

export default PillNav;
