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
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

console.log('Before');
getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repos => console.log('Repos', repos))
    .catch(err => console.error(err.message));
console.log('After');
