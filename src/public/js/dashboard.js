$(document).ready(function () {
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
        // location.assign("/quiz")
        $.ajax({
          url: "/quiztest",
          type: "GET",
          // dataType:"json",
        })
          .done((data) => {
            // alert(data[0].questionStatement)
            // location.assign("/quiz")
            location.replace('/quiz')
            $(document).ready(()=>{
              $('#questionstatement').text(data[0].questionStatement)
              $('#option1').text(data[0].option1)
              $('#option2').text(data[0].option2)
              $('#option3').text(data[0].option3)
              $('#option4').text(data[0].option4)
            })
            // var text = $('#questionstatement').text()


          })
          .fail((xhr, status, errorThrown) => {
            alert("failed data fetch")
          });
        // .always(( xhr, status )=>{

        // });
      }
    })

  });
});