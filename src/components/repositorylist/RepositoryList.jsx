import React, { useState } from "react";
import "./RepositoryList.css";
import { formatCommitDate, formatCount, formatRepositoryName } from "../../utils/formatUtils";

const RepositoryList = ({
  repositories,
  handleRepositoryRemove,
  handleRepositoryHover,
  repositoryColors,
  commitCounts,
  latestCommits,
}) => {
  const [hoveredRepo, setHoveredRepo] = useState(null);

  const handleMouseEnter = (repo, index) => {
    handleRepositoryHover(repo);
    setHoveredRepo(index);
  };

  const handleMouseLeave = () => {
    handleRepositoryHover(null);
    setHoveredRepo(null);
  };

  return (
    <div className="repository-list">
      {repositories.map((repo, index) => (
        <div
          key={repo}
          className={`repository-item ${hoveredRepo === index ? 'hd' : 'nhd'}`}
          onMouseEnter={() => handleMouseEnter(repo, index)}
          onMouseLeave={handleMouseLeave}
          style={{ "--repo-border-color": repositoryColors[repo] }}
        >
          <div className="repository-details">
            <div className="repository-title">
              <span>{formatRepositoryName(repo)}</span>
            </div>
            <div className="commit-detail">
              <div className="commit-count">
                <span>
                  <img src="/icons8-star.png" alt="*" />
                </span>
                <span>{formatCount(commitCounts[repo])}</span>
              </div>
              <div className="commit-date">
                <span>{formatCommitDate(latestCommits[repo])}</span>
              </div>
            </div>
          </div>
          <div className="remove-repository">
            <button onClick={() => handleRepositoryRemove(repo)}>
              <img src="/icons8-delete.svg" alt="Delete" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepositoryList;
