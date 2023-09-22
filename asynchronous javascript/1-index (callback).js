function getUser(id, callback) {
    console.log('Reading a user from a database...');
    setTimeout(() =>  {
        callback({ id: id, gitHubUsername: 'mosh' });
    }, 2000);
}

function getRepositories(username, callback) {
    console.log('Calling GitHubAPI...');
    setTimeout(() => {
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}

function displayRepositories(repos) {
    console.log('Repos', repos);
}
function displayUser(user) {
    console.log('User', user);
    getRepositories(user.gitHubUsername, displayRepositories);
}

console.log('Before');
getUser(1, displayUser);
console.log('After');
