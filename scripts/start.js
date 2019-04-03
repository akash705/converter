(function($){
    var userEmail="";
    function progressBar(width){
        $('#valueProgress').css('display','flex')
        window.requestAnimationFrame(()=>{
            $($('.progressContainer').children()[0]).css('width',width);
            $($('.progressContainer').children()[0]).text(width);
        });
    }
    function getElementByClass(name){
        try{
            return $('.'+name)[0];
        }
        catch(d){
            return null
        }
    }
    function getEmailFromLocal(){
        return localStorage.getItem('email');
    }
    var fileElement = $('#customFile');
    $(fileElement).on('change',function(){
        if(!this.files[0]){
            return 0;
        }
        var files = this.files[0];
        let fileNameContainer = getElementByClass('fileName');
        $(fileNameContainer.children[0]).text(files.name);
        $(fileNameContainer).css('display','block');
        if(!getEmailFromLocal()){
            $(getElementByClass('emailRequired')).css('display','block')
        }
        $(getElementByClass('basicFile')).css('display','none');
    })
    $(getElementByClass('deleteButton')).on('click',function(){
        let fileNameContainer = getElementByClass('fileName');
        $(getElementByClass('emailRequired')).css('display','none')
        $(fileNameContainer).css('display','none');
        $(getElementByClass('basicFile')).css('display','block');
    })
    $('#submitButton').on('click',function(){
        let email = document.getElementById('emailAddress');
        email = $(email).val();
        if(!validateEmail(email)){
            alert('Invalid Email id');
            return 0;
        }
        else{  
                userEmail=email;
                $("form#uploadForm").trigger('submit');            
        }
    })
    $("form#uploadForm").submit(function(e) {
        e.preventDefault();    
        $(getElementByClass('emailRequired')).css('display','none')
        $(getElementByClass('deleteButton')).remove();
        var formData = new FormData(this);
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = (evt.loaded / evt.total)*100;
                        progressBar(percentComplete.toFixed()+'%');
                    }
               }, false);
               xhr.addEventListener("progress", function(evt) {
                   if (evt.lengthComputable) {
                       var percentComplete = (evt.loaded / evt.total)*100;
                       progressBar(percentComplete.toFixed()+'%');
                   }
               }, false);
               return xhr;
            },
            url: 'http://localhost:9000/upload',
            type: 'POST',
            headers: { 'x-email': userEmail },
            data: formData,
            success: function (data) {
                UploadSuccessfull()
            },
            error:function(err){
                $('.msg').css('display','block').text('File has been upload you will be notified soon');
            },
            cache: false,
            contentType: false,
            processData: false
        });
    });
    function UploadSuccessfull(){
            $(getElementByClass('progressContainer'));
            $('.msg').css('display','block').html('File has been uploaded .You Will be notified on <br> <span class="font-weight-bold">'+userEmail+"</span>");
    }
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

})($);
