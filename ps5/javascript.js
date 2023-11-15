/*
In this project, I have integrated the following JavaScript libraries:
1. Lodash (https://lodash.com/)
2. Moment.js (https://momentjs.com/)
3. Font Awesome (https://fontawesome.com/)

Usage of Lodash:
- I have used Lodash to manipulate arrays. In the 'javascript.js' file, you can find an example where I use the _.map() function to square the elements of an array.

Usage of Moment.js:
- I have utilized Moment.js to work with dates and times. In the 'javascript.js' file, you can see how I use Moment.js to display the current date in a human-readable format.

Usage of Font Awesome:
- I have integrated Font Awesome to include icons in the content. In the 'index.html' file, you can find Font Awesome icons added to the heading and paragraph elements to enhance the visual appearance of the webpage.

These libraries have extended the functionality of this project beyond what's provided in their sample documentation, allowing for improved data manipulation, date handling, and the inclusion of icons for a more visually appealing interface.
*/

// Example usage of Lodash to manipulate arrays
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = _.map(numbers, n => n * n);
console.log(squaredNumbers); // Output: [1, 4, 9, 16, 25]

// Example usage of Moment.js to handle dates
const today = moment();
const formattedDate = today.format('MMMM Do YYYY');
// Update the line that sets the displayed date
document.getElementById('dateText').innerText = moment().format('MMMM Do YYYY');

