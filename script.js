
// let profileBtn = 
async function getProfile() {
    let userName = document.querySelector('#userName').value;
    let url = `https://api.github.com/users/${userName}`;
    let html = "";
    let profileDisplay = document.querySelector("#profile");
    profileDisplay.innerHTML = "Loading data...";

    try {

        let profileData = await fetch(url);
        let profile = await profileData.json();
        // console.log(profile);

        html += `
        <div class="p-2 m-3 d-flex flex-column justify-content-center align-items-center text-light">
            <img src="${profile["avatar_url"]}" class="w-50 h-50 rounded-circle m-1 mt-3">
            <h3 class="m-1">${profile.name}</h3>
            <p class="m-1">${profile.bio}</p>
            <div class="d-flex p-2">
                <h6 class="m-1">Location: ${profile.location}</h6>
                <h6 class="m-1"> Company: ${profile.company}</h6>
                <h6 class="m-1">Email: ${profile.email}</h6>
            </div>
                <div class="d-flex p-2 class="m-1"">
                <h6 class="m-1">Public Repo's: ${profile.public_repos}</h6>
                <h6 class="m-1">Public gists: ${profile.public_gists}</h6>
            </div>
                <div class="d-flex p-2 class="m-1"">
                <h6 class="m-1">Followers: ${profile.followers}</h6>
                <h6 class="m-1">Following: ${profile.following}</h6>
            </div>
            <a class="btn btn-light" href="${profile.html_url}" target="_blank">GitHub Profile</a>
        </div>
        `;
        // console.log(profile.avatar_url);
        profileDisplay.innerHTML = html;

        ReposUrl = `${profile.repos_url}`;
        // console.log(ReposUrl);
        return ReposUrl;
    } catch (error) {
        console.log(error)
        profileDisplay.innerHTML = "Error loading the profile data";
    }
}


async function getRepos(url, page = 1, prevResp = []) {
    url = await getProfile();
    // console.log(ReposUrl);
    let reposDisplay = document.querySelector("#repo");
    reposDisplay.innerHTML = "Loading...";
    let perPage = document.querySelector("#perPage").value;
    // let page = 1;

    `${ReposUrl}?per_page=${perPage}`;

    try {
        // url = await getProfile();
        reposUrl = `${url}?page=${page}`;
        // console.log(reposUrl);

        let reposData = await fetch(`${reposUrl}}`);
        let repos = await reposData.json()
        
        // .then((newResp) => {
        //     resp = [...prevResp, ...newResp];
        //     if (newResp.length !== 0) {
        //         page++
        //         return getRepos();
        //     }
        //     return resp;
        // })

        // console.log(resp);


        reposDisplay.innerHTML = repos;
        let html = "";
        let id = 1;

        repos.forEach(element => {
            html += `
            <div class="d-flex flex-column justify-content-center align-items-center text-dark border w-100 m-1 p-2">
            <h5>${id} - ${element.name}</h5>
            <a href="${element.html_url}" target="_blank" class="btn btn-dark m-2">View Code</a>
            </div>
            `;
            id++;
        });
        // console.log(profile.avatar_url);
        reposDisplay.innerHTML = html;

    } catch (error) {
        console.log(error);
    }

}

