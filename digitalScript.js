// Store user details

//User Registration
const userRegistrationDetails = [];
// Store User Save For Later which handles both data saved to the LocalStorage alerady which needs to
//return to JS hence the parse method but if the localStorage is empty, it returns an empty array. Solutoin courtesy of Hyperion & OpenAi.
const saveForLater = JSON.parse(localStorage.getItem("saveForLater")) || [];
// Save User Contact Message
let userContactData = [];
// Create an array to save user comment data
let userCommentData = [];

//Event listener waiting for the DOM to be fully loaded before assign the id element names
//to new variables for future function use.
document.addEventListener("DOMContentLoaded", function () {
  //This DOMcontentloaded function courtesy of Open AI.
  const userRegistrationLink = document.getElementById("user-registration");
  const registrationPopup = document.getElementById("registration-popup");
  const closePopupButton = document.getElementById("close-popup");
  const submitUserRegButton = document.getElementById("submit-user-reg");
  const welcomeMessage = document.getElementById("welcome-message");
  const registerTab = document.getElementById("user-registration");
  const logoutButton = document.getElementById("logout-btn");

  // Initially hide the "Log Out" button
  logoutButton.style.display = "none";

  // Event Functions

  // I wanted to check the localStorage function by getting a user to log in and stay
  // logged in across various HTML pages/.
  userRegistrationLink.addEventListener("click", function (event) {
    event.preventDefault();
    registrationPopup.style.display = "block";
  });

  X = //Close pop-up box.
    closePopupButton.addEventListener("click", function () {
      registrationPopup.style.display = "none";
    });

  submitUserRegButton.addEventListener("click", function () {
    const userNameInput = document.getElementById("userName");
    const userEmailInput = document.getElementById("userEmail");

    const userName = userNameInput.value;
    const userEmail = userEmailInput.value;
    //Conditional for submiiting fields
    if (userName && userEmail) {
      const userDetails = {
        name: userName,
        email: userEmail,
      };
      //Store user details to array for storage.
      userRegistrationDetails.push(userDetails);
      localStorage.setItem(
        "userRegistrationDetails",
        JSON.stringify(userRegistrationDetails)
      );
      //Clear user reg details
      userNameInput.value = "";
      userEmailInput.value = "";
      registrationPopup.style.display = "none";
      registerTab.style.display = "none";
      welcomeMessage.textContent = `Welcome, ${userName}`;
      logoutButton.style.display = "block";
      //Test
      console.log("User Registration Details:", userDetails);
    } else {
      alert("Please fill in all fields.");
    }
  });

  // Check if user registration details are stored in localStorage on page load
  const storedUserRegistrationDetails = localStorage.getItem(
    "userRegistrationDetails"
  );
  if (storedUserRegistrationDetails) {
    const parsedUserRegistrationDetails = JSON.parse(
      storedUserRegistrationDetails
    );
    const welcomeUser =
      parsedUserRegistrationDetails[parsedUserRegistrationDetails.length - 1]
        .name;
    //Display registerd user name. Thanks to openAi for this workaround.
    welcomeMessage.textContent = `Welcome, ${welcomeUser}`;
    registerTab.style.display = "none";
    logoutButton.style.display = "block";
  }

  // Logout functionality
  logoutButton.addEventListener("click", function () {
    localStorage.clear(); //Courtesy of open AI. I wasn't sure how to clear the localStorage.
    registerTab.style.display = "block";
    welcomeMessage.textContent = "";
    logoutButton.style.display = "none";
  });

  // Event listener for saving items. I decided to just add saved items to the the images on the
  //homepage as I don't have a cooking or product website. The other saved items
  //are on teh gallery page which are links that teh user can save.
  const saveButtons = document.querySelectorAll(".website-link, #image-hover");
  saveButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      //Courtesy of OpenAi. Seeting an OR option to link to teh event handler for either the image src or the href link
      const item = button.getAttribute("src") || button.getAttribute("href");
      //Push data to array.
      saveForLater.push(item);
      //Save to local storafge.
      localStorage.setItem("saveForLater", JSON.stringify(saveForLater));
      //Test output
      console.log("Saved items:", saveForLater);
    });
  });
});

// Populate Saved Items HTML Page

document.addEventListener("DOMContentLoaded", () => {
  const savedItemsContainer = document.getElementById("savedItemsContainer");

  //Once again, very usefull method to extract either existing data that exists in the localStorage and
  //manipulate, or, return an empty array if there's nothing.
  const savedImages = JSON.parse(localStorage.getItem("saveForLater")) || [];
  const savedLinks = savedImages.map((imageUrl) => {
    //Return saved items.
    return `<a href="${imageUrl}" target="_blank">${imageUrl}</a>`;
  });

  const savedItemsText = `
        <p>You have ${savedImages.length} saved items.</p>
        <p>Saved Items:</p>
        <ul>${savedLinks.map((link) => `<li>${link}</li>`).join("")}</ul>
    `;

  savedItemsContainer.innerHTML = savedItemsText;
});

// POP UP for array items total

//Use query selectorAll to target the class. Then loop through all the instances of
//class name selected and alert when clicked. So, the programme has them all listed and
//activated the one when clicked which the loop iteration will eventually get to when executed.
//Thanks to openAI and Hyperion for the querySelectorAll tip as well as the for each loop
//functionality. Super useful.

const displaySavedItemsPopUp = document.querySelectorAll(".savedPopUp");
const savedPopUpElements = document.querySelectorAll(".savedPopUp");

savedPopUpElements.forEach((element) => {
  element.addEventListener("click", function () {
    setTimeout(function () {
      const calculateTotalNumberOfSavedItems = saveForLater.map((item) => item);
      const updateTotalSaved = calculateTotalNumberOfSavedItems.length;
      alert(`There are ${updateTotalSaved} saved items.`);
    }, 200);
  });
});

