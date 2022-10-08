# project-BoardSimulator
Project of a board game played between two human players. Made with HTML, CSS and JavaScript. Code made in Portuguese, but user interfaces updated to English.

Rules of the game:
<ul>
  <li>Each player has to choose a nickname</li>
  <li>In each round the player can choose between rolling the dices, taking antidote and quitting</li>
  <li>The sum of the dice will determine how many houses the player moves</li>
  <li>The -1 houses are traps and the player gets poisoned if he stops there</li>
  <li>Poisoned Player:</li>
  <ul>
      <li>is cured of the poison if the result of the dices are equal or if the palyer takes the antidote</li>
      <li>if the result of the dice are different, the player goes back 2 spaces</li>
      <ul>
          <li>if the house he stops on is occupied by another player, he moves back another 3 houses</li>
      </ul>
  </ul>
  <li>Whoever gets to the final house first wins</li>
</ul>

Interface Images: 

![board2](https://user-images.githubusercontent.com/98829238/194715268-b1cbd10c-9fc2-4be7-8cc1-a6c92ec50be5.png)
<br><br>
![board1](https://user-images.githubusercontent.com/98829238/194715261-efd04c3e-1a9f-4282-b6a0-5b540d29d8d3.png)
