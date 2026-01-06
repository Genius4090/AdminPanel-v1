const modal__wrapper = document.querySelector(".modal__wrapper"),
      modal__inner = document.querySelector(".modal__inner"),
      showUserProfileImg = document.querySelector(".showUserProfileImg"),
      showUserRole = document.querySelector(".showUserRole"),
      showUserName = document.querySelector(".showUserName"),
      teachersList = document.querySelector(".teachersList");

      
//BASE URL

const BASE_URL = "http://localhost:3000";

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

// localStorage start

let {
  name: userName,
  role: userRole,
  profileImage: userProfile,
} = JSON.parse(localStorage.getItem("userInfo"));

showUserName.textContent = userName;
showUserProfileImg.src = userProfile;
showUserRole.textContent = userRole;

// localStorage end

// LogOut function start

function logOutFn() {
  location.href = "login.html";
  localStorage.clear("userInfo");
}

// LogOut function end

//get function start

async function get(url) {
  const response = await axios.get(`${BASE_URL}/${url}`);
  return response.data;
}

//get function end

//renderTeachers start

function renderTeachers(arr, list) {
  list.innerHTML = null;
  arr.forEach((item) => {
    let newTr = document.createElement("tr");
    newTr.className = "w-full bg-white h-21";
    newTr.innerHTML = `  
  <tr class="w-full bg-white h-21">
                <td>
                  <img
                    src="${item.image}"
                    alt="userImage"
                    width="65"
                    height="55"
                    class="rounded  object-cover"
                  />
                </td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.phone}</td>
                <td>${item.enroll}</td>
                <td>${item.register}</td>
                <td class="text-xl space-x-2">
                  <button onclick="handleMore('${item.id}')">
                    <i
                      class="bi bi-three-dots cursor-pointer text-gray-500"
                    ></i>
                  </button>
                  <button onclick="handleUpdate('${item.id}')">
                    <i class="bi bi-pencil text-[#FEAF00] cursor-pointer"></i>
                  </button>
                  <button onclick="handleDelete('${item.id}')">
                    <i class="bi bi-trash text-[#FEAF00] cursor-pointer"></i>
                  </button>
                </td>
             <tr class="h-4"></tr>
              </tr>
              `;
    list.appendChild(newTr);
  });
}

get("teachers").then((res) => {
  renderTeachers(res, teachersList);
});

//renderTeachers end

// handleMore function start

// handleMore function start
function handleMore(id) {
  localStorage.setItem("singleTeacher", JSON.stringify(id));
  location.href = "singlePage.html";
}

// handleMore function end

//handle Back start

function handleBack() {
  location.href = "login.html";
}

//handle Back end

//handle Delete start

function handleDelete(id) {
  modal__inner.classList.remove("w-[400px]");
  modal__inner.classList.remove("h-[580px]");

  modal__inner.classList.add("w-[500px]");
  modal__inner.classList.add("h-[150px]");
  openModalFn(true);
  modal__inner.innerHTML = `
  <div class="flex flex-col items-center justify-center h-full gap-4">
  <h2>Do you want to remove this teacher ?</h2>
 <div class="flex gap-3"> 
  <button onclick="handleCancel()" class="cursor-pointer bg-orange-500 px-6 py-2 text-white rounded">Cancel</button>
  <button onclick="handleSureDelete('${id}')" class="cursor-pointer bg-red-500 px-6 py-2 text-white rounded">Delete</button>
  </div>
  </div>
  `;
}

function handleSureDelete(id) {
  axios.delete(`${BASE_URL}/teachers/${id}`);
}
function handleCancel() {
  openModalFn();
}

//handle Delete end

//handle Date start

function handleDateNow() {
  const now = new Date();
  return now
    .toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "-");
}

//handle Date end

//handle Create start

function handleCreate() {
  openModalFn(true);
  modal__inner.classList.remove("w-[500px]");
  modal__inner.classList.remove("h-[200px]");

  modal__inner.classList.add("w-[400px]");
  modal__inner.classList.add("h-[580px]");

  modal__inner.innerHTML = `
  <form autocomplete="off" class="flex flex-col justify-center h-full px-4 gap-4 create-form">
  <h2 class="text-center font-semibold">Create new Teacher</h2>
  <label class="flex flex-col gap-2">
    Teacher's name
    <input
      name="name"
      type="text"
      placeholder="Enter teacher's name"
      required
      class="text-black outline-none border-1 border-[#EEEEEE] w-full rounded p-2 placeholder:text-xs placeholder:text-[#CDCDCD]"
    />
  </label>
     <label class=" flex flex-col gap-2">
    Email
    <input
      name="email"
      type="email"
      placeholder="Enter teacher's email"
      required
      class="text-black outline-none border-1 border-[#EEEEEE] w-full rounded p-2 placeholder:text-xs placeholder:text-[#CDCDCD]"
    />
  </label>   <label class=" flex flex-col gap-2">
    Phone number:
    <input
      name="phone"
      type="tel"
      placeholder="Enter teacher's phone number"
      required
      class="text-black outline-none border-1 border-[#EEEEEE] w-full rounded p-2 placeholder:text-xs placeholder:text-[#CDCDCD]"
    />
  </label>   <label class=" flex flex-col gap-2">
    Enroll number:
    <input
      name="enroll"
      type="number"
      placeholder="Enter teacher's enroll number"
      required
      class="text-black outline-none border-1 border-[#EEEEEE] w-full rounded p-2 placeholder:text-xs placeholder:text-[#CDCDCD]"
    />
  </label>
  <label class=" flex flex-col gap-2 mx-auto cursor-pointer">
    <input
      name="image"
      type="file"
      hidden
      class="uploadImgInput"
    />
    <img src="https://icons.veryicon.com/png/o/business/general-office-icon/general-upload-file.png" alt="choose file" width="80">
  </label>
  <div class="flex gap-4 w-full justify-center mt-1">
  <button onclick="handleCancel()" class="cursor-pointer bg-red-500 text-white px-6 py-2 rounded">Cancel</button>
  <button class="cursor-pointer bg-green-500 text-white px-6 py-2 rounded">Create</button>
  </div>
  </form>
  `;

  const createForm = document.querySelector(".create-form");
  const uploadImg = document.querySelector(".uploadImgInput");

  uploadImg.addEventListener("change", (e) => {
    e.target.nextElementSibling.src = URL.createObjectURL(e.target.files[0]);
  });

  createForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const body = {
      name: e.target.name.value,
      image: uploadImg.nextElementSibling.src,
      email: e.target.email.value,
      phone: e.target.phone.value,
      enroll: e.target.enroll.value,
      register: handleDateNow(),
    };
    axios.post(`${BASE_URL}/teachers/`, body);
  });
}

