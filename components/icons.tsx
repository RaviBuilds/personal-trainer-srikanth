import { useId, type SVGProps } from "react";
import type { ApproachIcon, FaqIcon, FormatIcon, GoalIcon, HeroIcon, InstagramBenefitIcon, SectionIcon } from "@/src/lib/site-content";

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number };

function Stroke({ size = 24, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>{children}</svg>;
}

const WHATSAPP_MARK = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

/** Single-colour WhatsApp mark that follows currentColor. Used inside labelled buttons. */
export function WhatsAppGlyph({ size = 24, ...rest }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...rest}><path d={WHATSAPP_MARK} /></svg>;
}

/**
 * The WhatsApp icon used inside CTAs and next to text: a --wa-green circle with the white WhatsApp mark.
 * `onGreen` drops the circle and draws the white mark alone, for a surface that is already --wa-green (the floating button).
 */
export function WhatsAppLogo({ size = 24, onGreen = false, className, ...rest }: IconProps & { onGreen?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className ? `wa-logo ${className}` : "wa-logo"} {...rest}>
      {onGreen ? (
        <path d={WHATSAPP_MARK} fill="white" />
      ) : (
        <>
          <circle cx="12" cy="12" r="12" style={{ fill: "var(--wa-green)" }} />
          <path d={WHATSAPP_MARK} fill="white" transform="translate(12 12) scale(.62) translate(-12 -12)" />
        </>
      )}
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return <Stroke {...props}><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" /></Stroke>;
}

export function ArrowUpRightIcon(props: IconProps) {
  return <Stroke {...props}><path d="M7 7h10v10" /><path d="M7 17 17 7" /></Stroke>;
}

export function BadgeCheckIcon(props: IconProps) {
  return <Stroke {...props}><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></Stroke>;
}

export function InstagramIcon(props: IconProps) {
  return <Stroke {...props}><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" /><path d="M17.5 6.5h.01" /></Stroke>;
}

/**
 * Instagram brand mark (rounded square, lens, flash dot). `gradient` paints it with the brand
 * gradient under a per-instance id; without it the mark follows currentColor.
 */
export function InstagramGlyph({ size = 24, gradient = false, ...rest }: IconProps & { gradient?: boolean }) {
  const id = useId();
  const paint = gradient ? `url(#${id})` : "currentColor";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={paint} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
      {gradient && (
        <defs>
          <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="24" x2="24" y2="0">
            <stop offset="0" stopColor="#FEDA75" />
            <stop offset=".25" stopColor="#FA7E1E" />
            <stop offset=".5" stopColor="#D62976" />
            <stop offset=".75" stopColor="#962FBF" />
            <stop offset="1" stopColor="#4F5BD5" />
          </linearGradient>
        </defs>
      )}
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.6" cy="6.4" r="1" fill={paint} stroke="none" />
    </svg>
  );
}

export function PlayIcon({ size = 24, ...rest }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={1.75} strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}><path d="M7 4.5v15a.9.9 0 0 0 1.36.77l12.5-7.5a.9.9 0 0 0 0-1.54L8.36 3.73A.9.9 0 0 0 7 4.5Z" /></svg>;
}

export function VolumeIcon(props: IconProps) {
  return <Stroke {...props}><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" /><path d="M16 9a5 5 0 0 1 0 6" /><path d="M19.364 18.364a9 9 0 0 0 0-12.728" /></Stroke>;
}

export function VolumeXIcon(props: IconProps) {
  return <Stroke {...props}><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" /><path d="m22 9-6 6" /><path d="m16 9 6 6" /></Stroke>;
}

export function SaladIcon(props: IconProps) {
  return <Stroke {...props}><path d="M7 21h10" /><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" /><path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1" /><path d="m13 12 4-4" /><path d="M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2" /></Stroke>;
}

export function InstagramBenefitGlyph({ name, ...props }: IconProps & { name: InstagramBenefitIcon }) {
  if (name === "salad") return <SaladIcon {...props} />;
  return heroIcons[name](props);
}

