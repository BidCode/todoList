const form = document.querySelector('#form');
const ul = document.querySelector('#ul')

let savedLis = JSON.parse(localStorage.getItem('localLi')) || [];

for(let i = 0; i < savedLis.length; i++) {
   const newLi = document.createElement('li');
   newLi.innerText = savedLis[i].task;
    
   newLi.completed = savedLis[i].completed ? true : false;
   if (newLi.completed) {
       newLi.classList.toggle('completed')
   }
   ul.appendChild(newLi);
   
}



form.addEventListener('submit', function(e) {
    e.preventDefault();

    const newLi = document.createElement('li');
    const input = document.querySelector('#input').value;
    newLi.innerText = input;
    ul.appendChild(newLi);
    
    form.reset();
    savedLis.push({task:  newLi.innerText, completed: false});
    localStorage.setItem('localLi', JSON.stringify(savedLis));
})



ul.addEventListener('click', function (e) {
    e.target.classList.toggle('completed');
    let clickedItem = e.target;

    if (!clickedItem.completed) {
        clickedItem.completed = true;
    } else {
        clickedItem.completed = false;
    }
    for (let i = 0; i < savedLis.length; i++) {
        if (savedLis[i].task === clickedItem.innerText) {
            savedLis[i].completed = clickedItem.completed;
            localStorage.setItem('localLi', JSON.stringify(savedLis));
        }
    }
})

ul.addEventListener('dblclick', function (e) {
    e.target.remove('li');

    let deletedItem = e.target;

    savedLis = savedLis.filter(function (todo) {
        return todo.task !== deletedItem.innerText;
    });
    localStorage.setItem('localLi', JSON.stringify(savedLis))
})