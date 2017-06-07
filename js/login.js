$(document).ready(function(){
    $("#formRegister").submit(function(e){
    e.preventDefault();
    var dataString = $("#formRegister").serializeArray();
        //console.log(dataString[0].value);return;
        $.ajax({
                type: "POST",
                url: "110.172.54.91:8888/games/app/login.php",
                data: dataString,
                success: function(result)
                {
                    if (result == '404')
                        {
                            alert("user Already exists");
                            $('#formRegister').trigger("reset");
                        }
                    else 
                    {
                        localStorage.setItem('id',result);
                        var name = dataString[0].value;
                        localStorage.setItem('name',name);
                        
                        //alert("hello");
                        window.location= 'playroom.html';
                    }
                }   
                }); 
  });            
  });