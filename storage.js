//set data in the localstorate in clint side
localStorage.setItem("name", "Showkat");
localStorage.setItem("age", 30);

//get data from localstorate in clint side
localStorage.getItem("name");
localStorage.getItem("age");

//delete data from localstorate in clint side
localStorage.removeItem("name");
localStorage.removeItem("age");

const userObj = {
  name: "Showkat",
};

localStorage.setItem("user", JSON.stringify(userObj));
const strData = localStorage.getItem("user");
const userData = JSON.parse(strData);
console.log(userData);
