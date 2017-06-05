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
                    //console.log(string[0].uname);
                    for (i=0; i<string.length; i++)
                        {
                            var str="<tbody>";
                            str="<tbody>";
                            str+="<tr><td>"+string[i].uname+"</td><td><button class=\"btn waves-effect waves-light teal lighten-2\" onclick=hit("+string[i].uid+",'"+string[i].uname+"')>Play<i class=\"material-icons right\">games</i></button></td></tr>";
                            str+="</tbody>";
                             $("#mytable").append(str);
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
        
        if (string.status == 200)
            {  
                var str="<div class=\"modal-content\">";
                        str+="<h4>Game Request</h4>";
                        str+="<p> FROM "+string[0].sender_name+"</p>";
                        str+="</div>";
                        str+="<div class=\"modal-footer\">";
                        str+="<button class=\"btn waves-effect waves-light teal lighten-2\" type=\"submit\" name=\"action\">Accept<i class=\"material-icons right\">done</i></button>";
                        str+="<button class=\"btn waves-effect modal-action modal-close waves-light teal lighten-2\" type=\"submit\" name=\"action\">Decline<i class=\"material-icons\">delete_forever</i></button>";
                        str+="</div>";
                $("#modal1").html(str);
                //console.log("heloo");
                $('.modal').modal('open');
                //console.log("helloo");
            }
    } 
    }); 
}, 10000);
    });
    
    
   
   
    
    
   



