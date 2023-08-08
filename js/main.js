//NOTE - Global Var`s
var userNameInp = document.getElementById('userName');
var userMailInp = document.getElementById('userMail');
var userPassInp = document.getElementById('userPass');
var userLoginMailInp = document.getElementById('userLoginMail');
var userLoginPassInp = document.getElementById('userLoginPass');
var  savedData= [] ;
var savedLoginData= [] ;
var storageName= 'StoragedData';
var loginStorageName = 'loginStoragedData'
var modalBody = document.querySelector('.modal-body');

//SECTION - Storing

if (localStorage.getItem(storageName)!= null) 
{
    savedData =JSON.parse( localStorage.getItem(storageName));
    
}
function saveInStorage() {
    localStorage.setItem(storageName, JSON.stringify(savedData));
}
//SECTION - Validation

function validateRegestrationForm() 
{
    if (!userNameInp.value || !userMailInp.value || !userPassInp.value ) 
    {
        userNameInp.style.border='3px solid red';
        userMailInp.style.border='3px solid red';
        userPassInp.style.border='3px solid red';
        document.getElementById('emptyForm').classList.remove('d-none');
        return false;
    } else 
    {
        userNameInp.style.border='';
        userMailInp.style.border='';
        userPassInp.style.border='';
        document.getElementById('emptyForm').classList.add('d-none');
        return true;
    }
}
function validateLoginForm() 
{
    if (!userLoginMailInp.value || !userLoginPassInp.value ) 
    {
        userLoginMailInp.style.border='3px solid red';
        userLoginPassInp.style.border='3px solid red';
        document.getElementById('emptyForm').classList.remove('d-none');
        return false;
    } else 
    {
        userLoginMailInp.style.border='';
        userLoginPassInp.style.border='';
        document.getElementById('emptyForm').classList.add('d-none');
        return true;
    }
}

function isValidEmail(anyEmail) {
    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    if (emailRegex.test(anyEmail.toLowerCase())) {
      return true;
    } else {
        userMailInp.style.border = '3px solid red';
        modalBody.innerHTML=`<div class="alert alert-danger" role="alert">
        Email isnot Valid ! </br>
        Ex/ .. YourEmail@gmail.com
      </div>`;
          document.getElementById("modalbutton").click();
      return false;
    }
  }

//SECTION - Add UserData

function addRegesterData() {
    if (validateRegestrationForm() && isValidEmail(userMailInp.value)) { // if not empty

        function validateMailExistance(anyMail) { // check email exist in our array
            return savedData.find(elemnt=>elemnt.Email == anyMail);
        }
        let foundUser = validateMailExistance(userMailInp.value);

        if (foundUser) { // if found dont register
            
            modalBody.innerHTML=`<div class="alert alert-danger" role="alert">
            This Email Already Exist !
          </div>`;
              document.getElementById("modalbutton").click();
        } else { // new email
            var userRegestrationData = {
                userName:userNameInp.value,
                Email:userMailInp.value.toLowerCase(),
                Pass:userPassInp.value,
            }
    
            savedData.push(userRegestrationData);
            saveInStorage();
    
            // save login data in array
            savedLoginData.push(userRegestrationData);
            // save login array in sessionStorage
            sessionStorage.setItem(loginStorageName,JSON.stringify(savedLoginData));
            // clear inputs
            clearRegesterForm();
    
            location.href = "home.html";
        }

        
    }
};

function addLoginData() {
    if (validateLoginForm()) { // if the form has data only
        function validateMailExistance(anyMail) { // check email exist in our array
            return savedData.find(elemnt=>elemnt.Email == anyMail);
        }
        let foundUser = validateMailExistance(userLoginMailInp.value);

        if (foundUser) { // if exist
            if (foundUser.Pass === userLoginPassInp.value) { // check password match

                var userData ={
                    LoginMail:userLoginMailInp.value,
                    LoginPass:userLoginPassInp.value,
                    userName:foundUser.userName,
                } 
        
                savedLoginData.push(userData);
                sessionStorage.setItem(loginStorageName,JSON.stringify(savedLoginData));
                clearLoginForm();

                location.href = "home.html";


            } else {
                modalBody.innerHTML=`<div class="alert alert-danger" role="alert">
                Password Dosnot Match!
              </div>`;
                  document.getElementById("modalbutton").click();
            }
        } else {
            modalBody.innerHTML=`<div class="alert alert-danger" role="alert">
            User Not Found!
          </div>`;
              document.getElementById("modalbutton").click();
        }
        
    }
};
    
  
//SECTION - Clearform

function clearRegesterForm() 
{
    userNameInp.value ='';
    userMailInp.value ='';
    userPassInp.value ='';
    
};

function  clearLoginForm() 
{
    userLoginMailInp.value ='';
    userLoginPassInp.value ='';
    
};

//SECTION - Logout

function logout() {
    sessionStorage.removeItem('loginStoragedData');
    location.reload();
}


