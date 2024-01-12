
# GitHub Commit Activity Explorer

GitHub Commit Comparator is a React-powered web application focused on simplifying the comparison of commit activity across various public GitHub repositories. The app streamlines the process of evaluating open-source libraries for integration into projects by specifically comparing commit counts. Users can easily explore and analyze the commit history of multiple repositories, aiding them in making informed decisions about the reliability and activity levels of different open-source projects. The app presents this data in a clear chart format, offering an intuitive and user-friendly experience for efficient repository assessment.

### Key Features:

1. **Commit Activity Comparison:**
- Easily compare the commit activity of multiple public GitHub repositories.
- Gain insights into the development activity and maintenance level of each repository.

2. **Interactive Chart Display:**
- Visualize commit counts on a per-week basis through an interactive chart.
- Understand the ebb and flow of commit activity over time for each selected repository.

3. **Dynamic Repository Management:**
- Add or remove repositories dynamically for a customizable and tailored comparison.
- Easily manage the list of repositories to suit specific project requirements.

4. **Real-time Data Updates:**
- Access real-time commit data from GitHub, ensuring that the information presented is up-to-date.
- Stay informed about the latest commit activity for better decision-making.

5. **User-Friendly Interface:**
- Enjoy a clean and intuitive interface designed for easy navigation and efficient repository analysis.
- Quickly grasp the relative commit activity of different repositories at a glance.

6. **Last Commit Date Information:**
- Display the date of the latest commit for each repository in a human-readable format.
- Quickly assess how recently a repository has been updated.

7. **Responsive Design:**
- Ensure a seamless user experience across devices with a responsive and adaptive design.
- Access GitHub Commit Comparator on desktops, tablets, and mobile devices.

## Project Setup

### Prerequisites:

1. **Node.js and npm:**
- Ensure that Node.js and npm are installed on your machine. You can download them from [https://nodejs.org/](https://nodejs.org/).

2. **Git:**
- Make sure you have Git installed. You can download it from [https://git-scm.com/](https://git-scm.com/).

### Clone and Install

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/dementopro/github-commit-comparator.git
2. **Navigate to the Project:**
    ```bash
    cd github-commit-comparator
3. **Install Dependencies:**
    ```bash
    npm install
4. **Start the Development Server:**
    ```bash
    npm start
5. **Access the App:**
- Open your web browser and navigate to http://localhost:3000/ to access the GitHub Commit Comparator.

### Usage

1. **Search and Add Repositories:**

- Use the search box to find and select GitHub repositories.
- Added repositories will be displayed in the list.

2. **Compare Commit Activity:**

- View the commit activity of the selected repositories in the interactive chart.

3. **Manage Repositories:**

- Remove repositories by clicking the delete button next to each repository.

4. **Hover Over Repositories:**

- Hover over each repository in the list to view the corresponding commit chart line one by one.


### Additional Notes

#### GitHub API Access:
- The application requires access to the GitHub API.
- In case your IP faces restrictions preventing access to the GitHub API, the app may experience limitations or disruptions. 

#### Deployment to Production:
To deploy the app to production, follow these steps:

- Configure a production build using the appropriate build tools (e.g., Webpack, Create React App).
- Choose a hosting platform such as GitHub Pages, Netlify, or Vercel.
- Set up your production environment and deploy the application.