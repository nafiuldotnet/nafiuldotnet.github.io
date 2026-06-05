function myToggle(x){
    $(x).toggleClass("myHidden");
}

function myShow(x,y){
    $(y).addClass("w3-black").removeClass("w3-hover-black");
    $(y).siblings().removeClass("w3-black").addClass("w3-hover-black");
    $('.mySection').hide('slow');
    $(x).show('slow');
}



$(document).ready(function() {
    // Apply the ripple effect to the body's background
    //   $('#home').ripples({
    //     interactive: true
    //     // more options here
        
    //   });
    CKEDITOR.replace('message');
    $('#contactForm').on('submit', function (e) {

        e.preventDefault();

        // Sync CKEditor content to textarea
        for (instance in CKEDITOR.instances) {
            CKEDITOR.instances[instance].updateElement();
        }

        const formData = {
            name: $('[name="name"]').val(),
            email: $('[name="email"]').val(),
            subject: $('[name="subject"]').val(),
            message: $('[name="message"]').val()
        };

        const btn = $(this).find('button[type="submit"]');

        btn.prop('disabled', true)
           .html('<i class="fas fa-spinner fa-spin"></i> Sending...');

        $.ajax({
            url: 'https://minicom.nicsoftit.com/mail-nafiul',
            method: 'POST',
            data: formData,

            success: function (response) {

                alert(response.message);

                $('#contactForm')[0].reset();

                CKEDITOR.instances.message.setData('');

            },

            error: function (xhr) {

                let msg = 'Failed to send email.';

                if (xhr.responseJSON?.message) {
                    msg = xhr.responseJSON.message;
                }

                alert(msg);

                console.error(xhr.responseJSON);

            },

            complete: function () {

                btn.prop('disabled', false)
                   .html('<i class="fas fa-paper-plane"></i> SEND MESSAGE');

            }
        });

    });
});

