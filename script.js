// Define an array of picture file names and corresponding correct answer options
var pictures = [
  { file: "images/haewon.jpg", correctOption: 'option3' },
  { file: "images/haewon1.jpg", correctOption: 'option2' },
  { file: "images/haewon3.jpg", correctOption: 'option1' },
  { file: "images/haewon2.jpg", correctOption: 'option5' },
  { file: "images/haewon4.jpeg", correctOption: 'option4' },
  { file: "images/haewon5.jpg", correctOption: 'option6' }
];

// Define a variable to keep track of the current picture index
var currentPictureIndex = 0;

// Function to check the user's answer
function checkAnswer(selectedOption) {
  if (selectedOption === pictures[currentPictureIndex].correctOption) {
    document.getElementById('result').innerHTML = 'Correct!';
    document.getElementById('picture').classList.add('correct');

    // Show the "Next Picture" button
    document.getElementById('next-button').disabled = false;

    // Set the userAnswered variable to true
    userAnswered = true;
  } else {
    document.getElementById('result').innerHTML = 'Wrong answer!';
    document.getElementById('picture').classList.add('wrong');
  }
}

// Function to load the next picture
function nextPicture() {
  if (!userAnswered) {
    return;
  }

  // Reset the classes on the picture element
  document.getElementById('picture').classList.remove('correct');
  document.getElementById('picture').classList.remove('wrong');

    // Hide the "Correct!" message
  document.getElementById('result').innerHTML = '';

  // Reset the userAnswered variable to false
  userAnswered = false;

  // Increment the current picture index and wrap around if necessary
  currentPictureIndex = (currentPictureIndex + 1) % pictures.length;

  if (currentPictureIndex === 0) {
    // Show the "Game Over" message
    document.getElementById('picture-container').style.display = 'none';
    document.getElementById('options-container').style.display = 'none';
    document.getElementById('h1').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';
    document.getElementById('game-over').style.display = 'block';
  } else {
    // Set the src attribute of the picture element to the new picture
    document.getElementById('picture').setAttribute('src', pictures[currentPictureIndex].file);

    // Shuffle the order of the answer options
    var optionsContainer = document.getElementById('options-container');
    for (var i = optionsContainer.children.length; i >= 0; i--) {
      optionsContainer.appendChild(optionsContainer.children[Math.random() * i | 0]);
    }

    // Set the correct answer option for this picture
    var correctOption = pictures[currentPictureIndex].correctOption;
    var correctButton = document.getElementById(correctOption);
    correctButton.innerHTML = '<img src="checkmark.png" alt="Correct" />';
    correctButton.onclick = function() {
      checkAnswer(correctOption);
    };

    // Clear the result message
    document.getElementById('result').innerHTML = '';

    // Hide the "Next Picture" button
    document.getElementById('next-button').disabled = true;
  }
}