export function StarIcon({ size = 14, ...rest }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...rest}><path d="M12 2.5l2.94 6.07 6.56.88-4.8 4.62 1.2 6.6L12 17.4l-5.9 3.27 1.2-6.6-4.8-4.62 6.56-.88L12 2.5z" /></svg>;
}

const heroIcons: Record<HeroIcon, (props: IconProps) => React.ReactElement> = {
  dumbbell: (p) => <Stroke {...p}><path d="M6.5 6.5v11" /><path d="M17.5 6.5v11" /><path d="M3.5 9v6" /><path d="M20.5 9v6" /><path d="M6.5 12h11" /></Stroke>,
  house: (p) => <Stroke {...p}><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></Stroke>,
  monitor: (p) => <Stroke {...p}><path d="M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z" /><path d="M12 17v4" /><path d="M8 21h8" /><rect x="2" y="3" width="20" height="14" rx="2" /></Stroke>,
  calendar: (p) => <Stroke {...p}><path d="M8 2v4" /><path d="M16 2v4" /><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 10h18" /><path d="m9 16 2 2 4-4" /></Stroke>,
  users: (p) => <Stroke {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /></Stroke>,
  activity: (p) => <Stroke {...p}><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" /></Stroke>,
  apple: (p) => <Stroke {...p}><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" /><path d="M10 2c1 .5 2 2 2 5" /></Stroke>,
};

export function HeroGlyph({ name, ...props }: IconProps & { name: HeroIcon }) {
  return heroIcons[name](props);
}

export function CheckIcon(props: IconProps) {
  return <Stroke {...props}><path d="M20 6 9 17l-5-5" /></Stroke>;
}

export function ArrowRightIcon(props: IconProps) {
  return <Stroke {...props}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></Stroke>;
}

export function ChevronLeftIcon(props: IconProps) {
  return <Stroke {...props}><path d="m15 18-6-6 6-6" /></Stroke>;
}

export function ChevronRightIcon(props: IconProps) {
  return <Stroke {...props}><path d="m9 18 6-6-6-6" /></Stroke>;
}

export function ClipboardCheckIcon(props: IconProps) {
  return <Stroke {...props}><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" /></Stroke>;
}

const formatIcons: Record<FormatIcon, (props: IconProps) => React.ReactElement> = {
  dumbbell: (p) => <Stroke {...p}><path d="M6.5 6.5v11" /><path d="M17.5 6.5v11" /><path d="M3.5 9v6" /><path d="M20.5 9v6" /><path d="M6.5 12h11" /></Stroke>,
  house: (p) => <Stroke {...p}><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></Stroke>,
  monitorPlay: (p) => <Stroke {...p}><path d="M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25A.75.75 0 0 1 10 12.25z" /><path d="M12 17v4" /><path d="M8 21h8" /><rect x="2" y="3" width="20" height="14" rx="2" /></Stroke>,
};

export function FormatGlyph({ name, ...props }: IconProps & { name: FormatIcon }) {
  return formatIcons[name](props);
}

const sectionIcons: Record<SectionIcon, (props: IconProps) => React.ReactElement> = {
  target: (p) => <Stroke {...p}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></Stroke>,
  calendarClock: (p) => <Stroke {...p}><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h5" /><circle cx="16" cy="16" r="6" /><path d="M16 14v2l1.5 1" /></Stroke>,
  history: (p) => <Stroke {...p}><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></Stroke>,
  briefcase: (p) => <Stroke {...p}><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M2 13h20" /></Stroke>,
  utensils: (p) => <Stroke {...p}><path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2" /><path d="M5 2v20" /><path d="M19 15V2a5 5 0 0 0-3 5c0 3 3 4 3 4Z" /><path d="M19 15v7" /></Stroke>,
  activity: (p) => <Stroke {...p}><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" /></Stroke>,
  monitorPlay: (p) => <Stroke {...p}><path d="M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25A.75.75 0 0 1 10 12.25z" /><path d="M12 17v4" /><path d="M8 21h8" /><rect x="2" y="3" width="20" height="14" rx="2" /></Stroke>,
};

export function SectionGlyph({ name, ...props }: IconProps & { name: SectionIcon }) {
  return sectionIcons[name](props);
}

const goalIcons: Record<GoalIcon, (props: IconProps) => React.ReactElement> = {
  dumbbell: (p) => <Stroke {...p}><path d="M6.5 6.5v11" /><path d="M17.5 6.5v11" /><path d="M3.5 9v6" /><path d="M20.5 9v6" /><path d="M6.5 12h11" /></Stroke>,
  heartPulse: (p) => <Stroke {...p}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.5 4.04 3 5.5l7 7Z" /><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" /></Stroke>,
  flame: (p) => <Stroke {...p}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></Stroke>,
  trendingUp: (p) => <Stroke {...p}><path d="M16 7h6v6" /><path d="m22 7-8.5 8.5-5-5L2 17" /></Stroke>,
  sprout: (p) => <Stroke {...p}><path d="M7 20h10" /><path d="M10 20c5.5-2.5.8-6.4 3-10" /><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" /><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" /></Stroke>,
  move: (p) => <Stroke {...p}><path d="M12 2v20" /><path d="M2 12h20" /><path d="m15 5-3-3-3 3" /><path d="m15 19-3 3-3-3" /><path d="m5 9-3 3 3 3" /><path d="m19 9 3 3-3 3" /></Stroke>,
};

export function GoalGlyph({ name, ...props }: IconProps & { name: GoalIcon }) {
  return goalIcons[name](props);
}

const approachIcons: Record<ApproachIcon, (props: IconProps) => React.ReactElement> = {
  MessageCircle: (p) => <Stroke {...p}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></Stroke>,
  SlidersHorizontal: (p) => <Stroke {...p}><path d="M21 4h-7" /><path d="M10 4H3" /><path d="M21 12h-9" /><path d="M8 12H3" /><path d="M21 20h-5" /><path d="M12 20H3" /><path d="M14 2v4" /><path d="M8 10v4" /><path d="M16 18v4" /></Stroke>,
  Dumbbell: (p) => <Stroke {...p}><path d="M6.5 6.5v11" /><path d="M17.5 6.5v11" /><path d="M3.5 9v6" /><path d="M20.5 9v6" /><path d="M6.5 12h11" /></Stroke>,
  TrendingUp: (p) => <Stroke {...p}><path d="M16 7h6v6" /><path d="m22 7-8.5 8.5-5-5L2 17" /></Stroke>,
};

export function ApproachGlyph({ name, ...props }: IconProps & { name: ApproachIcon }) {
  return approachIcons[name](props);
}

export function ClipboardListIcon(props: IconProps) {
  return <Stroke {...props}><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></Stroke>;
}

export function IndianRupeeIcon(props: IconProps) {
  return <Stroke {...props}><path d="M6 3h12" /><path d="M6 8h12" /><path d="m6 13 8.5 8" /><path d="M6 13h3" /><path d="M9 13c6.667 0 6.667-10 0-10" /></Stroke>;
}

export function PlusIcon(props: IconProps) {
  return <Stroke {...props}><path d="M5 12h14" /><path d="M12 5v14" /></Stroke>;
}

const faqIcons: Record<FaqIcon, (props: IconProps) => React.ReactElement> = {
  ClipboardList: (p) => <ClipboardListIcon {...p} />,
  MonitorPlay: (p) => <Stroke {...p}><path d="M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25A.75.75 0 0 1 10 12.25z" /><path d="M12 17v4" /><path d="M8 21h8" /><rect x="2" y="3" width="20" height="14" rx="2" /></Stroke>,
  IndianRupee: (p) => <IndianRupeeIcon {...p} />,
  Salad: (p) => <SaladIcon {...p} />,
  TrendingUp: (p) => <Stroke {...p}><path d="M16 7h6v6" /><path d="m22 7-8.5 8.5-5-5L2 17" /></Stroke>,
};

export function FaqGlyph({ name, ...props }: IconProps & { name: FaqIcon }) {
  return faqIcons[name](props);
}
