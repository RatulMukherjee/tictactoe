function check(string)
{
    var ret = 0;
    var symbol = '';
    var winner = '';
     if (localStorage.getItem('token') == "Sender")
        {  symbol = "X";
        }
    else
        {
            symbol = "O";
        }
     
    if (string[0].box1 == symbol && string[0].box2==symbol && string[0].box3==symbol)
     { winner = symbol;
       ret=symbol; 
     }
    else  if (string[0].box4 == symbol && string[0].box5==symbol && string[0].box6==symbol)
     { winner = symbol; 
       ret=symbol;
     }
     else if (string[0].box7 == symbol && string[0].box8==symbol && string[0].box9==symbol)
     { winner = symbol;
      ret=symbol; 
     }
    else  if (string[0].box1 == symbol && string[0].box4==symbol && string[0].box7==symbol)
     { winner = symbol;  
       ret=symbol;
     }
     else  if (string[0].box2 == symbol && string[0].box5==symbol && string[0].box8==symbol)
     { winner = symbol;  
       
       ret=symbol;
     }
     else  if (string[0].box3 == symbol && string[0].box6==symbol && string[0].box9==symbol)
     { winner = symbol; 
       ret=symbol; 
     }
     else  if (string[0].box1 == symbol && string[0].box5==symbol && string[0].box9==symbol)
     { winner = symbol;
       ret=symbol; 
     }
     else  if (string[0].box3 == symbol && string[0].box5==symbol && string[0].box7==symbol)
     { winner = symbol;
       ret=symbol; 
     }
    else if (string[0].box1 != 1 && string[0].box2 != 2 && string[0].box3 != 3 && string[0].box4 != 4 && string[0].box5 != 5 && string[0].box6 != 6 && string[0].box7 != 7 && string[0].box8 != 8 && string[0].box9 != 9  )
        {
            ret=1;
        }
    else 
        {
            ret = 0;
        }
    if (ret != 0)
        $.ajax({
                type: "POST",
                url: "http://110.172.54.91:8888/games/app/gameresult.php",
                data: {  winner:   ret,
                         myid:   localStorage.getItem('id'),
                         myname: localStorage.getItem('name'),
                         token:  localStorage.getItem('token')
                       
                      },
                success: function(result)
                {
                    //console.log(result);
                   
                }   
                });  
    return 0;
}
function redirect ()
{
            $.ajax({
                type: "POST",
                url: "http://110.172.54.91:8888/games/app/newgame.php",
                data: {  
                         myid:   localStorage.getItem('id'),
                         myname: localStorage.getItem('name'),
                         
                       
                      },
                success: function(result)
                {
                     window.location ="playroom.html";
                   
                }   
                }); 
}
function hit(id)
{
    //console.log(id);
    var symbol= ''; 
    if (localStorage.getItem('token') == "Sender")
        {
            document.getElementById(id).innerHTML = "<h3 style=\"color:#e53935; text-shadow: 2px 2px #e0e0e0; \">X</h3>";
            var symbol = "X";
        }
    else
        {
            document.getElementById(id).innerHTML = "<h3 style=\"color:#fdd835; text-shadow: 2px 2px #e0e0e0; \">O</h3>";
            var symbol = "O";
        }
     $.ajax({
                type: "POST",
                url: "http://110.172.54.91:8888/games/app/move.php",
                data: {   
                         myid:   localStorage.getItem('id'),
                         myname: localStorage.getItem('name'),
                         token:  localStorage.getItem('token'),
                         move:    id,
                         symbol:  symbol          
                      },
                success: function(result)
                {
                    
                  //console.log(result);
                }   
                });
}
$(document).ready(function(){
    countdown = 10;
    $.ajax({
                type: "GET",
                url: "http://110.172.54.91:8888/games/app/gameroom.php",
                data: {   
                         myid:   localStorage.getItem('id'),
                         myname: localStorage.getItem('name'),
                         token:  localStorage.getItem('token') 
                      },
                success: function(result)
                {
                  var string= JSON.parse(result);
                    //console.log(string);
                     $('#mydiv').find('div').remove();
                    var str="<h5 class=\"header center teal-text text-lighten-2\">"+string[0].sender_name+" vs "+string[0].receiver_name+" </h5>";
                    $("#mydiv").append(str);
                }   
                });
    var timer = setInterval(function(){ 
          $.ajax({
                type: "GET",
                url: "http://110.172.54.91:8888/games/app/gameroom.php",
                data: { myid:  localStorage.getItem('id'),
                        myname:localStorage.getItem('name'),
                        token:  localStorage.getItem('token')
                      },
                success: function(result)
                {
                    var string= JSON.parse(result);
                    
                     var ret = check(string);
                    if (string[0].turn == localStorage.getItem('token'))
                        {
                            $("#pointer").addClass("disabledbutton");
                            countdown=10;
                           
                        }
                    else
                        {
                          $("#pointer").removeClass("disabledbutton");
                            //console.log(countdown);
                            countdown--;
                            if (countdown == 0)
                            {
                                //console.log("time's up");
                                
                                $.ajax({
                                        type: "POST",
                                        url: "http://110.172.54.91:8888/games/app/timeout.php",
                                        data: {  
                                                 myid:   localStorage.getItem('id'),
                                                 myname: localStorage.getItem('name'),
                                                 token:  localStorage.getItem('token')


                                              },
                                        success: function(result)
                                        { 
                                            
                                        }   
                                        });
                            }
                        }
                    if ( string[0].result != "ongoing")
                        {
                            
                            //alert ("winner is: " +string[0].result);
                             $('#resultdiv').find('div').remove();
                                if (string[0].result == 'Sender')
                                    
                                var str="<h5 class=\"header center teal-text text-lighten-2\"> The winner is "+string[0].sender_name+"</h5>";
                                else if (string[0].result == 'Receiver')
                                    var str="<h5 class=\"header center teal-text text-lighten-2\"> The winner is "+string[0].receiver_name+"</h5>";
                                 else
                                     var str="<h5 class=\"header center teal-text text-lighten-2\"> The game is a "+string[0].result+"</h5>";
                                     
                             $("#pointer").addClass("disabledbutton");     
                             $("#resultdiv").html(str);
                            
                              $('#restart').find('div').remove();
                             var str="<div class=\"input-field col s12\"><button class=\"btn waves-effect waves-light teal lighten-2 z-depth-3\" type=\"submit\" name=\"newgame\" onclick=\"redirect()\" id=\"newgame\">Play New Game</button></div>";
                               $("#restart").append(str);
                             clearInterval(timer);
                        }
                      
                       
                     $('#board').find('div').remove();
                       var str="";
                    if(string[0].box1!="X" && string[0].box1!="O")
                        
                       {
                          var x = "box1";
                          str+="<div class=\"col s4 box1 allmove \" id=\"box1\" onclick=\"hit('box1')\"><h3 style=\"visibility: hidden;\" >1</h3></div>";
                        
                       }
                       else
                       {
                          str+="<div class=\"col s4 box1 allmove \" ><h3>"+string[0].box1+"</h3></div>"; 
                       }
                    if(string[0].box2!="X" && string[0].box2!="O")
                       {
                          str+="<div class=\"col s4 box2 allmove \" id=\"box2\" onclick=\"hit('box2')\"><h3 style=\"visibility: hidden;\">1</h3></div>";
                        
                       }
                       else
                       {
                          str+="<div class=\"col s4 box2 allmove \"><h3>"+string[0].box2+"</h3></div>"; 
                       }
                    if(string[0].box3!="X" && string[0].box3!="O")
                       {
                          str+="<div class=\"col s4 box3 allmove \" id=\"box3\" onclick=\"hit('box3')\"><h3 style=\"visibility: hidden;\">1</h3></div>";
                        
                       }
                       else
                       {
                          str+="<div class=\"col s4 box3 allmove \" id=\"box3\"><h3>"+string[0].box3+"</h3></div>"; 
                       }
                    if(string[0].box4!="X" && string[0].box4!="O")
                       {
                          str+="<div class=\"col s4 box4 allmove \" id=\"box4\" onclick=\"hit('box4')\"><h3 style=\"visibility: hidden;\">1</h3></div>";
                        
                       }
                       else
                       {
                          str+="<div class=\"col s4 box4 allmove \" id=\"box4\"><h3>"+string[0].box4+"</h3></div>"; 
                       }
                    if(string[0].box5!="X" && string[0].box5!="O")
                       {
                          str+="<div class=\"col s4 box5 allmove \" id=\"box5\" onclick=\"hit('box5')\"><h3 style=\"visibility: hidden;\">1</h3></div>";
                        
                       }
                       else
                       {
                          str+="<div class=\"col s4 box5 allmove \" id=\"box5\"><h3>"+string[0].box5+"</h3></div>"; 
                       }
                    if(string[0].box6!="X" && string[0].box6!="O")
                       {
                          str+="<div class=\"col s4 box6 allmove \" id=\"box6\" onclick=\"hit('box6')\"><h3 style=\"visibility: hidden;\">1</h3></div>";
                        
                       }
                       else
                       {
                          str+="<div class=\"col s4 box6 allmove \" id=\"box6\"><h3>"+string[0].box6+"</h3></div>"; 
                       }
                    if(string[0].box7!="X" && string[0].box7!="O")
                       {
                          str+="<div class=\"col s4 box7 allmove \" id=\"box7\" onclick=\"hit('box7')\"><h3 style=\"visibility: hidden;\">1</h3></div>";
                        
                       }
                       else
                       {
                          str+="<div class=\"col s4 box7 allmove \" id=\"box7\"><h3>"+string[0].box7+"</h3></div>"; 
                       }
                    if(string[0].box8!="X" && string[0].box8!="O")
                       {
                          str+="<div class=\"col s4 box8 allmove \" id=\"box8\" onclick=\"hit('box8')\"><h3 style=\"visibility: hidden;\">1</h3></div>";
                        
                       }
                       else
                       {
                          str+="<div class=\"col s4 box8 allmove \" id=\"box8\"><h3>"+string[0].box8+"</h3></div>"; 
                       }
                     if(string[0].box9!="X" && string[0].box9!="O")
                       {
                          str+="<div class=\"col s4 box9 allmove \" id=\"box9\" onclick=\"hit('box9')\"><h3 style=\"visibility: hidden;\">1</h3></div>";
                        
                       }
                       else
                       {
                          str+="<div class=\"col s4 box9 allmove \" id=\"box9\"><h3>"+string[0].box9+"</h3></div>"; 
                       }
                    $("#board").append(str);
                }   
                });
  },1000);
});