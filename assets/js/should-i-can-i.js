
function SCItitleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}

var url = window.location.pathname;
var t = window.location.pathname.substring(url.lastIndexOf('/') + 1);
var heading = SCItitleCase(t.replace(/%20/g, ' '));
heading = heading.replace(/[^a-zA-Z0-9]/g,' ')+"?";

var details = '';

if (heading.toLowerCase().startsWith('can'))
    details = 'Yes';
else if (heading.toLowerCase().startsWith('should'))
    details = 'No';
else
{
    heading = "Page not found :-(";
    details = "Whooops...";
}

$('#heading').text(heading);
$('#details').text(details);
								   
document.title = heading + " - Darryn Parker";
//document.description = heading;
$('meta[name=description]').remove();
$('head').append( '<meta name="description" content="'+heading+'">' );