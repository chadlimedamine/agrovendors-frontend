import { URL } from "../constants/Constants";
const Ajouternmr = (nmr) =>{
    fetch(`${URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({  
        title: 'test product',
        price: nmr,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic' 
      }) 
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create phone number');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Output: { message: "Category Created" }
      })
      .catch(error => {
        console.error(error); // Handle error
      });
}

const Ajoutepost = (title, image) => {
  fetch(`${URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({  
      title: title,
      price: 12.5, // You may want to make this dynamic as well
      description: 'lorem ipsum set',
      image: image,
      category: 'electronic' 
    }) 
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // Output: { message: "Post Created" }
  })
  .catch(error => {
    console.error(error); // Handle error
  });
}

const Ajouteutlisateur = (email, fullname,password,phone) => {
  fetch(`${URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({  
      email:email,
      username:fullname,
      password:password,
      name:{
          firstname:'John',
          lastname:'Doe'
      },
      address:{
          city:'kilcoole',
          street:'7835 new road',
          number:3,
          zipcode:'12926-3874',
          geolocation:{
              lat:'-37.3159',
              long:'81.1496'
          }
      },
      phone:phone
    }) 
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // Output: { message: "Post Created" }
  })
  .catch(error => {
    console.error(error); // Handle error
  });
}
export { Ajouternmr ,Ajoutepost ,Ajouteutlisateur};