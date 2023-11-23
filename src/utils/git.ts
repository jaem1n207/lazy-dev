const DEFAULT_REPOSITORY = 'https://github.com/jaem1n207/lazy-dev';

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
  repository = DEFAULT_REPOSITORY,
  title,
  labels,
}: GithubIssueUrlProps) => {
  const { protocol, owner, resource, name } = githubUrlParse(repository);
  const url = `${protocol}://${resource}/${owner}/${name}/issues/new?title=${encodeURIComponent(
    title,
  )}&labels=${labels || ''}&assignees=${owner}`;

  return url;
};

const DiscussionIds = {
  topicIdea: 62,
} as const;

type GithubDiscussionUrlProps = {
  repository?: string;
  discussionId: keyof typeof DiscussionIds;
};

export const getGithubDiscussionUrl = ({
  repository = DEFAULT_REPOSITORY,
  discussionId,
}: GithubDiscussionUrlProps) => {
  const { protocol, owner, resource, name } = githubUrlParse(repository);
  const url = `${protocol}://${resource}/${owner}/${name}/discussions/${discussionId}`;

  return url;
};
