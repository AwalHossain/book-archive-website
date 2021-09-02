// Selector
const input = document.getElementById('input');
const searchBtn = document.getElementById('search')
const column = document.querySelector('.column')
const container = document.querySelector('.container')
const resultFound = document.querySelector('.result-found');
const displayError = document.querySelector('.displayError')
searchBtn.addEventListener('click', ()=>{
    const searchText = input.value
    if(searchText === ''){
        console.log('Please input valid name');
        displayError.style.display = 'block';
    displayError.innerText = `Put something in the input field`;
    resultFound.style.display = 'none'
        column.textContent = '';
    }
    else{
        resultFound.style.display = 'block';
        displayError.style.display = 'none';
        const url = `http://openlibrary.org/search.json?q=${searchText}`; 
        fetchApi(url)
    }

    input.value = ''
})


const fetchApi = (url) =>{
    fetch(url)
    .then(response => response.json())
    .then(data => showBooks(data))
    .catch(error =>
        {
console.log(error);
        }
         )
    // const showError =() =>{
    //     console.log(error)
    //     displayError.innerText= `Sorry not available`
    // }
}

//display error if not found search result




let num = 0;
const showBooks = (data) =>{
    const bookDetails = data.docs;
    container.textContent = '';
    
    
    console.log(bookDetails.length);
    bookDetails.forEach(book =>{
        console.log(book);
        num++;
        if(num === 20){
            resultFound.style.display = 'block';
            resultFound.innerText = `We have got total ${bookDetails.length} result but only showing you 20` 
            displayError.style.display = 'none';
          bookDetails.length=0;
        }
        else if(num == 0){
            console.log("not");
        }
        else{
            column.innerHTML += `
            <div class="col ">
            <div class="card">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid text-center" alt="...">
            <div class="card-body">
              <h5 class="card-title">Book-Name: ${book.title}</h5>
              <h6>Author: ${book.author_name}</h6>
              <h6>First-Publication: ${book.first_publish_year}</h6>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            </div>
            </div>
            `
        }

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