//handle Create end

//handle update start

async function handleUpdate(id) {
  const data = await get(`teachers/${id}`);

  openModalFn(true);
  modal__inner.classList.remove("w-[500px]");
  modal__inner.classList.remove("h-[200px]");

  modal__inner.classList.add("w-[400px]");
  modal__inner.classList.add("h-[580px]");

  modal__inner.innerHTML = `
  <form autocomplete="off" class="flex flex-col justify-center h-full px-4 gap-4 update-form">
  <h2 class="text-center font-semibold">Update teacher's info</h2>
  <label class="flex flex-col gap-2">
    Teacher's name
    <input
      name="name"
      value="${data.name}"
      type="text"
      placeholder="Enter teacher's name"
      required
      class="text-black outline-none border-1 border-[#EEEEEE] w-full rounded p-2 placeholder:text-xs placeholder:text-[#CDCDCD]"
    />
  </label>
     <label class=" flex flex-col gap-2">
    Email
    <input
      name="email"
      value="${data.email}"
      type="email"
      placeholder="Enter teacher's email"
      required
      class="text-black outline-none border-1 border-[#EEEEEE] w-full rounded p-2 placeholder:text-xs placeholder:text-[#CDCDCD]"
    />
  </label>   <label class=" flex flex-col gap-2">
    Phone number:
    <input
      name="phone"
      value="${data.phone}"
      type="tel"
      placeholder="Enter teacher's phone number"
      required
      class="text-black outline-none border-1 border-[#EEEEEE] w-full rounded p-2 placeholder:text-xs placeholder:text-[#CDCDCD]"
    />
  </label>   <label class=" flex flex-col gap-2">
    Enroll number:
    <input
      name="enroll"
      value="${data.enroll}"
      type="number"
      placeholder="Enter teacher's enroll number"
      required
      class="text-black outline-none border-1 border-[#EEEEEE] w-full rounded p-2 placeholder:text-xs placeholder:text-[#CDCDCD]"
    />
  </label>
  <label class=" flex flex-col gap-2 mx-auto cursor-pointer">
    <input
      name="image"
      value="${data.image}"
      type="file"
      hidden
      class="updateImgInput"
    />
    <img src=${data.image} alt="choose file" width="80">
  </label>
  <div class="flex gap-4 w-full justify-center mt-1">
  <button type="button" onclick="handleCancel()" class="cursor-pointer bg-red-500 text-white px-6 py-2 rounded">Cancel</button>
  <button class="cursor-pointer bg-green-500 text-white px-6 py-2 rounded">Update</button>
  </div>
  </form>
  `;

  const updateForm = document.querySelector(".update-form");
  const updateImg = document.querySelector(".updateImgInput");

  updateImg.addEventListener("change", (e) => {
    e.target.nextElementSibling.src = URL.createObjectURL(e.target.files[0]);
  });

  updateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const body = {
      name: e.target.name.value,
      image: updateImg.nextElementSibling.src,
      email: e.target.email.value,
      phone: e.target.phone.value,
      enroll: e.target.enroll.value,
    };
    axios.patch(`${BASE_URL}/teachers/${id}`, body);
  });
}

//handle update end

//handle Search start

const searchBar = document.querySelector(".searchBar");
searchBar.addEventListener("input", (e) => {
  const inputVal = e.target.value.toLowerCase().trim();
  get(`teachers`).then((res) => {
    let result = res.filter(
      (item) =>
        item.name.toLowerCase().includes(inputVal) ||
        item.email.toLowerCase().includes(inputVal) ||
        item.phone.includes(inputVal)
    );
    renderTeachers(result, teachersList);
  });
});

//handle Search end

//handle Sort start

function handleSortAsc() {
  get(`teachers`).then((res) => {
    let result = res.sort((a, b) => a.name.localeCompare(b.name));
    renderTeachers(result, teachersList);
  });
}

function handleSortDsc() {
  get(`teachers`).then((res) => {
    let result = res.sort((a, b) => b.name.localeCompare(a.name));
    renderTeachers(result, teachersList);
  });
}
//handle Sort end

//handle Notification start

function handleNotification() {
  openModalFn(true);
  modal__inner.innerHTML = `
 <div class="h-full flex flex-col items-center justify-center gap-4"> 
 <p>No notifications yet<p/>
  <button onclick="handleCancel()" class="cursor-pointer bg-red-700 px-6 py-2 text-white rounded">Go back</button>
  </div>
  `;
}

//handle Notification end

const userImageChanger = document.querySelector(".userImageChanger");
userImageChanger.addEventListener("change", (e) => {
  e.target.nextElementSibling.src = URL.createObjectURL(e.target.files[0]);
});
