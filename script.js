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
let backupData = [...formData];
const unassignedList = document.getElementById("unassaignedContainer");
const experienceContainer = document.getElementById("exContainer");
let photoUrl = document.getElementById("photoUrl");
let idCounter = 0;
let roles = {
  1: "IT technicien",
  2: "Manager",
  3: "Cleaner",
  4: "Security",
  5: "Receptionist",
  6: "Visitor",
}
let unassaignedworker = document.getElementById("unassignedWorker");
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
      if (experience.value) {
        start = experience.value;
        startDates.push(experience.value);
        count++;
      }
    }
    if (experience.classList.contains("endDate")) {
      if (experience.value) {
        end = experience.value;
        if (end < start) {
          experience.classList.replace("bg-white", "bg-red-100");
          count = 0;
          alert("the dates are wrong");
        } else {
          if (experience.classList.contains("bg-red-100")) {
            experience.classList.replace("bg-red-100", "bg-white");
          }
          endDates.push(experience.value);
          count++;
        }
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
            },
            id: `${idCounter}`
          };
          formData.push(employeeData);
          localStorage.setItem("formData", JSON.stringify(formData));
          displayUnassigned();
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
          idCounter++;
        }
      }
    }
  }
})

function displayUnassigned() {
  let storedEmployee = [...formData];
  unassignedList.innerHTML = "";
  storedEmployee.forEach(worker => {
    const storedRoles = roles;
    const workerRole = storedRoles[worker.role];
    const workerDiv = document.createElement("div");
    workerDiv.innerHTML = ` <div id="${worker.id}" class="worker w-65 h-20 2xl:w-90 2xl:h-22 bg-[#f7cea1] rounded-lg flex flex-row items-center px-2 2xl:px-4 justify-between cursor-pointer">
            <div class="flex items-center gap-2 pointer-events-none">
              <div class="w-17 h-17  bg-[#ffe8cf] rounded-full pointer-events-none">
                <img class="w-17 h-17 rounded-full pointer-events-none" src="${worker.picture}" alt="employee">
              </div>
              <div class="flex flex-col pointer-events-none">
                <h1 class="text-sm font-bold 2xl:text-lg pointer-events-none">${worker.name}</h1>
                <h3 class="text-sm 2xl:text-base pointer-events-none">${workerRole}</h3>
              </div>
            </div>`;
    unassignedList.appendChild(workerDiv);
    unassignedCounter();
  })
}

function displaylist(workers) {
  const listUnassigned = document.getElementById("listUnassigned");
  let storedData = workers || [];
  listUnassigned.innerHTML = "";
  storedData.forEach(worker => {
    const storedRoles = roles;
    const workerRole = storedRoles[worker.role];
    const workerDiv = document.createElement("div");
    workerDiv.innerHTML = ` <div id="worker-${worker.id}" class="worker w-70 h-20 xl:w-100 2xl:w-120 2xl:h-25 bg-[#f7cea1] rounded-lg flex flex-row items-center px-2 2xl:px-4 justify-between">
            <div class="flex items-center gap-2">
              <div class="w-17 h-17  bg-[#ffe8cf] rounded-full">
                <img class="w-full h-full rounded-full" src="${worker.picture}" alt="employee">
              </div>
              <div class="flex flex-col">
                <h1 class="text-sm font-bold 2xl:text-lg">${worker.name}</h1>
                <h3 class="text-sm 2xl:text-base">${workerRole}</h3>
              </div>
            </div>
            <div class="addBtn w-8 h-8 bg-blue-600 flex justify-center items-center rounded-md cursor-pointer">
              <p class="text-white font-bold text-2xl pointer-events-none">+</p>
            </div>`;
    listUnassigned.appendChild(workerDiv);
  })
}

