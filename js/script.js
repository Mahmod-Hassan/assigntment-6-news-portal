const category = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategoryButton(data.data.news_category
        ))
}
const displayCategoryButton = (categories) => {
    const categoryButtonContainer = document.getElementById('categories-btn-container');
    categories.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick=getCategoryById("${category.category_id}") class='btn light'>${category.category_name}</button>
        `
        categoryButtonContainer.appendChild(div);
    })

};


const getCategoryById = async (category_id) => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data);
}
const displayCategories = (categoryItem) => {
    const categoryContainer = document.getElementById('categories-container');
    categoryContainer.textContent = ``;
    if (categoryItem.length === 0) {
        dataNotFound(categoryContainer);
    }
    categoryItem.forEach(item => {
        console.log(item);
        const div = document.createElement('div');
        div.style.backgroundColor = 'white';
        div.innerHTML = `
            <div class="row p-3 mb-5">
               <div class="col-sm-12 col-lg-3">
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
                                    <small>${item.author.name}</small><br/>
                                    <small>${item.author.published_date}</small>
                                </div>
                            </div>
                            <div>
                           <i class="fa-regular fa-eye"></i>
                           <span>${item.total_view}</span>
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

// data not found error message is here
const dataNotFound = (categoryContainer, categoryItem) => {
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
}
getCategoryById('01')
category();