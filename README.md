# Typing Speed Test

A responsive and interactive typing speed test built with **HTML, CSS, JavaScript, and Tailwind CSS**.

The application allows users to choose a difficulty level, complete a timed typing test, track their typing accuracy and speed, and save their personal best score.

## Features

* **Three difficulty levels**

  * Easy — 90 seconds
  * Medium — 60 seconds
  * Hard — 30 seconds

* **WPM Calculation**

  * Calculates typing speed in Words Per Minute.

* **Real-time Accuracy Tracking**

  * Tracks typing accuracy while the test is in progress.

* **Character Feedback**

  * Correct characters are highlighted in green.
  * Incorrect characters are highlighted in red.
  * The current character is visually underlined.

* **Countdown Timer**

  * Displays the remaining time during the test.

* **Personal Best**

  * Saves and displays the user's highest WPM score using `localStorage`.

* **Difficulty Persistence**

  * Remembers the selected difficulty using `sessionStorage`.

* **Dark / Light Theme**

  * Users can switch between dark and light themes.
  * The selected theme is saved locally.

* **Restart Functionality**

  * Allows users to start a new test after finishing.

* **Responsive Design**

  * Designed to work across different screen sizes.

* **Interactive UI**

  * Includes animated transitions, popups, result screens, and dynamic character styling.

## Technologies Used

### Languages

* HTML5
* CSS3
* JavaScript (ES6+)

### Tools & Technologies

* Tailwind CSS
* DOM Manipulation
* JavaScript Event Handling
* Local Storage API
* Session Storage API
* CSS Animations
* Responsive Web Design

## How It Works

1. Select a difficulty level.
2. Start the typing test.
3. Type the displayed paragraph as accurately and quickly as possible.
4. The application tracks:

   * Typing speed (WPM)
   * Accuracy
   * Errors
   * Remaining time
5. The test ends when:

   * The timer reaches zero, or
   * The paragraph is completed.
6. A result screen displays the final score and personal best.

## Project Structure

```text
Typing-Speed-Test/
│
├── index.html
├── style.css
├── script.js
└── images/
    ├── logo-small.svg
    └── icon-completed.svg
```

## Storage

The application uses browser storage to persist user preferences and results.

### `localStorage`

Used for:

* Personal best WPM
* Selected theme

### `sessionStorage`

Used for:

* Selected difficulty level

## Learning Goals

This project was built to practice core frontend concepts, including:

* DOM manipulation
* Keyboard and click events
* Managing application state with JavaScript
* Dynamic UI updates
* Browser storage
* Timers and event handling
* Responsive layouts
* Tailwind CSS
* Structuring JavaScript logic into reusable functions

## Future Improvements

Possible improvements include:

* Randomized typing passages
* Multiple typing test categories
* Typing history and statistics
* More detailed performance analytics
* Leaderboards
* Multi-language support
* More advanced WPM and accuracy calculations
* Migrating the application to React

## License

This project is open for learning and personal use.
