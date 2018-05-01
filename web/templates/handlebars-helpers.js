
Handlebars.registerHelper('modelpreview', function() {
    var item = this;
    var svg_model = false; 
    switch(item.code) {
        case 'M1':
          svg_model = M1El.cloneNode(true);
        break;
        case 'M2':
          svg_model = M2El.cloneNode(true);
        break;
        case 'M3':
          svg_model = M3El.cloneNode(true);
        break;
        case 'M4':
          svg_model = M4El.cloneNode(true);
        break;
        default:
            svg_model = null;
    }
    
    if(!svg_model) return '';
    
    svg_model.querySelectorAll('.strips').forEach(function(el) {
        data = extractID(el.id);
        el.classList.forEach(function(className) {
            if (className != 'strips') el.classList.remove(className)
        });     
       el.classList.add(colorParser(item.c[data.side][data.index]));
    });    
  
    return new Handlebars.SafeString(svg_model.innerHTML);
});

Handlebars.registerHelper('modelTotal', function() {
    return this.p.price * this.q;
});


Handlebars.registerHelper('itemSize', function() {
    var size_string = ''
    if(this.s.size_number) size_string += 'Size: '+ this.s.size_number + '<br>';
    if(this.s.size1 || this.s.size2 || this.s.size3 || this.s.size4 || this.s.size5)
        size_string += 'Custom size fit: '+ (this.s.size1||'-') + ':'+ (this.s.size2||'-') + ':'+ (this.s.size3||'-') + ':'+ (this.s.size4||'-') + ':'+ (this.s.size5||'-');
    return new Handlebars.SafeString(size_string);;
});





function colorParser(colors_code) {
    if (!Array.isArray(colors_code))
    colors_code = [colors_code];
    var config = {
        'r1': 'red',
        'g1': 'green_light',
        'g2': 'green_dark',
        'o1': 'orange',
        'y1': 'yellow',
        'c1': 'crimson',
        'c2': 'cyclamen',
        'p1': 'purple'
    }

    var colors_name = colors_code.map(function(color_code) {
        if (config[color_code]) return config[color_code];
        else return 'default';
    });
    if (colors_name.length > 1) return colors_name;
    else return colors_name[0];
}

function extractID(id) {
    var data = id.split('.');
    return {
        side: data[0] == 1 ? 'l' : 'r',
        index: data[1] - 1,
    }
}