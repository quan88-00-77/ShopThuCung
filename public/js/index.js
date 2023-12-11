const toast = document.getElementById('liveToast');
const btnClose = document.querySelector('.btn-close');

btnClose.addEventListener('click', () => {
    toast.style.display = 'none';
})

setTimeout(() => {
    toast.style.display = 'none';
},3000)