//Create Array to save user comment data

// Define the user comment object class
class UserComment {
  constructor(name, surname, email, message) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.message = message;
  }
}

// Function to add a user comment
const addUserComment = (name, surname, email, message) => {
  const newComment = new UserComment(name, surname, email, message);
  userCommentData.push(newComment);
  localStorage.setItem("userComments", JSON.stringify(userCommentData));
};

// Get the submit button element
// Define the user comment class
document.addEventListener("DOMContentLoaded", function () {
  const submitCommentButton = document.getElementById("submitCommentButton");

  // Attach a click event listener to the submit button
  submitCommentButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    const getCommentName = document.getElementById("commentName").value;
    const getCommentSurname = document.getElementById("commentSurname").value;
    const getCommentEmail = document.getElementById("commentEmail").value;
    const getCommentMessage = document.getElementById("commentMessage").value;

    // Call the addUserComment function to store the comment using the user field inputs
    //saved to variables as arguments.
    addUserComment(
      getCommentName,
      getCommentSurname,
      getCommentEmail,
      getCommentMessage
    );

    // Update the displayed comments
    displayUserComments();

    // Clear form fields
    document.getElementById("commentName").value = "";
    document.getElementById("commentSurname").value = "";
    document.getElementById("commentEmail").value = "";
    document.getElementById("commentMessage").value = "";
  });

  // Display user comments
  const displayUserComments = () => {
    const userCommentsList = document.getElementById("userCommentsList");
    userCommentsList.innerHTML = ""; // Clear previous comments

    //Display user comments to the DOM.
    userCommentData.forEach((comment) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${comment.name} ${comment.surname} had this to say: ${comment.message}`;
      userCommentsList.appendChild(listItem);
    });
  };

  // Load and display saved comments from localStorage on page load
  const storedComments = JSON.parse(localStorage.getItem("userComments")) || [];
  userCommentData = storedComments; // Update the userCommentData array
  displayUserComments(); // Display the comments
});

// Function to toggle Heart like state. Solution courtesy of Open Ai.
//Callback function taking in the heartElement fnc and the index of the current heart index
//and applyig the statement to that specific element so as not to name each heart with a
//unique id or class selector. Instead, it is differentieted based on it's index value.
const toggleLike = (heartElement, index) => {
  const elementId = `heart_${index}`;

  //Method for saving the liked or not liked status  of the herats based on a boolean/
  //value. if it's like it's true and if it's not like isLIked will be false. Courtesy of OpenAi.
  let isLiked = localStorage.getItem(elementId) === "true" || false;

  heartElement.addEventListener("click", function () {
    if (isLiked) {
      heartElement.style.color = "black";
    } else {
      heartElement.style.color = "red";
    }
    isLiked = !isLiked;
    localStorage.setItem(elementId, isLiked); // Save the like preference for this element
  });

  // Initialize the heart color based on the saved preference
  if (isLiked) {
    heartElement.style.color = "red";
  }

  heartElement.addEventListener("mouseover", function () {
    // Change the cursor to a pointer icon when hovering
    heartElement.style.cursor = "pointer";
  });
};

// Get all heart elements using querySelectorAll
const heartElements = document.querySelectorAll(".likedHeart");

// Apply the toggleLike function to each heart element using the callback which applies
//the toggle effect to that instance or iteration of the the element.
heartElements.forEach((heartElement, index) => {
  toggleLike(heartElement, index);
  heartElement.style.fontSize = "24px"; // Adjust the size as needed
});

// User Contact Data. I didn't display this content on the webpage anywhere because
//usually this would be sent to the web owner for administration. Please open the console
//to view saved array user contact details.

// Get the submit button element for the contact form
const submitContactButton = document.getElementById("submitContactButton");

// // Attach a click event listener to the submit button
submitContactButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission
});

// New Object Class
class newUserContactDataObject {
  constructor(name, surname, contactNumber, contactEmail, gender, message) {
    this.name = name;
    this.surname = surname;
    this.contactNumber = contactNumber;
    this.contactEmail = contactEmail;
    this.gender = gender;
    this.message = message;
  }
}

// Function to add a user contact input
const addUserContact = (
  name,
  surname,
  contactNumber,
  contactEmail,
  gender,
  message
) => {
  const newContact = new newUserContactDataObject(
    name,
    surname,
    contactNumber,
    contactEmail,
    gender,
    message
  );
  userContactData.push(newContact);
  localStorage.setItem("userContactData", JSON.stringify(userContactData));
};

document.addEventListener("DOMContentLoaded", function () {
  const submitContactButton = document.getElementById("submitContactButton");

  // Attach a click event listener to the submit button
  submitContactButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get input field values
    const contactName = document.getElementById("contactName").value;
    const contactSurname = document.getElementById("contactSurname").value;
    const contactNumber = document.getElementById("contactNumber").value;
    const contactEmail = document.getElementById("contactEmail").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const message = document.getElementById("message").value;

    // Call the addUserContact function to store the contact
    addUserContact(
      contactName,
      contactSurname,
      contactNumber,
      contactEmail,
      gender,
      message
    );

    console.log(userContactData);

    // Clear form fields
    document.getElementById("contactName").value = "";
    document.getElementById("contactSurname").value = "";
    document.getElementById("contactNumber").value = "";
    document.getElementById("contactEmail").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("message").value = "";

    // Display a "Thank you" message
    const formContainer = document.querySelector(".form-container");
    formContainer.innerHTML =
      "<p>Thank you for your message. We will be in touch.</p>";
  });
});
