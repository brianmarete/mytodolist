var container;
var dragging;
var dropping;

function dragstart(e) {
  dragging = this;
  dragging.classList.add('dragging');
}

function dragenter(e) {
  if (document.querySelector('.ghost')) {
    document.querySelector('.ghost').classList.remove('ghost');
  }

  this.classList.add('ghost');
}

function dragend() {
  dragging.classList.remove('dragging');
  dropping = document.querySelector('.ghost');
  
  dragIndex = Array.from(document.querySelectorAll('.input')).indexOf(dragging);
  dropIndex = Array.from(document.querySelectorAll('.input')).indexOf(dropping);

  while (document.querySelector('.ghost')) {
    document.querySelector('.ghost').classList.remove('ghost');
  }

  if (dragIndex > dropIndex) {
    container.insertBefore(dragging, dropping);
  }
  else {
    container.insertBefore(dragging, dropping.nextSibling);
  }
}

function dragEnterContent(e) {
  this.parentElement.classList.add('ghost');
}

function addContentListener() {
  if (this.querySelector('div')) {
    for (var i = 0; i < this.querySelectorAll('div').length; i++) {
      this.querySelectorAll('div')[i].addEventListener("dragenter", dragEnterContent);
    }
  }
}

var ready;

ready = function() {
  container = document.querySelector('#items');

  for (var i = 0; i < document.querySelectorAll('.input').length; i++) {
    document.querySelectorAll('.input')[i].addEventListener("dragstart", dragstart);
    document.querySelectorAll('.input')[i].addEventListener("dragend", dragend);
    document.querySelectorAll('.input')[i].addEventListener("dragenter", dragenter);

    document.querySelectorAll('.input')[i].addEventListener("input", addContentListener);
  }
}

document.addEventListener('DOMContentLoaded', ready);
