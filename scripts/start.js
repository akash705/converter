// import $ from 'jquery';
// function checkFunction(){
//     console.log('fheckFunction');
// }
// checkFunction();
// export {
//     checkFunction
// }
(function($){
    function progressBar(){
        console.log($('#valueProgress').css('display','flex'));
        if(true){
            $($('.progressContainer').children()[0]).css('width','80%');
        }
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
    // $(fileElement).on('change',function(){
    //     if(!this.files[0]){
    //         return 0;
    //     }
    //     var files = this.files[0];
    //     let fileNameContainer = getElementByClass('fileName');
    //     $(fileNameContainer.children[0]).text(files.name);
    //     $(fileNameContainer).css('display','block');
    //     if(!getEmailFromLocal()){
    //         console.log(getEmailFromLocal()); 
    //         $(getElementByClass('emailRequired')).css('display','block')
    //     }
    //     $(getElementByClass('basicFile')).css('display','none');
    // })
    // $(getElementByClass('deleteButton')).on('click',function(){
    //     let fileNameContainer = getElementByClass('fileName');
    //     $(getElementByClass('EmailRequired')).css('display','none')
    //     $(fileNameContainer).css('display','none');
    //     $(getElementByClass('basicFile')).css('display','block');
    // })
    $('#submitButton').on('click',function(){
        $('form#uploadForm').trigger('submit');
    })
    $("form#uploadForm").submit(function(e) {
        e.preventDefault();    
        var formData = new FormData(this);
        $.ajax({
            url: 'http://localhost:9000/upload',
            type: 'POST',
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
    function submit(){
     
    }

})($);
