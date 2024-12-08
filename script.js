$(function() {
  var data = [
  { 
    action: 'type',
    strings: ["npm install -g virt2al^400"],
    output: '<span class="gray">+virt2al@0.1-beta installed</span><br>&nbsp;',
    postDelay: 1000
  },
  { 
    action: 'type',
    clear: false,
    strings: ['virt2al launch^400'],
    output: '<br><br>'
  },
  {
    action: 'type',
    clear: true,
    strings: ['launching virt2al...'],
    output: $('.launch-output').html()
  },
  { 
    action: 'type',
    strings: ["still under construction :)", ''],
    postDelay: 5000
  }
  
];
  runScripts(data, 0);
});

function runScripts(data, pos) {
    var prompt = $('.prompt'),
        script = data[pos];
    if(script.clear === true) {
      $('.history').html(''); 
    }
    switch(script.action) {
        case 'type':
          // cleanup for next execution
          prompt.removeData();
          $('.typed-cursor').text('');
          prompt.typed({
            strings: script.strings,
            typeSpeed: 30,
            callback: function() {
              var history = $('.history').html();
              history = history ? [history] : [];
              history.push('$ ' + prompt.text());
              if(script.output) {
                history.push(script.output);
                prompt.html('');
                $('.history').html(history.join('<br>'));
              }
              // scroll to bottom of screen
              $('section.terminal').scrollTop($('section.terminal').height());
              // Run next script
              pos++;
              if(pos < data.length) {
                setTimeout(function() {
                  runScripts(data, pos);
                }, script.postDelay || 1000);
              }
            }
          });
          break;
        case 'view':

          break;
    }
}