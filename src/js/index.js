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

function updateList(dataList) {
  const postlist = qs('.post-list');
  const postlistEmpty = qs('.post-list-empty');

  if(dataList.length > 0) {
    postlistEmpty.classList.add('hidden');
    postlist.classList.remove('hidden');
    postlist.innerHTML = '';  //先清空資料

    dataList.forEach((data, idx) => {
      const story = document.createElement('li');
      story.classList.add('rounded-lg','border-2','border-black-100','p-6','shadow-card');
      story.innerHTML =
      ` <div class="mb-4 flex items-center">
          <img
            src="${data.user.photo}"
            alt="avatar"
            class="mr-4 h-[45px] w-[45px] flex-shrink-0 object-cover rounded-full"
          />
          <div class="flex-grow">
            <a
              href="./personal-wall.html"
              class="font-bold text-black-100 hover:text-primary hover:underline"
              >${data.user.name}</a
            >
            <div class="font-baloo text-xs leading-5 text-gray-300">
              2022/1/10 12:00
            </div>
          </div>
        </div>
        <p class="text-black-100">
          ${data.content}
        </p>
        <picture>
          <source
            media="(min-width: 1024px)"
            srcset="../static/images/dynamic-wall/post-photo@2x.png"
          />
          <img
            class="mt-4"
            src="../static/images/dynamic-wall/post-photo.png"
            alt="post photo"
          />
        </picture>
      `;

      postlist.append(story)
    });




  }
}