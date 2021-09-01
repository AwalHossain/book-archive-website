// Selector
const input = document.getElementById('input');
const searchBtn = document.getElementById('search')
const column = document.querySelector('.column')

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
    .catch(error => {
        console.log(error, "not found");
    })
   
}


const showBooks = (data) =>{
    const bookDetails = data.docs;
    bookDetails.forEach(book =>{
        console.log(book);
        column.innerHTML += `
        <div class="col ">
        <div class="card">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid text-center" alt="...">
        <div class="card-body">
          <h5 class="card-title">Book-Name: ${book.title}</h5>
          <h6>Author: ${book.author_name}</h6>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
        </div>
        </div>
        `
        // const div = document.createElement('div');
        // div.classList.add( "col-4","g-3", "text-center", "border" ,"border-2")
        //   div.innerHTML =`
        //   <img width="350px" class="img-fluid" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"?alt='not available'>
        //   <h3>Book-Name: ${book.title}</h3>
        //   <h4>Author: ${book.author_name}</h4>
        // <p></p>
        //   `
        //   console.log("bold");
     
    
        // card.appendChild(div)

    })
}

