/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//GLOBAL VARIABLES
const pageHeader = document.querySelector('.page-header');
const studentList = document.querySelector('.student-list').children;


//Hide all students except the ones on page you want to show
const showPage = (list, page) => {
   for (let i = 0; i < list.length; i++){
      const maxIndex = (page * 10) - 1;
      const minIndex = (page * 10) - 10;
      
      if (i >= minIndex && i <= maxIndex){
         list[i].style.display = '';
      } else {
         list[i].style.display = 'none';
      }
   }
}

showPage(studentList, 1);


/* Function to take studentList and break it into correct amount of pages,
   Then create and append the appropriate amount of li's and a tags,
   Finally add event listeners to each a tag*/

const appendPageLinks = (list) => {
   const webPage = document.querySelector('.page');
   //Determine number of pages needed for given list
   const pages = Math.ceil(list.length / 10);
   
   //Create and append the div
   const div = document.createElement('div');
   div.className = 'pagination';
   webPage.appendChild(div);

   //Create and append ul to store pagination links
   const ul = document.createElement('ul');
   div.appendChild(ul);

   //Create li's and a tags for however many pages are needed
   for(let i = 1; i <= pages; i++){
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = i;
      li.appendChild(a);
      ul.appendChild(li);
   }

   //Select all newly created <a> tags
   const aTags = document.querySelectorAll('a');
   
   //Loop over all <a> tags and add an event listener to each
   for(let i = 0; i < aTags.length; i++){
      //Give each <a> tag an event listener
      aTags[i].addEventListener('click', (e) => {
         showPage(list, e.target.textContent);

         //Clear active class from each <a> tag
         for(let i = 0; i < pages; i++){
            aTags[i].className = '';
         }
         //Assign the class active to the currently clicked button
         event.target.className = 'active';
      });
      //Make first button active because that will be the default page
      aTags[0].className = 'active';
   }
   
}

appendPageLinks(studentList);


//Create the search HTML
const createSearch = () => {
   const students =[];
   const pageLinks = document.getElementsByClassName('pagination')[0];
   const pageLinksParent = pageLinks.parentNode;
   //Create KeyUp function
   const keyUpFunc = () => {
      
   }
   
   //Create Div to store all elements
   const searchDiv = document.createElement('div');
   searchDiv.className = 'student-search';

   //Create input
   const input = document.createElement('input');
   input.type = 'text';
   input.placeholder = "Search for students...";
   input.onkeyup = keyUpFunc;
   searchDiv.appendChild(input);

   //Create search button
   const searchButton = document.createElement('button');
   searchButton.textContent = "Search";
   searchDiv.appendChild(searchButton);

   searchButton.addEventListener('click', (e) => {
      //Capture input value when search is clicked
      const inputValue = input.value.toUpperCase();

      //Loop over students to see if search matches any student names
      for (let i = 0; i < studentList.length; i++){
         const studentDiv = studentList[i];
         const student = studentList[i].getElementsByTagName('h3')[0].innerHTML.toUpperCase();

         //Check if student has the input value in it
         if(student.includes(inputValue)){
            students.push(studentDiv);
            studentDiv.style.display = '';
         } else {
            studentDiv.style.display = 'none';
         }
      }
      //Call showPage function on new found students list
      showPage(students, 1);
      //Append proper buttons for new search results
      appendPageLinks(students);
      //Remove old list from the page
      pageLinksParent.removeChild(pageLinks);
      
   });

   return searchDiv;
}

//Append the searchDiv and all of its attached elements onto the page header 
pageHeader.appendChild(createSearch());
