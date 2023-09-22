function getUser(id) {
    return new Promise((resolve, reject) => {
        console.log('Reading a user from a database...');
        setTimeout(() =>  {
            resolve({ id: id, gitHubUsername: 'mosh' });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        console.log('Calling GitHubAPI...');
        setTimeout(() => {
            //resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error('Could not get the repos'));
        }, 2000);
    });
}

console.log('Before');

async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        console.log(repos);
    } catch(e) {
        console.error('Error', e.message);
    }
}
displayCommits();

console.log('After');