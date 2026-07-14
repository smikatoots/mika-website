export type ChallengeFrontmatter = {
  title: string;
  description: string;
  published: string;
};

export type ChallengeIndexEntry = ChallengeFrontmatter & {
  slug: string;
};
