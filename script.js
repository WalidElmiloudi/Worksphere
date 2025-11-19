const addWorkers = document.getElementById("addNewWorker");
const modalOpen = document.getElementById("modal");
const closeModal = document.getElementById("closeModal")
const modal = document.getElementById("modalForum");
const addUnassigned = document.querySelectorAll(".inZoneAdd");
const employeeList = document.getElementById("employeeList");
const closeModalList = document.getElementById("closeModalList");
const addExParent = document.querySelectorAll("exParent");
const addex = document.querySelector(".addEX");
let addExContainer = document.querySelector(".addEXContainer");
let formData = JSON.parse(localStorage.getItem("formData")) || [];
const experienceContainer = document.getElementById("exContainer");
let photoUrl = document.getElementById("photoUrl");
let roles ={
  1: "IT technicien",
  2: "Manager",
  3: "Cleaner",
  4: "Security",
  5: "Receptionist",
  6: "Visitor",
}

const submitBtn = document.getElementById("submitBtn");

addWorkers.addEventListener("click", () => {
  modalOpen.classList.replace("hidden", "flex");
  modalOpen.setAttribute("aria-hidden", "false");
  modal.focus();
})

modalOpen.addEventListener("click", (e) => {
  if (e.target.classList.contains('overlay')) {
    modalOpen.classList.replace("flex", "hidden");
    modalOpen.setAttribute("aria-hidden", "true");
  }
})
closeModal.addEventListener("click", () => {
  modalOpen.classList.replace("flex", "hidden");
  modalOpen.setAttribute("aria-hidden", "true");
})
document.addEventListener("keydown", (e) => {
  if (e.key == 'Escape') {
    modalOpen.classList.replace("flex", "hidden");
    modalOpen.setAttribute("aria-hidden", "true");
  }
})

addUnassigned.forEach(add => {

  add.addEventListener("click", () => {
    employeeList.classList.replace("hidden", "flex");
    employeeList.setAttribute("aria-hidden", "false");
  })
})
closeModalList.addEventListener("click", () => {
  employeeList.classList.replace("flex", "hidden");
  employeeList.setAttribute("aria-hidden", "true");
})
employeeList.addEventListener("click", (e) => {
  if (e.target.classList.contains('overlay')) {
    employeeList.classList.replace("flex", "hidden");
    employeeList.setAttribute("aria-hidden", "true");
  }
})
document.addEventListener("keydown", (e) => {
  if (e.key == 'Escape') {
    employeeList.classList.replace("flex", "hidden");
    employeeList.setAttribute("aria-hidden", "true");
  }
})

addex.addEventListener("click", () => {
  const newDiv = document.createElement('div');
  newDiv.classList.add("exParent");
  newDiv.innerHTML = ` <div class="w-82 rounded-md bg-slate-200 flex flex-col gap-6 py-2 xl:w-102 xl:gap-8 relative">
            <h1 class="text-xl font-bold text-center xl:text-2xl">Employee Experience :</h1>
            <div class="flex flex-col items-center gap-3 xl:gap-5">
              <input class="bg-white py-3 pl-1.5 w-78 rounded-md text-sm xl:text-lg xl:w-85 company" type="text"
                placeholder="Company Name" required>
              <input class="bg-white py-3 pl-1.5 w-78 rounded-md text-sm xl:text-lg xl:w-85 exRole" type="text"
                placeholder="Role" required>
            </div>
            <div class="flex flex-col pl-2 xl:pl-9">
              <label for="startDate" class="font-bold xl:text-xl">From : </label>
              <input class="startDate w-35 bg-white rounded-md text-xs py-1.5 px-2.5 xl:text-lg xl:w-42 cursor-pointer" type="date"
               required>
              <label for=" endDate" class="font-bold xl:text-xl">To:</label>
              <input class="endDate w-35 bg-white rounded-md text-xs py-1.5 px-2.5 xl:text-lg xl:w-42 cursor-pointer" type="date" required>
            </div>
             <div
          class="deleteEx w-8 h-8 xl:w-12 xl:h-12 xl:pt-2   flex  justify-center pt-1 bg-red-500 rounded-full absolute -top-2.5 -right-1 cursor-pointer">
          <i class="pointer-events-none fi fi-br-cross-small text-white text-2xl xl:text-3xl"></i>
        </div>
          </div>`;
  experienceContainer.appendChild(newDiv);
})

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteEx")) {
    e.target.closest(".exParent").remove();
  }
})

