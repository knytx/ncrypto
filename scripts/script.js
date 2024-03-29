let state = {
  projects: [],
  newsletter: [],
  showSearch: false,
};

async function init() {
  await loadProjectAndNewsletterData();
  await loadGitHubData();
  // handleSearchInput();
}

async function loadProjectAndNewsletterData() {
  const data = await (await fetch("/data/engine.json")).json();
  if (data.projects) {
    // data.projects = data.projects.filter((project) => !project.hidden);
    // state.projects = data.projects.sort((a, b) => a.name.localeCompare(b.name));
    state.projects = data.projects;
    // console.log(state.projects)
  }
}

async function loadGitHubData() {
  const gitHubResponse = await fetch(
    "https://api.github.com/search/repositories?q=+org:n3nx+is:public&sort=name&order=asc&per_page=100"
  );
  if (gitHubResponse && gitHubResponse.ok) {
    const { items: repos } = await gitHubResponse.json();

    for (let i = 0; i < state.projects.length; i++) {
      const project = state.projects[i];
      const repo = repos.find(
        (el) => el.name === project.name || el.html_url === project.repo
      );
      if (repo) {
        project.description = repo.description;
        project.stargazers_count = repo.stargazers_count;
        project.language = repo.language;
        project.forks_count = repo.forks_count;
        project.open_issues_count = repo.open_issues_count;

        if (project.repo === null) {
          project.repo = repo.html_url;
        }
      }
    }
  }
  hydrateHtmlWithGitHubData();
}

function hydrateHtmlWithGitHubData() {
  for (let i = 0; i < state.projects.length; i++) {
    const project = state.projects[i];
    updateHtml(project.name, "star-count-", project.stargazers_count);
    updateHtml(project.name, "issue-count-", project.open_issues_count);
    updateHtml(project.name, "project-description-", project.description);
  }
}

function updateHtml(projectName, cssClass, innerHtml) {
  const htmlTags = document.body.querySelectorAll("." + cssClass + projectName);
  if (htmlTags) {
    if (innerHtml !== undefined) {
      // add innerHTML if given
      for (let j = 0; j < htmlTags.length; j++) {
        htmlTags[j].innerHTML = innerHtml;
      }
    } else {
      // remove HTML if no innerHtml value
      for (let j = 0; j < htmlTags.length; j++) {
        if (cssClass !== "project-description-") {
          // if its issue-count or star-count for GitHub Stats and no GitHub Data remove whole GitHub Stats
          htmlTags[j].parentNode.parentNode.removeChild(htmlTags[j].parentNode);
        } else {
          htmlTags[j].parentNode.removeChild(htmlTags[j]);
        }
      }
    }
  }
}

// search start
function toggleSearch() {
  state.showSearch = !state.showSearch;
  const searchOverlay = document.body.querySelector("#search-overlay");
  if (!searchOverlay) return;
  if (state.showSearch) {
    searchOverlay.style.display = "";
    document.body.querySelector("#search-input").focus();
  } else {
    searchOverlay.style.display = "none";

    const searchInput = document.body.querySelector("#search-input");
    if (!searchInput) return;
    searchInput.value = "";
    showAllSearchedProjects(state.projects);
  }
}

function escapeSearch(event) {
  if (event.key == "Escape") {
    toggleSearch();
  }
}

function handleSearchInput() {
  const searchInput = document.body.querySelector("#search-input");
  if (!searchInput) return;

  searchInput.addEventListener("input", (event) => {
    const search = event.target.value;
    const searchedProjects = state.projects.filter((p) =>
      JSON.stringify(p).toLowerCase().includes(search.toLowerCase())
    );
    // console.log(searchedProjects);
    showAllSearchedProjects(searchedProjects);
  });
}

function showAllSearchedProjects(searchedProjects) {
  for (let i = 0; i < state.projects.length; i++) {
    const card = document.body.querySelector(
      "#search-project-card-" + state.projects[i].name
    );
    if (!card) return;

    const isInSearchedProjects = searchedProjects.some((p) =>
      p.name.includes(state.projects[i].name)
    );
    if (isInSearchedProjects) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  }
}
// search end

document.addEventListener("DOMContentLoaded", () => {
  init();
});
