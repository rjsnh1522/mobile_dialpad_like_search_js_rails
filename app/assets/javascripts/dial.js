$(function(){

  var dials = $(".dials ol li");
  var index;
  var number = $(".number");
  var total;

  dials.click(function(){
    index = dials.index(this);
    if(index == 9){
      number.append("*");
    }else if(index == 10){
      number.append("0");
    }else if(index == 11){
      number.append("#");
    }else if(index == 12){
      number.empty();
    }else if(index == 13){
      total = number.text();
      total = total.slice(0,-1);
      number.empty().append(total);
      if(number.html().length == 0){
        $('.show_numb').empty();
      }else{
        search_inside_local(total)
      }
    }else if(index == 14){



    }else{ 
      number.append(index+1); 
      if(number.html().length == 1){
        if (index > 0 && index < 9){
          var c_text = $(this).attr('data-text');
          if(c_text !== ""){
            get_contacts(c_text)
           
          }
        }  
      }else{
        var cur_numbs = number.html();
        search_inside_local(cur_numbs);
      }
    }
  });


});


function get_contacts(c_text){

  $.ajax({
    url: '/homes/get_contacts',
    data:{str:c_text},
    method:'POST',
    success:function(data){
      if(data !== "undefined" || data !==""){
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("myContacts", JSON.stringify(data));
             var number = $(".number");
             var cur_numbs = number.html();
            search_inside_local(cur_numbs)
        } else {
            alert('your browser doesnt support localStorage')
        }
      }
    },
    error:function(){
      alert("something went wrong")
    }

  })   
}

function search_inside_local(cur_numbs){

  var split_numb   = cur_numbs.split('');
  var first_numb   = split_numb[0];
  
  split_numb.shift();
  var left_numb    = split_numb;
  var text_of_numb = $('.digits[data-numb='+first_numb+']').attr('data-text');
  
  var split_text   = text_of_numb.split('');
  var contact_data = JSON.parse(localStorage.getItem('myContacts'));
  
  var search_data = {};
  $.each(split_text,function(k,v){
    var kv = contact_data['contact'];
    $.each(kv[v],function(k,v){
      search_data[v['name']] =v['mobile']
    })
  })

  var temp_d = {}
  if(left_numb.length !== 0){
    $.each(left_numb,function(k,v){
      var text_on_numb = $('.digits[data-numb='+v+']').attr('data-text');
      var split = text_on_numb.split('');
      $.each(split,function(k,v){
        Object.keys(temp_d) === 0 ? search_data : temp_d
        $.each(Object.keys(temp_d) == 0 ? search_data : temp_d,function(ks,vs){
          if(ks.indexOf(v) !== -1){
            temp_d[ks] = vs
          }
        })
      })
    })
  }

  // console.log(search_data)
  if(Object.keys(temp_d).length !== 0){
      list_append_ing(temp_d)
  }else{
    if(Object.keys(search_data).length !== 0){
      list_append_ing(search_data)
    }  
  }
  


  
  // console.log(search_data)
}

function list_append_ing(search_data){
    // console.log(search_data)
    var append_list = '<ul>'
    for(k of Object.keys(search_data)){
      append_list += '<li class="listnum">'+k+' &nbsp; '+search_data[k]+'</li>'
    }
    append_list +='</ul'
    $('.show_numb').append(append_list)


}