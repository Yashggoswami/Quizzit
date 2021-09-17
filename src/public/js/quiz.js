$(document).ready(function () {
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
                $.ajax({
                    url: "/quiztest",
                    type: "GET",
                    // dataType:"json",
                })
                    .done((data) => {

                      // code for adding quiz functionality will be done here

                            $('#questionstatement').text(data[0].questionStatement)
                            $('#option1').text(data[0].option1)
                            $('#option2').text(data[0].option2)
                            $('#option3').text(data[0].option3)
                            $('#option4').text(data[0].option4)
                       
  
  
                    })
                    .fail((xhr, status, errorThrown) => {
                        alert("failed data fetch")
                    });
                // .always(( xhr, status )=>{
  
                // });
            }else{
                location.assign('/');
            }
        })
});