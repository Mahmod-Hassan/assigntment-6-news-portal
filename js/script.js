// load all categories button
const loadCategoryButton = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategoryButton(data.data.news_category
        ))
        .catch(err => {
            throw (err);
        })
};
//call the above function
loadCategoryButton();

const displayCategoryButton = (categories) => {
    const categoryButtonContainer = document.getElementById('categories-btn-container');
    categories.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick=getNewsById("${category.category_id}") class='btn'>${category.category_name}</button>
        `
        categoryButtonContainer.appendChild(div);
    })

};

const countNews = (newsLength) => {
    document.getElementById('found-news-container').innerText = `${newsLength} news found`;
}

const getNewsById = async (category_id) => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data);
    } catch (err) {
        throw (err)
    }

};


// display all news dynamically
const displayNews = (allNews) => {
    countNews(allNews.length);
    const categoryContainer = document.getElementById('all-news-container');
    categoryContainer.textContent = ``;
    if (allNews.length === 0) {
        dataNotFound(categoryContainer);
    }
    allNews.forEach(item => {

        const div = document.createElement('div');
        div.style.backgroundColor = 'white';
        div.innerHTML = `
            <div data-bs-toggle="modal" href="#exampleModalToggle" onclick=getNewsDetailsById('${item._id}') class="row p-3 mb-5">
               <div class="col-sm-12 col-lg-3 mb-sm-5 mb-lg-0">
                    <img src="${item.thumbnail_url}" class="img-fluid rounded-start w-100" alt="...">
                </div>
                <div class="col-sm-12 col-lg-9">
                    <div class='align-content-center'>
                        <h5>${item.title}</h5>
                        <p class="text-muted">${item.details.length > 500 ? item.details.slice(0, 500) : item.details}</p>
                        <div class='d-flex align-items-center justify-content-evenly gap-5'>
                            <div class='d-md-flex align-items-center gap-2'>
                                <div>
                                    <img style="width:70px; border-radius:50%" src="${item.author.img}"/>
                                </div>
                                <div>
                                    <small>${item.author.name ? item.author.name : 'no name found'}</small><br/>
                                    <small>${item.author.published_date}</small>
                                </div>
                            </div>
                            <div>
                           <i class="fa-regular fa-eye"></i>
                           <span>${item.total_view ? item.total_view + 'M' : 0}</span>
                            </div>
                            <div>
                                 <i class="fa-solid fa-star"></i>
                                 <i class="fa-solid fa-star"></i>
                                 <i class="fa-solid fa-star"></i>
                                 <i class="fa-solid fa-star"></i>
                                 <i class="fa-solid fa-star"></i>
                            </div>
                            <div>
                            <i class="fa-solid fa-arrow-right text-primary"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        categoryContainer.appendChild(div);
    });
    toggleSpinner(false)
}

// get particular news by id
const getNewsDetailsById = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
}
// display news details with modal
const displayNewsDetails = (data) => {
    console.log(data);
    const newsTitle = document.getElementById('news-title');
    newsTitle.innerHTML = `
    <p><strong>Title</strong> : ${data.title}</p>
    `;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
       <img style="width:200px;border-radius:50%" src="${data.author.img}" alt=""/>
       <p>author name : <strong>${data.author.name ? data.author.name : 'not found'}</strong></p>
       <p>total view : <strong>${data.total_view ? data.total_view + 'M' : 'not found'}</strong></p>
    `
}

// data not found error message is here
const dataNotFound = (categoryContainer) => {
    const div = document.createElement('div');
    div.innerHTML = `
    <h1 class='text-warning text-center'>There is no data found</h1>
    `
    categoryContainer.appendChild(div);
};


// toggle spinner function is here
const toggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('d-none')
    } else {
        spinner.classList.add('d-none');
    };
};
// calling getNewsById function to get default value
getNewsById('01');

