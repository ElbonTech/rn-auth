// Database.js

// Simulating a database with a JSON object
const usersData = [];

// Create a new user
export const insertUser = (email, password, successCallback, errorCallback) => {
  // Check if user with the same email already exists
  const userExists = usersData.some(user => user.email === email);
  if (userExists) {
    errorCallback(new Error("User with this email already exists"));
    return;
  }

  const newUser = {
    id: usersData.length + 1,
    email,
    password,
    store_details_available: 0,
    verified: 0,
    store_details_number: "",
    company: "",
    company_address: "",
    description: "",
    city: "",
    state: "",
    phone: "",
    company_email: ""
  };

  usersData.push(newUser);
  successCallback(newUser);
};

// Retrieve a user by email
export const getUserByEmail = (email, successCallback, errorCallback) => {
  const user = usersData.find(user => user.email === email);
  if (user) {
    successCallback(user);
  } else {
    errorCallback(new Error("User not found"));
  }
};

// Update user details
export const updateUserDetails = (email, userDetails, successCallback, errorCallback) => {
  const userIndex = usersData.findIndex(user => user.email === email);
  
  if (userIndex === -1) {
    errorCallback(new Error("User not found"));
    return;
  }

  // Update user details
  usersData[userIndex] = {
    ...usersData[userIndex],
    ...userDetails
  };
  
  successCallback(usersData[userIndex]);
};
