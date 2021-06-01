const homepage = document.getElementById("homepage");
const allStudents = document.getElementById("all-Students");
const iFrame = document.querySelector(".iFrame");

const addTeacher = document.getElementById("add-Teacher");
const listTeacher = document.getElementById("all-Teachers");

let url = "home";
const formLogout = document.querySelector(".formLogout"); // form hien thi log out
const btnLogout = document.querySelector("#btnLogout"); // button hien thi form
const agreeLogout = document.querySelector("#agreeLogout"); // dong y dang xuat
// const auth = firebase.auth();
const makeAdmin = document.querySelector(".make-admin");
const formMakeAdmin = document.querySelector(".form-make-admin");
const auth = firebase.auth();
const cancelMakeAdmin = document.querySelector(".cancel-make-admin");

const isAccountExist = (email) => {
  let isAdmin = false;
  return db
    .collection("TeacherAdmin")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach((teacher) => {
        if (teacher.data().email === email) {
          isAdmin = {
            isAdmin: true,
            id: teacher.id,
          };
          return;
        }
      });
      return isAdmin;
    })
    .catch(function (error) {
      return false;
    });
};
const setClassTeacherAdmin = (newLeader) => {
  const { classLeader, id, email } = newLeader;
  return db
    .collection("TeacherAdmin")
    .doc(id)
    .set({
      email: email,
      class: classLeader,
    })
    .then((res) => {
      console.log("success");
    });
};
const makeTeacherAdmin = async (newAccount) => {
  const { classLeader, email, password } = newAccount;
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async function (response) {
      await setClassTeacherAdmin({
        email: email,
        classLeader: classLeader,
        id: response.user.uid,
      });
    })
    .then((result) => {})
    .catch(function (error) {
      console.log(error.message);
    });
};

btnLogout.addEventListener("click", (event) => {
  formLogout.classList.add("open"); // hien thi forms
  console.log();
});

function closeFormLogout() {
  // dong forms
  formLogout.classList.remove("open");
}

agreeLogout.addEventListener("click", (event) => {
  event.preventDefault();
  firebase
    .auth()
    .signOut()
    .then(() => {
      location.assign("./../index.html");
    })
    .catch((error) => {
      // An error happened.
    });
});
firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    location.assign("./../index.html");
  } else {
    homepage.classList.remove("non_active");
  }
});

// doạn này khi vào trang se vao trang all teache dung 1 l

function refresh() {
  if (sessionStorage.getItem("url")) {
    // neu co di theo url cu
    iFrame.src = sessionStorage.getItem("url");
  } else {
    iFrame.src = "./mangeTecher/allTeacher.html";
  }
}
refresh();

allStudents.addEventListener("click", (event) => {
  sessionStorage.setItem("url", "./mangeStudent/allStudent.html");
  iFrame.src = "./mangeStudent/allStudent.html";
});

listTeacher.addEventListener("click", (event) => {
  sessionStorage.setItem("url", "./mangeTecher/allTeacher.html");

  iFrame.src = "./mangeTecher/allTeacher.html";
});