document.addEventListener("DOMContentLoaded", () => {
  displayUnassigned();
  displaylist();
})
function handleAddWorker(e, workerContainer, zone, zoneLimit) {
  const currentTarget = e.target;
  if (currentTarget.classList.contains("addBtn")) {
    if (workerContainer.childElementCount < zoneLimit) {
      const btnParent = currentTarget.closest('.worker');
      const match = btnParent.id.match(/worker-([^\s]+)/);
      const workerId = match[1];
      const worker = formData.findIndex(data => data.id == workerId);
      const empDiv = document.createElement("div")
      empDiv.innerHTML = `<div id="${formData[worker].id}"
          class=" assigned-worker inZone-${zone} worker w-7 h-7 xl:w-12 xl:h-12 bg-[#f7cea1]  rounded-full flex flex-col justify-center items-center relative">
          <img class="w-full h-full rounded-full -mt-0.5 pointer-events-none" src="${formData[worker].picture}" alt="${formData[worker].name} picture">
          <div id="rm-${formData[worker].id}"
            class="remover w-1.5 h-1.5  pt-0.5 flex xl:w-3 xl:h-3  justify-center items-center bg-red-500 rounded-full absolute top-0 -right-0.5 cursor-pointer">
            <i class="fi fi-br-cross-small text-white text-[5px] xl:text-[8px] pointer-events-none"></i>
          </div>
        </div>`;
      workerContainer.appendChild(empDiv);
      formData.splice(worker, 1);
      redZoneAlert();
      displayUnassigned();
      filterByRole(zone);
    }
  }
}

let currentHandler = null;
document.addEventListener("click", (e) => {
  const currentBigTarget = e.target;
  if (e.target.classList.contains("inZoneAdd")) {
    const workerContainer = currentBigTarget.previousElementSibling;
    console.log(workerContainer)
    const match = currentBigTarget.className.match(/zone-([^\s]+)/);
    let zone = match[1];
    filterByRole(zone);
    let zoneLimit = 5;
    switch (zone) {
      case '0': zoneLimit = 5;
        break;
      case '1': zoneLimit = 4;
        break;
      case '2': zoneLimit = 2;
        break;
      case '3': zoneLimit = 9;
        break;
      case '4': zoneLimit = 6;
        break;
      case '5': zoneLimit = 2;
        break;
    }

    if (currentHandler) {
      document.removeEventListener("click", currentHandler);
    }
    currentHandler = (e) => handleAddWorker(e, workerContainer, zone, zoneLimit);
    document.addEventListener("click", currentHandler);
  }
})