photoUrl.addEventListener("input", () => {
  if (photoUrl.value) {
    const img = document.getElementById("imgUrl");
    img.src = `${photoUrl.value}`;
    img.classList.add("h-full", "w-full");
    img.alt = "employee photo";
  }
})

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const nameRegex = /^[a-zA-Z\s]+$/;
  const role = document.getElementById("role");
  const phtoUrlRegex = /^(https?:\/\/)[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(?:\/[^\s]*)?$/i;
  const email = document.getElementById("email");
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/;
  const phoneNum = document.getElementById("phone");
  const phoneRegex = /^0(6|5|7|8)[0-9]{8}$/;
  let experienceData = document.querySelectorAll(".exParent input");
  const companyRegex = /^[a-zA-Z0-9._-]{1,}$/;
  const exRoleRegex = /^[a-zA-Z\s._-]+$/;

  let companies = [];
  let exRoles = [];
  let startDates = [];
  let endDates = [];

  let start = 0;
  let end = 0;
  let count = 0;

  experienceData.forEach(experience => {
    if (experience.classList.contains("company")) {
      if (!companyRegex.test(experience.value)) {
        experience.classList.replace("bg-white", "bg-red-100");
        count = 0;
      } else {
        if (experience.classList.contains("bg-red-100")) {
          experience.classList.replace("bg-red-100", "bg-white");
        }
        count++;
        companies.push(experience.value);
      }
    }
    if (experience.classList.contains("exRole")) {
      if (!exRoleRegex.test(experience.value)) {
        experience.classList.replace("bg-white", "bg-red-100");
        count = 0;

      } else {
        if (experience.classList.contains("bg-red-100")) {
          experience.classList.replace("bg-red-100", "bg-white");
        }
        count++;
        exRoles.push(experience.value);
      }
    }
    if (experience.classList.contains("startDate")) {
      start = experience.value;
      count++;
      startDates.push(experience.value);
    }
    if (experience.classList.contains("endDate")) {
      end = experience.value;
      count++;
      if (end < start) {
        experience.classList.replace("bg-white", "bg-red-100");
        count = 0;
        alert("the dates are wrong");
      } else {
        if (experience.classList.contains("bg-red-100")) {
          experience.classList.replace("bg-red-100", "bg-white");
        }
        endDates.push(experience.value);
      }
    }
  })

  if (!nameRegex.test(firstName.value)) {
    firstName.classList.replace("bg-white", "bg-red-100");
  } else {
    if (firstName.classList.contains("bg-red-100")) {
      firstName.classList.replace("bg-red-100", "bg-white");
    }
  }
  if (!nameRegex.test(lastName.value)) {
    lastName.classList.replace("bg-white", "bg-red-100");
  } else {
    if (lastName.classList.contains("bg-red-100")) {
      lastName.classList.replace("bg-red-100", "bg-white");
    }
  }
  if (!role.value) {
    role.classList.replace("bg-white", "bg-red-100");
  } else {
    if (role.classList.contains("bg-red-100")) {
      role.classList.replace("bg-red-100", "bg-white");
    }
  }
  if (photoUrl.value) {
    if (!phtoUrlRegex.test(photoUrl.value)) {
      photoUrl.classList.replace("bg-white", "bg-red-100");
    } else {
      if (photoUrl.classList.contains("bg-red-100")) {
        photoUrl.classList.replace("bg-red-100", "bg-white");
      }
    }
  }
  if (!emailRegex.test(email.value)) {
    email.classList.replace("bg-white", "bg-red-100");
  } else {
    if (email.classList.contains("bg-red-100")) {
      email.classList.replace("bg-red-100", "bg-white");
    }
  }
  if (!phoneRegex.test(phoneNum.value)) {
    phoneNum.classList.replace("bg-white", "bg-red-100");
  } else {
    if (phoneNum.classList.contains("bg-red-100")) {
      phoneNum.classList.replace("bg-red-100", "bg-white");
    }
  }
  if ((phoneRegex.test(phoneNum.value)) && (emailRegex.test(email.value)) && (role.value) && (nameRegex.test(firstName.value)) && (nameRegex.test(lastName.value))) {
    if (photoUrl.value) {
      if (phtoUrlRegex.test(photoUrl.value)) {
        if (count == experienceData.length) {
          const employeeData = {
            name: `${firstName.value}` + " " + `${lastName.value}`,
            role: `${role.value}`,
            picture: `${photoUrl.value}`,
            email: `${email.value}`,
            phone: `${phoneNum.value}`,
            experience: {
              companies: [...companies],
              exRole: [...exRoles],
              startDate: [...startDates],
              enDate: [...endDates],
            }
          }
          formData.push(employeeData);
          localStorage.setItem("formData", JSON.stringify(formData));
          displayUnassigned();
          displaylist();
          firstName.value = "";
          lastName.value = "";
          role.value = "";
          if (photoUrl.value) {
            photoUrl.value = "";
            const img = document.getElementById("imgUrl");
            img.src = "";
            img.alt = "";
          }
          email.value = "";
          phone.value = "";
          if (experienceContainer.childElementCount > 1) {
            experienceContainer.innerHTML = ` <div class="exParent w-82 rounded-md bg-slate-200 flex flex-col gap-6 py-2 xl:w-102 xl:gap-8">
              <h1 class="text-xl font-bold text-center xl:text-2xl">Employee Experience :</h1>
              <div class="flex flex-col items-center gap-3 xl:gap-5">
                <input class="bg-white py-3 pl-1.5 w-78 rounded-md text-sm xl:text-lg xl:w-85 company" type="text"
                  placeholder="Company Name" required>
                <input class="bg-white py-3 pl-1.5 w-78 rounded-md text-sm xl:text-lg xl:w-85 exRole" type="text"
                  placeholder="Role" required>

              </div>
              <div class="flex flex-col pl-2 xl:pl-9">
                <label for="startDate" class="font-bold xl:text-xl">From : </label>
                <input class="startDate w-35 bg-white rounded-md text-xs py-1.5 px-2.5 xl:text-lg xl:w-50"
                  type="date" required>
                <label for=" endDate" class="font-bold xl:text-xl">To:</label>
                <input class=" endDate w-35 bg-white rounded-md text-xs py-1.5 px-2.5 xl:text-lg xl:w-50"
                  type="date" required>
              </div>
            </div>`;
          }
          experienceData.forEach(experience => {
            experience.value = "";
          })
        }
      }
    }
  }
})
function displayUnassigned() {
  let storedEmployee = JSON.parse(localStorage.getItem("formData"));
  storedEmployee.forEach(worker => {
    const storedRoles = roles;
    const workerRole = storedRoles[worker.role];
    const workerDiv = document.createElement("div");
    const unassignedList = document.getElementById("unassaignedContainer");
    workerDiv.innerHTML = ` <div class="w-65 h-20 2xl:w-90 2xl:h-22 bg-[#f7cea1] rounded-lg flex flex-row items-center px-2 2xl:px-4 justify-between gap-5">
            <div class="flex items-center gap-2">
              <div class="w-17 h-17  bg-[#ffe8cf] rounded-full">
                <img class="w-17 h-17 rounded-full" src="${worker.picture}" alt="employee">
              </div>
              <div class="flex flex-col">
                <h1 class="text-base font-bold 2xl:text-lg">${worker.name}</h1>
                <h3 class="text-sm 2xl:text-base">${workerRole}</h3>
              </div>
            </div>
            <div class="w-8 h-8 bg-blue-600 flex justify-center items-center rounded-md cursor-pointer">
              <p class="text-white font-bold text-2xl">+</p>
            </div>`;
            unassignedList.appendChild(workerDiv);
  })
}
function displaylist() {
  let storedEmployee = JSON.parse(localStorage.getItem("formData"));
  storedEmployee.forEach(worker => {
    const storedRoles = roles;
    const workerRole = storedRoles[worker.role];
    const workerDiv = document.createElement("div");
    const listUnassigned = document.getElementById("listUnassigned");
    workerDiv.innerHTML = ` <div class="w-70 h-20 xl:w-100 2xl:w-120 2xl:h-25 bg-[#f7cea1] rounded-lg flex flex-row items-center px-2 2xl:px-4 justify-between gap-5">
            <div class="flex items-center gap-2">
              <div class="w-20 h-20  bg-[#ffe8cf] rounded-full">
                <img class="w-20 h-20 rounded-full" src="${worker.picture}" alt="employee">
              </div>
              <div class="flex flex-col">
                <h1 class="text-base font-bold 2xl:text-lg">${worker.name}</h1>
                <h3 class="text-sm 2xl:text-base">${workerRole}</h3>
              </div>
            </div>
            <div class="w-8 h-8 bg-blue-600 flex justify-center items-center rounded-md cursor-pointer">
              <p class="text-white font-bold text-2xl">+</p>
            </div>`;
            listUnassigned.appendChild(workerDiv);
  })
}
document.addEventListener("DOMContentLoaded",()=>{
  displayUnassigned(); 
  displaylist();
})
