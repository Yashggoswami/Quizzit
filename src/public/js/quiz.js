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
                    window.data = data;
                    $('#timer').text(15 + ":" + 01);
                    startTimer();

                    // code for adding quiz functionality will be done here
                    window.counter = 1
                    currentquestion();





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

    $('#submit').click(() => {
        window.data[window.counter-1].submittedAnswer = $('input[name=option]:checked', '#inputform').val();
        $('#resultData').val(JSON.stringify(window.data));
        $('#submitButton').click();
    })

    $('#previous').click(() => {
        let presentQue = $('#questionstatement').text();
        let questionNumber = presentQue.split(/[.]+/);
        // currResult();
        window.data[window.counter-1].submittedAnswer = $('input[name=option]:checked', '#inputform').val();
        window.counter = questionNumber[0] - 1;
        currentquestion();

    })

    $('#next').click(() => {
        let presentQue = $('#questionstatement').text();
        let questionNumber = presentQue.split(/[.]+/);
        // currResult();
        window.data[window.counter-1].submittedAnswer = $('input[name=option]:checked', '#inputform').val();
        window.counter = parseInt(questionNumber[0]) + 1;
        currentquestion();

    })


    function currentquestion() {
        if (window.counter == 1) {
            // previous
            $('#previous').attr('style', 'visibility:hidden');
        } else {
            $('#previous').attr('style', 'visibility:visible');
        }

        if (window.counter == 10) {
            $('#next').attr('style', 'visibility:hidden');
            $('#submit').attr('style', 'visibility:visible');

        } else {
            $('#next').attr('style', 'visibility:visible');
            $('#submit').attr('style', 'visibility:hidden');
        }

        $('#questionstatement').text(window.counter + ". " + window.data[window.counter - 1].questionStatement)
        $('#option1').text(window.data[window.counter - 1].option1)
        $('#option2').text(window.data[window.counter - 1].option2)
        $('#option3').text(window.data[window.counter - 1].option3)
        $('#option4').text(window.data[window.counter - 1].option4)

        $('#inputOption1').val(window.data[window.counter - 1].option1)
        $('#inputOption2').val(window.data[window.counter - 1].option2)
        $('#inputOption3').val(window.data[window.counter - 1].option3)
        $('#inputOption4').val(window.data[window.counter - 1].option4)

        $("input:radio[name='option']").each(function (i) {
            this.checked = false;
        });

        $(`input[name='option'][value='${window.data[window.counter - 1].submittedAnswer}']`).prop("checked",true);


    }
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
        $('#timer').text(m + ":" + s);
        setTimeout(startTimer, 1000);

    }

    function checkSecond(sec) {
        if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
        if (sec < 0) { sec = "59" };
        return sec;
    }
});