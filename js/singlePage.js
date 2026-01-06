const showUserProfileImg = document.querySelector(".showUserProfileImg"),
      showUserRole = document.querySelector(".showUserRole"),
      showUserName = document.querySelector(".showUserName"),
      modal__wrapper = document.querySelector(".modal__wrapper"),
      modal__inner = document.querySelector(".modal__inner");


 
 //desstructuring from localstroage singe teacher's datas START  

let {
  name: userName,
  role: userRole,
  profileImage: userProfile,
} = JSON.parse(localStorage.getItem("userInfo"));


showUserName.textContent = userName;
showUserProfileImg.src = userProfile;
showUserRole.textContent = userRole;

//desstructuring from localstroage singe teacher's datas END  


// get single teacher start 

const singleImage = document.querySelector(".singleImage"),
  singleName = document.querySelector(".singleName"),
  singleEmail = document.querySelector(".singleEmail"),
  singlePhone = document.querySelector(".singlePhone"),
  singleDate = document.querySelector(".singleDate");

function getSingleTeacher() {
  let teacherId = JSON.parse(localStorage.getItem("singleTeacher"));
  axios.get(`http://localhost:3000/teachers/${teacherId}`).then((res) => {
    singleImage.src = res.data.image;
    singleName.textContent = res.data.name;
    singleEmail.textContent = res.data.email;
    singlePhone.textContent = res.data.phone;
    singleDate.textContent = res.data.register;
  });
}

getSingleTeacher();

// get single teacher end


// handleBack fn start 

function handleBack() {
  location.href = "dashboard.html";
}

// handleBack fn end 

// Modal start

modal__wrapper.addEventListener("click", (e) => {
  if (e.target.id) {
    modal__wrapper.classList.remove("scale-[1]");
    modal__wrapper.classList.add("scale-[0]");
  }
});

function openModalFn(active) {
  if (active) {
    modal__wrapper.classList.remove("scale-[0]");
    modal__wrapper.classList.add("scale-[1]");
  } else {
    modal__wrapper.classList.remove("scale-[1]");
    modal__wrapper.classList.add("scale-[0]");
  }
}

// Modal end


//Handcle Cancel start

function handleCancel() {
  openModalFn();
}

//Handcle Cancel end


//Handle Notification start

function handleNotification() {
  openModalFn(true);
  modal__inner.innerHTML = `
 <div class="h-full flex flex-col items-center justify-center gap-4"> 
 <p>No notifications yet<p/>
  <button onclick="handleCancel()" class="cursor-pointer bg-red-700 px-6 py-2 text-white rounded">Go back</button>
  </div>
  `
}

//Handle Notification end
