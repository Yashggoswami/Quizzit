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
                    // document.getElementById('#timer').innerHTML =
                    //   01 + ":" + 11;
                      $('#timer').text( 00 + ":" + 05);
                        startTimer();

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
        } else {
            location.assign('/');
        }
    })

    function startTimer() {
        var presentTime = $('#timer').text();
        var timeArray = presentTime.split(/[:]+/);
        var m = timeArray[0];
        var s = checkSecond((timeArray[1] - 1));
        if (s == 59) { m = m - 1 }
        if (m < 0) {
            //result wala page
            return location.replace('/result')
            
        }
        $('#timer').text( m + ":" + s);
        setTimeout(startTimer, 1000);

    }

    function checkSecond(sec) {
        if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
        if (sec < 0) { sec = "59" };
        return sec;
    }
});