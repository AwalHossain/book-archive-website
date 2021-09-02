// Selector section where all the selector are stacked together
const input = document.getElementById('input');
const searchBtn = document.getElementById('search')
const column = document.querySelector('.column')
const container = document.querySelector('.container')
const resultFound = document.querySelector('.result-found');
const displayError = document.querySelector('.displayError')
const notFound= document.querySelector('.not-found')
const errorPart = document.querySelector('.error-part')
const spinner = document.querySelector('.hidden')

// Global call 
displayError.style.display = 'none';
spinner.style.display= 'none'

//=================== Toggle spinner section ==================
const toggleSpinner = showSpinner =>{
    spinner.style.display = showSpinner
} 
//=================== Toggle searchResult section ==================
const toggleSearchResult = showSpinner =>{
    column.style.display = showSpinner
} 
//================search input function======================== 
searchBtn.addEventListener('click', ()=>{

    const searchText = input.value
    notFound.style.display='none'
    toggleSpinner('block');
    toggleSearchResult('none')
    resultFound.style.display = 'none'
    // if input is empty then this condition will be true
    if(searchText === ''){
        console.log('Please input valid name');
        displayError.style.display = 'block';
        displayError.innerText = `Put something in the input field`;
        resultFound.style.display = 'none'
        notFound.style.display='none'
        column.textContent = '';
        toggleSpinner('none');
    }
    else{
        displayError.style.display = 'none';
        const url = `http://openlibrary.org/search.json?q=${searchText}`; 
        fetchApi(url)
    }

    input.value = ''
})


//==============Fetching Book API========================
const fetchApi = (url) =>{


        
            fetch(url)
            .then(response => response.json())
            .then(data => showBooks(data))
            .catch(error => showError(error))
}

//===============display error if not found search result===================
const showError = error =>{
    console.log(error)
    displayError.style.display = 'block';
    resultFound.style.display = 'none';
}


//  Display result below this function
const showBooks = (data) =>{
    const bookDetails = data.docs;

    container.textContent = '';
    // ====if books not found then show error else show the result with this condition
    if(bookDetails.length == 0){
        console.log("not found");
        notFound.style.display = 'block';
        notFound.innerText = "Sorry, not found"
        resultFound.style.display = 'none';
        toggleSpinner('none');
    }
    else{
        console.log(data.num_found);
        let img;
        // loop through all the data to get the exact data with the help of forEach
        bookDetails.forEach(book =>{

                resultFound.style.display = 'block';
                displayError.style.display = 'none';
                notFound.style.display = 'none'
                resultFound.innerText = `We have got total ${data.num_found} result & showing you ${bookDetails.length}` 

                //=======some publisher is not defined that's why need a conditon=======
                let publisher;
                if(book.publisher === undefined){
                    publisher = "not available"
                  }
                else{
                  publisher =    book.publisher[0];
                   }
                 //=======some image is not working so,that's why need a defult one======= 
                if( book.cover_i === undefined ){
                 img = `img/image-not-available.svg`;
                }
                else{
                     img = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
                }
                // ===== And at last, show the result with innerHTML

                column.innerHTML += `
                <div class="col ">
                <div class="card">
                <img src=${img} class=" text-center mx-auto" width="337px"  height="330px" alt="...">
                <div class="card-body">
                  <h5 class="card-title text-primary">Book-Name: ${book.title}</h5>
                  <h6>Author: ${book.author_name}</h6>
                  <h6>First-Publication: ${book.first_publish_year}</h6>
                  <h6> Publisher: ${publisher} </h6>
                  
                </div>
                </div>
                </div>
                `
            
    
    
    
        })
        toggleSpinner('none');
        toggleSearchResult('flex')
    }   
    

}

