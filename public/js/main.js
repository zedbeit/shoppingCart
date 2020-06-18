// alert('Hello from main.js');

CKEDITOR.replace( 'editor' );

const confirmDeletion = document.querySelectorAll('a.confirmDeletion');

confirmDeletion.addEventListener('click', (e) => {
    
    if(confirm("Confirm Deletion") == false) {
        e.preventDefault();
        // return false;
    }
    
    // if(r == true) {
    //    return true;
    // }
    // return false;
});
// document.querySelector('.confirmDeletion').addEventListener('click', function() {
//     if(confirm("Confirm Deletion") == false ) {
//         return false;
//     }
// });