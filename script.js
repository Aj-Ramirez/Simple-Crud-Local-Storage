// Form validation ***
function validateForm(){
     var name = document.getElementById("name").value;
     var age = document.getElementById("age").value;
     var address = document.getElementById("address").value;
     var email = document.getElementById("email").value;   

          if(name == ""){
               alert("Please fill the name field");
               return false;
          }

          if(age == ""){
               alert("Please fill the age field");
               return false;
               }
               else if(age < 1 || age > 80){
                    if (age < 1){
                         alert("Age must not be zero or less than zero");
                         return false;
                    }else if (age > 80){
                         alert("Age must not be older than 80 years old");
                         return false;
                    }    
               }
               
          if(address == ""){
               alert("Please fill the address field");
               return false;
          }

          if(email == ""){
               alert("Please fill the email field");
               return false;
          }
               else if(!email.includes("@")){
                    alert("Invalid email address");
                    return false;
               }

     return true;
}


// Adding data to localStorage ***
function addData(){
     //if the form is validated proceed to  save data in Local Storage
     if(validateForm() == true){
          var name = document.getElementById("name").value;
          var age = document.getElementById("age").value;
          var address = document.getElementById("address").value;
          var email = document.getElementById("email").value;   

          var peopleList;
               if (localStorage.getItem("peopleList") == null){
                    peopleList =[];
                    }else{
                    peopleList = JSON.parse(localStorage.getItem("peopleList"));
                    }

                    // Generate an auto-incrementing ID
                    // var id = 1;
                    // if (peopleList.length > 0) {
                    //      id = peopleList[peopleList.length - 1].id + 1;
                    // }

          // Generate an auto-increment ID number
          var currentDate = new Date();
          var year = currentDate.getFullYear();
          var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
          var id = year + "-" + month + "-" + "";
          var queue = 1;

               if (peopleList.length > 0) {
                    var lastId = peopleList[peopleList.length - 1].id;
                    var lastQueue = parseInt(lastId.split('-')[2]); //checking the last queue in locaStorage to add new ID
                    if (!isNaN(lastQueue)) {
                         queue = lastQueue + 1;
                    }
               }
                    var id = year + "-" + month + "-" + queue;

               peopleList.push({
                    id: id,
                    name: name,
                    age: age,
                    address: address,
                    email: email,
               });

          localStorage.setItem("peopleList", JSON.stringify (peopleList));

          showData();

          document.getElementById("name").value ="";
          document.getElementById("age").value ="";
          document.getElementById("address").value ="";
          document.getElementById("email").value ="";
     }
}


// Displaying data on the table ***
function showData(){
     var peopleList;
          if (localStorage.getItem("peopleList") == null){
               peopleList = [];
          } else {
                    peopleList = JSON.parse(localStorage.getItem("peopleList"));
               }
          
          var html = "";

          peopleList.forEach(function (element, index){
               html += "<tr>";
               html += "<td>" + element.id + "</td>";
               html += "<td>" + element.name + "</td>";
               html += "<td>" + element.age + "</td>";
               html += "<td>" + element.address + "</td>";
               html += "<td>" + element.email + "</td>";
               html += '<td> <button onclick="updateData('+index+')"<i class="fas fa-edit"></i></button><button onclick="deleteData('+index+')"<i class="fas fa-trash"></i></button> </td>';
               html += "</tr>";
          });

     document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = showData(); //data is set in the table



// Function delete to remove any data in localStorage or table
function deleteData(index){
     var peopleList;
          if (localStorage.getItem("peopleList") == null){
               peopleList=[];
          }else{
               peopleList = JSON.parse(localStorage.getItem("peopleList"));
          }

     peopleList.splice(index, 1);
     localStorage.setItem("peopleList", JSON.stringify (peopleList));
     showData();

}

// Function to update any data in localStorage
function updateData(index){
     document.getElementById("Submit").style.display = "none";
     document.getElementById("Update").style.display = "block";

     var peopleList;
     if(localStorage.getItem("peopleList") == null) {
          peopleList = [];
     } else {
          peopleList = JSON.parse(localStorage.getItem("peopleList"));
     }

     document.getElementById("name").value = peopleList [index].name;
     document.getElementById("age").value = peopleList [index].age;
     document.getElementById("address").value = peopleList [index].address;
     document.getElementById("email").value = peopleList [index].email;

     document.getElementById("Update").onclick = function(){
          if(validateForm()== true){
               peopleList[index].name = document.getElementById("name").value;
               peopleList[index].age = document.getElementById("age").value;
               peopleList[index].address = document.getElementById("address").value;
               peopleList[index].email = document.getElementById("email").value;

               localStorage.setItem("peopleList", JSON.stringify(peopleList));
               showData();
               
               // saving data again after updating  information
               document.getElementById("name").value = "";
               document.getElementById("age").value = "";
               document.getElementById("address").value = "";
               document.getElementById("email").value = "";

               document.getElementById("Submit").style.display = "block";
               document.getElementById("Update").style.display = "none";
          }
     }

}

// Function search to easy to delete or update data from the table ***
function searchData() {
     var keyword = document.getElementById("search").value.toLowerCase();
     var peopleList;
     
          if (localStorage.getItem("peopleList") == null) {
          peopleList = [];
          } else {
          peopleList = JSON.parse(localStorage.getItem("peopleList"));
          }
     
     var filteredList = peopleList.filter(function(element) {
        return (
           element.name.toLowerCase().includes(keyword) ||
           element.age.toLowerCase().includes(keyword) ||
           element.address.toLowerCase().includes(keyword) ||
           element.email.toLowerCase().includes(keyword)
        );
     });
     
     var html = "";
     
     filteredList.forEach(function(element, index) {
        html += "<tr>";
        html += "<td>" + element.id + "</td>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html += '<td> <button onclick="updateData(' + index + ')"><i class="fas fa-edit"></i></button><button onclick="deleteData(' + index + ')"><i class="fas fa-trash"></i></button> </td>';
        html += "</tr>";
     });
     
     document.querySelector("#crudTable tbody").innerHTML = html;
     document.getElementById("search").value ="";


}
  