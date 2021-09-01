// Selector
const input = document.getElementById('input');
const searchBtn = document.getElementById('search')


searchBtn.addEventListener('click', ()=>{
    const searchText = input.value
    console.log(searchText);
    const url = `http://openlibrary.org/search.json?q=${searchText}`; 
    fetchApi(url)
    input.value = ''
})


const fetchApi = (url) =>{
    fetch(url)
    .then(response => response.json())
    .then(data => showBooks(data))
   
}


const showBooks = (data) =>{
    const bookDetails = data.docs;
    bookDetails.forEach(book =>{
        console.log(book.title);
        
    })
}

