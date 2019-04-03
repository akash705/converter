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
    // progressBar();
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
        $(getElementByClass('EmailRequired')).css('display','none')
        $(fileNameContainer).css('display','none');
        $(getElementByClass('basicFile')).css('display','block');
    })

})($);