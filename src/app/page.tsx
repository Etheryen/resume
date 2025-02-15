import { env } from "~/env";
import { getResume } from "~/requests/get-resume";
import Section from "./_components/section";
import Link from "next/link";
import { parsedDate } from "~/utils/parsed-date";
import {
  Award,
  BicepsFlexed,
  Briefcase,
  Github,
  Goal,
  GraduationCap,
  Languages,
  Linkedin,
  Mail,
  MapPin,
  PencilRuler,
  Phone,
  ShieldCheck,
} from "lucide-react";

// Slightly modified subset of JSON Resume schema
export type Resume = {
  basics: {
    name: string;
    image: string;
    email: string;
    phone: string;
    summary: string;
    location: {
      city: string;
      country: string;
      region: string;
    };
    profiles: {
      network: string;
      url: string;
    }[];
  };
  work: {
    name: string;
    position: string;
    startDate: string;
    endDate?: string;
    url?: string;
    summary: string;
  }[];
  education: {
    institution: string;
    url: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate?: string;
    summary?: string;
  }[];
  awards: {
    title: string;
    date: string;
    awarder: string;
    summary: string;
  }[];
  certificates: {
    name: string;
    date: string;
    issuer: string;
  }[];
  skills: {
    name: string;
    keywords: string[];
  }[];
  languages: {
    language: string;
    fluency: string;
  }[];
  interests: {
    name: string;
  }[];
  projects: {
    name: string;
    startDate: string;
    endDate?: string;
    url: string;
    description: string;
  }[];
};

export default async function HomePage() {
  const data = await getResume(env.GITHUB_USERNAME);

  if (!data) {
    return <div>error occured while fetching resume.json github gist</div>;
  }

  const {
    basics,
    work,
    education,
    awards,
    certificates,
    skills,
    languages,
    interests,
    projects,
  } = data;

  console.log(skills);

  const shortLinkedInUrl = basics.profiles
    .find((p) => p.network == "LinkedIn")!
    .url.replace("https://", "");

  const shortGitHubUrl = basics.profiles
    .find((p) => p.network == "GitHub")!
    .url.replace("https://", "");

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-24 py-20 text-slate-600">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 text-slate-600">
          <h1 className="pb-2 text-5xl font-semibold text-slate-700">
            {basics.name}
          </h1>
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-slate-500" />
            <span>
              {basics.location.city}, {basics.location.region},{" "}
              {basics.location.country}
            </span>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Mail className="h-6 w-6 text-slate-500" />
              <a href={`mailto:${basics.email}`}>{basics.email}</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-6 w-6 text-slate-500" />
              <span>{basics.phone}</span>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Linkedin className="h-6 w-6 text-sky-500" />
              <a
                href={basics.profiles.find((p) => p.network == "LinkedIn")!.url}
              >
                {shortLinkedInUrl}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Github className="h-6 w-6 text-slate-800" />
              <a href={basics.profiles.find((p) => p.network == "GitHub")!.url}>
                {shortGitHubUrl}
              </a>
            </div>
          </div>
        </div>
        {/* TODO: maybe use Image */}
        <img
          src={basics.image}
          alt="image"
          className="h-[9.5rem] rounded-lg border-2 border-slate-200"
        />
      </div>
      <div className="rounded-lg border-2 border-slate-200 bg-slate-100 p-4 text-lg">
        {basics.summary}
      </div>
      <Section title="Skills" icon={<BicepsFlexed />}>
        <div className="flex flex-wrap gap-x-12 gap-y-4">
          {skills.map((s, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="text-lg font-semibold">{s.name}</div>
              <div className="flex flex-wrap gap-2">
                {s.keywords.map((k, i) => (
                  <div
                    key={i}
                    className="rounded-full border-2 border-slate-200 bg-slate-100 px-2 text-slate-500"
                  >
                    {k}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Work experience" icon={<Briefcase />}>
        <div className="flex flex-col gap-4">
          {work.map((w, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex justify-between text-lg">
                <div>
                  <span className="font-semibold">{w.position}</span>
                  {w.url ? (
                    <>
                      <span className="text-slate-500"> | </span>
                      <Link href={w.url} className="text-slate-500 underline">
                        {w.name}
                      </Link>
                    </>
                  ) : (
                    <span className="text-slate-500"> | {w.name}</span>
                  )}
                </div>
                <div className="shrink-0 whitespace-nowrap pl-4 font-semibold">
                  {parsedDate(w.startDate)} –{" "}
                  {w.endDate ? parsedDate(w.endDate) : "Current"}
                </div>
              </div>
              <div className="text-justify">{w.summary}</div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Projects" icon={<PencilRuler />}>
        <div className="flex flex-col gap-4">
          {projects.map((p, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex justify-between text-lg">
                <div className="font-semibold">{p.name}</div>
                <div className="shrink-0 whitespace-nowrap pl-4 font-semibold">
                  {parsedDate(p.startDate)} –{" "}
                  {p.endDate ? parsedDate(p.endDate) : "Current"}
                </div>
              </div>
              <Link href={p.url} className="underline">
                {p.url}
              </Link>
              <div className="text-justify">{p.description}</div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Education" icon={<GraduationCap />}>
        <div className="flex flex-col gap-4">
          {education.map((e, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex justify-between text-lg">
                <div>
                  <span className="font-semibold">
                    {e.studyType ? e.studyType + " of " : ""}
                    {e.area}
                  </span>
                  <span className="text-slate-500"> | </span>
                  <Link href={e.url} className="text-slate-500 underline">
                    {e.institution}
                  </Link>
                </div>
                <div className="shrink-0 whitespace-nowrap pl-4 font-semibold">
                  {parsedDate(e.startDate)} –{" "}
                  {e.endDate ? parsedDate(e.endDate) : "Current"}
                </div>
              </div>
              {e.summary && <div className="text-justify">{e.summary}</div>}
            </div>
          ))}
        </div>
      </Section>
      <Section title="Awards" icon={<Award />}>
        <div className="flex flex-col gap-4">
          {awards.map((a, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex justify-between text-lg">
                <div>
                  <span className="font-semibold">{a.title}</span>
                  <span className="text-slate-500"> | {a.awarder}</span>
                </div>
                <div className="shrink-0 whitespace-nowrap pl-4 font-semibold">
                  {parsedDate(a.date)}
                </div>
              </div>
              <div className="text-justify">{a.summary}</div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Certificates" icon={<ShieldCheck />}>
        <div className="flex flex-col gap-4">
          {certificates.map((c, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex justify-between text-lg">
                <div>
                  <span className="font-semibold">{c.name}</span>
                  <span className="text-slate-500"> | {c.issuer}</span>
                </div>
                <div className="shrink-0 whitespace-nowrap pl-4 font-semibold">
                  {parsedDate(c.date)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Languages" icon={<Languages />}>
        <div className="flex gap-10">
          {languages.map((l, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="text-lg font-semibold">{l.language}</div>
              <div className="text-slate-500">{l.fluency}</div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Interests" icon={<Goal />}>
        <div className="flex gap-10">
          {interests.map((int, i) => (
            <div key={i} className="text-lg font-semibold">
              {int.name}
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
