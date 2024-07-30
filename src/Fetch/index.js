import { URL } from "../constants/Constants";
const Ajouternmr = (nmr,token) =>{
    fetch(`${URL}/phone-numbers/me`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,

        },
        body: JSON.stringify({  
          phoneNumber: nmr,
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

const Ajouteutlisateur = async (fullname, password, phone) => {
  try {
    const response = await fetch(`${URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({  
        fullName: fullname,
        phoneNumber: phone,
        password: password,
      })
    });

    if (!response.ok) {
      if (response.status === 409) {
        throw new Error('A user with that phone number already exists! You should log in!');
      } else if (response.status === 422) {
        throw new Error('An account for this phone number was already created for you. You should now create a password for it!');
      } else {
        throw new Error('Failed to create user');
      }
    }

    const data = await response.json();
    console.log(data); // Output: { message: "Post Created" }
  } catch (error) {
    console.error(error.message); // Handle error
  }
};
// Corrected and completed `TousOffre` function with token handling

const TousOffre = async () => {
  try {
    const response = await fetch(`${URL}/offers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch offers');
    }

    const data = await response.json();
    return data; // Return the fetched data

  } catch (error) {
    throw new Error(error.message); // Rethrow the error to handle it in the component
  }
};



export { Ajouternmr ,Ajoutepost ,Ajouteutlisateur,TousOffre};