document.getElementById("button-a").addEventListener("click", function () {

  Swal.fire({
    title: 'important tips!',
    text: 'Do you want to start quiz?',
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'ok'
  }).then(function (result) {
    if (result.value) {
      location.assign("/quiz")
    }
  })

});

