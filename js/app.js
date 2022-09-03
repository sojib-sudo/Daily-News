// for getting all categories 
const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(response => response.json())
    .then(data => displayCategory(data.data.news_category));
}

// display all news categories
const displayCategory = categories => {
    const newsCategoryField = document.getElementById('news-catagory-field')
    categories.forEach(element => {
        //console.log(element);
        const newsCategoryNamesDiv = document.createElement('div');
        newsCategoryNamesDiv.innerHTML = ` 
           <button onclick="getNewsId('${element.category_id}')" type="button" class="btn-style btn-hover"><h6>${element.category_name}</h6></button> 
       ` 
       
       newsCategoryField.appendChild(newsCategoryNamesDiv);
    });
}

loadCategory();


// getting category ID 
const getNewsId = news_id => {

    spinner(true); // start spinner

    const url = `https://openapi.programming-hero.com/api/news/category/${news_id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsDetail(data.data))
}

// desplaying the news
const displayNewsDetail = newsArray =>{
    displayTotalNews(newsArray); // this is for total number of news

    const displayNewsFiled = document.getElementById('display-news-field');
    displayNewsFiled.innerHTML = '';
    
    newsArray.sort((a, b) => b.total_view - a.total_view); // array elements shorted 
    
    newsArray.forEach(news =>{
        const displayElementDiv = document.createElement('div');
        displayElementDiv.innerHTML = `
        <div class="row mt-5 border-0 rounded bg-light p-4">
            <div class="col-4">
                <img src="${news.thumbnail_url}" class="img-fluid rounded" alt="">
            </div>
            <div class="col-8">
                <h4 class="">${news.title}</h4>
                <p>${news.details.slice(0,200)+'...'}</p>
                <div class="row">
                    <div class="col-4">
                        <div class="row align-items-center">
                            <div class="col-4">
                                <img class="img-header m-0 p-0" src="${news.author.img}" width="30" height="30" alt="">
                            </div>
                            <div class="col-8 m-0 p-0">
                                <h6>${news.author.name? news.author.name:'No name Found'}</h6>
                                <p>${news.author.published_date? news.author.published_date: 'no date found'}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-4"><i class="fa-solid fa-eye"></i>${news.total_view? news.total_view: 'Not found'}</div>
                    <div class="col-4"><button  class="btn btn-outline-primary">See more</button></div>
                </div>
            </div>
        </div>
        `

        displayNewsFiled.appendChild(displayElementDiv);
    })

    spinner(false); // stop spinner 

}