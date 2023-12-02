const defaultRepository = 'https://github.com/jaem1n207/lazy-dev';

type ReturnGitUrlParse = {
  protocol: string;
  owner: string;
  resource: string;
  name: string;
};

const githubUrlParse = (url: string): ReturnGitUrlParse => {
  const protocol = url.split('://')[0];
  const resource = url.split('/')[2];
  const owner = url.split('/')[3];
  const name = url.split('/')[4];

  return { protocol, owner, resource, name };
};

type GithubIssueUrlProps = {
  repository?: string;
  title: string;
  labels?: string;
};

export const getGithubIssueUrl = ({
  repository = defaultRepository,
  title,
  labels,
}: GithubIssueUrlProps) => {
  const { protocol, owner, resource, name } = githubUrlParse(repository);
  const url = `${protocol}://${resource}/${owner}/${name}/issues/new?title=${encodeURIComponent(
    title,
  )}&labels=${labels || ''}&assignees=${owner}`;

  return url;
};

export const DiscussionIds = {
  TopicIdea: 62,
} as const;
type UnionDiscussionIds = (typeof DiscussionIds)[keyof typeof DiscussionIds];

type GithubDiscussionUrlProps = {
  repository?: string;
  discussionId: UnionDiscussionIds;
};

export const getGithubDiscussionUrl = ({
  repository = defaultRepository,
  discussionId,
}: GithubDiscussionUrlProps) => {
  const { protocol, owner, resource, name } = githubUrlParse(repository);
  const url = `${protocol}://${resource}/${owner}/${name}/discussions/${discussionId}`;

  return url;
};
