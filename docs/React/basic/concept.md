---
title: React Basic Concept
---

1. React apps are made out of componets. A component is a piece of UI that has it's own logic and appearance. So the best practice in React development is modularization and reusable componets.
2. The markup syntax in React is called JSX. The JSX code is compiled to javascript Object, containing the element tag, element properties, and children elements.

    A JSX element is a combination of Javascript code and HTML tags that describes what you'd like to display.
   
    JSX mixes the HTML and Jacasctipt code, we can write javasctipt code, like conditons, for loop, in the HTML code, by curly barces. or we can say, JSX make the html code as a port of javascript. we can use the view code as variable.

    In the rendering lists cases, what we shoulde pay attention to is add key for every item. it will uniquely indentifies that item among its siblings. React uses your keys to know what happend when you later insert, delete, or reorder the item. it will improve the render efficiency by ignoring no update items by the keys.

    event handler functions are also variables. after you defined a function, you can pass it to the element prop, like `onClick`. Don't need to call the function.

    use props to pass and share datas and states; use hook to manage the state of a component.

3. To collect data from multiple children, or to have two child components communicate with each other, declare the shared state in their parent component.
    
    Lifting state into a parent component is common when React components are refactored.

4. Data immutability. Avoiding direct data mutation lets you keep previous version of the data intact, and reuse them later.

5. when a list is re-rendered, React take each list item's key and searches the previous list's items for matching key. if the current list has a key that didn't exist before, React create a component. if the current list is missing a key that existed in the previous list, React destroyes the previouse component. if two keys match, the corresponding component is moved.
   
6. Five steps to implement a React UI:
   1. Break the UI into a component hierarchy. 
      - single responsibility principle
   2. Build a static version in React
      - Don't use state at all to build a static version. State is reserved only for interactivity.
      - one-way date flow: The data flows down from the top-level component to the ones at the bottom of the tree.
   3. Find the minimal but complete representation of UI state
      - The most important priciple for structuring state is to keep it [DRY(Don't repeat Yourself)](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
      - Figure out the minimal represetation of the state your application needs and calculate everything else on-demand.
   4. Identify where your state should live
      - Indentify which compoent is responsible for changing the state you find in the previous step.
      - Often, we put the state directly into their common parent. Also, we can put the state into some component above their common parent. If there isn't a compoent, we can create one solely for holding the state and add it somewhere above their common parent.
   5. Add inverse data flow
      - update data from bottom to top. We should pass the `set` function from the component where the state live to the bottom component. Call the `set` function to update.