function filterByRole(zone) {
  if (zone == 0 || zone == 4) {
    displaylist(formData);
  }
  if (zone == 1) {
    const filtered = formData.filter(worker => (worker.role == 1 || worker.role == 3 || worker.role == 2));
    displaylist(filtered);
  }
  if (zone == 2) {
    const filtered = formData.filter(worker => (worker.role == 4 || worker.role == 3 || worker.role == 2));
    displaylist(filtered);
  }
  if (zone == 3) {
    const filtered = formData.filter(worker => (worker.role == 5 || worker.role == 3 || worker.role == 2 || worker.role == 6));
    displaylist(filtered);
  }
  if (zone == 5) {
    const filtered = formData.filter(worker => worker.role == 2);
    displaylist(filtered);
  }
}
function profile(index,location) {
  const mainContainer = document.querySelector('main');
  let role = roles[backupData[index].role];
  const sectionProfile = document.createElement("section");
  sectionProfile.classList.add("profileLay", "w-full", "h-screen", "fixed", "bg-black/20", "flex", "justify-center", "items-center");
  sectionProfile.innerHTML = `
      <div class="w-80 h-170 bg-[#f7cea1] rounded-md flex flex-col items-center py-2 relative">
        <div class="flex w-70 h-25 bg-[#fdd8b1] rounded-lg relative">
          <div class="w-30 h-30 bg-[#ffc281] rounded-full absolute -bottom-15 left-0 right-0 m-auto shadow-lg">
            <img class="w-full h-full rounded-full" src="${backupData[index].picture}" alt="${backupData[index].name} picture">
          </div>
        </div>
        <div class="mt-18 flex flex-col items-center">
          <h1 class="text-2xl font-bold">${backupData[index].name}</h1>
          <h2 class="text-xl font-bold text-[#424242]">${role}</h2>
        </div>
        <p class="text-lg font-bold mb-4 text-center">Current location : <br><span class="text-md text-green-600">${location}</span></p>
        <div class="py-2 px-2 border rounded-md flex flex-col items-center gap-5 bg-[#ffa340]/20 w-70 h-90">
          <h1 class="text-xl font-bold text-center">Worker Informations</h1>
          <div class="flex flex-col items-start w-60  gap-2">
            <p class="text-md font-bold">Email : <span class="font-normal">${backupData[index].email}</span></p>
            <p class="text-md font-bold">Phone : <span class="font-normal">${backupData[index].phone}</span></p>
          </div>
          <div class="w-60 border py-4 flex flex-col items-center rounded-md bg-[#eac59e] shadow-lg gap-2">
            <h1 class="text-md font-bold text-center">Worker Experience</h1>
            <div id="expContainer" class="w-55 h-35 flex flex-col items-center overflow-scroll [scrollbar-width:none] gap-2">
              
            </div>
          </div>
        </div>
        <div id="closeProfile" class=" absolute w-6 h-6 bg-red-600 rounded-full flex justify-center items-center -top-1 -right-1 cursor-pointer">
          <p class="text-white font-bold text-md pointer-events-none">X</p>
        </div>
      </div>`;
  mainContainer.appendChild(sectionProfile);
  const expContainer = document.getElementById("expContainer");
  let loopLimit = backupData[index].experience.companies.length;
  let company = backupData[index].experience.companies;
  let EXRole = backupData[index].experience.exRole;
  let startDATE = backupData[index].experience.startDate;
  let endDATE = backupData[index].experience.enDate;

  for (let i = 0; i < loopLimit; i++) {
    const expDiv = document.createElement("div");
    expDiv.classList.add("w-50", "h-30", "border", "px-5", "py-2", "rounded-md", "flex", "flex-col", "justify-center")
    expDiv.innerHTML = `
              <p class="text-md font-bold">Company : <span class="font-normal">${company[i]}</span></p>
              <p class="text-md font-bold">Role : <span class="font-normal">${EXRole[i]}</span></p>
              <p class="text-md font-bold">From : <span class="font-normal">${startDATE[i]}</span></p>
              <p class="text-md font-bold">To : <span class="font-normal">${endDATE[i]}</span></p>
`;
    expContainer.appendChild(expDiv);
  }
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("worker")) {
    let workerID = e.target.id;
    let location = "Unassigned";
    if(e.target.classList.contains("assigned-worker")){
      const currentTarget = e.target;
      let match = currentTarget.className.match(/inZone-([^\s]+)/);
      let locationCode = match[1];
      switch(locationCode){
        case '0' : location = "Conference Room";
        break;
        case '1' : location = "Server Room";
        break;
        case '2' : location = "Security Room";
        break;
        case '3' : location = "Reception Hall";
        break;
        case '4' : location = "Staff Room";
        break;
        case '5' : location = "Archives";
        break;
      }
    }
    let index = backupData.findIndex(data => data.id == workerID);
    profile(index,location);
    const closeProfile = document.getElementById("closeProfile");
    const profileLay = document.querySelector(".profileLay");
    closeProfile.addEventListener("click", () => {
    profileLay.remove();
    })
    document.addEventListener("click",(e)=>{
      if(e.target.classList.contains("profileLay")){
        profileLay.remove();
      }
    })
    document.addEventListener("keydown",(e)=>{
      if(e.key == 'Escape'){
        profileLay.remove();
      }
    })
  }
})
document.addEventListener("click",(e)=>{
  if(e.target.classList.contains("remover")){
    let match = e.target.id.match(/rm-([^\s]+)/);
    let targetId = match[1];
    e.target.closest(".assigned-worker").remove();
    const removedWorker = backupData.find(data => data.id == targetId);
    formData.push(removedWorker);
    displayUnassigned();
    redZoneAlert();
  }
})
function unassignedCounter(){
  let counter = 0;
  counter = formData.length;
  unassaignedworker.innerHTML = counter;
  console.log(counter);
}
function redZoneAlert(){
  const redZones = document.querySelectorAll(".attentionZones");
  redZones.forEach(redZone=>{
    const container = redZone.parentNode;
    if(redZone.childElementCount>0){
      container.classList.remove("bg-red-600/50");
    } else{
      if(!(container.classList.contains("bg-red-600/50"))){
        container.classList.add("bg-red-600/50");
      }
    }
  })
}