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

}
const getCategoryById = async (category_id) => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data);
}
const displayCategories = (categoryItem) => {
    console.log(categoryItem);
    const categoryContainer = document.getElementById('categories-container');
    categoryContainer.textContent = ``;
    if (categoryItem.length === 0) {
        dataNotFound(categoryContainer);
    }
    categoryItem.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="row bg-light p-3">
               <div class="col-3">
                    <img src="${item.thumbnail_url}" class="img-fluid rounded-start w-100" alt="...">
                </div>
                <div class="col-9">
                    <div">
                        <h5>${item.title}</h5>
                        <p class="text-muted">${item.details.length > 400 ? item.details.slice(0, 400) : item.details}</p>
                        <p><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        `;
        categoryContainer.appendChild(div);
    });
    toggleSpinner(false)
}

const dataNotFound = (categoryContainer, categoryItem) => {
    const div = document.createElement('div');
    div.innerHTML = `
    <h1 class='text-warning text-center'>There is no data found</h1>
    `
    categoryContainer.appendChild(div);
};
// spinner show and hide
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