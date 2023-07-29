let form = document.getElementById('form');
let price=document.getElementById('sell-price');
let product = document.getElementById('product-name');
let category = document.getElementById('category');

let ulElectronics = document.getElementById('Electronics');
let ulFood = document.getElementById('food');
let ulSkincare = document.getElementById('Skincare');
let phone = document.getElementById('tel');
let mainDiv = document.getElementById('items-div');




form.addEventListener('submit',(e) => {


    e.preventDefault();

    axios({
        method:'put',
        url: `https://crudcrud.com/api/b02f871336684426bf9d90c35ac8f05d/ecommerce 
        `,
        data:{
            
                price:price.value,
                product:product.value,
                category:category.value
            
        }
   })
   .then(response => {
  
    let id =response.data._id;
    additem(price.value,product.value,category.value , id);

    price.value="";
    product.value="";
   })
   .catch(error => {
    console.log(error);
   }); 
    

   

   
   
    


})


function additem(price,product,category , id){
         
    let li = document.createElement('li');
    li.textContent = `${price} - ${product} - ${category}`;

    let button = document.createElement('button');

    button.textContent = "delete";
    button.className='delete';

    li.appendChild(button);

    let p = document.createElement('p');
    p.className = "id";

    p.style.display ="none";
    p.textContent = `${id}`;
    li.appendChild(p);
    if(category==="Electronics")
    ulElectronics.appendChild(li);
    
    else if(category == "Food")
    ulFood.appendChild(li);

    else if(category == "Skincare")
    ulSkincare.appendChild(li);
}


mainDiv.addEventListener('click', function(e){
    if(e.target.classList.contains('delete')){
        let id = e.target.parentElement.children[1].textContent;
        axios.delete(`https://crudcrud.com/api/b02f871336684426bf9d90c35ac8f05d/ecommerce/${id}`)
.then((res)=>{
    e.target.parentElement.remove();
})
.catch(err=>console.log(err));
}
})

document.addEventListener('DOMContentLoaded', function() {
    
    axios('https://crudcrud.com/api/58db2725e4244229b93332a67d5ad2cb/appointmentApp')
.then((res)=>{


    for(let i=0; i<res.data.length; i++) {

    let n = res.data[i].price;
    let e = res.data[i].product;
    let p = res.data[i].category;
    let id = res.data[i]._id;
 
    additem(n,e,p, id);


  
    }

    })
.catch(err=>console.log(err));
  });

