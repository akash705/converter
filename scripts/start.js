// import $ from 'jquery';
// function checkFunction(){
//     console.log('fheckFunction');
// }
// checkFunction();
// export {
//     checkFunction
// }
(function($){
    var userEmail="";
    function progressBar(width){
        $('#valueProgress').css('display','flex')
        window.requestAnimationFrame(()=>{
            $($('.progressContainer').children()[0]).css('width',width);
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
            console.log(getEmailFromLocal()); 
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
        var formData = new FormData(this);
        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = (evt.loaded / evt.total)*100;
                        //Do something with upload progress here
                        progressBar(percentComplete+'%');
                    }
               }, false);
               xhr.addEventListener("progress", function(evt) {
                   if (evt.lengthComputable) {
                       var percentComplete = (evt.loaded / evt.total)*100;
                        progressBar(percentComplete+'%');
                   }
               }, false);
               return xhr;
            },
            url: 'http://localhost:9000/upload',
            type: 'POST',
            headers: { 'x-email': userEmail },
            data: formData,
            success: function (data) {
                    console.log('form uploaded successfully');
                    console.log(data);
            },
            error:function(err){
                console.log(err);
            },
            cache: false,
            contentType: false,
            processData: false
        });
    });
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

})($);
