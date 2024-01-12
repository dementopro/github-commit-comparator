import handleApiRequest from './Api';
import subMonths from 'date-fns/subMonths';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fetchPage = async (page, repoName) => {
  const perPage = 100;
  const apiUrl = `/repos/${repoName}/commits?per_page=${perPage}&page=${page}`;
  try {
    const response = await handleApiRequest(apiUrl);
    console.log("🚀 ~ fetchPage ~ response:", response)
    if (response.error) {
      console.error(response.error)
      toast.error(`Error fetching commits. Please try again.`, {
        position: "bottom-right",
      });
      return { data: null, error: response.error };
    }

    return { data: response.data || [], error: null };
  } catch (error) {
    console.error(error)
    toast.error(`Error fetching commits. Please try again.`, {
      position: "bottom-right",
    });
    return { data: null, error };
  }
};

const fetchCommits = async (repoName) => {
  let allCommits = [];
  let currentPage = 1;

  try {
    let shouldContinue = true;

    while (shouldContinue) {
      const pageCommits = await fetchPage(currentPage, repoName);
      if (pageCommits.error) {
        return { data: null, error: pageCommits.error };
      }

      if (pageCommits.data.length === 0) {
        break;
      }
      const threeMonthsAgo = subMonths(new Date(), 3);

      const latestCommitDate = new Date(pageCommits.data[0].commit.author.date);
      const lastCommitDate = new Date(pageCommits.data[pageCommits.data.length - 1].commit.author.date);

      if (latestCommitDate >= threeMonthsAgo) {
        if (lastCommitDate < threeMonthsAgo) {
          const filteredCommits = pageCommits.data.filter(
            (commit) => new Date(commit.commit.author.date) >= threeMonthsAgo
          );

          allCommits = allCommits.concat(filteredCommits);
          shouldContinue = false;
        } else {
          allCommits = allCommits.concat(pageCommits.data);
        }
      } else {
        shouldContinue = false;
      }
      currentPage++;
    }

    return { data: allCommits, error: null };
  } catch (error) {
    return { data: null, error };
  }
};


export default fetchCommits;
