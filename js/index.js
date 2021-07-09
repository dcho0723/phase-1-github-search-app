document.querySelector('#github-form').addEventListener('submit', (e) => {
    e.preventDefault()
    let userId = e.target[0].value
    fetchData(userId)
    fetchUserRepo(userId)
})

function fetchData (userId) {
    fetch(`https://api.github.com/search/users?q=${userId}`)
    .then(resp => resp.json())
    .then (data => data.items.forEach(userData))
}

function fetchUserRepo(userId) {
    fetch(`https://api.github.com/users/${userId}/repos`)
    .then(resp => resp.json())
    .then (data => data.forEach(userRepos))
}


function userData(user) {
    // console.log(user)

    let userContainer = document.createElement('div')
    let userId = document.createElement('h1')
    let userAvatar = document.createElement('img')
    let userURL = document.createElement('a') 
    

    userAvatar.className = 'userAvatar'

    userId.textContent = user.login
    userAvatar.src = user.avatar_url
    userURL.href = user.html_url
    userURL.textContent= "Click Here For Profile"

    userContainer.append(userId, userAvatar, userURL)

    document.querySelector('#github-form').append(userContainer)


}




function userRepos(userRepo) {
    document.querySelector('.userAvatar').addEventListener('click', () => {
        // console.log(e)
        let repoList = document.createElement('li')
        repoList.textContent= ""
        repoList.textContent = userRepo.full_name
        
        let grabList = document.querySelector('#repos-list')
    
        grabList.append(repoList)
    })

}