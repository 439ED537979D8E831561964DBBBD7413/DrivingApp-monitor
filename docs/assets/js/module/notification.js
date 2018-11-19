
function showNotification(from, align, text, type){
    $.notify({
        message: text

      },{
          type: type,
          timer: 4000,
          placement: {
              from: from,
              align: align
          }
      });
}