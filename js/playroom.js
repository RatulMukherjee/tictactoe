   function hit(x,y)
    {
        //alert("hello");
         var sender_id = localStorage.getItem('id')
         $.ajax({
                type: "POST",
                url: "http://110.172.54.91:8888/games/app/gamerequest.php",
                data: { receiver_id: x,
                        receiver_name: y,
                         sender_id:   localStorage.getItem('id'),
                         sender_name: localStorage.getItem('name') 
                      },
                success: function(result)
                {
                    
                    localStorage.setItem('token',result);
                }   
                });
    }

  function accept(x)
{
    //alert("accepted!");
    $.ajax({
                type: "POST",
                url: "http://110.172.54.91:8888/games/app/gameaccept.php",
                data: {  sender_id  :   x,
                         receiver_id:   localStorage.getItem('id'),
                         receiver_name: localStorage.getItem('name') 
                      },
                success: function(result)
                {
                    //console.log(result);
                    localStorage.setItem('token',result);
                }   
                });
    
    
}
function decline()
{
    //alert("declined!");
    $('.modal').modal('close');
     $.ajax({
                type: "POST",
                url: "http://110.172.54.91:8888/games/app/gamedecline.php",
                data: {   
                         
                         receiver_id:   localStorage.getItem('id'),
                         receiver_name: localStorage.getItem('name') 
                      },
                success: function(result)
                {
                    
                    console.log(result);
                }   
                });
    
    
    
    
    
    
}
$(document).ready(function(){
   //console.log(localStorage.getItem('name') + "abc" ); 
    var dataString = localStorage.getItem('id');
     setInterval(function(){ 
         
         //console.log('1');
          $.ajax({
                type: "GET",
                url: "http://110.172.54.91:8888/games/app/playroom.php",
                data: { id: dataString},
              
               
                success: function(result)
                {
                     $('#mytable').find('tbody').remove();
                    var string = JSON.parse(result);
                    if (string.error == "404" )
                        {
                            //console.log("No users Online");
                    
                            var str="<h3 class=\"header center teal-text text-lighten-2\">No Users Online</h3>";
                            $("#online").html(str);
                            
                        }
                    else{
                    
                    var str="<h3 class=\"header center teal-text text-lighten-2\">Users Online</h3>";
                    $("#online").html(str);
                    
                    //console.log(result);
                    for (i=0; i<string.length-1; i++)
                        {
                            var str="<tbody>";
                            str="<tbody>";
                            str+="<tr><td>"+string[i].uname+"</td><td><button class=\"btn waves-effect waves-light teal lighten-2\" onclick=hit("+string[i].uid+",'"+string[i].uname+"')>Play<i class=\"material-icons right\">games</i></button></td></tr>";
                            str+="</tbody>";
                             $("#mytable").append(str);
                        }
                    }
                }   
                }); 
         $.ajax({
        type:"POST",
        url:"http://110.172.54.91:8888/games/app/showRequest.php",
        data:{ myid: localStorage.getItem('id'),
               myname:localStorage.getItem('name')
             },
        success: function(result)
    {
        //console.log(result);
        var string = JSON.parse(result);
        //console.log(string);
        //console.log=(string);
        if (string.status == 200)
            {  
                var str="<div class=\"modal-content\">";
                str+="<h4>Game Request</h4>";
                str+="<p> FROM "+string[0].sender_name+"</p>";
                str+="</div>";
                str+="<div class=\"modal-footer\">";
                str+="<button class=\"btn waves-effect waves-light teal lighten-2 \" onclick=accept("+string[0].sender_id+") type=\"submit\" name=\"action\">Accept<i class=\"material-icons right\">done</i></button>";
                str+="<button class=\"btn waves-effect modal-action   waves-light teal lighten-2 \" onclick=decline() type=\"submit\" name=\"action\">Decline<i class=\"material-icons\">delete_forever</i></button>";
                str+="</div>";
                $("#modal1").html(str);
                //console.log("heloo");
                $('.modal').modal('open');
                //console.log("helloo");
            }
        if (string.accept == 202)
            {
                
                window.location ="gameroom.html";
                
            }
        
        
    }   
    });
}, 3000);
    /*     $("#decline").click(function(){
           console.log("declined");
       });
      $("#accept").click(function(){
           console.log("accepted");
       });*/
    });
    
    
   
   
    
    
   



