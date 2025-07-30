let searchInputEl = document.getElementById("searchInput");
let searchResultEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");


function createAndAppendSearchResult(result){
    //creating result item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultEl.appendChild(resultItemEl);

    //creating title element
    let {link, title, description} = result;
    let resultTitleEl = document.createElement("a");
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultTitleEl.textContent = title;
    resultTitleEl.classList.add("result-title");
    resultItemEl.appendChild(resultTitleEl);

    //creating break element
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    //creating url element
    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    urlEl.classList.add("result-url");
    resultItemEl.appendChild(urlEl);

    //creating break element
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    //adding description
    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("link-description");
    resultItemEl.appendChild(descriptionEl);
}


function displayResult(search_results){
    spinnerEl.classList.toggle("d-none");
    for(let result of search_results){
        createAndAppendSearchResult(result);

    }
    
}


function wikipediaSearch(event){
    if(event.key === "Enter"){
        spinnerEl.classList.toggle("d-none");
        searchResultEl.textContent = "";
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url,options)
            .then(function(response){
                return response.json();
            })
            .then(function(jsonData){
                let{search_results} = jsonData;
                displayResult(search_results);
            })
        
    }
}


searchInputEl.addEventListener("keydown",wikipediaSearch);