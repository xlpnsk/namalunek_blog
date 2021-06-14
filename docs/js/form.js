var rg=["^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ]{2,20}$", "^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ]{2,40}$", "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$", "^([1-9]{1,1}[0-9]{1,1}(-)?[1-9]{1,1}[0-9]{6,6})|([1-9]{1,1}[0-9]{8,8})$"];
function check()
{
var pasek=document.getElementById('alarm');    
var item = [];
item[0] = document.getElementById('fname').value;
item[1] = document.getElementById('lname').value;
item[2] = document.getElementById('mail').value;
item[3] = document.getElementById('tel').value;
item[4] = document.getElementById('date').value;
item[5] = document.getElementById('time').value;
var top=document.getElementById('topic');
var sel="";
for(var el of top.options)
{
    if(el.selected)
    {
        sel+=el.value+" ";
    }
}
item[6]=sel;
for(let i=0;i<7;i++)
{
    if(item[i].length===0)
    {
        pasek.className="alert alert-warning";
        pasek.innerHTML="<strong>Warning!</strong> All fields marked with '*' have to be filled!";
        pasek.hidden=false;
        return;
    }
}
if(!document.getElementById("accept").checked)
{
    pasek.className="alert alert-warning";
    pasek.innerHTML="<strong>Warning!</strong> You have to accept the terms of service to proceed ";
    pasek.hidden=false;
    return;
}
for(let i=0;i<4;i++)
{
    var temp = new RegExp(rg[i]);
    if(!temp.test(item[i]))
    {
        pasek.className="alert alert-danger";
        switch(i)
        {
            case 0:
            {
                pasek.innerHTML="<strong>Warning!</strong> Wrong format of field 'First name'!";
                break;
            }
            case 1:
            {
                pasek.innerHTML="<strong>Warning!</strong> Wrong format of field 'Last name'!";
                break;
            }
            case 2:
            {
                pasek.innerHTML="<strong>Warning!</strong> Wrong format of field 'E-mail'!";
                break;
            }
            case 3:
            {
                pasek.innerHTML="<strong>Warning!</strong> Wrong format of field 'Tel.'!";
                break;
            }
        }
        pasek.hidden=false;
        return;
    }
}
var mykey=item[4]+" "+item[5];
for(let i=0;i<localStorage.length;i++) 
{
    if(localStorage.key(i)===mykey)
    {
        pasek.className="alert alert-danger";
        pasek.innerHTML="<strong>Warning!</strong> This date and time are already taken!";
        pasek.hidden=false;
        return;
    }
}
save();
pasek.className="alert alert-success";
pasek.innerHTML="<strong>Success!</strong> Your appointment has been booked!";
pasek.hidden=false;
}


function save()
{
var item = {};
item.fname = document.getElementById('fname').value;
item.lname = document.getElementById('lname').value;
item.mail = document.getElementById('mail').value;
item.tel = document.getElementById('tel').value;
item.date = document.getElementById('date').value;
item.time = document.getElementById('time').value;
var top=document.getElementById('topic');
var sel="";
for(var el of top.options)
{
    if(el.selected)
    {
        sel+=el.value+" ";
    }
}
item.topic=sel;
item.color=document.getElementById('color').value;
item.extra=document.getElementById('extra').value;
var key=item.date+" "+item.time;
localStorage.setItem(key,JSON.stringify(item));
sessionStorage.setItem(key,JSON.stringify(item));
show();
document.getElementById("formcont").reset();
}
function show()
{
var str="";
if(localStorage.length===0)
{
    str="No arranged meetings";
}
else
{
for(var i=0;i<localStorage.length;i++) 
{
    var key=localStorage.key(i);
    var item=JSON.parse(localStorage.getItem(key));
    str+="<p style='background:"+item.color+";'> <button id='usuw' onclick='delloc("+i+")' >X </button> <button id='edit' onclick='editloc("+i+")' >Edytuj </button>";
    str+=" "+item.date+" "+item.time+"   "+item.fname+" "+item.lname+"   "+item.topic;
    str+="</p>";
}
}
var local=document.getElementById('local');
local.innerHTML=str;
str="";
if(sessionStorage.length===0)
{
    str="No recently arranged meetings";
}
else
{
for(var i=0;i<sessionStorage.length;i++) 
{
    var key=sessionStorage.key(i);
    var item=JSON.parse(sessionStorage.getItem(key));
    str+="<p style='background:"+item.color+";'> <button id='usuw' onclick='delses("+i+")' >X </button> <button id='edit' onclick='editses("+i+")' >Edytuj </button>";
    str+=" "+item.date+" "+item.time+"   "+item.fname+" "+item.lname+"   "+item.topic;
    str+="</p>";
}
}
var session=document.getElementById('session');
session.innerHTML=str;
}
function delses(i)
{
    var temp=sessionStorage.key(i);
    sessionStorage.removeItem(temp);
    localStorage.removeItem(temp);
    show();
    var pasek=document.getElementById('alarm').hidden=true;
}
function delloc(i)
{
    var temp=localStorage.key(i);
    localStorage.removeItem(temp);
    sessionStorage.removeItem(temp);
    show();
    var pasek=document.getElementById('alarm').hidden=true;
}
function editses(i)
{
    var temp=sessionStorage.key(i);
    var item=JSON.parse(sessionStorage.getItem(temp));
    document.getElementById('fname').value=item.fname;
    document.getElementById('lname').value=item.lname;
    document.getElementById('mail').value=item.mail;
    document.getElementById('tel').value=item.tel;
    document.getElementById('date').value=item.date;
    document.getElementById('time').value=item.time;
    document.getElementById('color').value=item.color;
    document.getElementById('extra').value=item.extra;
    delses(i);
}
function editloc(i)
{
    var temp=localStorage.key(i);
    var item=JSON.parse(localStorage.getItem(temp));
    document.getElementById('fname').value=item.fname;
    document.getElementById('lname').value=item.lname;
    document.getElementById('mail').value=item.mail;
    document.getElementById('tel').value=item.tel;
    document.getElementById('date').value=item.date;
    document.getElementById('time').value=item.time;
    document.getElementById('color').value=item.color;
    document.getElementById('extra').value=item.extra;
    delloc(i);
}
function delall()
{
    localStorage.clear();
    sessionStorage.clear();
    show();
    var pasek=document.getElementById('alarm').hidden=true;
}
document.addEventListener('DOMContentLoaded', () => {
 show();
 });
 
