// import $ from 'jquery';
// function checkFunction(){
//     console.log('fheckFunction');
// }
// checkFunction();
// export {
//     checkFunction
// }
(function($){
    let fileNameContainer = getElementByClass('fileName');
    $(fileNameContainer.children[0]).text('files.name');
    $(fileNameContainer).css('display','block');
    $(getElementByClass('basicFile')).css('display','none');

    function progressBar(){
        console.log($('#valueProgress').css('display','flex'));
        if(true){
            $($('.progressContainer').children()[0]).css('width','80%');
        }
    }
    progressBar();
    function getElementByClass(name){
        try{
            return $('.'+name)[0];
        }
        catch(d){
            return null
        }
    }
    var fileElement = $('#customFile');
    $(fileElement).on('change',function(){
        var files = this.files[0]
        console.log(files.name);
        let fileNameContainer = getElementByClass('fileName');
        $(fileNameContainer.children[0]).text(files.name);
        $(fileNameContainer).css('display','block');
        $(getElementByClass('basicFile')).css('display','none');
    })
    $(getElementByClass('deleteButton')).on('click',function(){
        console.log('buttonClicke');
    })

})($);