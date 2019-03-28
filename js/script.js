/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

const studentList = document.querySelector('.student-list').children;
/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

//Hide all students except the ones on page you want to show
const showPage = (list, page) => {
   for (let i = 0; i < list.length; i++){
      //Define the max index of a page
      const maxIndex = (page * 10) - 1;
      //Define the minumum index of a page
      const minIndex = (page * 10) - 10;
      
      if (i >= minIndex && i <= maxIndex){
         studentList[i].style.display = '';
      } else {
         studentList[i].style.display = 'none';
      }
   }
}

showPage(studentList, 1);


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const appendPageLinks = (list) => {
   //get the first instance of the page class which is the main container div
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

   //Select all a tags on page
   const aTags = document.querySelectorAll('a');
   
   //Loop over all a tags and add an event listener to each
   for(let i = 1; i <= aTags.length; i++){
      //Give each a tag an event listener
      aTags[i].addEventListener('click', (e) => {
         showPage(list, e.target.textContent);

         for(let i = 1; i <= pages; i++){
            event.target.className = '';
         }

         event.target.className = 'active';
      });
   }
   
}

appendPageLinks(studentList);