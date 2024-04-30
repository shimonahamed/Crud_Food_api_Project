const searcheInput=document.getElementById("searcheInput")
const btnsearche=document.getElementById("btnsearche")
const foodDispalyapi=document.getElementById("foodDispalyapi")
const modalInfo = document.getElementById("modal-info");
const topToBtn = document.getElementById("topToBtn");

window.addEventListener("load",getData)
btnsearche.addEventListener("click", getData)
topToBtn.addEventListener("click", toToScroll);

function getData(){
    document.getElementById("spinner").classList.remove("d-none")
    const foodname=searcheInput.value
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodname}`;


    fetch(url)
        .then((res)=>res.json())
        .then((data)=>{
            document.getElementById("spinner").classList.add("d-none")

            displayCarts(data.meals)
        })
        .catch((error)=>{
            console.log(error)
        })
}
function displayCarts(data){
    if(!data){
        foodDispalyapi.innerHTML="<h1 class='text-center mt-5 bg-light text-dark'>No Data Found</h1>";
        return
    }

    let childapi=""
    for(let item of data){
        const {strMealThumb, strMeal, strInstructions, idMeal}=item;
        let html = ` 

 <div class="col-3 pt-4">
 <div class="card ">
              <figure><img class="card_img  " src=${item.strMealThumb} alt="images"/> </figure>
            <div class="card-body">
              <h3 class="card-title">${item.strMeal}</h3>
              <p>${item.strInstructions.slice(0,100)} </p>
              <div class="card-actions justify-end">
                <label for="my-modal-6" class="btn btn-warning text-white" onclick="modalFn(${idMeal})">
                  View Details</label>
              </div>
            </div>
          </div>
</div>`
        childapi=childapi + html
    }


    foodDispalyapi.innerHTML=childapi;
}
function modalFn(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            modalInfo.innerHTML = "";
            let html = `<div class="card card-compact bg-base-100 shadow-xl">
                    <figure>
                      <img
                        class="w-full h-96 object-cover"
                        src=${data.meals[0].strMealThumb}
                        alt="images"
                      />
                    </figure>
                  <div class="card-body">
                    <h2 class="card-title text_white">${data.meals[0].strMeal}</h2>
                    <p class="text_white">
                    ${data.meals[0].strInstructions}
                    </p>
                  </div>
              </div>;`;
            modalInfo.innerHTML = html;
        })
        .catch((error) => {
            console.log(error);
        });
}

function toToScroll() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

function scrolling() {
    const px = window.pageYOffset;
    if (px > 200) {
        topToBtn.classList.remove("opacity-0", "invisible");
    } else {
        topToBtn.classList.add("opacity-0", "invisible");
    }
}