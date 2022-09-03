const category = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category
        ))
}
const displayCategory = (categories) => {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        console.log(category);
        const div = document.createElement('div');
        div.innerHTML = `
        <button class='btn light'>${category.category_name}</button>
        `
        categoriesContainer.appendChild(div);
    })

}
category();