function init() {
  getPost();
}

function getPost () {
  fetch('http://127.0.0.1:3000/posts')
    .then(res => res.json())
    .then(posts => {
      updateList(posts.data)
    })
    .catch(error => console.error(error))
}

function updateList(data) {
  const postlist = qs('.post-list');
  const postlistEmpty = qs('.post-list-empty');
  if(data.length > 0) {
    postlistEmpty.classList.add('hidden');
    postlist.classList.remove('hidden');
  }
}