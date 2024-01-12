import React, { useState } from "react";
import fetchCommits from "./services/FetchCommits";
import SearchBox from "./components/searchbox/SearchBox";
import CommitChart from "./components/commitchart/CommitChart";
import RepositoryList from "./components/repositorylist/RepositoryList";
import Loader from "./components/loader/Loader";
import { generateRandomColor } from './utils/colorUtils'
import ErrorBoundary from './components/errorboundary/ErrorBoundary';
import { addMonths } from 'date-fns';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

const App = () => {

  const [selectedRepositories, setSelectedRepositories] = useState([]);
  const [commitData, setCommitData] = useState({});
  const [activeRepository, setActiveRepository] = useState(null);
  const [repositoryColors, setRepositoryColors] = useState({});
  const [commitCounts, setCommitCounts] = useState({});
  const [latestCommits, setLatestCommits] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchCommitData = async (repository) => {

    let commitCounts;
    let latestCommitDate;
    let commitCountsByWeek;
    let color;
    setLoading(true);

    const response = await fetchCommits(repository);

    if (response.data) {
      latestCommitDate = response.data.length > 0 ? response.data[0].commit.author.date : null;
      const data = response.data.reverse();
      commitCounts = data.length;
      const startDate = addMonths(new Date(), -4);  
  
      commitCountsByWeek = data.reduce((acc, commit) => {
        const commitDate = new Date(commit.commit.author.date);    
        const weeksDifference = Math.floor((commitDate - startDate) / (7 * 24 * 60 * 60 * 1000));
    
        acc[weeksDifference] = (acc[weeksDifference] || 0) + 1;
        return acc;
      }, {});
    
      setCommitData(prev => ({ ...prev, [repository]: commitCountsByWeek }));
      setCommitCounts(prev => ({ ...prev, [repository]: commitCounts }));
      setLatestCommits(prev => ({ ...prev, [repository]: latestCommitDate }));
    }
    setLoading(false);
  };

  const handleRepositorySelect = async (repo) => {
    try {
      setLoading(true);
      await fetchCommitData(repo);
      setSelectedRepositories((prev) => [...prev, repo]);

      const color = generateRandomColor();
      setRepositoryColors((prev) => ({ ...prev, [repo]: color }));
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  const handleRepositoryRemove = (repo) => {
    setSelectedRepositories((prev) => prev.filter((r) => r !== repo));
    setRepositoryColors((prevColors) => {
      const { [repo]: removedColor, ...restColors } = prevColors;
      return restColors;
    });

    setCommitData((prevData) => {
      const { [repo]: removedData, ...restData } = prevData;
      return restData;
    });

    setCommitCounts((prevCounts) => {
      const { [repo]: removedCount, ...restCounts } = prevCounts;
      return restCounts;
    });

    setLatestCommits((prevCommits) => {
      const { [repo]: removedCommit, ...restCommits } = prevCommits;
      return restCommits;
    });
  };

  const handleRepositoryHover = (repo) => {
    setActiveRepository(repo);
  };

  return (
    <ErrorBoundary>
      <div className="main-container">
        <div className="graph-container">
          {loading ? (
            <Loader />
          ) : (
            <CommitChart
              weeklyCounts={commitData}
              activeRepository={activeRepository}
              repoColors={repositoryColors}
            />
          )}
        </div>
        <div className="repositoy-container">
          <SearchBox onSelect={handleRepositorySelect} />
          <RepositoryList
            repositories={selectedRepositories}
            handleRepositoryRemove={handleRepositoryRemove}
            handleRepositoryHover={handleRepositoryHover}
            repositoryColors={repositoryColors}
            commitCounts={commitCounts}
            latestCommits={latestCommits}
          />
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </ErrorBoundary>

  );
};

export default App;