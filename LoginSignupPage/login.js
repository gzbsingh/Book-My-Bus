//custome alert
function openCustomAlert(message) {
    const customAlert = document.getElementById('customAlert');
    const customAlertMessage = document.getElementById('customAlertMessage');

    customAlertMessage.textContent = message;
    customAlert.style.display = 'block';
    setTimeout(() => {
        closeCustomAlert();
        if(message!="Invalid Credantials"){
         window.location.href="../User-Side/index.html";
        }
    }, 5000)
}

function closeCustomAlert() {
    const customAlert = document.getElementById('customAlert');
    customAlert.style.display = 'none';
}



// Function to show the custom toast notification
function showToast(message) {
    const toastContainer = document.getElementById("customToastContainer");
    const toast = document.createElement("div");
    toast.className = "custom-toast";
    toast.textContent = message;

    toastContainer.appendChild(toast);

    // Auto-hide the toast after 3 seconds (adjust as needed)
    setTimeout(function () {
        toastContainer.removeChild(toast);
    }, 3000);
}

function sign_in() {
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;

    if (password == '' || username == '') {
        showToast('Please fill all mandatory field !!');
        return false;
    }
    if (!document.getElementById("agree").checked) {
        showToast('Please check Accepting all terms & conditions!!');
        return false;
    }
    let signInObj = {
        "userName": username,
        "password": password
    }
    if (signInObj.username == "admin" && signInObj.password == "admin1234") loginAdmin(signInObj);
    else loginUser(signInObj);
}


function loginUser(obj) {
    let url = "http://localhost:8088/user/login";

    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify that we're sending JSON data
            },
            body: JSON.stringify(obj), // Convert the data to JSON format
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            if (data.userId== null) {
                openCustomAlert("Invalid Credantials");
            } else {
                showToast("User Login SucessFull!!");
                openCustomAlert("Welcome " + data.type);
                localStorage.setItem("uuid", JSON.stringify(data.uuid));
                localStorage.setItem("username", JSON.stringify(data.type));
               
                //change page location from here after ssucessfull signup
            }


        })
        .catch(error => {
            // console.error('Error posting data:', error);
        });
}

function loginAdmin(obj) {
    let url = "http://localhost:8088/admin/login";

    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify that we're sending JSON data
            },
            body: JSON.stringify(obj), // Convert the data to JSON format
        })
        .then(response => response.json())
        .then(data => {
            if (data.userId == null) {
                openCustomAlert(data.message);
            } else {
                showToast("Admin Login SucessFull!!");
                openCustomAlert("WelCome Admin!!");
                localStorage.setItem("uuid", json.stringify(data.key));
                console.log(data);
                Location = "../Admin_section/Admin_Home.html";
            }
        })
        .catch(error => {
            // console.error('Error posting data:', error);
        });
}