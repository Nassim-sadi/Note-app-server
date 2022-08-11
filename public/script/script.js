// grab everything we need for Navigation menu and mobile menu
const btn = document.querySelector('.mobile-menu-button');
const sidebar = document.querySelector('.sidebar');
let isSidebarOpen = false;

// add our event listener for the click
if (btn !== null) {
  btn.addEventListener('click', (event) => {
    sidebar.classList.toggle('-translate-x-full');
  });

  // close sidebar if user clicks outside of the sidebar
  document.addEventListener('click', (event) => {
    const isButtonClick = btn === event.target && btn.contains(event.target);
    const isOutsideClick =
      sidebar !== event.target && !sidebar.contains(event.target);
    // bail out if sidebar isn't open
    if (sidebar.classList.contains('-translate-x-full')) {
      return;
    }
    // check to see if user clicks outside the sidebar
    if (!isButtonClick && isOutsideClick) {
      sidebar.classList.add('-translate-x-full');
      return;
    }
  });
}
tinymce
  .init({
    selector: 'textarea#default-editor',
    plugins: 'emoticons ',
    toolbar_sticky: true,
    icons: 'thin',
    autosave_restore_when_empty: true,
  })
  .then(console.log('tiny mce initialized'));

//notification close button  */
const closebtn = document.querySelector('.close');
if (closebtn !== null) {
  closebtn.addEventListener('click', (e) => {
    closebtn.parentNode.classList.add('closed');
  });
  setTimeout(() => {
    if (!closebtn.parentNode.classList.contains('close')) {
      closebtn.parentNode.classList.add('closed');
    }
  }, 5000);
}

//notification color based on Flash msg
const FlashMsg = document.querySelector('.notification');
if (FlashMsg !== null) {
  if (FlashMsg.classList.contains('Deleted')) {
    FlashMsg.classList.add('warning');
  } else if (FlashMsg.classList.contains('Created')) {
    FlashMsg.classList.add('success');
  } else if (FlashMsg.classList.contains('Updated')) {
    FlashMsg.classList.add('normal');
  }
}
///edit mce
if (document.querySelector('#default-edit')) {
  const theDiv = document.querySelector('#content');
  let content = document.createElement('span');
  // Copy the children
  while (theDiv.firstChild) {
    content.appendChild(theDiv.firstChild); // *Moves* the child
  }

  // Insert it
  //theDiv.parentNode.replaceChild(area, theDiv);
  content.classList.remove('hidden');
  console.log('mce about to be initialized');
  tinymce.init({
    selector: 'textarea#default-edit',
    plugins: 'emoticons',
    toolbar_sticky: true,
    icons: 'thin',
    autosave_restore_when_empty: true,
    setup: function (editor) {
      editor.on('init', function (e) {
        editor.setContent(content.outerHTML.toString());
      });
    },
  });
}
