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

const AjoutepostText = (text, token) => {
  console.log(text);
  return fetch(`${URL}/offers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      description: text,
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
    return data;
  })
  .catch(error => {
    console.error(error); // Handle error
    throw error;
  });
}

const UploadImage = (imageFile, offerId, token) => {
  
  const formData = new FormData();
  formData.append('files', imageFile);

  return fetch(`${URL}/offers/${offerId}/images`, {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `bearer ${token}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
    return;
  })
  .then(data => {
    console.log(data); // Output: { message: "Post Created" }
    return data;
  })
  .catch(error => {
    console.error(error); // Handle error
    alert(error);
    throw error;
  });
}
const AjouterpostImage = (image,id, token) => {
  return fetch(`${URL}/offers/${id}/images/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      files: image,
    })
  })
  .then(response => {
    if (!response.ok) {
      console.log(response);
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // Output: { message: "Post Created" }
    return data;
  })
  .catch(error => {
    console.error(error); // Handle error
    throw error;
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
const RechercheOffer=async (search)=>{
  try {
    const response = await fetch(`${URL}/offers?filterOn=description&filterQuery=${search}`, {
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
}

const TousmesOffre = async (token) => {
  try {
    const response = await fetch(`${URL}/offers/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
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

const Tousmesphone = async (token) => {
  try {
    const response = await fetch(`${URL}/phone-numbers/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
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

const GetUserById = async (token,id) => {
  try {
    const response = await fetch(`${URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const data = await response.json();
    return data; // Return the fetched data

  } catch (error) {
    throw new Error(error.message); // Rethrow the error to handle it in the component
  }
};

const GetImagesByOfferId = async (token,id) => {
  try {
    const response = await fetch(`${URL}/Offers/${id}/images`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const data = await response.json();
    return data; // Return the fetched data

  } catch (error) {
    throw new Error(error.message); // Rethrow the error to handle it in the component
  }
};





export { UploadImage, Ajouternmr,GetUserById,GetImagesByOfferId ,AjouterpostImage,AjoutepostText ,Ajouteutlisateur,TousOffre,RechercheOffer,TousmesOffre,Tousmesphone};