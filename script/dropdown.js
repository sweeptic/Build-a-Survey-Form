// CUSTOM SELECT

(function () {
  /* Look for any elements with the class "custom-select": */
  let customSelect = document.getElementsByClassName('custom-select');

  for (let i = 0; i < customSelect.length; i++) {
    let selElement = customSelect[i].getElementsByTagName('select')[0];
    /* For each element, create a new DIV that will act as the selected item: */
    let a = document.createElement('DIV');
    let b = document.createElement('DIV');

    a.setAttribute('class', 'select-selected');
    a.innerHTML = selElement.options[selElement.selectedIndex].innerHTML;
    customSelect[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b.setAttribute('class', 'select-items select-hide');
    for (let j = 1; j < selElement.length; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      let c = document.createElement('DIV');
      c.innerHTML = selElement.options[j].innerHTML;
      c.addEventListener('click', function (e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        let s = this.parentNode.parentNode.getElementsByTagName('select')[0];
        let h = this.parentNode.previousSibling;

        for (let i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            let y = this.parentNode.getElementsByClassName('same-as-selected');

            for (let k = 0; k < y.length; k++) {
              y[k].removeAttribute('class');
            }
            this.setAttribute('class', 'same-as-selected');
            break;
          }
        }
        h.click();
      });

      b.appendChild(c);
    }
    customSelect[i].appendChild(b);

    a.addEventListener('click', function (e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      a.classList.add('onFocus');

      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle('select-hide');
      this.classList.toggle('select-arrow-active');
    });
  }

  function closeAllSelect(element) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    let arrNo = [];
    let selectItems = document.getElementsByClassName('select-items');
    let selectSelected = document.getElementsByClassName('select-selected');

    for (let i = 0; i < selectSelected.length; i++) {
      if (element == selectSelected[i]) {
        arrNo.push(i);
      } else {
        selectSelected[i].classList.remove('onFocus');
        selectSelected[i].classList.remove('select-arrow-active');
      }
    }

    for (i = 0; i < selectItems.length; i++) {
      if (arrNo.indexOf(i)) {
        selectItems[i].classList.add('select-hide');
      }
    }
  }

  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener('click', closeAllSelect);
})();
