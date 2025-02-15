import { type Resume } from "~/app/page";

type Gists = {
  files: Record<string, { raw_url: string }>;
}[];

export const getResume = async (username: string) => {
  try {
    const gists = (await (
      await fetch(`https://api.github.com/users/${username}/gists`)
    ).json()) as Gists;

    const rawURL = gists.find((gist) => gist.files["resume.json"])!.files[
      "resume.json"
    ]!.raw_url;

    return (await (await fetch(rawURL)).json()) as Resume;
  } catch (e) {
    console.error(e);
    return null;
  }
};
