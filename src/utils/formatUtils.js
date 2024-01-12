export const formatCommitDate = (commitDate) => {
  const parsedDate = Date.parse(commitDate);

  if (isNaN(parsedDate) || !commitDate) {
    return "No Date";
  }

  const today = new Date();
  const commitDateTime = new Date(parsedDate);
  const timeDifference = today - commitDateTime;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `Updated last ${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `Updated last ${minutes} minutes ago`;
  } else if (hours < 24) {
    return `Updated last ${hours} hours ago`;
  } else if (days < 30) {
    return `Updated last ${days} days ago`;
  } else {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return `Updated on ${commitDateTime.toLocaleDateString(undefined, options)}`;
  }
};

export const formatCount = (count) => {
  if (!count) {
    return "No Commits";
  }

  if (count >= 1000) {
    const countInK = Math.floor(count / 1000);
    return `${countInK}k`;
  }

  return count;
};

export const formatRepositoryName = (repoName) => {
  const parts = repoName.split('/');
  const lastPart = parts[parts.length - 1];

  if (parts.length > 1) {
    return (
      <span>
        <span>{parts.slice(0, -1).join('/')}</span> / <span style={{ fontWeight: 'bold' }}>{lastPart}</span>
      </span>
    );
  }

  return <span style={{ fontWeight: 'bold' }}>{lastPart}</span>;
};