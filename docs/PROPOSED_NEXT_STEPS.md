# Proposed next steps and improvements

Due to the time restriction, I was unable to complete building out all the app requirements. This document explains some proposed next steps and improvements that I would make.

## CSS
- **Special button behaviour**: To implement this, I will give the 'Stake ATOM' button a fixed position property as well as a bottom value so there's some space beneath it. Once the transaction history table is fully in the viewport, the button's style will change from fixed to relative. This can be achieved using the Intersection Observer API, creating an object instance, targeting the button element to observe and writing a callback function to call when the value is intersecting with the viewport (using entry.isIntersecting). An alternative solution is to use the onScroll event listener. The listener's callback function will use the getBoundingClientRect method which will return the table's position from the top, bottom, left and right of the viewport. If the top property is greater than 0 and it's bottom property is less than the height of the window (using window.innerHeight), it's in the viewport. I will include an offset value to make sure the button becomes relative at the right point. Once the component unmounts, I'll remove the event listener to avoid memory leaks. I could also use the react-visibility-sensor package to achieve this.
- **Style consistency**: I would make more use of the global theme from styled components, using consistent padding, margin and color values across the page.
- **Clean up components**: To make the components cleaner, I would separate the styles into their own files.

## Functionality

- **Finish implementing the guided tour**: Although the package I used for the guided tour (reactour) has its limitations, I could include an oval shaped mask component to replace the current one using the reactour mask prop - this will make the UI look a bit more similar to the screenshots given. I could also implement this manually by writing a function that uses setInterval to highlight a part of the screen every 3 seconds. The first step will be to create the tooltip UI. This will be a reusable component that will accept position coordinates and the step content as props. Next, I will write a function that loops through the steps array; for each step, I will get the element using querySelector, and retrieve its X and Y position properties using the getBoundingClientRect method. On the first loop, I will display the tooltip, passing it the coordinates of the current element, as well as it's content. I will repeat this for each step with a 3 second pause using setInterval. I will use the CSS transition and transform (translate) properties to move the tooltip component from one position to the other.
- **Update the user's balance after every transaction**: I will implement this using local storage. Once the app loads, a default balance will be stored in local storage. Every time the user clicks on the Stake button, I will compute a new balance by subtracting the stake amount from the default value. I will then update the local storage value.


## HTML

- **Accessibility**: I would spend some time using a screen reader to go through the application to make sure all tabbable elements have an accessible name, and include aria attributes where necessary.
